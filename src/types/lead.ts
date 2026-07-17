export type LeadType =
  | 'consultation'
  | 'test-drive'
  | 'trade-in'
  | 'financing-simulation'
  | 'general';

export interface LeadPayload {
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  city: string;
  vehicleSlug?: string;
  variantId?: string;
  colorId?: string;
  need?: string;
  message?: string;
  preferredDate?: string;
  simulationSummary?: string;
  source?: string;
  createdAt: string;
}
