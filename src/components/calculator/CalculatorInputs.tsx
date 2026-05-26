'use client';

import type { CalculatorModule } from '@/types/calculator';
import { formatCurrency, formatPercent, formatNumber, formatCompact } from '@/lib/format';

interface CalculatorInputsProps {
  inputs: CalculatorModule['inputs'];
  values: Record<string, number | string>;
  onChange: (name: string, value: number | string) => void;
  currency: string;
}

function formatDisplayValue(
  value: number | string,
  type: CalculatorModule['inputs'][number]['type'],
  currency: string,
): string {
  const n = Number(value);
  switch (type) {
    case 'currency': return formatCurrency(n, currency);
    case 'percent':  return formatPercent(n);
    case 'years':    return `${n} ${n === 1 ? 'year' : 'years'}`;
    case 'months':   return `${n} month${n === 1 ? '' : 's'}`;
    case 'number':   return formatNumber(n);
    case 'select':   return String(value);
  }
}

function formatAxisLabel(
  n: number,
  type: CalculatorModule['inputs'][number]['type'],
  currency: string,
): string {
  switch (type) {
    case 'currency': return formatCompact(n, currency);
    case 'percent':  return `${n}%`;
    case 'years':    return `${n}y`;
    case 'months':   return `${n}m`;
    default:         return formatNumber(n);
  }
}

export function CalculatorInputs({ inputs, values, onChange, currency }: CalculatorInputsProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
      <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Enter details</h2>

      {inputs.map((input) => {
        const raw = values[input.name];
        const n = Number(raw);

        if (input.type === 'select') {
          return (
            <div key={input.name}>
              <label htmlFor={input.name} className="block text-sm text-ink-secondary mb-1.5">
                {input.label}
              </label>
              <select
                id={input.name}
                value={String(raw)}
                onChange={(e) => onChange(input.name, e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-ink-primary bg-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              >
                {input.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          );
        }

        const min = input.min ?? 0;
        const max = input.max ?? 100;
        const step = input.step ?? 1;
        const pct = Math.min(100, Math.max(0, Math.round(((n - min) / (max - min)) * 100)));

        return (
          <div key={input.name}>
            <div className="flex items-baseline justify-between mb-2">
              <label htmlFor={input.name} className="text-sm text-ink-secondary">
                {input.label}
              </label>
              <span className="text-sm font-semibold text-ink-primary tabular-nums">
                {formatDisplayValue(raw, input.type, currency)}
              </span>
            </div>
            <input
              id={input.name}
              type="range"
              min={min}
              max={max}
              step={step}
              value={n}
              onChange={(e) => onChange(input.name, Number(e.target.value))}
              className="hero-slider"
              style={{
                background: `linear-gradient(to right, #1B4FD8 ${pct}%, #E5E7EB ${pct}%)`,
              }}
              aria-label={input.label}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={n}
              aria-valuetext={formatDisplayValue(raw, input.type, currency)}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-ink-muted">{formatAxisLabel(min, input.type, currency)}</span>
              <span className="text-xs text-ink-muted">{formatAxisLabel(max, input.type, currency)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
