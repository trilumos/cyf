'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const CACHE_KEY = 'cyf_currency_pref';

const LOCALE_TO_CURRENCY: Record<string, string> = {
  'en-US': 'USD', 'en-GB': 'GBP', 'en-AU': 'AUD', 'en-CA': 'CAD',
  'en-SG': 'SGD', 'en-AE': 'AED', 'en-IN': 'INR',
  'de': 'EUR', 'fr': 'EUR', 'es': 'EUR', 'it': 'EUR', 'nl': 'EUR',
};

async function detectCurrency(): Promise<string> {
  // 1. Saved preference takes priority
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) return JSON.parse(saved).currency;
  } catch { /* ignore */ }

  // 2. Geo-detect via ipapi.co (free, no key required)
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    if (data?.currency) return data.currency;
  } catch { /* ignore — network or timeout */ }

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

  // Detect currency on mount (localStorage → geo → locale → INR)
  useEffect(() => {
    detectCurrency().then((code) => {
      const supported = SUPPORTED_CURRENCIES.some((c) => c.code === code);
      setCurrencyState((supported ? code : 'INR') as CurrencyCode);
    }).catch(() => { /* keep default INR */ });
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
