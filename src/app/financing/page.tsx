import type { Metadata } from 'next';
import { FinancingWorkspace } from '@/components/financing/financing-workspace';

export const metadata: Metadata = {
  title: 'Simulasi Kredit',
  description:
    'Hitung DP, tenor, dan estimasi angsuran Mitsubishi. Estimasi, bukan persetujuan kredit — konfirmasi akhir bersama sales dan pihak pembiayaan.',
};

export default function FinancingPage() {
  return (
    <div className="container-content py-14 pt-32">
      <div className="mb-12">
        <span className="section-number">Simulasi Kredit</span>
        <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
          Hitung DP dan Estimasi Angsuran
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/55">
          Gunakan estimasi fleksibel untuk simulasi cepat, atau lihat paket referensi leasing yang
          sudah terverifikasi dari dokumen resmi.
        </p>
      </div>
      <FinancingWorkspace />
    </div>
  );
}
