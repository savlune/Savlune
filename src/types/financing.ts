export type PaymentScheme = 'ADDM' | 'ADDB';

/**
 * Mode A — an officially quoted leasing package entered by admin/staff.
 * Every numeric field here comes from a real leasing quotation, never computed.
 */
export interface FinancePackage {
  id: string;
  vehicleSlug: string | null;
  variantId: string | null;
  leasing: string;
  scheme: PaymentScheme;
  otr: number;
  tenorMonths: number;
  installmentCount: number;
  totalFirstPayment: number;
  monthlyInstallment: number;
  dpMurni?: number;
  adminFee?: number;
  insurance?: number;
  provision?: number;
  effectiveDate: string;
  expiryDate?: string;
  region: string;
  notes?: string;
  verified: boolean;
  needsVehicleMapping?: boolean;
  verifiedFromScreenshot?: boolean;
  source?: string;
}

export type UsageType = 'personal' | 'company';

export interface FlexibleEstimateInput {
  otr: number;
  promoPrice?: number;
  dpAmount?: number;
  dpPercent?: number;
  tenorMonths: number;
  interestRatePerYear: number;
  adminFee: number;
  provision: number;
  insurance: number;
  scheme: PaymentScheme;
  usageType: UsageType;
}

export interface FinanceCalculationResult {
  vehiclePrice: number;
  dpAmount: number;
  dpPercent: number;
  principal: number;
  tenorMonths: number;
  installmentCount: number;
  monthlyInstallment: number;
  firstInstallment: number;
  additionalFees: number;
  totalFirstPayment: number;
  estimatedTotalPayment: number;
  differenceVsCash: number;
  simulationDate: string;
  packageValidUntil?: string;
  scheme: PaymentScheme;
  leasing?: string;
  mode: 'package' | 'estimate';
  disclaimer: string;
}
