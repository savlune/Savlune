'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { financePackages } from '@/data/finance-packages';
import { calculateFromPackage } from '@/lib/financing/calculator';
import { formatRupiah } from '@/lib/formatters/currency';
import { ResultSummary } from './result-summary';
import { Badge } from '@/components/ui/badge';

export function ReferencePackages() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = financePackages.find((p) => p.id === selectedId);

  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-white/50">
        Paket di bawah ini adalah data resmi dari dokumen simulasi leasing yang belum dipetakan ke
        model kendaraan tertentu. Gunakan sebagai referensi angsuran nyata, lalu konfirmasikan
        kesesuaian dengan model pilihan Anda bersama sales.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {financePackages.map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => setSelectedId(pkg.id)}
            className={clsx(
              'border p-5 text-left transition-colors',
              selectedId === pkg.id
                ? 'border-savlune-gold bg-charcoal-900/60'
                : 'border-white/10 hover:border-white/25',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-offwhite">{pkg.leasing}</span>
              {pkg.needsVehicleMapping && <Badge tone="neutral">Belum dipetakan</Badge>}
            </div>
            <p className="mt-3 font-display text-2xl text-savlune-gold-light">
              {formatRupiah(pkg.monthlyInstallment)}
              <span className="text-xs text-white/40"> /bulan</span>
            </p>
            <p className="mt-2 text-xs text-white/45">
              OTR {formatRupiah(pkg.otr)} · Tenor {pkg.tenorMonths} bulan · {pkg.scheme}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-8">
          <ResultSummary result={calculateFromPackage(selected)} vehicleName={selected.leasing} />
        </div>
      )}
    </div>
  );
}
