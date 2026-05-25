import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LayoutShell from '@/components/layout/LayoutShell';
import CalculatorParamReader from '@/components/calculator/CalculatorParamReader';
import { CALCULATORS } from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return { title: 'Calculator Not Found' };
  return {
    title: calc.name,
    description: calc.description,
    alternates: { canonical: `/calculators/${calc.slug}/` },
    openGraph: {
      type: 'website',
      title: `${calc.name} | CalcYourFinance`,
      description: calc.description,
      url: `/calculators/${calc.slug}/`,
    },
  };
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return notFound();

  const category = getCategoryBySlug(calc.category);

  return (
    <LayoutShell>
      <Suspense fallback={null}>
        <CalculatorParamReader />
      </Suspense>

      <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6">
          <Link href="/" className="hover:text-ink-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/all-tools/?category=${calc.category}`}
                className="hover:text-ink-primary transition-colors"
              >
                {category.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-ink-secondary">{calc.name}</span>
        </nav>

        <h1 className="text-h2 text-ink-primary">{calc.name}</h1>
        <p className="text-body text-ink-tertiary mt-2 max-w-prose">{calc.description}</p>

        {/* Results section — id required for URL param scroll-to */}
        <div id="results-section" className="mt-10">
          <div className="border border-border rounded-xl bg-surface p-10 text-center">
            <p className="text-h3 text-ink-primary">Full calculator coming soon</p>
            <p className="text-body text-ink-tertiary mt-3 max-w-sm mx-auto">
              The complete interactive {calc.name} — with inputs, charts, PDF export, and step-by-step breakdowns — is being built.
            </p>
            <Link
              href="/all-tools/"
              className="inline-block mt-6 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-primaryDark transition-colors"
            >
              Browse all calculators
            </Link>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}
