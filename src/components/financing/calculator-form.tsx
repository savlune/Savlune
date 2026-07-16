'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { vehicles } from '@/data/vehicles';
import { leasingPartners } from '@/data/finance-packages';
import { TENOR_OPTIONS_MONTHS, calculateFlexibleEstimate } from '@/lib/financing/calculator';
import type { FinanceCalculationResult, PaymentScheme, UsageType } from '@/types';
import { formatNumber, parseRupiahInput } from '@/lib/formatters/currency';
import { DpInput } from './dp-input';
import { ResultSummary } from './result-summary';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'savlune-financing-simulation';

interface CalculatorFormProps {
  compact?: boolean;
  defaultVehicleSlug?: string;
}

export function CalculatorForm({ compact = false, defaultVehicleSlug }: CalculatorFormProps) {
  const [vehicleSlug, setVehicleSlug] = useState(defaultVehicleSlug ?? vehicles[0]!.slug);
  const [otr, setOtr] = useState(0);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenorMonths, setTenorMonths] = useState<(typeof TENOR_OPTIONS_MONTHS)[number]>(36);
  const [leasing, setLeasing] = useState<string>(leasingPartners[0]);
  const [scheme, setScheme] = useState<PaymentScheme>('ADDM');
  const [interestRate, setInterestRate] = useState(5);
  const [adminFee, setAdminFee] = useState(0);
  const [provision, setProvision] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [usageType, setUsageType] = useState<UsageType>('personal');
  const [result, setResult] = useState<FinanceCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vehicle = vehicles.find((v) => v.slug === vehicleSlug);

  const handleCalculate = () => {
    if (otr <= 0) {
      setError('Masukkan harga OTR kendaraan terlebih dahulu.');
      setResult(null);
      return;
    }
    setError(null);
    const dpAmount = Math.round((otr * dpPercent) / 100);
    const calculation = calculateFlexibleEstimate({
      otr,
      dpAmount,
      tenorMonths,
      interestRatePerYear: interestRate,
      adminFee,
      provision,
      insurance,
      scheme,
      usageType,
    });
    setResult(calculation);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ vehicleSlug, leasing, result: calculation, savedAt: new Date().toISOString() }),
      );
    }
  };

  const handleReset = () => {
    setOtr(0);
    setDpPercent(20);
    setTenorMonths(36);
    setInterestRate(5);
    setAdminFee(0);
    setProvision(0);
    setInsurance(0);
    setResult(null);
    setError(null);
  };

  useEffect(() => {
    if (compact || typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.result) setResult(parsed.result);
      if (parsed.vehicleSlug) setVehicleSlug(parsed.vehicleSlug);
      if (parsed.leasing) setLeasing(parsed.leasing);
    } catch {
      // ignore corrupt local storage
    }
  }, [compact]);

  return (
    <div className={clsx('grid gap-8', !compact && 'lg:grid-cols-[1fr_1fr]')}>
      <div className="border border-white/10 bg-charcoal-900/40 p-6 md:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-widest2 text-white/40">Model</label>
            <select
              value={vehicleSlug}
              onChange={(e) => setVehicleSlug(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
            >
              {vehicles.map((v) => (
                <option key={v.slug} value={v.slug} className="bg-charcoal-900">
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest2 text-white/40">Leasing</label>
            <select
              value={leasing}
              onChange={(e) => setLeasing(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
            >
              {leasingPartners.map((partner) => (
                <option key={partner} value={partner} className="bg-charcoal-900">
                  {partner}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-widest2 text-white/40">
              Harga OTR Samarinda
            </label>
            <div className="mt-2 flex items-center gap-2 border border-white/15 px-3 py-2.5">
              <span className="text-sm text-white/40">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={otr > 0 ? formatNumber(otr) : ''}
                onChange={(e) => setOtr(parseRupiahInput(e.target.value))}
                placeholder="Isi sesuai info sales — belum terverifikasi otomatis"
                className="w-full bg-transparent text-sm text-offwhite outline-none placeholder:text-white/25"
              />
            </div>
            {vehicle && vehicle.startingPrice.status !== 'verified' && (
              <p className="mt-1.5 text-xs text-white/35">
                Harga {vehicle.name} belum terverifikasi di sistem — hubungi sales untuk angka terbaru.
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <DpInput
              otr={otr}
              dpPercent={dpPercent}
              onChangePercent={setDpPercent}
              onChangeAmount={(amount) => setDpPercent(otr > 0 ? (amount / otr) * 100 : 0)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-widest2 text-white/40">Tenor</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TENOR_OPTIONS_MONTHS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenorMonths(t)}
                  className={clsx(
                    'border px-4 py-2 text-sm transition-colors',
                    tenorMonths === t
                      ? 'border-savlune-gold text-savlune-gold-light'
                      : 'border-white/15 text-white/50 hover:border-white/35',
                  )}
                >
                  {t} bln
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest2 text-white/40">Skema</label>
            <div className="mt-2 flex gap-2">
              {(['ADDM', 'ADDB'] as PaymentScheme[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScheme(s)}
                  className={clsx(
                    'flex-1 border px-4 py-2.5 text-sm transition-colors',
                    scheme === s
                      ? 'border-savlune-gold text-savlune-gold-light'
                      : 'border-white/15 text-white/50 hover:border-white/35',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest2 text-white/40">Penggunaan</label>
            <div className="mt-2 flex gap-2">
              {(
                [
                  ['personal', 'Pribadi'],
                  ['company', 'Perusahaan'],
                ] as [UsageType, string][]
              ).map(([value, labelText]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setUsageType(value)}
                  className={clsx(
                    'flex-1 border px-4 py-2.5 text-sm transition-colors',
                    usageType === value
                      ? 'border-savlune-gold text-savlune-gold-light'
                      : 'border-white/15 text-white/50 hover:border-white/35',
                  )}
                >
                  {labelText}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest2 text-white/40">
              Suku bunga estimasi (%/tahun)
            </label>
            <input
              type="number"
              min={0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
            />
            <p className="mt-1.5 text-xs text-white/35">Sesuaikan dengan info leasing terbaru dari sales.</p>
          </div>

          {!compact && (
            <>
              <div>
                <label className="text-xs uppercase tracking-widest2 text-white/40">Biaya admin</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={adminFee > 0 ? formatNumber(adminFee) : ''}
                  onChange={(e) => setAdminFee(parseRupiahInput(e.target.value))}
                  className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
                  placeholder="Rp"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest2 text-white/40">Provisi</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={provision > 0 ? formatNumber(provision) : ''}
                  onChange={(e) => setProvision(parseRupiahInput(e.target.value))}
                  className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
                  placeholder="Rp"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest2 text-white/40">Asuransi</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={insurance > 0 ? formatNumber(insurance) : ''}
                  onChange={(e) => setInsurance(parseRupiahInput(e.target.value))}
                  className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-offwhite outline-none focus:border-savlune-gold"
                  placeholder="Rp"
                />
              </div>
            </>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-mitsubishi-red">{error}</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={handleCalculate}>
            Hitung Simulasi
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          {compact && (
            <Link
              href="/financing"
              className="ml-auto self-center text-sm text-savlune-gold-light hover:underline"
            >
              Lihat Simulasi Lengkap →
            </Link>
          )}
        </div>
      </div>

      {result ? (
        <ResultSummary result={result} vehicleName={vehicle?.name} />
      ) : (
        <div className="flex items-center justify-center border border-dashed border-white/15 p-10 text-center text-sm text-white/35">
          Isi harga OTR dan klik &ldquo;Hitung Simulasi&rdquo; untuk melihat estimasi angsuran.
        </div>
      )}
    </div>
  );
}
