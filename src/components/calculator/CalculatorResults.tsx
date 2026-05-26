'use client';

import type { CalculatorModule } from '@/types/calculator';
import { formatResult, formatCompact } from '@/lib/format';

interface CalculatorResultsProps {
  results: CalculatorModule['results'];
  values: Record<string, number>;
  currency: string;
}

export function CalculatorResults({ results, values, currency }: CalculatorResultsProps) {
  if (results.length === 0) return null;

  const [hero, ...secondary] = results;

  const secondaryCols =
    secondary.length === 0 ? '' :
    secondary.length <= 2 ? 'grid-cols-2' :
    secondary.length === 3 ? 'grid-cols-3' :
    'grid-cols-2 sm:grid-cols-4';

  return (
    <div className="bg-[#EEF2FF] rounded-xl p-6 sm:p-8">
      {/* Hero result — dominant number in DM Serif Display */}
      <div>
        <p className="text-xs font-semibold text-brand-primary uppercase tracking-widest mb-3">
          {hero.label}
        </p>
        <p className="font-serif text-5xl sm:text-6xl text-brand-primary tabular-nums leading-none">
          {formatResult(values[hero.name] ?? 0, hero.format, currency)}
        </p>
      </div>

      {/* Secondary results */}
      {secondary.length > 0 && (
        <div className={`grid ${secondaryCols} gap-x-6 gap-y-5 mt-7 pt-6 border-t border-[#C7D2FE]`}>
          {secondary.map((r) => (
            <div key={r.name}>
              <p className="text-xl sm:text-2xl font-semibold text-ink-primary tabular-nums leading-tight">
                {r.format === 'currency'
                  ? formatCompact(values[r.name] ?? 0, currency)
                  : formatResult(values[r.name] ?? 0, r.format, currency)}
              </p>
              <p className="text-xs text-ink-secondary mt-1.5">{r.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
