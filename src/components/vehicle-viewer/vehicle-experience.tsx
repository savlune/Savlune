'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import type { Vehicle, VehicleColor } from '@/types';
import { StaticViewer } from './static-viewer';

const ModelViewer = dynamic(
  () => import('@/components/vehicle-3d/model-viewer').then((m) => m.ModelViewer),
  { ssr: false, loading: () => <ViewerSkeleton /> },
);

const SequenceViewer = dynamic(
  () => import('./sequence-viewer').then((m) => m.SequenceViewer),
  { ssr: false, loading: () => <ViewerSkeleton /> },
);

function ViewerSkeleton() {
  return (
    <div className="aspect-[4/3] w-full animate-pulse border border-white/10 bg-charcoal-800" />
  );
}

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

interface VehicleExperienceProps {
  vehicle: Vehicle;
  activeColor?: VehicleColor;
}

export function VehicleExperience({ vehicle, activeColor }: VehicleExperienceProps) {
  const { viewer } = vehicle;
  const webglAvailable = useMemo(() => hasWebGL(), []);

  const resolvedMode: '3d' | 'sequence' | 'static' =
    viewer.mode === '3d' && viewer.modelPath && webglAvailable
      ? '3d'
      : viewer.mode === 'sequence' && viewer.framePattern && viewer.frameCount
        ? 'sequence'
        : 'static';

  const [modeLabel] = useState(resolvedMode);

  return (
    <div>
      {resolvedMode === '3d' && viewer.modelPath && (
        <ModelViewer modelPath={viewer.modelPath} vehicleName={vehicle.name} activeColor={activeColor} />
      )}
      {resolvedMode === 'sequence' && viewer.framePattern && viewer.frameCount && (
        <SequenceViewer
          framePattern={viewer.framePattern}
          frameCount={viewer.frameCount}
          vehicleName={vehicle.name}
          posterImage={viewer.posterImage}
        />
      )}
      {resolvedMode === 'static' && (
        <StaticViewer images={viewer.fallbackImages} vehicleName={vehicle.name} />
      )}
      <p
        className={clsx(
          'mt-3 text-[11px] uppercase tracking-widest2 text-white/30',
          modeLabel !== 'static' && 'sr-only',
        )}
      >
        Mode tampilan: {modeLabel === '3d' ? '3D interaktif' : modeLabel === 'sequence' ? '360 foto' : 'Foto statis'}
      </p>
    </div>
  );
}
