'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { salesConsultant } from '@/data/locations';

const NEEDS = [
  'Mobil keluarga',
  'Mobil usaha',
  'Perjalanan luar kota',
  'Kendaraan operasional',
  'Kendaraan premium',
  'Kendaraan untuk medan berat',
  'Ingin cicilan ringan',
];

export function ConsultationSection() {
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

  const message = selectedNeed
    ? `Halo Kak ${salesConsultant.name}, saya butuh rekomendasi kendaraan Mitsubishi untuk kebutuhan: ${selectedNeed}.`
    : `Halo Kak ${salesConsultant.name}, saya butuh rekomendasi kendaraan Mitsubishi yang sesuai kebutuhan saya.`;

  return (
    <Section
      number="—"
      eyebrow="Konsultasi"
      title="Butuh Rekomendasi Kendaraan yang Sesuai Kebutuhan?"
      className="border-t border-white/10"
    >
      <div className="flex flex-wrap gap-2.5">
        {NEEDS.map((need) => (
          <button
            key={need}
            type="button"
            onClick={() => setSelectedNeed(need)}
            className={`border px-4 py-2.5 text-sm transition-colors ${
              selectedNeed === need
                ? 'border-savlune-gold text-savlune-gold-light'
                : 'border-white/15 text-white/60 hover:border-white/35'
            }`}
          >
            {need}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
          <Button variant="whatsapp">Konsultasi dengan {salesConsultant.name}</Button>
        </a>
      </div>
    </Section>
  );
}
