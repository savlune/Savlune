'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCw, Maximize2 } from 'lucide-react';

interface SequenceViewerProps {
  framePattern: string;
  frameCount: number;
  vehicleName: string;
  posterImage?: string;
}

/** Mode 2 — drag-to-scrub 360 image sequence viewer with lazy frame loading. */
export function SequenceViewer({ framePattern, frameCount, vehicleName, posterImage }: SequenceViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ dragging: boolean; startX: number; startFrame: number }>({
    dragging: false,
    startX: 0,
    startFrame: 0,
  });

  const frameSrc = useCallback(
    (index: number) => framePattern.replace('{index}', String(index).padStart(2, '0')),
    [framePattern],
  );

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    // Load first frame immediately for the poster, then stream the rest.
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadedCount(loaded);
        if (i === 0) setReady(true);
      };
    }
    return () => {
      cancelled = true;
    };
  }, [frameCount, frameSrc]);

  const applyDelta = useCallback(
    (deltaX: number, startFrame: number) => {
      const sensitivity = 4; // px per frame step
      const steps = Math.round(deltaX / sensitivity);
      let next = (startFrame - steps) % frameCount;
      if (next < 0) next += frameCount;
      setCurrentFrame(next);
    },
    [frameCount],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { dragging: true, startX: e.clientX, startFrame: currentFrame };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    applyDelta(e.clientX - dragState.current.startX, dragState.current.startFrame);
  };

  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setCurrentFrame((f) => (f - 1 + frameCount) % frameCount);
    if (e.key === 'ArrowRight') setCurrentFrame((f) => (f + 1) % frameCount);
  };

  const requestFullscreen = () => {
    containerRef.current?.requestFullscreen?.();
  };

  const progress = Math.round((loadedCount / frameCount) * 100);

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Putar 360 derajat ${vehicleName}`}
      aria-valuemin={0}
      aria-valuemax={frameCount - 1}
      aria-valuenow={currentFrame}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className="relative aspect-[4/3] w-full cursor-grab touch-none select-none overflow-hidden border border-white/10 bg-charcoal-900 active:cursor-grabbing"
    >
      {!ready && posterImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={posterImage} alt={vehicleName} className="h-full w-full object-cover" />
      )}
      {ready && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frameSrc(currentFrame)}
          alt={`${vehicleName} — frame ${currentFrame + 1}`}
          className="h-full w-full object-cover"
          draggable={false}
        />
      )}
      {progress < 100 && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
          <div className="h-full bg-savlune-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-widest2 text-white/60">
        <RotateCw size={14} /> Geser untuk memutar
      </div>
      <button
        type="button"
        onClick={requestFullscreen}
        aria-label="Layar penuh"
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/40 text-white/80 hover:border-savlune-gold"
      >
        <Maximize2 size={16} />
      </button>
    </div>
  );
}
