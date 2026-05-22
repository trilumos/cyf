'use client';

import { useRef, useState, useEffect } from 'react';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { useCurrency, type CurrencyCode } from '@/lib/currency-context';

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const selected = currencies.find((c) => c.code === currency) ?? currencies[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Currency: ${selected.code}`}
        className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-ink-tertiary hover:text-ink-secondary border border-border rounded-md hover:border-border-strong transition-colors bg-surface"
      >
        <span>{selected.symbol}</span>
        <span>{selected.code}</span>
        <IconChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select currency"
          className="absolute right-0 top-full mt-1 w-52 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50"
        >
          {currencies.map((c) => (
            <button
              key={c.code}
              role="option"
              aria-selected={c.code === currency}
              onClick={() => { setCurrency(c.code as CurrencyCode); setOpen(false); }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left hover:bg-brand-primaryLight transition-colors"
            >
              <span className={c.code === currency ? 'text-brand-primary font-medium' : 'text-ink-secondary'}>
                {c.label}
              </span>
              {c.code === currency && <IconCheck size={13} className="text-brand-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
