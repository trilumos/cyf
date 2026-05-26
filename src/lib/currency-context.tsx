'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const CACHE_KEY = 'cyf_currency_pref';

const LOCALE_TO_CURRENCY: Record<string, string> = {
  'en-US': 'USD', 'en-GB': 'GBP', 'en-AU': 'AUD', 'en-CA': 'CAD',
  'en-SG': 'SGD', 'en-AE': 'AED', 'en-IN': 'INR',
  'de': 'EUR', 'fr': 'EUR', 'es': 'EUR', 'it': 'EUR', 'nl': 'EUR',
};

const TZ_CURRENCY: [string, string][] = [
  ['Asia/Kolkata', 'INR'],
  ['Asia/Calcutta', 'INR'],
  ['Asia/Singapore', 'SGD'],
  ['Asia/Dubai', 'AED'],
  ['Europe/London', 'GBP'],
  ['America/Toronto', 'CAD'],
  ['America/Vancouver', 'CAD'],
  ['America/Winnipeg', 'CAD'],
  ['Australia/', 'AUD'],
  ['Europe/', 'EUR'],
  ['America/', 'USD'],
];

function detectCurrency(): string {
  // 1. Saved preference
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) return JSON.parse(saved).currency;
  } catch { /* ignore */ }

  // 2. Timezone heuristic (reliable, no network)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      for (const [prefix, code] of TZ_CURRENCY) {
        if (tz.startsWith(prefix)) return code;
      }
    }
  } catch { /* ignore */ }

  // 3. Browser locale fallback
  const locale = navigator.language ?? 'en-IN';
  return LOCALE_TO_CURRENCY[locale] ?? LOCALE_TO_CURRENCY[locale.split('-')[0]] ?? 'INR';
}

const SUPPORTED_CURRENCIES = [
  { code: 'INR', label: 'INR — Indian Rupee',      symbol: '₹' },
  { code: 'USD', label: 'USD — US Dollar',          symbol: '$' },
  { code: 'EUR', label: 'EUR — Euro',               symbol: '€' },
  { code: 'GBP', label: 'GBP — British Pound',      symbol: '£' },
  { code: 'AED', label: 'AED — UAE Dirham',         symbol: 'د.إ' },
  { code: 'SGD', label: 'SGD — Singapore Dollar',   symbol: 'S$' },
  { code: 'AUD', label: 'AUD — Australian Dollar',  symbol: 'A$' },
  { code: 'CAD', label: 'CAD — Canadian Dollar',    symbol: 'C$' },
];

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]['code'];

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: typeof SUPPORTED_CURRENCIES;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'INR',
  setCurrency: () => {},
  currencies: SUPPORTED_CURRENCIES,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');

  // Detect currency on mount (localStorage → timezone → locale → INR)
  useEffect(() => {
    const code = detectCurrency();
    const supported = SUPPORTED_CURRENCIES.some((c) => c.code === code);
    setCurrencyState((supported ? code : 'INR') as CurrencyCode);
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ currency: code, savedAt: Date.now() }));
    } catch { /* ignore */ }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies: SUPPORTED_CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
