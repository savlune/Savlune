'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { CalculatorForm } from './calculator-form';
import { ReferencePackages } from './reference-packages';

const TABS = [
  { id: 'estimate', label: 'Estimasi Fleksibel' },
  { id: 'package', label: 'Paket Referensi Leasing' },
] as const;

export function FinancingWorkspace() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('estimate');

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={clsx(
              'border-b-2 px-1 pb-4 text-sm transition-colors',
              tab === t.id
                ? 'border-savlune-gold text-savlune-gold-light'
                : 'border-transparent text-white/50 hover:text-white/80',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'estimate' ? <CalculatorForm /> : <ReferencePackages />}
    </div>
  );
}
