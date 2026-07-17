import type { FinanceCalculationResult, FinancePackage, FlexibleEstimateInput } from '@/types';

const ESTIMATE_DISCLAIMER =
  'Estimasi, bukan persetujuan kredit. Angka final ditentukan oleh perusahaan pembiayaan setelah proses verifikasi.';
const PACKAGE_DISCLAIMER =
  'Simulasi berdasarkan paket leasing yang tercatat. Konfirmasikan ketersediaan dan syarat terbaru bersama sales dan pihak pembiayaan.';

function roundToThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

export const DP_PRESETS_PERCENT = [10, 15, 20, 25, 30] as const;
export const TENOR_OPTIONS_MONTHS = [12, 24, 36, 48, 60] as const;

/**
 * Mode B — flexible estimate using a flat-rate installment calculation,
 * the convention Indonesian auto leasing quotations are built on.
 * ADDM ("angsuran di muka") means the first installment is collected at
 * signing, alongside the DP, so only tenorMonths - 1 installments remain.
 */
export function calculateFlexibleEstimate(input: FlexibleEstimateInput): FinanceCalculationResult {
  const vehiclePrice = input.promoPrice && input.promoPrice > 0 ? input.promoPrice : input.otr;

  const dpFromPercent =
    input.dpPercent && input.dpPercent > 0 ? (vehiclePrice * input.dpPercent) / 100 : undefined;
  const dpAmount = input.dpAmount && input.dpAmount > 0 ? input.dpAmount : (dpFromPercent ?? 0);
  const dpPercent = vehiclePrice > 0 ? (dpAmount / vehiclePrice) * 100 : 0;

  const principal = Math.max(vehiclePrice - dpAmount, 0);
  const totalInterest = principal * (input.interestRatePerYear / 100) * (input.tenorMonths / 12);
  const totalPayable = principal + totalInterest;

  const monthlyInstallment = roundToThousand(totalPayable / input.tenorMonths);
  const installmentCount = input.scheme === 'ADDM' ? input.tenorMonths - 1 : input.tenorMonths;
  const firstInstallment = input.scheme === 'ADDM' ? monthlyInstallment : 0;

  const additionalFees = (input.adminFee || 0) + (input.provision || 0) + (input.insurance || 0);
  const totalFirstPayment = dpAmount + firstInstallment + additionalFees;
  const estimatedTotalPayment = dpAmount + totalPayable + additionalFees;
  const differenceVsCash = estimatedTotalPayment - vehiclePrice;

  return {
    vehiclePrice,
    dpAmount,
    dpPercent: Math.round(dpPercent * 10) / 10,
    principal,
    tenorMonths: input.tenorMonths,
    installmentCount,
    monthlyInstallment,
    firstInstallment,
    additionalFees,
    totalFirstPayment,
    estimatedTotalPayment,
    differenceVsCash,
    simulationDate: new Date().toISOString(),
    scheme: input.scheme,
    mode: 'estimate',
    disclaimer: ESTIMATE_DISCLAIMER,
  };
}

/**
 * Mode A — pass-through of a verified leasing package. No numbers here are
 * computed from scratch; they are reproduced from the source quotation and
 * only combined to present a full summary.
 */
export function calculateFromPackage(
  pkg: FinancePackage,
  dpAmountOverride?: number,
): FinanceCalculationResult {
  const dpAmount = dpAmountOverride ?? pkg.dpMurni ?? 0;
  const principal = pkg.otr - dpAmount;
  const remainingInstallments = pkg.monthlyInstallment * pkg.installmentCount;
  const estimatedTotalPayment = pkg.totalFirstPayment + remainingInstallments;
  const differenceVsCash = estimatedTotalPayment - pkg.otr;

  return {
    vehiclePrice: pkg.otr,
    dpAmount,
    dpPercent: pkg.otr > 0 ? Math.round((dpAmount / pkg.otr) * 1000) / 10 : 0,
    principal,
    tenorMonths: pkg.tenorMonths,
    installmentCount: pkg.installmentCount,
    monthlyInstallment: pkg.monthlyInstallment,
    firstInstallment: pkg.scheme === 'ADDM' ? pkg.monthlyInstallment : 0,
    additionalFees: (pkg.adminFee || 0) + (pkg.provision || 0) + (pkg.insurance || 0),
    totalFirstPayment: pkg.totalFirstPayment,
    estimatedTotalPayment,
    differenceVsCash,
    simulationDate: new Date().toISOString(),
    packageValidUntil: pkg.expiryDate,
    scheme: pkg.scheme,
    leasing: pkg.leasing,
    mode: 'package',
    disclaimer: PACKAGE_DISCLAIMER,
  };
}
