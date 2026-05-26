'use client';

import Link from 'next/link';
import type { CalculatorSummary } from '@/types/calculator';

interface PlainEnglishSummaryProps {
  summary: CalculatorSummary;
}

export function PlainEnglishSummary({ summary }: PlainEnglishSummaryProps) {
  return (
    <section className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-widest mb-3">
          What this means for you
        </h3>
        <p className="text-lg font-semibold text-ink-primary leading-snug">
          {summary.headline}
        </p>
      </div>

      <p
        className="text-sm text-ink-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: summary.intro }}
      />

      <div className="space-y-3">
        {summary.insights.map((insight, i) => (
          <div
            key={i}
            className={
              insight.type === 'caution'
                ? 'rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4'
                : 'rounded-xl bg-[#EEF2FF] px-5 py-4'
            }
          >
            {insight.type !== 'insight' && (
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1.5 ${
                insight.type === 'tip' ? 'text-brand-primary' : 'text-ink-primary'
              }`}>
                {insight.type === 'tip' ? 'Pro tip' : 'Important'}
              </p>
            )}
            <p className="text-sm font-semibold text-ink-primary leading-snug mb-1.5">
              {insight.heading}
            </p>
            <p
              className="text-sm text-ink-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: insight.body }}
            />
            {insight.relatedToolSlug && (
              <Link
                href={`/calculators/${insight.relatedToolSlug}/`}
                className="inline-block mt-2.5 text-sm font-medium text-brand-primary hover:underline"
              >
                Try the calculator &rarr;
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
