const CURRENCY_LOCALES: Record<string, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  AUD: 'en-AU',
  CAD: 'en-CA',
  SGD: 'en-SG',
  AED: 'ar-AE',
  JPY: 'ja-JP',
};

export function formatCurrency(value: number, currency = 'INR'): string {
  const locale = CURRENCY_LOCALES[currency] ?? 'en-IN';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatYears(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);
  if (months === 0) return `${years}y`;
  if (years === 0) return `${months}m`;
  return `${years}y ${months}m`;
}

export function formatResult(
  value: number,
  format: 'currency' | 'percent' | 'number' | 'years',
  currency = 'INR'
): string {
  switch (format) {
    case 'currency': return formatCurrency(value, currency);
    case 'percent':  return formatPercent(value);
    case 'years':    return formatYears(value);
    case 'number':   return formatNumber(value);
  }
}

// Compact labels for chart axes and summary callouts (e.g. ₹12.5L, ₹2.1Cr)
export function formatCompact(value: number, currency = 'INR'): string {
  const symbol = getCurrencySymbol(currency);
  if (value >= 1e7) return `${symbol}${(value / 1e7).toFixed(2)}Cr`;
  if (value >= 1e5) return `${symbol}${(value / 1e5).toFixed(2)}L`;
  if (value >= 1e3) return `${symbol}${(value / 1e3).toFixed(1)}K`;
  return `${symbol}${value.toFixed(0)}`;
}

export function getCurrencySymbol(currency = 'INR'): string {
  return new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 })
    .formatToParts(0)
    .find(p => p.type === 'currency')?.value ?? currency;
}
