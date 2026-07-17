import { describe, expect, it } from 'vitest';
import { calculateFlexibleEstimate, calculateFromPackage } from './calculator';
import type { FinancePackage } from '@/types';

describe('calculateFlexibleEstimate', () => {
  it('computes ADDM installments with one payment collected upfront', () => {
    const result = calculateFlexibleEstimate({
      otr: 285_500_000,
      dpAmount: 57_100_000,
      tenorMonths: 36,
      interestRatePerYear: 5,
      adminFee: 0,
      provision: 0,
      insurance: 0,
      scheme: 'ADDM',
      usageType: 'personal',
    });

    expect(result.installmentCount).toBe(35);
    expect(result.dpAmount).toBe(57_100_000);
    expect(result.principal).toBe(285_500_000 - 57_100_000);
    expect(result.firstInstallment).toBe(result.monthlyInstallment);
    expect(result.totalFirstPayment).toBe(result.dpAmount + result.firstInstallment);
    expect(result.mode).toBe('estimate');
    expect(result.disclaimer).toMatch(/Estimasi, bukan persetujuan kredit/);
  });

  it('computes ADDB installments with no upfront installment', () => {
    const result = calculateFlexibleEstimate({
      otr: 200_000_000,
      dpPercent: 20,
      tenorMonths: 24,
      interestRatePerYear: 6,
      adminFee: 500_000,
      provision: 250_000,
      insurance: 1_000_000,
      scheme: 'ADDB',
      usageType: 'company',
    });

    expect(result.installmentCount).toBe(24);
    expect(result.firstInstallment).toBe(0);
    expect(result.dpAmount).toBeCloseTo(40_000_000, 0);
    expect(result.additionalFees).toBe(1_750_000);
    expect(result.totalFirstPayment).toBe(result.dpAmount + result.additionalFees);
  });

  it('uses promo price over OTR when provided', () => {
    const result = calculateFlexibleEstimate({
      otr: 300_000_000,
      promoPrice: 285_000_000,
      dpPercent: 10,
      tenorMonths: 12,
      interestRatePerYear: 4,
      adminFee: 0,
      provision: 0,
      insurance: 0,
      scheme: 'ADDM',
      usageType: 'personal',
    });

    expect(result.vehiclePrice).toBe(285_000_000);
  });

  it('never produces a negative principal when DP exceeds price', () => {
    const result = calculateFlexibleEstimate({
      otr: 100_000_000,
      dpAmount: 150_000_000,
      tenorMonths: 12,
      interestRatePerYear: 5,
      adminFee: 0,
      provision: 0,
      insurance: 0,
      scheme: 'ADDM',
      usageType: 'personal',
    });

    expect(result.principal).toBe(0);
  });
});

describe('calculateFromPackage', () => {
  it('reproduces the verified Maybank Finance reference figures without recomputing them', () => {
    const pkg: FinancePackage = {
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
      verified: false,
      needsVehicleMapping: true,
      verifiedFromScreenshot: true,
    };

    const result = calculateFromPackage(pkg);

    expect(result.monthlyInstallment).toBe(7_178_000);
    expect(result.totalFirstPayment).toBe(82_463_000);
    expect(result.installmentCount).toBe(35);
    expect(result.mode).toBe('package');
    expect(result.estimatedTotalPayment).toBe(82_463_000 + 7_178_000 * 35);
  });
});
