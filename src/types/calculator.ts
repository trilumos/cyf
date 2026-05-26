export interface CalculatorSummary {
  headline: string;
  intro: string;
  insights: Array<{
    type: 'insight' | 'caution' | 'tip';
    heading: string;
    body: string;
    relatedToolSlug?: string;
  }>;
}

export interface CalculatorModule {
  slug: string;
  seo?: { title: string; description: string; keywords?: string[] };
  defaultInputs: Record<string, number | string>;
  inputs: Array<{
    name: string;
    label: string;
    type: 'currency' | 'percent' | 'years' | 'months' | 'number' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: Array<{ value: string; label: string }>;
    currencyAware?: boolean;
  }>;
  compute: (inputs: Record<string, number | string>) => Record<string, number>;
  results: Array<{
    name: string;
    label: string;
    format: 'currency' | 'percent' | 'number' | 'years';
  }>;
  chart?: {
    type: string;
    builder: (inputs: Record<string, number | string>, results: Record<string, number>) => unknown[];
  };
  generateSummary: (
    inputs: Record<string, number | string>,
    results: Record<string, number>
  ) => CalculatorSummary;
  educational: {
    whatIs: string;
    howToUse: string[];
    formula?: string;
    formulaExplanation?: string;
    comparison?: { headers: string[]; rows: string[][] };
    faqs: Array<{ q: string; a: string }>;
  };
  requiresLiveData?: string[];
}
