import type { FinancePackage } from '@/types';

/**
 * Leasing reference data. Only entries transcribed directly from a source
 * document (e.g. a leasing partner's official quotation screenshot) belong
 * here, each carrying `verifiedFromScreenshot` + `source`.
 *
 * The three Maybank Finance entries below come from a quotation screenshot
 * supplied by the site owner. They are NOT yet linked to a specific
 * Mitsubishi model/variant — `needsVehicleMapping: true` keeps them out of
 * per-vehicle calculators until an admin confirms which vehicle they apply
 * to (see DATA_UPDATE_GUIDE.md). They remain usable in the flexible/manual
 * "reference package" picker on the financing page.
 */
export const financePackages: FinancePackage[] = [
  {
    id: 'maybank-ref-36',
    vehicleSlug: null,
    variantId: null,
    leasing: 'Maybank Finance',
    scheme: 'ADDM',
    otr: 285_500_000,
    tenorMonths: 36,
    installmentCount: 35,
    totalFirstPayment: 82_463_000,
    monthlyInstallment: 7_178_000,
    effectiveDate: '2026-07-16',
    region: 'Samarinda',
    notes: 'Data referensi dari dokumen simulasi Maybank Finance. Belum dipetakan ke model tertentu.',
    verified: false,
    needsVehicleMapping: true,
    verifiedFromScreenshot: true,
    source: 'Screenshot simulasi Maybank Finance (diberikan pemilik situs)',
  },
  {
    id: 'maybank-ref-48',
    vehicleSlug: null,
    variantId: null,
    leasing: 'Maybank Finance',
    scheme: 'ADDM',
    otr: 285_500_000,
    tenorMonths: 48,
    installmentCount: 47,
    totalFirstPayment: 82_874_000,
    monthlyInstallment: 5_692_000,
    effectiveDate: '2026-07-16',
    region: 'Samarinda',
    notes: 'Data referensi dari dokumen simulasi Maybank Finance. Belum dipetakan ke model tertentu.',
    verified: false,
    needsVehicleMapping: true,
    verifiedFromScreenshot: true,
    source: 'Screenshot simulasi Maybank Finance (diberikan pemilik situs)',
  },
  {
    id: 'maybank-ref-60',
    vehicleSlug: null,
    variantId: null,
    leasing: 'Maybank Finance',
    scheme: 'ADDM',
    otr: 285_500_000,
    tenorMonths: 60,
    installmentCount: 59,
    totalFirstPayment: 83_812_000,
    monthlyInstallment: 4_793_000,
    effectiveDate: '2026-07-16',
    region: 'Samarinda',
    notes: 'Data referensi dari dokumen simulasi Maybank Finance. Belum dipetakan ke model tertentu.',
    verified: false,
    needsVehicleMapping: true,
    verifiedFromScreenshot: true,
    source: 'Screenshot simulasi Maybank Finance (diberikan pemilik situs)',
  },
];

/**
 * Mandiri Utama Finance packages were referenced via a low-resolution
 * screenshot that could not be read reliably. Rather than guess numbers,
 * this list starts empty — use the admin CSV import flow
 * (/admin/dashboard) to add verified rows. See
 * public/finance-references/leasing-import-template.csv for the format.
 */
export const draftLeasingImports: FinancePackage[] = [];

export function getPackagesForVehicle(slug: string): FinancePackage[] {
  return financePackages.filter((p) => p.vehicleSlug === slug && p.verified);
}

export function getUnmappedReferencePackages(): FinancePackage[] {
  return financePackages.filter((p) => p.needsVehicleMapping);
}

export const leasingPartners = [
  'Maybank Finance',
  'Mandiri Utama Finance',
  'BCA Finance',
  'Mitsubishi UFJ Lease (MUF)',
  'Adira Finance',
] as const;
