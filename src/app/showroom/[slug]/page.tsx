import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVehicleBySlug, vehicles } from '@/data/vehicles';
import { VehicleDetailPanel } from '@/components/showroom/vehicle-detail-panel';
import { FeatureStory } from '@/components/sections/feature-story';
import { SpecTable } from '@/components/showroom/spec-table';
import { RelatedVehicles } from '@/components/showroom/related-vehicles';
import { CalculatorForm } from '@/components/financing/calculator-form';
import { Section } from '@/components/ui/section';
import { StaticViewer } from '@/components/vehicle-viewer/static-viewer';

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};
  return {
    title: vehicle.name,
    description: vehicle.shortDescription,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  return (
    <div>
      <div className="container-content pt-32">
        <VehicleDetailPanel vehicle={vehicle} />
      </div>

      <FeatureStory vehicle={vehicle} />

      <Section
        number="—"
        eyebrow="Spesifikasi"
        title="Dimensi, Mesin, dan Fitur"
        className="border-t border-white/10"
      >
        <SpecTable groups={vehicle.specifications} vehicleName={vehicle.name} />
      </Section>

      <Section number="—" eyebrow="Galeri" title="Eksterior dan Interior" className="border-t border-white/10">
        <StaticViewer images={vehicle.gallery} vehicleName={vehicle.name} />
      </Section>

      <Section
        number="—"
        eyebrow="Simulasi Kredit"
        title={`Hitung Cicilan ${vehicle.name}`}
        className="border-t border-white/10 bg-charcoal-900/20"
      >
        <CalculatorForm compact defaultVehicleSlug={vehicle.slug} />
      </Section>

      <RelatedVehicles currentSlug={vehicle.slug} category={vehicle.category} />
    </div>
  );
}
