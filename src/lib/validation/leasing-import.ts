import { z } from 'zod';

/**
 * Schema for the admin CSV leasing-package import (Mode A data entry).
 * Matches the header row documented in DATA_UPDATE_GUIDE.md and
 * public/finance-references/leasing-import-template.csv.
 */
export const leasingImportRowSchema = z.object({
  vehicle_slug: z.string().min(1, 'vehicle_slug wajib diisi'),
  variant_id: z.string().optional(),
  leasing: z.string().min(1, 'leasing wajib diisi'),
  scheme: z.enum(['ADDM', 'ADDB']),
  otr: z.coerce.number().positive('otr harus lebih dari 0'),
  tenor_months: z.coerce.number().int().positive(),
  installment_count: z.coerce.number().int().positive(),
  total_first_payment: z.coerce.number().nonnegative(),
  monthly_installment: z.coerce.number().positive(),
  region: z.string().min(1, 'region wajib diisi'),
  valid_from: z.string().min(1, 'valid_from wajib diisi'),
  valid_until: z.string().optional(),
  verified: z.coerce.boolean().optional().default(false),
  notes: z.string().optional(),
});

export type LeasingImportRow = z.infer<typeof leasingImportRowSchema>;

export const LEASING_IMPORT_HEADERS = [
  'vehicle_slug',
  'variant_id',
  'leasing',
  'scheme',
  'otr',
  'tenor_months',
  'installment_count',
  'total_first_payment',
  'monthly_installment',
  'region',
  'valid_from',
  'valid_until',
  'verified',
  'notes',
] as const;

export function parseLeasingCsv(csvText: string): {
  rows: LeasingImportRow[];
  errors: { line: number; message: string }[];
} {
  const lines = csvText.trim().split(/\r?\n/);
  const rows: LeasingImportRow[] = [];
  const errors: { line: number; message: string }[] = [];
  if (lines.length === 0) return { rows, errors };

  const header = (lines[0] ?? '').split(',').map((h) => h.trim());
  const missing = LEASING_IMPORT_HEADERS.filter((h) => !header.includes(h));
  if (missing.length > 0) {
    errors.push({ line: 1, message: `Kolom hilang: ${missing.join(', ')}` });
    return { rows, errors };
  }

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine || !rawLine.trim()) continue;
    const cells = rawLine.split(',').map((c) => c.trim());
    const record: Record<string, string> = {};
    header.forEach((key, idx) => {
      record[key] = cells[idx] ?? '';
    });

    const parsed = leasingImportRowSchema.safeParse(record);
    if (!parsed.success) {
      errors.push({
        line: i + 1,
        message: parsed.error.issues.map((iss) => iss.message).join('; '),
      });
      continue;
    }
    rows.push(parsed.data);
  }

  return { rows, errors };
}
