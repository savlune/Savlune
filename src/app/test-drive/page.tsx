import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/lead-form';

export const metadata: Metadata = {
  title: 'Test Drive',
  description: 'Jadwalkan test drive kendaraan Mitsubishi pilihan Anda di area Samarinda.',
};

export default async function TestDrivePage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string }>;
}) {
  const { vehicle } = await searchParams;
  return (
    <div className="container-content max-w-2xl py-14 pt-32">
      <span className="section-number">Test Drive</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
        Jadwalkan Test Drive
      </h1>
      <p className="mt-4 text-base text-white/55">
        Rasakan langsung pengalaman berkendara Mitsubishi. Pilih kendaraan dan tanggal yang Anda
        inginkan, tim kami akan menghubungi untuk konfirmasi jadwal.
      </p>
      <div className="mt-10">
        <LeadForm
          type="test-drive"
          defaultVehicleSlug={vehicle}
          showDatePicker
          submitLabel="Jadwalkan Test Drive"
        />
      </div>
    </div>
  );
}
