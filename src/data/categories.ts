export interface Category {
  id: string;
  label: string;
  slug: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: "loans",      label: "Loans",            slug: "loan-emi",   count: 18 },
  { id: "investment", label: "Investment",        slug: "investment", count: 20 },
  { id: "tax",        label: "Tax",               slug: "tax",        count: 15 },
  { id: "retirement", label: "Retirement",        slug: "retirement", count: 13 },
  { id: "insurance",  label: "Insurance",         slug: "insurance",  count: 10 },
  { id: "realestate", label: "Real Estate",       slug: "realestate", count: 12 },
  { id: "business",   label: "Business",          slug: "business",   count: 12 },
  { id: "personal",   label: "Personal Finance",  slug: "personal",   count: 15 },
  { id: "stocks",     label: "Stocks",            slug: "stocks",     count: 10 },
  { id: "currency",   label: "Currency",          slug: "currency",   count: 8  },
  { id: "economics",  label: "Economics",         slug: "economics",  count: 8  },
  { id: "math",       label: "Math",              slug: "math",       count: 10 },
];
