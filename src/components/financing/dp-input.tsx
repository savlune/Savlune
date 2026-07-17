'use client';

import clsx from 'clsx';
import { DP_PRESETS_PERCENT } from '@/lib/financing/calculator';
import { formatNumber, parseRupiahInput } from '@/lib/formatters/currency';

export function DpInput({
  otr,
  dpPercent,
  onChangePercent,
  onChangeAmount,
}: {
  otr: number;
  dpPercent: number;
  onChangePercent: (percent: number) => void;
  onChangeAmount: (amount: number) => void;
}) {
  const dpAmount = Math.round((otr * dpPercent) / 100);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest2 text-white/40">DP (Down Payment)</label>
        <span className="text-sm text-savlune-gold-light">{dpPercent.toFixed(1)}%</span>
      </div>

      <input
        type="range"
        min={5}
        max={70}
        step={0.5}
        value={dpPercent}
        onChange={(e) => onChangePercent(Number(e.target.value))}
        className="mt-3 w-full accent-savlune-gold"
        aria-label="Persentase DP"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {DP_PRESETS_PERCENT.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChangePercent(preset)}
            className={clsx(
              'border px-3 py-1.5 text-xs transition-colors',
              Math.abs(dpPercent - preset) < 0.01
                ? 'border-savlune-gold text-savlune-gold-light'
                : 'border-white/15 text-white/50 hover:border-white/35',
            )}
          >
            {preset}%
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border border-white/15 px-3 py-2.5">
        <span className="text-sm text-white/40">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={otr > 0 ? formatNumber(dpAmount) : ''}
          onChange={(e) => onChangeAmount(parseRupiahInput(e.target.value))}
          placeholder="Masukkan nominal DP"
          className="w-full bg-transparent text-sm text-offwhite outline-none"
          aria-label="Nominal DP"
        />
      </div>
    </div>
  );
}
