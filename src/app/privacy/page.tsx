import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
};

export default function PrivacyPage() {
  return (
    <div className="container-content max-w-2xl py-14 pt-32">
      <span className="section-number">Legal</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">Kebijakan Privasi</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
        <p>
          Halaman ini menjelaskan bagaimana SAVLUNE mengumpulkan dan menggunakan data yang Anda berikan
          melalui formulir konsultasi, test drive, trade-in, dan simulasi pembiayaan di situs ini.
        </p>
        <div>
          <h2 className="font-display text-xl text-offwhite">Data yang Dikumpulkan</h2>
          <p className="mt-2">
            Nama, nomor WhatsApp, email (opsional), kota, kendaraan yang diminati, dan catatan yang Anda
            tuliskan pada formulir.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-offwhite">Penggunaan Data</h2>
          <p className="mt-2">
            Data digunakan semata untuk menindaklanjuti permintaan Anda oleh Sales Consultant Mitsubishi
            Samarinda — termasuk menghubungi Anda via WhatsApp/telepon terkait konsultasi, jadwal test
            drive, trade-in, atau simulasi pembiayaan yang Anda ajukan.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-offwhite">Penyimpanan</h2>
          <p className="mt-2">
            Data disimpan pada sistem internal SAVLUNE dan tidak dijual atau dibagikan ke pihak ketiga di
            luar proses transaksi kendaraan dan pembiayaan yang Anda setujui.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-offwhite">Hubungi Kami</h2>
          <p className="mt-2">
            Untuk pertanyaan mengenai data Anda, hubungi Sales Consultant melalui nomor WhatsApp yang
            tercantum pada footer situs ini.
          </p>
        </div>
      </div>
    </div>
  );
}
