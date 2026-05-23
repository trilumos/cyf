import { CALCULATORS } from './calculators';

export interface CalcEntry {
  name: string;
  slug: string;
  category: string;      // human-readable category name (e.g. "Loan & EMI")
  categorySlug: string;  // slug for routing (e.g. "loan-emi")
  description: string;
  keywords: string[];
}

export const CALCULATORS_INDEX: CalcEntry[] = CALCULATORS.map((c) => ({
  name: c.name,
  slug: c.slug,
  category: c.categoryName,
  categorySlug: c.category,
  description: c.description,
  keywords: c.keywords,
}));
