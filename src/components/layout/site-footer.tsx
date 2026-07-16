import Link from 'next/link';
import { salesConsultant, serviceAreas } from '@/data/locations';
import { NAV_LINKS } from '@/lib/nav-links';

const DATA_LAST_UPDATED = '16 Juli 2026';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal-950">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <span className="font-display text-2xl tracking-widest2 text-offwhite">SAVLUNE</span>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Mitsubishi Digital Showroom Samarinda. Layanan konsultasi Sales Consultant Mitsubishi
              Samarinda — bukan situs korporat resmi Mitsubishi Motors Indonesia.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest2 text-white/40">Navigasi</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-savlune-gold-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest2 text-white/40">Kontak</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>{salesConsultant.role}</li>
              <li>
                <a
                  href={`https://wa.me/${salesConsultant.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-savlune-gold-light"
                >
                  {salesConsultant.whatsappDisplay}
                </a>
              </li>
              <li>Area layanan: {serviceAreas.map((a) => a.city).join(', ')}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest2 text-white/40">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-white/60 hover:text-savlune-gold-light">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/60 hover:text-savlune-gold-light">
                  Syarat Penggunaan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <p className="max-w-3xl text-xs leading-relaxed text-white/40">
          Informasi harga, promo, ketersediaan unit, warna, spesifikasi, dan simulasi pembiayaan dapat
          berubah. Konfirmasi akhir dilakukan bersama sales dan pihak pembiayaan terkait.
        </p>
        <p className="mt-4 text-xs text-white/30">Data terakhir diperbarui: {DATA_LAST_UPDATED}</p>
      </div>
    </footer>
  );
}
