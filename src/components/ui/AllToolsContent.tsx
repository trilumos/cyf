'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { IconSearch, IconX, IconLayoutList, IconLayoutGrid, IconChevronRight } from '@tabler/icons-react';
import { CALCULATORS, type Calculator } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';

// ── Popular slugs (exact order) ──────────────────────────────────────────────
const POPULAR_SLUGS = [
  'emi-calculator',
  'sip-calculator',
  'income-tax-calculator-india',
  'home-loan-emi-calculator',
  'fd-calculator',
  'fire-number-calculator',
  'gst-calculator',
  'currency-converter',
];

// ── Sub-components ────────────────────────────────────────────────────────────

function NewBadge({ inline = false }: { inline?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '8px',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#1B4FD8',
        background: '#EEF2FF',
        border: '0.5px solid #C7D2FE',
        borderRadius: '3px',
        padding: '1px 4px',
        letterSpacing: '0.04em',
        lineHeight: 1.4,
        verticalAlign: 'middle',
        marginLeft: inline ? '6px' : 0,
      }}
    >
      New
    </span>
  );
}

function CategoryPill({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        border: `0.5px solid ${isActive ? '#1B4FD8' : '#E5E7EB'}`,
        borderRadius: '20px',
        padding: '5px 12px',
        fontSize: '11.5px',
        fontWeight: isActive ? 500 : 400,
        background: isActive ? '#1B4FD8' : '#fff',
        color: isActive ? '#fff' : '#374151',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.1s',
        lineHeight: 1.4,
      }}
    >
      {label}{' '}
      <span
        style={{
          opacity: isActive ? 0.7 : 1,
          color: isActive ? '#fff' : '#9CA3AF',
          fontSize: '10.5px',
        }}
      >
        {count}
      </span>
    </button>
  );
}

function SidebarItem({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center justify-between transition-colors ${
        !isActive ? 'hover:bg-[#F3F4F6]' : ''
      }`}
      style={{
        padding: '7px 14px',
        borderLeft: `3px solid ${isActive ? '#1B4FD8' : 'transparent'}`,
        background: isActive ? '#EEF2FF' : 'transparent',
      }}
    >
      <span
        style={{
          fontSize: '12px',
          color: isActive ? '#1B4FD8' : '#374151',
          fontWeight: isActive ? 600 : 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '10px',
          color: '#9CA3AF',
          flexShrink: 0,
          marginLeft: '4px',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </span>
    </button>
  );
}

function PopularCard({ tool }: { tool: Calculator }) {
  return (
    <Link
      href={`/calculators/${tool.slug}/`}
      className="block transition-all"
      style={{
        background: '#fff',
        border: '0.5px solid #E5E7EB',
        borderRadius: '8px',
        padding: '11px 13px',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, {
          borderColor: '#C7D2FE',
          background: '#EEF2FF',
          transform: 'translateY(-1px)',
          boxShadow: '0 3px 10px rgba(27,79,216,0.08)',
        });
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, {
          borderColor: '#E5E7EB',
          background: '#fff',
          transform: '',
          boxShadow: '',
        });
      }}
    >
      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#111827',
          lineHeight: 1.3,
        }}
      >
        {tool.name}
      </div>
      <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>
        {tool.categoryName}
      </div>
    </Link>
  );
}

function ListRow({ tool }: { tool: Calculator }) {
  return (
    <Link
      href={`/calculators/${tool.slug}/`}
      className="flex items-start justify-between gap-2 group rounded-md transition-colors"
      style={{ padding: '8px 10px', textDecoration: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#EEF2FF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span
            className="group-hover:text-brand-primary transition-colors"
            style={{ fontSize: '12px', fontWeight: 500, color: '#0A0F1E', lineHeight: 1.3 }}
          >
            {tool.name}
          </span>
          {tool.isNew && <NewBadge />}
        </div>
        <div
          style={{
            fontSize: '10.5px',
            color: '#9CA3AF',
            marginTop: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {tool.description}
        </div>
      </div>
      <IconChevronRight
        size={12}
        className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: '#1B4FD8' }}
      />
    </Link>
  );
}

function GridCard({ tool }: { tool: Calculator }) {
  return (
    <Link
      href={`/calculators/${tool.slug}/`}
      className="flex flex-col group transition-all"
      style={{
        background: '#fff',
        border: '0.5px solid #E5E7EB',
        borderRadius: '8px',
        padding: '12px 13px',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, {
          borderColor: '#C7D2FE',
          background: '#EEF2FF',
          transform: 'translateY(-1px)',
          boxShadow: '0 3px 10px rgba(27,79,216,0.07)',
        });
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, {
          borderColor: '#E5E7EB',
          background: '#fff',
          transform: '',
          boxShadow: '',
        });
      }}
    >
      <div
        className="group-hover:text-brand-primary transition-colors"
        style={{ fontSize: '12.5px', fontWeight: 600, color: '#0A0F1E', lineHeight: 1.3 }}
      >
        {tool.name}
        {tool.isNew && <NewBadge inline />}
      </div>
      <div
        style={{
          fontSize: '11px',
          color: '#6B7280',
          lineHeight: 1.4,
          margin: '4px 0 8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}
      >
        {tool.description}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{tool.categoryName}</span>
        <IconChevronRight size={12} style={{ color: '#C7D2FE' }} />
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AllToolsContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const fuse = useMemo(
    () =>
      new Fuse(CALCULATORS, {
        keys: ['name', 'description', 'keywords'],
        threshold: 0.35,
        includeScore: true,
      }),
    [],
  );

  // URL param: ?category=slug → activate + scroll to section
  useEffect(() => {
    const cat = searchParams.get('category');
    if (!cat) return;
    setActiveCategory(cat);
    const attempt = () => {
      const el = document.getElementById(`cat-${cat}`);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    setTimeout(attempt, 300);
  }, [searchParams]);

  // Derived data
  const filteredCalcs = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : CALCULATORS;

  const allGrouped = CATEGORIES.map((cat) => ({
    category: cat,
    tools: filteredCalcs.filter((c) => c.category === cat.slug),
  })).filter((g) => g.tools.length > 0);

  // When a specific category is selected with no search, show only that category
  const visibleGroups =
    activeCategory === 'all' || query.trim()
      ? allGrouped
      : allGrouped.filter((g) => g.category.slug === activeCategory);

  const showPopular = activeCategory === 'all' && !query.trim();
  const popularCalcs = POPULAR_SLUGS.map((slug) =>
    CALCULATORS.find((c) => c.slug === slug),
  ).filter(Boolean) as Calculator[];

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // If switching to a specific category, DOM updates on next render — use timeout
    const attempt = () => {
      const el = document.getElementById(`cat-${slug}`);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    // Try immediately (section already in DOM), fallback after re-render
    attempt();
    setTimeout(attempt, 50);
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="bg-surface" style={{ borderBottom: '0.5px solid #E5E7EB' }}>
        {/* Row 1: title + search + toggle */}
        <div
          className="flex items-start justify-between gap-4 flex-wrap"
          style={{ padding: '20px 24px 12px' }}
        >
          <div>
            <h1
              style={{
                fontSize: '21px',
                fontWeight: 700,
                letterSpacing: '-0.4px',
                color: '#111827',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              All Calculators
            </h1>
            <p style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '3px' }}>
              200 free tools across 12 categories — no sign-up required
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search box */}
            <div style={{ position: 'relative' }}>
              <IconSearch
                size={13}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators..."
                style={{
                  background: '#F8F9FC',
                  border: '0.5px solid #E5E7EB',
                  borderRadius: '8px',
                  height: '34px',
                  width: '220px',
                  paddingLeft: '30px',
                  paddingRight: query ? '28px' : '10px',
                  fontSize: '12.5px',
                  color: '#374151',
                  outline: 'none',
                  transition: 'border-color 0.1s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#1B4FD8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E7EB')}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{
                    position: 'absolute',
                    right: 9,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    lineHeight: 1,
                    background: 'none',
                    border: 'none',
                    padding: 0,
                  }}
                  aria-label="Clear search"
                >
                  <IconX size={12} />
                </button>
              )}
            </div>

            {/* List / Grid toggle */}
            <div
              style={{
                display: 'flex',
                border: '0.5px solid #E5E7EB',
                borderRadius: '7px',
                overflow: 'hidden',
              }}
            >
              {(['list', 'grid'] as const).map((mode, i) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  aria-label={`${mode} view`}
                  style={{
                    padding: '5px 8px',
                    background: viewMode === mode ? '#EEF2FF' : '#fff',
                    color: viewMode === mode ? '#1B4FD8' : '#9CA3AF',
                    border: 'none',
                    borderLeft: i === 1 ? '0.5px solid #E5E7EB' : undefined,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.1s',
                  }}
                >
                  {mode === 'list' ? <IconLayoutList size={15} /> : <IconLayoutGrid size={15} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Category pills */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            padding: '0 24px 12px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
        >
          <CategoryPill
            label="All"
            count={CALCULATORS.length}
            isActive={activeCategory === 'all'}
            onClick={() => scrollToCategory('all')}
          />
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.slug}
              label={cat.label}
              count={cat.count}
              isActive={activeCategory === cat.slug}
              onClick={() => scrollToCategory(cat.slug)}
            />
          ))}
        </div>
      </div>

      {/* ── Two-column body ──────────────────────────────────────────── */}
      <div className="flex flex-1">
        {/* Sidebar — sticky, full height minus navbar */}
        <aside
          className="hidden lg:flex flex-col flex-shrink-0 bg-surface overflow-y-auto"
          style={{
            width: '220px',
            borderRight: '0.5px solid #E5E7EB',
            position: 'sticky',
            top: '64px',
            height: 'calc(100vh - 64px)',
            alignSelf: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#9CA3AF',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '12px 14px 4px',
            }}
          >
            Categories
          </div>
          <SidebarItem
            label="All tools"
            count={CALCULATORS.length}
            isActive={activeCategory === 'all'}
            onClick={() => scrollToCategory('all')}
          />
          {CATEGORIES.map((cat) => (
            <SidebarItem
              key={cat.slug}
              label={cat.label}
              count={cat.count}
              isActive={activeCategory === cat.slug}
              onClick={() => scrollToCategory(cat.slug)}
            />
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1" style={{ padding: '20px 24px' }}>
            {/* Popular section — only when "All" selected, no search */}
            {showPopular && (
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                    Most popular
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#1B4FD8',
                      background: '#EEF2FF',
                      border: '0.5px solid #C7D2FE',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Top 8
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {popularCalcs.map((tool) => (
                    <PopularCard key={tool.slug} tool={tool} />
                  ))}
                </div>
                <div style={{ borderTop: '0.5px solid #E5E7EB', marginTop: '20px' }} />
              </div>
            )}

            {/* No-results state */}
            {filteredCalcs.length === 0 && query.trim() && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#9CA3AF',
                  fontSize: '13px',
                }}
              >
                No calculators found for &ldquo;{query}&rdquo; — try a different term
              </div>
            )}

            {/* Category sections */}
            {visibleGroups.map(({ category: cat, tools }) => (
              <section
                key={cat.slug}
                id={`cat-${cat.slug}`}
                data-category={cat.slug}
                ref={(el) => {
                  sectionRefs.current[cat.slug] = el;
                }}
                style={{ marginBottom: '32px' }}
              >
                {/* Section header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderBottom: '0.5px solid #E5E7EB',
                    paddingBottom: '10px',
                    marginBottom: '12px',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      letterSpacing: '-0.3px',
                      color: '#111827',
                      margin: 0,
                    }}
                  >
                    {cat.label}
                  </h2>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{tools.length}</span>
                </div>

                {/* List view */}
                {viewMode === 'list' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                      <ListRow key={tool.slug} tool={tool} />
                    ))}
                  </div>
                )}

                {/* Grid view */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                    {tools.map((tool) => (
                      <GridCard key={tool.slug} tool={tool} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Footer strip */}
          <div
            style={{
              padding: '10px 24px',
              background: '#fff',
              borderTop: '0.5px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#374151' }}>
              <span style={{ fontWeight: 600 }}>200</span> calculators — all free, no sign-up required
            </span>
            <Link
              href="/contact/"
              style={{
                fontSize: '12px',
                color: '#1B4FD8',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Suggest a calculator &rarr;
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
