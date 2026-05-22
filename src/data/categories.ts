export interface Category {
  id: string;
  label: string;
  slug: string;
  count: number;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: "loans",      label: "Loans",           slug: "loan-emi",   count: 18, description: "EMI, eligibility & prepayment for every loan type" },
  { id: "investment", label: "Investment",       slug: "investment", count: 20, description: "SIP, FD, PPF and all investment return tools" },
  { id: "tax",        label: "Tax",              slug: "tax",        count: 15, description: "Income tax, TDS, HRA and capital gains" },
  { id: "retirement", label: "Retirement",       slug: "retirement", count: 13, description: "Plan your corpus, NPS, EPF and FIRE goals" },
  { id: "insurance",  label: "Insurance",        slug: "insurance",  count: 10, description: "Calculate the right cover for life, health & term" },
  { id: "realestate", label: "Real Estate",      slug: "realestate", count: 12, description: "Home buying, rental yield & affordability tools" },
  { id: "business",   label: "Business",         slug: "business",   count: 12, description: "GST, break-even, ROI and business finance" },
  { id: "personal",   label: "Personal Finance", slug: "personal",   count: 15, description: "Budget, salary, net worth & savings planners" },
  { id: "stocks",     label: "Stocks",           slug: "stocks",     count: 10, description: "P&L, brokerage and mutual fund calculators" },
  { id: "currency",   label: "Currency",         slug: "currency",   count: 8,  description: "Live currency conversion for all major pairs" },
  { id: "economics",  label: "Economics",        slug: "economics",  count: 8,  description: "Inflation, purchasing power & macro tools" },
  { id: "math",       label: "Math",             slug: "math",       count: 10, description: "Percentage, ratio, averages & number tools" },
];
