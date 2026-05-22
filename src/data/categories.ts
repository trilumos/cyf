export interface Category {
  id: string;
  label: string;
  slug: string;
  count: number;
  description: string;
  color: string;   // hex — used ONLY as 3px left border in mega menu active state
  icon: string;    // Tabler icon component name
}

export const CATEGORIES: Category[] = [
  { id: "loans",      label: "Loan & EMI",       slug: "loan-emi",        count: 18, color: "#1B4FD8", icon: "IconCalculator",     description: "EMI, eligibility & prepayment for every loan type" },
  { id: "investment", label: "Investment",        slug: "investment",      count: 20, color: "#0EA5E9", icon: "IconTrendingUp",     description: "SIP, FD, PPF and all investment return tools" },
  { id: "tax",        label: "Tax",               slug: "tax",             count: 15, color: "#8B5CF6", icon: "IconReceiptTax",     description: "Income tax, TDS, HRA and capital gains" },
  { id: "retirement", label: "Retirement",        slug: "retirement",      count: 13, color: "#10B981", icon: "IconUmbrella",       description: "Plan your corpus, NPS, EPF and FIRE goals" },
  { id: "insurance",  label: "Insurance",         slug: "insurance",       count: 10, color: "#F59E0B", icon: "IconShieldCheck",    description: "Calculate the right cover for life, health & term" },
  { id: "realestate", label: "Real Estate",       slug: "real-estate",     count: 12, color: "#84CC16", icon: "IconHome",           description: "Home buying, rental yield & affordability tools" },
  { id: "business",   label: "Business",          slug: "business",        count: 12, color: "#EF4444", icon: "IconBriefcase",      description: "GST, break-even, ROI and business finance" },
  { id: "personal",   label: "Personal Finance",  slug: "personal-finance",count: 15, color: "#EC4899", icon: "IconWallet",         description: "Budget, salary, net worth & savings planners" },
  { id: "stocks",     label: "Stocks & Crypto",   slug: "stocks-crypto",   count: 10, color: "#F97316", icon: "IconChartCandle",    description: "P&L, brokerage and mutual fund calculators" },
  { id: "currency",   label: "Currency & FX",     slug: "currency-fx",     count: 8,  color: "#06B6D4", icon: "IconCurrencyDollar", description: "Live currency conversion for all major pairs" },
  { id: "economics",  label: "Economics",         slug: "economics",       count: 8,  color: "#6366F1", icon: "IconWorld",          description: "Inflation, purchasing power & macro tools" },
  { id: "math",       label: "Financial Math",    slug: "financial-math",  count: 10, color: "#0EA5E9", icon: "IconMathFunction",   description: "Percentage, ratio, averages & number tools" },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
