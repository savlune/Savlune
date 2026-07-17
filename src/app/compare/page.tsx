import type { Metadata } from 'next';
import { CompareWorkspace } from '@/components/comparison/compare-workspace';

export const metadata: Metadata = {
  title: 'Bandingkan Kendaraan',
  description: 'Bandingkan hingga tiga kendaraan Mitsubishi berdasarkan kebutuhan Anda.',
};

export default function ComparePage() {
  return (
    <div className="container-content py-14 pt-32">
      <span className="section-number">Bandingkan</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
        Bandingkan Kendaraan Mitsubishi
      </h1>
      <p className="mt-4 max-w-xl text-base text-white/55">
        Bandingkan hingga tiga kendaraan sekaligus. Rekomendasi diberikan berdasarkan kebutuhan, bukan
        klaim &ldquo;terbaik&rdquo; secara mutlak.
      </p>
      <div className="mt-10">
        <CompareWorkspace />
      </div>
    </div>
  );
}
