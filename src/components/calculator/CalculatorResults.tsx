'use client';

import type { CalculatorModule } from '@/types/calculator';
import { formatResult } from '@/lib/format';

interface CalculatorResultsProps {
  results: CalculatorModule['results'];
  values: Record<string, number>;
  currency: string;
}

export function CalculatorResults({ results, values, currency }: CalculatorResultsProps) {
  const cols =
    results.length <= 2 ? 'grid-cols-2' :
    results.length === 3 ? 'grid-cols-3' :
    'grid-cols-2 sm:grid-cols-4';

  return (
    <div className="bg-[#EEF2FF] rounded-xl p-6">
      <div className={`grid gap-4 ${cols}`}>
        {results.map((r) => (
          <div key={r.name} className="text-center">
            <div className="text-xl font-bold text-brand-primary tabular-nums leading-tight">
              {formatResult(values[r.name] ?? 0, r.format, currency)}
            </div>
            <div className="text-xs text-ink-secondary mt-1 leading-snug">{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
