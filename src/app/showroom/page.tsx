import type { Metadata } from 'next';
import { ShowroomGrid } from '@/components/showroom/showroom-grid';

export const metadata: Metadata = {
  title: 'Showroom',
  description: 'Jelajahi seluruh lini kendaraan Mitsubishi — SUV, MPV, pickup, hingga kendaraan niaga.',
};

export default function ShowroomPage() {
  return (
    <div className="container-content py-14 pt-32">
      <div className="mb-12">
        <span className="section-number">Showroom</span>
        <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
          Seluruh Lini Kendaraan Mitsubishi
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/55">
          Dari SUV, MPV, pickup, hingga kendaraan niaga dan listrik — pilih model untuk melihat detail,
          simulasi kredit, dan jadwal konsultasi.
        </p>
      </div>
      <ShowroomGrid />
    </div>
  );
}
