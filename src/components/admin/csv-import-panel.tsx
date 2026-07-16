'use client';

import { useState } from 'react';
import { parseLeasingCsv, type LeasingImportRow } from '@/lib/validation/leasing-import';
import { Button } from '@/components/ui/button';

export function CsvImportPanel() {
  const [csvText, setCsvText] = useState('');
  const [preview, setPreview] = useState<{
    rows: LeasingImportRow[];
    errors: { line: number; message: string }[];
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onFile = async (file: File) => {
    const text = await file.text();
    setCsvText(text);
    setPreview(parseLeasingCsv(text));
    setResult(null);
  };

  const onSubmit = async () => {
    if (!csvText) return;
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch('/api/admin/leasing-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvText }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResult(data.error ?? 'Gagal mengimpor.');
        return;
      }
      setResult(`${data.imported} baris berhasil diimpor sebagai draft (belum terverifikasi).`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-white/10 p-6">
      <h2 className="font-display text-xl text-offwhite">Import Paket Leasing (CSV)</h2>
      <p className="mt-2 text-sm text-white/50">
        Unggah file CSV sesuai template. Semua baris masuk sebagai <em>draft</em> — belum terhubung ke
        kalkulator publik sampai diverifikasi manual.
      </p>
      <a
        href="/finance-references/leasing-import-template.csv"
        download
        className="mt-3 inline-block text-sm text-savlune-gold-light hover:underline"
      >
        Unduh template CSV →
      </a>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
        className="mt-5 block text-sm text-white/60 file:mr-4 file:border file:border-white/20 file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-offwhite"
      />

      {preview && (
        <div className="mt-6">
          <p className="text-sm text-white/60">
            {preview.rows.length} baris valid · {preview.errors.length} baris bermasalah
          </p>
          {preview.errors.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-mitsubishi-red">
              {preview.errors.map((err, i) => (
                <li key={i}>
                  Baris {err.line}: {err.message}
                </li>
              ))}
            </ul>
          )}
          {preview.rows.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead>
                  <tr className="text-white/40">
                    <th className="py-2 pr-4">Kendaraan</th>
                    <th className="py-2 pr-4">Leasing</th>
                    <th className="py-2 pr-4">Skema</th>
                    <th className="py-2 pr-4">OTR</th>
                    <th className="py-2 pr-4">Tenor</th>
                    <th className="py-2 pr-4">Angsuran</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, i) => (
                    <tr key={i} className="border-t border-white/10 text-white/70">
                      <td className="py-2 pr-4">{row.vehicle_slug}</td>
                      <td className="py-2 pr-4">{row.leasing}</td>
                      <td className="py-2 pr-4">{row.scheme}</td>
                      <td className="py-2 pr-4">{row.otr.toLocaleString('id-ID')}</td>
                      <td className="py-2 pr-4">{row.tenor_months}</td>
                      <td className="py-2 pr-4">{row.monthly_installment.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {preview.rows.length > 0 && (
            <Button type="button" className="mt-5" onClick={onSubmit} disabled={submitting}>
              {submitting ? 'Mengimpor...' : 'Impor sebagai Draft'}
            </Button>
          )}
        </div>
      )}

      {result && <p className="mt-4 text-sm text-savlune-gold-light">{result}</p>}
    </div>
  );
}
