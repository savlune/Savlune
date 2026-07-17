'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { RotateCw } from 'lucide-react';
import type { VehicleImage } from '@/types';

const ANGLE_LABELS: Record<NonNullable<VehicleImage['angle']>, string> = {
  'front-3q': 'Depan 3/4',
  front: 'Depan',
  side: 'Samping',
  rear: 'Belakang',
  interior: 'Interior',
  dashboard: 'Dashboard',
  trunk: 'Bagasi',
  detail: 'Detail',
};

export function StaticViewer({
  images,
  vehicleName,
}: {
  images: VehicleImage[];
  vehicleName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 border border-white/10 bg-gradient-to-b from-charcoal-800 to-charcoal-950">
        <RotateCw size={28} className="text-white/25" />
        <p className="max-w-xs text-center text-sm text-white/40">
          Pratinjau 360 akan tersedia setelah aset kendaraan ditambahkan.
        </p>
        <p className="text-xs uppercase tracking-widest2 text-white/25">{vehicleName}</p>
      </div>
    );
  }

  const active = images[activeIndex] ?? images[0]!;

  return (
    <div className="w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-charcoal-900">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
          priority={activeIndex === 0}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {images.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={clsx(
                'border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors',
                idx === activeIndex
                  ? 'border-savlune-gold text-savlune-gold-light'
                  : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white/80',
              )}
            >
              {img.angle ? ANGLE_LABELS[img.angle] : `Foto ${idx + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
