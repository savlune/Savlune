import { z } from 'zod';

export const leadTypeSchema = z.enum([
  'consultation',
  'test-drive',
  'trade-in',
  'financing-simulation',
  'general',
]);

export const leadFormSchema = z.object({
  type: leadTypeSchema,
  name: z.string().trim().min(3, 'Nama minimal 3 karakter').max(100),
  phone: z
    .string()
    .trim()
    .min(9, 'Nomor telepon tidak valid')
    .max(15, 'Nomor telepon tidak valid')
    .regex(/^[0-9+\s-]+$/, 'Gunakan angka saja'),
  email: z.string().trim().email('Email tidak valid').optional().or(z.literal('')),
  city: z.string().trim().min(2, 'Kota wajib diisi').max(80),
  vehicleSlug: z.string().optional(),
  variantId: z.string().optional(),
  colorId: z.string().optional(),
  need: z.string().optional(),
  message: z.string().max(1000).optional(),
  preferredDate: z.string().optional(),
  simulationSummary: z.string().optional(),
  source: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
