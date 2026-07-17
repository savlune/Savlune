'use client';

import { motion } from 'framer-motion';
import { getVehicleBySlug, vehicles } from '@/data/vehicles';
import { useShowroomStore } from '@/store/showroom-store';
import { VehicleExperience } from '@/components/vehicle-viewer/vehicle-experience';
import { ModelSelector } from '@/components/showroom/model-selector';
import { LinkButton, Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/whatsapp/message';
import { salesConsultant } from '@/data/locations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function CinematicHero() {
  const selectedSlug = useShowroomStore((s) => s.selectedSlug);
  const selectedColorId = useShowroomStore((s) => s.selectedColorId);
  const setSelectedColorId = useShowroomStore((s) => s.setSelectedColorId);
  const vehicle = getVehicleBySlug(selectedSlug) ?? vehicles[0]!;
  const activeColor = vehicle.colors.find((c) => c.id === selectedColorId) ?? vehicle.colors[0];

  const waUrl = buildWhatsAppUrl(
    `Halo Kak ${salesConsultant.name}, saya tertarik dengan ${vehicle.name}. Saya ingin konsultasi lebih lanjut.`,
  );

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,75,0.08),_transparent_60%)]" />

      <div className="container-content grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div initial="hidden" animate="show" custom={0.1} variants={fadeUp}>
          <div className="mb-6 flex items-center gap-4">
            <span className="font-display text-sm tracking-widest2 text-savlune-gold-light">SAVLUNE</span>
            <span className="h-px w-8 bg-savlune-gold/50" />
            <span className="text-[11px] uppercase tracking-widest2 text-white/45">
              Mitsubishi Digital Showroom
            </span>
          </div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.2}
            variants={fadeUp}
            className="font-display text-5xl font-light leading-[1.05] text-offwhite md:text-6xl"
          >
            Jelajahi Mitsubishi
            <br />
            dari Setiap Sudut.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.32}
            variants={fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60"
          >
            Pilih model, lihat warna, hitung pembiayaan, dan konsultasikan kendaraan Mitsubishi Anda
            dalam satu pengalaman digital.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.44}
            variants={fadeUp}
            className="mt-9 flex flex-wrap gap-3"
          >
            <LinkButton href={`/showroom/${vehicle.slug}`} variant="primary">
              Jelajahi {vehicle.name.replace('Mitsubishi ', '')}
            </LinkButton>
            <LinkButton href="/financing" variant="secondary">
              Hitung Cicilan
            </LinkButton>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp">Konsultasi WhatsApp</Button>
            </a>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.56}
            variants={fadeUp}
            className="mt-8 text-xs uppercase tracking-widest2 text-white/35"
          >
            Melayani Samarinda dan area Kalimantan Timur.
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <VehicleExperience vehicle={vehicle} activeColor={activeColor} />
          {vehicle.colors.length > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest2 text-white/40">Warna</span>
              <div className="flex gap-2">
                {vehicle.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    onClick={() => setSelectedColorId(color.id)}
                    style={{ backgroundColor: color.hex }}
                    className="h-6 w-6 rounded-full border border-white/30 ring-offset-2 ring-offset-charcoal-950 hover:ring-2 hover:ring-savlune-gold"
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content">
          <ModelSelector />
        </div>
      </div>
    </section>
  );
}
