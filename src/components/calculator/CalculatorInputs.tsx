'use client';

import { useState, useEffect } from 'react';
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
  const n = Number(value ?? 0);
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

interface InputRowProps {
  input: CalculatorModule['inputs'][number];
  value: number | string;
  onChange: (name: string, value: number | string) => void;
  currency: string;
}

function InputRow({ input, value, onChange, currency }: InputRowProps) {
  const n = Number(value ?? 0);
  const min = input.min ?? 0;
  const max = input.max ?? 100;
  const step = input.step ?? 1;
  const pct = Math.min(100, Math.max(0, ((n - min) / (max - min)) * 100));

  const [localNum, setLocalNum] = useState(String(n));

  useEffect(() => {
    setLocalNum(String(n));
  }, [n]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(input.name, Number(e.target.value));
  };

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalNum(e.target.value);
  };

  const handleNumBlur = () => {
    const parsed = parseFloat(localNum);
    if (!isNaN(parsed) && parsed > 0) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(input.name, clamped);
    } else {
      setLocalNum(String(n));
    }
  };

  const handleNumKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={input.name} className="text-sm font-medium text-ink-secondary flex-shrink-0">
          {input.label}
        </label>
        <span className="text-sm font-semibold text-ink-primary tabular-nums text-right">
          {formatDisplayValue(value, input.type, currency)}
        </span>
      </div>
      <input
        id={input.name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={n}
        onChange={handleSliderChange}
        className="hero-slider w-full"
        style={{ background: `linear-gradient(to right, #1B4FD8 ${pct}%, #E5E7EB ${pct}%)` }}
        aria-label={input.label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={n}
        aria-valuetext={formatDisplayValue(value, input.type, currency)}
      />
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-ink-muted">{formatAxisLabel(min, input.type, currency)}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-ink-muted">or type:</span>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={localNum}
            onChange={handleNumChange}
            onBlur={handleNumBlur}
            onKeyDown={handleNumKeyDown}
            className="w-28 text-right text-sm font-semibold text-ink-primary tabular-nums bg-transparent border-b border-border pb-0.5 focus:border-brand-primary focus:outline-none"
            aria-label={`${input.label} — type exact value`}
          />
        </div>
      </div>
    </div>
  );
}

export function CalculatorInputs({ inputs, values, onChange, currency }: CalculatorInputsProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
      <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-widest">Enter details</h2>

      {inputs.map((input) => {
        if (input.type === 'select') {
          return (
            <div key={input.name}>
              <label htmlFor={input.name} className="block text-sm font-medium text-ink-secondary mb-1.5">
                {input.label}
              </label>
              <select
                id={input.name}
                value={String(values[input.name])}
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

        return (
          <InputRow
            key={input.name}
            input={input}
            value={values[input.name]}
            onChange={onChange}
            currency={currency}
          />
        );
      })}
    </div>
  );
}
