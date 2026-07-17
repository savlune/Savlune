'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
  useProgress,
  Html,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Maximize2, RotateCcw } from 'lucide-react';
import type { VehicleColor } from '@/types';

interface ModelViewerProps {
  modelPath: string;
  vehicleName: string;
  activeColor?: VehicleColor;
}

function LoadingIndicator() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="whitespace-nowrap text-xs uppercase tracking-widest2 text-white/60">
        Memuat model — {Math.round(progress)}%
      </div>
    </Html>
  );
}

function CarModel({ modelPath, activeColor }: { modelPath: string; activeColor?: VehicleColor }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (!activeColor?.materialName) return;
    scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material &&
        (child.material as THREE.Material).name === activeColor.materialName
      ) {
        (child.material as THREE.MeshStandardMaterial).color = new THREE.Color(activeColor.hex);
      }
    });
  }, [scene, activeColor]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((m) => m?.dispose());
        }
      });
      useGLTF.clear(modelPath);
    };
  }, [scene, modelPath]);

  return <primitive object={scene} dispose={null} />;
}

function VisibilityPause({ children }: { children: React.ReactNode }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  return <>{children}</>;
}

export function ModelViewer({ modelPath, vehicleName, activeColor }: ModelViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const resetCamera = () => {
    controlsRef.current?.reset();
    setAutoRotate(true);
  };

  const requestFullscreen = () => {
    containerRef.current?.requestFullscreen?.();
  };

  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] w-full border border-white/10 bg-charcoal-900">
      <Canvas
        dpr={dpr}
        camera={{ position: [4.2, 1.4, 4.2], fov: 32 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <VisibilityPause>
          <ambientLight intensity={0.4} />
          <Suspense fallback={<LoadingIndicator />}>
            <CarModel modelPath={modelPath} activeColor={activeColor} />
            <Environment preset="studio" />
            <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={10} blur={2.4} far={4} />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enablePan={false}
            minDistance={2.8}
            maxDistance={6.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.05}
            autoRotate={autoRotate}
            autoRotateSpeed={0.6}
            onStart={() => setAutoRotate(false)}
          />
        </VisibilityPause>
      </Canvas>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest2 text-white/50">
        Geser untuk memutar
      </div>

      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          onClick={resetCamera}
          aria-label={`Reset tampilan ${vehicleName}`}
          className="flex h-9 w-9 items-center justify-center border border-white/20 bg-black/40 text-white/80 hover:border-savlune-gold"
        >
          <RotateCcw size={16} />
        </button>
        <button
          type="button"
          onClick={requestFullscreen}
          aria-label="Layar penuh"
          className="flex h-9 w-9 items-center justify-center border border-white/20 bg-black/40 text-white/80 hover:border-savlune-gold"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}
