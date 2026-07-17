import { Section } from '@/components/ui/section';
import { CalculatorForm } from '@/components/financing/calculator-form';

export function QuickFinancingSection() {
  return (
    <Section
      number="—"
      eyebrow="Simulasi Kredit"
      title="Hitung Perkiraan Angsuran Anda"
      description="Simulasi cepat sebelum berbicara dengan sales. Hasil ini adalah estimasi, bukan persetujuan kredit."
      className="border-t border-white/10 bg-charcoal-900/20"
    >
      <CalculatorForm compact />
    </Section>
  );
}
