import { describe, expect, it } from 'vitest';
import { buildSimulationMessage, buildWhatsAppUrl } from './message';
import { calculateFlexibleEstimate } from '@/lib/financing/calculator';

describe('buildSimulationMessage', () => {
  it('includes vehicle, color, and calculation details', () => {
    const result = calculateFlexibleEstimate({
      otr: 285_500_000,
      dpPercent: 20,
      tenorMonths: 48,
      interestRatePerYear: 5,
      adminFee: 0,
      provision: 0,
      insurance: 0,
      scheme: 'ADDM',
      usageType: 'personal',
    });

    const message = buildSimulationMessage({
      vehicleName: 'Mitsubishi Destinator',
      variantName: 'Ultimate',
      colorName: 'Graphite Gray Metallic',
      result,
    });

    expect(message).toContain('Mitsubishi Destinator Ultimate');
    expect(message).toContain('Graphite Gray Metallic');
    expect(message).toContain('Tenor: 48 bulan');
    expect(message).toContain('Skema: ADDM');
  });
});

describe('buildWhatsAppUrl', () => {
  it('strips non-digit characters from the number and url-encodes the message', () => {
    const url = buildWhatsAppUrl('Halo, apa kabar?', '+62 821-5606-7048');
    expect(url).toBe('https://wa.me/6282156067048?text=Halo%2C%20apa%20kabar%3F');
  });
});
