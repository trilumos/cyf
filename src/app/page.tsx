import Link from 'next/link';
import LayoutShell from '@/components/layout/LayoutShell';
import { ToolCard } from '@/components/ui/ToolCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { HeroCalculatorPanel } from '@/components/ui/HeroCalculatorPanel';
import { CALCULATORS } from '@/data/calculators';
import { CATEGORIES, getCategoryBySlug } from '@/data/categories';

const popularTools = CALCULATORS.filter((c) => c.isPopular).slice(0, 8);

const TRUST_STATS = [
  { value: '200+', label: 'Calculators' },
  { value: '12',   label: 'Categories' },
  { value: '100%', label: 'Free forever' },
  { value: '0',    label: 'Sign-up needed' },
];

const TRENDING_PILLS = [
  { label: 'Old vs New Tax Regime', slug: 'old-vs-new-tax-regime-calculator' },
  { label: 'FIRE Calculator',       slug: 'fire-number-calculator' },
  { label: 'SIP Step-Up',           slug: 'sip-step-up-calculator' },
  { label: 'PPF Calculator',        slug: 'ppf-calculator' },
  { label: 'Currency Converter',    slug: 'currency-converter' },
];

// Placeholder blog posts — replaced once blog content is built (Day 7)
const BLOG_PLACEHOLDERS = [
  { title: 'SIP vs Lumpsum: Which strategy wins in 2026?',          slug: 'sip-vs-lumpsum-2026',         category: 'Investment', readTime: '5 min read' },
  { title: 'Old vs New Tax Regime: Complete FY 2025-26 comparison', slug: 'old-vs-new-tax-regime-2026',  category: 'Tax',        readTime: '7 min read' },
  { title: 'How to calculate your FIRE number in India',             slug: 'fire-number-india',           category: 'Retirement', readTime: '6 min read' },
];

export default function HomePage() {
  return (
    <LayoutShell>

      {/* ── Hero — seamless two-column layout ───────────────────────────── */}
      <section
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ background: '#ffffff', minHeight: '520px', borderBottom: '0.5px solid #e5e7eb' }}
      >
        {/* Left column — headline, stats */}
        <div className="hero-left">
          {/* Eyebrow pill — fit-content so it never stretches full width */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            width: 'fit-content',
            whiteSpace: 'nowrap',
            background: '#EEF2FF',
            border: '0.5px solid #C7D2FE',
            borderRadius: '20px',
            padding: '4px 13px',
            fontSize: '10.5px',
            fontWeight: 600,
            color: '#3730A3',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '18px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#1B4FD8',
              animation: 'pulse-dot 2s ease-in-out infinite',
              flexShrink: 0,
            }} />
            200+ Free Finance Calculators
          </span>

          {/* H1 — DM Serif Display */}
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(32px, 3.5vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-0.5px',
              color: '#0A0F1E',
              marginBottom: '16px',
            }}
          >
            Every money decision made{' '}
            <em style={{ color: '#1B4FD8', fontStyle: 'italic' }}>smarter.</em>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '14.5px',
            color: '#6B7280',
            lineHeight: 1.65,
            maxWidth: '40ch',
            marginBottom: '36px',
          }}>
            From EMI to SIP, tax to retirement &mdash; every calculator you&rsquo;ll ever need.
            Free forever, no sign-up required.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px' }}>
            {TRUST_STATS.map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '23px', fontWeight: 700, color: '#1B4FD8', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — floating calculator card */}
        <div className="hero-right">
          <HeroCalculatorPanel />
        </div>
      </section>

      {/* ── Trending strip ────────────────────────────────────────────────── */}
      <div className="trending-strip">
        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, flexShrink: 0 }}>
          Trending:
        </span>
        {TRENDING_PILLS.map((pill) => (
          <Link key={pill.slug} href={`/calculators/${pill.slug}/`} className="trending-pill">
            {pill.label}
          </Link>
        ))}
      </div>

      {/* ── Most popular tools ───────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-page">
        <div className="max-w-page mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-h2 text-ink-primary">Most popular tools</h2>
            <Link href="/all-tools/" className="text-sm text-brand-primary hover:underline font-medium">
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((calc) => {
              const category = getCategoryBySlug(calc.category);
              if (!category) return null;
              return <ToolCard key={calc.slug} calculator={calc} category={category} />;
            })}
          </div>
        </div>
      </section>

      {/* ── Browse by category ───────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-surface">
        <div className="max-w-page mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-h2 text-ink-primary">Browse by category</h2>
            <Link href="/all-tools/" className="text-sm text-brand-primary hover:underline font-medium">
              All tools &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest from the blog ─────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-page">
        <div className="max-w-page mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-h2 text-ink-primary">Latest from the blog</h2>
            <Link href="/blog/" className="text-sm text-brand-primary hover:underline font-medium">
              All articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_PLACEHOLDERS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex flex-col gap-3 p-5 bg-surface border border-border rounded-xl hover:border-brand-primaryBorder hover:shadow-sm transition-all"
              >
                <span className="text-mini uppercase tracking-wide text-brand-primaryText bg-brand-primaryLight px-2 py-0.5 rounded-full self-start font-semibold">
                  {post.category}
                </span>
                <p className="text-sm font-semibold text-ink-primary group-hover:text-brand-primary transition-colors leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-ink-muted mt-auto">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </LayoutShell>
  );
}
