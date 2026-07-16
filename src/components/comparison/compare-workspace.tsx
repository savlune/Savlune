'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { vehicles } from '@/data/vehicles';
import type { Vehicle } from '@/types';
import { PriceDisplay } from '@/components/ui/price-display';

const MAX_SLOTS = 3;

const RECOMMENDATION_BY_CATEGORY: Record<string, string> = {
  SUV: 'Cocok untuk perjalanan luar kota dan medan menantang.',
  MPV: 'Cocok untuk keluarga besar dan mobilitas perkotaan.',
  Pickup: 'Cocok untuk kebutuhan bisnis dan angkut barang.',
  'Kendaraan Niaga': 'Cocok untuk logistik dan operasional usaha.',
  'Kendaraan Listrik': 'Cocok untuk operasional rendah emisi di dalam kota.',
};

interface Row {
  label: string;
  render: (v: Vehicle) => string;
}

const ROWS: Row[] = [
  { label: 'Kategori', render: (v) => v.category },
  {
    label: 'Harga OTR',
    render: (v) =>
      v.startingPrice.status === 'verified' && v.startingPrice.value
        ? String(v.startingPrice.value)
        : 'Hubungi sales',
  },
  { label: 'Kapasitas penumpang', render: (v) => (v.seats ? `${v.seats} orang` : 'Menunggu konfirmasi') },
  { label: 'Mesin', render: (v) => v.engine.value ?? 'Menunggu konfirmasi' },
  {
    label: 'Transmisi',
    render: (v) => (v.transmission.length > 0 ? v.transmission.join(', ') : 'Menunggu konfirmasi'),
  },
  { label: 'Ground clearance', render: (v) => v.groundClearance.value ?? 'Menunggu konfirmasi' },
  {
    label: 'Jumlah varian',
    render: (v) => (v.variants.length > 0 ? `${v.variants.length} varian` : 'Menunggu konfirmasi'),
  },
];

export function CompareWorkspace() {
  const [slots, setSlots] = useState<(string | null)[]>(['destinator', 'xpander', null]);
  const [diffOnly, setDiffOnly] = useState(false);

  const selectedVehicles = slots.map((slug) => vehicles.find((v) => v.slug === slug) ?? null);
  const activeVehicles = selectedVehicles.filter((v): v is Vehicle => v !== null);

  const visibleRows = useMemo(() => {
    if (!diffOnly) return ROWS;
    return ROWS.filter((row) => {
      const values = activeVehicles.map((v) => row.render(v));
      return new Set(values).size > 1;
    });
  }, [diffOnly, activeVehicles]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {slots.map((slug, idx) => (
            <select
              key={idx}
              value={slug ?? ''}
              onChange={(e) =>
                setSlots((prev) => prev.map((s, i) => (i === idx ? e.target.value || null : s)))
              }
              className="border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
            >
              <option value="" className="bg-charcoal-900">
                Pilih kendaraan {idx + 1}
              </option>
              {vehicles.map((v) => (
                <option key={v.slug} value={v.slug} className="bg-charcoal-900">
                  {v.name}
                </option>
              ))}
            </select>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDiffOnly(false)}
            className={clsx(
              'border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors',
              !diffOnly ? 'border-savlune-gold text-savlune-gold-light' : 'border-white/15 text-white/50',
            )}
          >
            Tampilkan Semua
          </button>
          <button
            type="button"
            onClick={() => setDiffOnly(true)}
            className={clsx(
              'border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors',
              diffOnly ? 'border-savlune-gold text-savlune-gold-light' : 'border-white/15 text-white/50',
            )}
          >
            Hanya Perbedaan
          </button>
        </div>
      </div>

      {activeVehicles.length < 2 ? (
        <div className="border border-dashed border-white/15 p-10 text-center text-sm text-white/40">
          Pilih minimal dua kendaraan untuk memulai perbandingan (maksimal {MAX_SLOTS}).
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-white/10 pb-4 text-left text-xs uppercase tracking-widest2 text-white/40">
                  &nbsp;
                </th>
                {activeVehicles.map((v) => (
                  <th key={v.slug} className="border-b border-white/10 pb-4 text-left">
                    <span className="font-display text-lg font-medium text-offwhite">{v.name}</span>
                    <p className="mt-1 text-xs font-normal text-white/40">
                      {RECOMMENDATION_BY_CATEGORY[v.category]}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.label} className="border-b border-white/5">
                  <td className="py-3.5 text-white/50">{row.label}</td>
                  {activeVehicles.map((v) => (
                    <td key={v.slug} className="py-3.5 font-medium text-offwhite">
                      {row.label === 'Harga OTR' ? (
                        <PriceDisplay price={v.startingPrice} />
                      ) : (
                        row.render(v)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
