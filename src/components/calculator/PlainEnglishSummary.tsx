'use client';

import Link from 'next/link';

interface Summary {
  intro: string;
  highlight: string;
  tip: { text: string; relatedToolSlug?: string };
}

interface PlainEnglishSummaryProps {
  summary: Summary;
}

export function PlainEnglishSummary({ summary }: PlainEnglishSummaryProps) {
  return (
    <div className="space-y-3 pt-2">
      <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
        What this means for you
      </h3>
      <p
        className="text-sm text-ink-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: summary.intro }}
      />
      <div className="bg-[#EEF2FF] rounded-lg px-4 py-3">
        <p
          className="text-sm text-ink-secondary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: summary.highlight }}
        />
      </div>
      <p className="text-sm text-ink-tertiary leading-relaxed">
        {summary.tip.text}
        {summary.tip.relatedToolSlug && (
          <>
            {' '}
            <Link
              href={`/calculators/${summary.tip.relatedToolSlug}/`}
              className="text-brand-primary hover:underline font-medium"
            >
              Try the calculator
            </Link>
            .
          </>
        )}
      </p>
    </div>
  );
}
