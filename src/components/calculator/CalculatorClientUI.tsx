'use client';

import { useState, useRef, useMemo } from 'react';
import { CALCULATORS_REGISTRY } from '@/calculators';
import { CALCULATORS } from '@/data/calculators';
import { useCurrency } from '@/lib/currency-context';
import { CalculatorShell } from './CalculatorShell';
import { CalculatorInputs } from './CalculatorInputs';
import { CalculatorResults } from './CalculatorResults';
import { PlainEnglishSummary } from './PlainEnglishSummary';
import { ResultsChart } from './ResultsChart';
import { RelatedToolsCard } from './RelatedToolsCard';
import { RelatedArticlesCard } from './RelatedArticlesCard';
import { ExportShareCard } from './ExportShareCard';
import { EducationalContent } from './EducationalContent';
import { FAQSection } from './FAQSection';
import { AdSlot } from '@/components/ads/AdSlot';

interface CalculatorClientUIProps {
  slug: string;
}

export function CalculatorClientUI({ slug }: CalculatorClientUIProps) {
  const calcModule = CALCULATORS_REGISTRY[slug];
  const calc = CALCULATORS.find((c) => c.slug === slug);
  const { currency } = useCurrency();
  const chartRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState<Record<string, number | string>>(
    calcModule?.defaultInputs ?? {},
  );

  const results = useMemo(
    () => (calcModule ? calcModule.compute(inputs) : {}),
    [calcModule, inputs],
  );

  const summary = useMemo(
    () => (calcModule ? calcModule.generateSummary(inputs, results) : null),
    [calcModule, inputs, results],
  );

  if (!calcModule || !calc) return null;

  const updateInput = (name: string, value: number | string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const rightRail = (
    <>
      <RelatedToolsCard relatedSlugs={calc.relatedSlugs} />
      <RelatedArticlesCard articleSlugs={calc.articleSlugs} />
      <ExportShareCard
        module={calcModule}
        inputs={inputs}
        results={results}
        currency={currency}
        chartRef={chartRef}
        calcName={calc.name}
      />
      <AdSlot size="300x250" position="calc-right-rail" />
    </>
  );

  const center = (
    <div className="space-y-6">
      <CalculatorInputs
        inputs={calcModule.inputs}
        values={inputs}
        onChange={updateInput}
        currency={currency}
      />

      <CalculatorResults
        results={calcModule.results}
        values={results}
        currency={currency}
      />

      {calcModule.chart && (
        <div ref={chartRef}>
          <ResultsChart
            type={calcModule.chart.type}
            data={calcModule.chart.builder(inputs, results)}
            currency={currency}
          />
        </div>
      )}

      {summary && <PlainEnglishSummary summary={summary} />}

      <EducationalContent educational={calcModule.educational} />

      <AdSlot size="responsive" position="calc-in-content-1" />

      <FAQSection faqs={calcModule.educational.faqs} />

      <AdSlot size="responsive" position="calc-in-content-2" />

      {/* Mobile: right-rail cards below content */}
      <div className="lg:hidden flex flex-col gap-4 pt-2">
        <RelatedToolsCard relatedSlugs={calc.relatedSlugs} />
        <RelatedArticlesCard articleSlugs={calc.articleSlugs} />
        <ExportShareCard
          module={calcModule}
          inputs={inputs}
          results={results}
          currency={currency}
          chartRef={chartRef}
          calcName={calc.name}
        />
      </div>
    </div>
  );

  return <CalculatorShell center={center} right={rightRail} />;
}
