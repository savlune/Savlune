'use client';

import { getVehicleBySlug, vehicles } from '@/data/vehicles';
import { useShowroomStore } from '@/store/showroom-store';
import { FeatureStory } from './feature-story';

export function FeatureStoryDynamic() {
  const selectedSlug = useShowroomStore((s) => s.selectedSlug);
  const vehicle = getVehicleBySlug(selectedSlug) ?? vehicles[0]!;
  return <FeatureStory vehicle={vehicle} />;
}
