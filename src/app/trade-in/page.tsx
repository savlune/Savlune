import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/lead-form';

export const metadata: Metadata = {
  title: 'Trade-in',
  description: 'Tukar tambah kendaraan lama Anda dengan Mitsubishi baru bersama SAVLUNE Samarinda.',
};

export default async function TradeInPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string }>;
}) {
  const { vehicle } = await searchParams;
  return (
    <div className="container-content max-w-2xl py-14 pt-32">
      <span className="section-number">Trade-in</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
        Tukar Tambah Kendaraan Anda
      </h1>
      <p className="mt-4 text-base text-white/55">
        Kirim informasi kendaraan lama Anda, tim kami akan menghubungi untuk penilaian dan penawaran
        trade-in menuju Mitsubishi pilihan Anda.
      </p>
      <div className="mt-10">
        <LeadForm
          type="trade-in"
          defaultVehicleSlug={vehicle}
          submitLabel="Ajukan Trade-in"
        />
      </div>
    </div>
  );
}
