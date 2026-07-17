import { vehicles } from '@/data/vehicles';
import { VehicleCard } from './vehicle-card';
import { Section } from '@/components/ui/section';

export function RelatedVehicles({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = vehicles.filter((v) => v.slug !== currentSlug && v.category === category).slice(0, 3);
  const fallback = related.length > 0 ? related : vehicles.filter((v) => v.slug !== currentSlug).slice(0, 3);

  return (
    <Section number="—" eyebrow="Kendaraan Lain" title="Mungkin Anda Juga Tertarik" className="border-t border-white/10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fallback.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </Section>
  );
}
