import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat Penggunaan',
};

export default function TermsPage() {
  return (
    <div className="container-content max-w-2xl py-14 pt-32">
      <span className="section-number">Legal</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">Syarat Penggunaan</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
        <p>
          Situs SAVLUNE × Mitsubishi Digital Showroom Samarinda adalah layanan konsultasi yang dikelola
          oleh Sales Consultant Mitsubishi Samarinda, dan bukan situs korporat resmi Mitsubishi Motors
          Indonesia.
        </p>
        <div>
          <h2 className="font-display text-xl text-offwhite">Sifat Informasi</h2>
          <p className="mt-2">
            Harga, promo, ketersediaan unit, warna, spesifikasi, dan hasil simulasi pembiayaan yang
            ditampilkan bersifat estimasi dan dapat berubah sewaktu-waktu tanpa pemberitahuan
            sebelumnya. Konfirmasi akhir dilakukan bersama sales dan pihak pembiayaan terkait.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-offwhite">Simulasi Pembiayaan</h2>
          <p className="mt-2">
            Kalkulator simulasi kredit pada situs ini menghasilkan estimasi, bukan persetujuan kredit.
            Persetujuan akhir sepenuhnya berada di tangan perusahaan pembiayaan (leasing) setelah proses
            verifikasi.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-offwhite">Merek Dagang</h2>
          <p className="mt-2">
            Mitsubishi, logo Mitsubishi Motors, dan nama model kendaraan adalah merek dagang milik
            Mitsubishi Motors Corporation / Mitsubishi Motors Indonesia. Penggunaan pada situs ini
            semata untuk keperluan informasi dan konsultasi penjualan.
          </p>
        </div>
      </div>
    </div>
  );
}
