'use client';

import { useState } from 'react';
import { Copy, Check, Printer, Share2 } from 'lucide-react';
import type { FinanceCalculationResult } from '@/types';
import { formatRupiah, formatDateID } from '@/lib/formatters/currency';
import { buildSimulationMessage, buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { Button } from '@/components/ui/button';

const ROWS: { key: keyof FinanceCalculationResult; label: string }[] = [
  { key: 'vehiclePrice', label: 'Harga kendaraan' },
  { key: 'dpAmount', label: 'DP' },
  { key: 'principal', label: 'Pokok pembiayaan' },
  { key: 'monthlyInstallment', label: 'Angsuran per bulan' },
  { key: 'firstInstallment', label: 'Angsuran pertama' },
  { key: 'additionalFees', label: 'Biaya tambahan' },
  { key: 'totalFirstPayment', label: 'Total pembayaran pertama' },
  { key: 'estimatedTotalPayment', label: 'Perkiraan total pembayaran' },
  { key: 'differenceVsCash', label: 'Selisih dibanding tunai' },
];

export function ResultSummary({
  result,
  vehicleName,
  variantName,
  colorName,
  id = 'financing-result',
}: {
  result: FinanceCalculationResult;
  vehicleName?: string;
  variantName?: string;
  colorName?: string;
  id?: string;
}) {
  const [copied, setCopied] = useState(false);

  const summaryText = [
    `Simulasi Kredit — ${vehicleName ?? 'Mitsubishi'}${variantName ? ` ${variantName}` : ''}`,
    `Tanggal: ${formatDateID(result.simulationDate)}`,
    ...ROWS.map((row) => `${row.label}: ${formatRupiah(result[row.key] as number)}`),
    `Tenor: ${result.tenorMonths} bulan (${result.installmentCount} kali angsuran)`,
    `Skema: ${result.scheme}`,
    result.leasing ? `Leasing: ${result.leasing}` : undefined,
    '',
    result.disclaimer,
  ]
    .filter(Boolean)
    .join('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waUrl = buildWhatsAppUrl(
    buildSimulationMessage({ vehicleName, variantName, colorName, result }),
  );

  return (
    <div id={id} className="border border-white/10 bg-charcoal-900/60 p-6 md:p-8">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl font-light text-offwhite">Hasil Simulasi</h3>
        <span className="text-xs text-white/35">{formatDateID(result.simulationDate)}</span>
      </div>

      <dl className="mt-6 divide-y divide-white/10">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between py-3">
            <dt className="text-sm text-white/55">{row.label}</dt>
            <dd
              className={
                row.key === 'monthlyInstallment'
                  ? 'font-display text-xl text-savlune-gold-light'
                  : 'text-sm font-medium text-offwhite'
              }
            >
              {formatRupiah(result[row.key] as number)}
              {row.key === 'monthlyInstallment' && (
                <span className="ml-1 text-xs text-white/40">/bulan</span>
              )}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm text-white/55">Tenor</dt>
          <dd className="text-sm font-medium text-offwhite">
            {result.tenorMonths} bulan · {result.installmentCount} kali angsuran
          </dd>
        </div>
        {result.leasing && (
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-white/55">Leasing</dt>
            <dd className="text-sm font-medium text-offwhite">{result.leasing}</dd>
          </div>
        )}
      </dl>

      <p className="mt-6 text-xs italic leading-relaxed text-white/40">{result.disclaimer}</p>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <a href={waUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="whatsapp">
            <Share2 size={15} /> Kirim ke WhatsApp
          </Button>
        </a>
        <Button variant="secondary" type="button" onClick={handleCopy}>
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Tersalin' : 'Salin hasil'}
        </Button>
        <Button variant="secondary" type="button" onClick={() => window.print()}>
          <Printer size={15} /> Cetak / PDF
        </Button>
      </div>
    </div>
  );
}
