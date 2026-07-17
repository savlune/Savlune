import type { Metadata } from 'next';
import { promotions } from '@/data/promotions';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { salesConsultant } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Promo',
  description: 'Promo dan penawaran terbaru Mitsubishi Samarinda.',
};

export default function PromoPage() {
  const waUrl = buildWhatsAppUrl(
    `Halo Kak ${salesConsultant.name}, apakah ada promo Mitsubishi yang sedang berjalan saat ini?`,
  );

  return (
    <div className="container-content py-14 pt-32">
      <span className="section-number">Promo</span>
      <h1 className="mt-3 font-display text-4xl font-light text-offwhite md:text-5xl">
        Promo Mitsubishi Samarinda
      </h1>

      {promotions.length === 0 ? (
        <div className="mt-10 max-w-lg border border-dashed border-white/15 p-8">
          <p className="text-base text-white/60">
            Belum ada promo terverifikasi yang dipublikasikan saat ini. Promo dapat berubah sewaktu-waktu
            — hubungi sales untuk info penawaran terbaru.
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
            <Button variant="whatsapp">Tanya Promo Terbaru</Button>
          </a>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo) => (
            <div key={promo.id} className="border border-white/10 p-6">
              <h3 className="font-display text-xl text-offwhite">{promo.title}</h3>
              <p className="mt-2 text-sm text-white/55">{promo.description}</p>
              <p className="mt-4 text-xs text-white/35">
                Berlaku {promo.validFrom}
                {promo.validUntil ? ` – ${promo.validUntil}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
