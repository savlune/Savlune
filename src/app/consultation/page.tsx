import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/lead-form';

export const metadata: Metadata = {
  title: 'Konsultasi',
  description: 'Konsultasikan kebutuhan kendaraan Mitsubishi Anda bersama Sales Consultant Samarinda.',
};

export default function ConsultationPage() {
  return (
    <div className="container-content max-w-2xl py-14 pt-32">
      <span className="section-number">Konsultasi</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
        Konsultasi Kendaraan Mitsubishi
      </h1>
      <p className="mt-4 text-base text-white/55">
        Ceritakan kebutuhan Anda dan kami akan membantu merekomendasikan kendaraan Mitsubishi yang
        paling sesuai.
      </p>
      <div className="mt-10">
        <LeadForm type="consultation" showNeedField submitLabel="Kirim Permintaan Konsultasi" />
      </div>
    </div>
  );
}
