'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const CACHE_KEY = 'cyf_currency_pref';

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

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const { currency: saved_code } = JSON.parse(saved);
        if (SUPPORTED_CURRENCIES.some((c) => c.code === saved_code)) {
          setCurrencyState(saved_code);
        }
      }
    } catch { /* ignore */ }
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
