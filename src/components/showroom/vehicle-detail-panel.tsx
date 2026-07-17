'use client';

import { useState } from 'react';
import { VehicleExperience } from '@/components/vehicle-viewer/vehicle-experience';
import { PriceDisplay } from '@/components/ui/price-display';
import { LinkButton, Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { salesConsultant } from '@/data/locations';
import type { Vehicle } from '@/types';

export function VehicleDetailPanel({ vehicle }: { vehicle: Vehicle }) {
  const [colorId, setColorId] = useState(vehicle.colors[0]?.id ?? null);
  const [variantId, setVariantId] = useState(vehicle.variants[0]?.id ?? null);

  const activeColor = vehicle.colors.find((c) => c.id === colorId) ?? vehicle.colors[0];
  const activeVariant = vehicle.variants.find((v) => v.id === variantId) ?? vehicle.variants[0];

  const waMessage = [
    `Halo Kak ${salesConsultant.name}, saya tertarik dengan ${vehicle.name}${
      activeVariant ? ` ${activeVariant.name}` : ''
    }.`,
    '',
    'Pilihan saya:',
    activeColor ? `- Warna: ${activeColor.name}` : undefined,
    activeVariant?.price.status === 'verified' && activeVariant.price.value
      ? `- Harga OTR: ${activeVariant.price.value}`
      : undefined,
    '',
    'Saya ingin mendapatkan penawaran terbaik dan jadwal konsultasi.',
  ]
    .filter((l): l is string => l !== undefined)
    .join('\n');

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <VehicleExperience vehicle={vehicle} activeColor={activeColor} />
        {vehicle.colors.length > 0 && (
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest2 text-white/40">Warna</span>
            <div className="flex gap-2">
              {vehicle.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  aria-label={color.name}
                  onClick={() => setColorId(color.id)}
                  style={{ backgroundColor: color.hex }}
                  className="h-7 w-7 rounded-full border border-white/30 hover:ring-2 hover:ring-savlune-gold"
                />
              ))}
            </div>
            {activeColor && <span className="text-sm text-white/60">{activeColor.name}</span>}
          </div>
        )}
      </div>

      <div>
        <span className="text-xs uppercase tracking-widest2 text-white/40">{vehicle.category}</span>
        <h1 className="mt-2 font-display text-4xl font-light text-offwhite md:text-5xl">
          {vehicle.name}
        </h1>
        <p className="mt-3 text-base text-white/60">{vehicle.tagline}</p>

        <p className="mt-6 font-display text-2xl text-savlune-gold-light">
          <PriceDisplay price={vehicle.startingPrice} suffix="OTR" />
        </p>

        {vehicle.variants.length > 0 && (
          <div className="mt-6">
            <span className="text-xs uppercase tracking-widest2 text-white/40">Varian</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {vehicle.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setVariantId(variant.id)}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    activeVariant?.id === variant.id
                      ? 'border-savlune-gold text-savlune-gold-light'
                      : 'border-white/15 text-white/55 hover:border-white/35'
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">{vehicle.shortDescription}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={buildWhatsAppUrl(waMessage)} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp">Konsultasi WhatsApp</Button>
          </a>
          <LinkButton href={`/test-drive?vehicle=${vehicle.slug}`} variant="secondary">
            Test Drive
          </LinkButton>
          <LinkButton href={`/trade-in?vehicle=${vehicle.slug}`} variant="ghost">
            Trade-in
          </LinkButton>
        </div>

        <p className="mt-6 text-xs text-white/30">
          Harga {vehicle.priceRegion} · Diperbarui {vehicle.priceLastUpdated}
        </p>
      </div>
    </div>
  );
}
