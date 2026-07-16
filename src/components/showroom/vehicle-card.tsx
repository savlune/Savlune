import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/types';
import { PriceDisplay } from '@/components/ui/price-display';
import { Badge } from '@/components/ui/badge';

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/showroom/${vehicle.slug}`}
      className="group block border border-white/10 transition-colors duration-300 hover:border-savlune-gold/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-900">
        <Image
          src={vehicle.heroImage}
          alt={vehicle.name}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Badge tone="neutral">{vehicle.category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-medium text-offwhite">{vehicle.name}</h3>
        <p className="mt-1 text-sm text-white/50">{vehicle.tagline}</p>
        <p className="mt-4 text-sm font-medium text-savlune-gold-light">
          <PriceDisplay price={vehicle.startingPrice} suffix="OTR" />
        </p>
      </div>
    </Link>
  );
}
