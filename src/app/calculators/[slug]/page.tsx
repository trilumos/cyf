import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LayoutShell from '@/components/layout/LayoutShell';
import CalculatorParamReader from '@/components/calculator/CalculatorParamReader';
import { CalculatorClientUI } from '@/components/calculator/CalculatorClientUI';
import { LastUpdatedBadge } from '@/components/calculator/LastUpdatedBadge';
import { JsonLd } from '@/components/seo/JsonLd';
import { CALCULATORS } from '@/data/calculators';
import { CALCULATORS_REGISTRY } from '@/calculators';
import { getCategoryBySlug } from '@/data/categories';
import type { Calculator } from '@/data/calculators';
import type { Category } from '@/data/categories';
import type { CalculatorModule } from '@/types/calculator';

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return { title: 'Calculator Not Found' };
  const calcModule = CALCULATORS_REGISTRY[params.slug];
  const title = calcModule?.seo?.title ?? calc.name;
  const description = calcModule?.seo?.description ?? calc.description;
  return {
    title,
    description,
    alternates: { canonical: `/calculators/${calc.slug}/` },
    openGraph: {
      type: 'website',
      title: `${title} | CalcYourFinance`,
      description,
      url: `/calculators/${calc.slug}/`,
    },
  };
}

function buildJsonLd(
  calc: Calculator,
  category: Category | undefined,
  calcModule: CalculatorModule,
): object[] {
  const baseUrl = 'https://calcyourfinance.com';
  const url = `${baseUrl}/calculators/${calc.slug}/`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      ...(category
        ? [{
            '@type': 'ListItem',
            position: 2,
            name: category.label,
            item: `${baseUrl}/all-tools/?category=${calc.category}`,
          }]
        : []),
      {
        '@type': 'ListItem',
        position: category ? 3 : 2,
        name: calc.name,
        item: url,
      },
    ],
  };

  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calcModule.seo?.title ?? calc.name,
    description: calcModule.seo?.description ?? calc.description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  };

  const faqSchema = calcModule.educational.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: calcModule.educational.faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null;

  const howToSchema = calcModule.educational.howToUse.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use the ${calc.name}`,
        step: calcModule.educational.howToUse.map((text, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text,
        })),
      }
    : null;

  return [breadcrumb, software, faqSchema, howToSchema].filter(
    (x) => x !== null,
  ) as object[];
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return notFound();

  const category = getCategoryBySlug(calc.category);
  const calcModule = CALCULATORS_REGISTRY[params.slug];

  return (
    <LayoutShell>
      <Suspense fallback={null}>
        <CalculatorParamReader />
      </Suspense>

      {calcModule && <JsonLd data={buildJsonLd(calc, category, calcModule)} />}

      <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-primary transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          {category && (
            <>
              <Link
                href={`/all-tools/?category=${calc.category}`}
                className="hover:text-ink-primary transition-colors"
              >
                {category.label}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="text-ink-secondary" aria-current="page">{calc.name}</span>
        </nav>

        <h1 className="text-h2 text-ink-primary">{calc.name}</h1>
        <p className="text-body text-ink-tertiary mt-2 max-w-prose">{calc.description}</p>

        {calcModule?.requiresLiveData && calcModule.requiresLiveData.length > 0 && (
          <div className="mt-2">
            <LastUpdatedBadge
              lastVerified=""
              sourceName="CalcYourFinance"
            />
          </div>
        )}

        <div id="results-section" className="mt-8">
          {calcModule ? (
            <CalculatorClientUI slug={params.slug} />
          ) : (
            <div className="border border-border rounded-xl bg-surface p-10 text-center">
              <p className="text-h3 text-ink-primary">Full calculator coming soon</p>
              <p className="text-body text-ink-tertiary mt-3 max-w-sm mx-auto">
                The complete interactive {calc.name} — with inputs, charts, PDF export, and
                step-by-step breakdowns — is being built.
              </p>
              <Link
                href="/all-tools/"
                className="inline-block mt-6 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-primaryDark transition-colors"
              >
                Browse all calculators
              </Link>
            </div>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}
