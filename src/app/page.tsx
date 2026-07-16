import { CinematicHero } from '@/components/hero/cinematic-hero';
import { FeatureStoryDynamic } from '@/components/sections/feature-story-dynamic';
import { QuickFinancingSection } from '@/components/sections/quick-financing';
import { ConsultationSection } from '@/components/sections/consultation-section';

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <FeatureStoryDynamic />
      <QuickFinancingSection />
      <ConsultationSection />
    </>
  );
}
