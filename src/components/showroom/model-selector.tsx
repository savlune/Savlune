'use client';

import clsx from 'clsx';
import { vehicles } from '@/data/vehicles';
import { useShowroomStore } from '@/store/showroom-store';

export function ModelSelector({ className }: { className?: string }) {
  const selectedSlug = useShowroomStore((s) => s.selectedSlug);
  const setSelectedSlug = useShowroomStore((s) => s.setSelectedSlug);

  return (
    <div className={clsx('scrollbar-none flex gap-1 overflow-x-auto', className)}>
      {vehicles.map((vehicle) => {
        const active = vehicle.slug === selectedSlug;
        return (
          <button
            key={vehicle.slug}
            type="button"
            aria-label={vehicle.name.replace('Mitsubishi ', '')}
            onClick={() => setSelectedSlug(vehicle.slug)}
            className={clsx(
              'group flex shrink-0 flex-col items-start gap-1 border-b-2 px-5 py-4 text-left transition-colors duration-300',
              active ? 'border-savlune-gold' : 'border-transparent hover:border-white/20',
            )}
          >
            <span
              className={clsx(
                'text-[10px] uppercase tracking-widest2',
                active ? 'text-savlune-gold-light' : 'text-white/35',
              )}
            >
              {vehicle.category}
            </span>
            <span
              className={clsx(
                'font-display text-lg font-medium whitespace-nowrap',
                active ? 'text-offwhite' : 'text-white/55 group-hover:text-white/80',
              )}
            >
              {vehicle.name.replace('Mitsubishi ', '')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
