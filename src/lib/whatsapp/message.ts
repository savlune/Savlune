import { formatRupiah } from '@/lib/formatters/currency';
import type { FinanceCalculationResult } from '@/types';
import { salesConsultant } from '@/data/locations';

const DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || salesConsultant.whatsappNumber;

export interface SimulationWhatsAppInput {
  vehicleName?: string;
  colorName?: string;
  variantName?: string;
  result: FinanceCalculationResult;
}

export function buildSimulationMessage({
  vehicleName,
  colorName,
  variantName,
  result,
}: SimulationWhatsAppInput): string {
  const lines = [
    `Halo Kak ${salesConsultant.name}, saya tertarik dengan ${vehicleName ?? 'kendaraan Mitsubishi'}${
      variantName ? ` ${variantName}` : ''
    }.`,
    '',
    'Pilihan saya:',
    colorName ? `- Warna: ${colorName}` : undefined,
    `- Harga OTR: ${formatRupiah(result.vehiclePrice)}`,
    `- DP: ${formatRupiah(result.dpAmount)}`,
    `- Tenor: ${result.tenorMonths} bulan`,
    `- Estimasi angsuran: ${formatRupiah(result.monthlyInstallment)} per bulan`,
    result.leasing ? `- Leasing: ${result.leasing}` : undefined,
    `- Skema: ${result.scheme}`,
    '',
    'Saya ingin mendapatkan penawaran terbaik dan jadwal konsultasi.',
  ].filter((line): line is string => line !== undefined);

  return lines.join('\n');
}

export function buildGeneralMessage(text: string): string {
  return text;
}

export function buildWhatsAppUrl(message: string, number: string = DEFAULT_NUMBER): string {
  const cleanNumber = number.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
