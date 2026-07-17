export interface Promotion {
  id: string;
  title: string;
  description: string;
  vehicleSlug?: string;
  validFrom: string;
  validUntil?: string;
  status: 'draft' | 'verified';
}

/**
 * No promo has been confirmed yet. Add entries here once the sales team
 * supplies verified promo copy and validity dates — see DATA_UPDATE_GUIDE.md.
 * The /promo page renders an honest empty state instead of placeholder text
 * when this array is empty.
 */
export const promotions: Promotion[] = [];
