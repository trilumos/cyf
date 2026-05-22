import Link from 'next/link';
import LayoutShell from '@/components/layout/LayoutShell';
import { AdSlot } from '@/components/ads/AdSlot';
import { ToolCard } from '@/components/ui/ToolCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { CALCULATORS } from '@/data/calculators';
import { CATEGORIES, getCategoryById } from '@/data/categories';

const popularTools = CALCULATORS.filter((c) => c.isPopular).slice(0, 8);

const TRUST_STATS = [
  { value: '204+', label: 'Calculators' },
  { value: '12',   label: 'Categories' },
  { value: '100%', label: 'Free forever' },
  { value: '0',    label: 'Sign-up needed' },
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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-surface py-16 px-4">
        <div className="max-w-page mx-auto flex flex-col items-center text-center">
          <span className="text-mini uppercase tracking-widest bg-brand-primaryLight text-brand-primaryText px-3 py-1 rounded-full mb-5">
            204+ Free Finance Calculators
          </span>

          <h1 className="text-h1 text-ink-primary max-w-xl">
            Make smarter money decisions with{' '}
            <span className="text-brand-primary">CalcYourFinance</span>
          </h1>

          <p className="text-body text-ink-tertiary mt-4 max-w-md">
            From EMI to SIP, tax to retirement — every calculator you&rsquo;ll ever need, free forever.
          </p>

          {/* Trust stats */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="text-h3 font-bold text-brand-primary">{s.value}</span>
                <span className="text-sm text-ink-tertiary">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              const category = getCategoryById(calc.categoryId);
              if (!category) return null;
              return <ToolCard key={calc.slug} calculator={calc} category={category} />;
            })}
          </div>
        </div>
      </section>

      {/* ── Ad banner ────────────────────────────────────────────────────── */}
      <div className="py-4 px-4 bg-page flex justify-center">
        <AdSlot size="728x90" position="homepage-mid" />
      </div>

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
