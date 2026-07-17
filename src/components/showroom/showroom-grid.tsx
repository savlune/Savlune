'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { vehicles, vehicleCategories } from '@/data/vehicles';
import { VehicleCard } from './vehicle-card';

export function ShowroomGrid() {
  const [category, setCategory] = useState<string | null>(null);
  const filtered = category ? vehicles.filter((v) => v.category === category) : vehicles;

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={clsx(
            'border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors',
            category === null
              ? 'border-savlune-gold text-savlune-gold-light'
              : 'border-white/15 text-white/50 hover:border-white/35',
          )}
        >
          Semua
        </button>
        {vehicleCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={clsx(
              'border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors',
              category === cat
                ? 'border-savlune-gold text-savlune-gold-light'
                : 'border-white/15 text-white/50 hover:border-white/35',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
