'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { IconSearch, IconX } from '@tabler/icons-react';
import { CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';

export function AllToolsContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
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

  // Activate category from ?category= param on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (!cat) return;
    setActiveCategory(cat);
    const attempt = () => {
      const el = sectionRefs.current[cat];
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
      setHighlightedCategory(cat);
      setTimeout(() => setHighlightedCategory(null), 1000);
    };
    setTimeout(attempt, 300);
  }, [searchParams]);

  const filteredCalcs = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : CALCULATORS;

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    tools: filteredCalcs.filter((c) => c.category === cat.slug),
  })).filter((g) => g.tools.length > 0);

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = sectionRefs.current[slug];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="bg-page min-h-screen">
      {/* Page header */}
      <div className="max-w-page mx-auto px-4 sm:px-6 pt-8 pb-6">
        <h2 className="text-h2 text-ink-primary font-bold">All Finance Calculators</h2>
        <p className="text-body text-ink-tertiary mt-1">
          200+ free tools across 12 categories — no sign-up required
        </p>
        <div className="mt-4 max-w-lg relative">
          <IconSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 200+ calculators..."
            className="w-full h-11 pl-10 pr-10 border border-border rounded-md text-body text-ink-primary bg-surface focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder:text-ink-muted"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-secondary"
              aria-label="Clear search"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Filter pills — sticky below navbar (top-16 = 64px) */}
      <div className="sticky top-16 z-20 bg-surface border-b border-border">
        <div className="max-w-page mx-auto px-4 sm:px-6">
          <div
            className="flex gap-1.5 py-3 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => scrollToCategory('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-brand-primaryLight border border-brand-primaryBorder text-brand-primary'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              All ({CALCULATORS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => scrollToCategory(cat.slug)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-brand-primaryLight border border-brand-primaryBorder text-brand-primary'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-page mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-8">
          {/* Left rail — sticky category nav, hidden on mobile */}
          <aside className="hidden lg:block w-36 flex-shrink-0">
            <nav className="sticky top-[120px]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => scrollToCategory(cat.slug)}
                  className="w-full text-left flex items-center justify-between py-2 px-3 transition-colors group"
                  style={
                    activeCategory === cat.slug
                      ? { borderLeft: '3px solid #1B4FD8', backgroundColor: '#EEF2FF' }
                      : { borderLeft: '3px solid transparent' }
                  }
                >
                  <span
                    className={`text-xs leading-snug ${
                      activeCategory === cat.slug
                        ? 'text-brand-primary font-semibold'
                        : 'text-ink-secondary group-hover:text-ink-primary'
                    }`}
                  >
                    {cat.label}
                  </span>
                  <span
                    className={`text-xs ml-1 tabular-nums ${
                      activeCategory === cat.slug ? 'text-brand-primary opacity-60' : 'text-ink-muted'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            {query.trim() && (
              <p className="text-sm text-ink-tertiary mb-5">
                {filteredCalcs.length === 0
                  ? `No results for "${query}"`
                  : `${filteredCalcs.length} result${filteredCalcs.length === 1 ? '' : 's'} for "${query}"`}
              </p>
            )}

            {grouped.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-body text-ink-tertiary">No calculators found for &ldquo;{query}&rdquo;</p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-2 text-sm text-brand-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {grouped.map(({ category: cat, tools }) => (
                  <section
                    key={cat.slug}
                    ref={(el) => {
                      sectionRefs.current[cat.slug] = el;
                    }}
                    className={`rounded-lg transition-colors duration-700 ${
                      highlightedCategory === cat.slug ? 'bg-brand-primaryLight/40' : ''
                    }`}
                  >
                    {/* Section header */}
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="text-h3 text-ink-primary font-semibold">{cat.label}</h3>
                      <span className="text-xs text-ink-muted">{tools.length} tools</span>
                    </div>

                    {/* 3-column tool grid — no decorative colors, no icon squares */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {tools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/calculators/${tool.slug}/`}
                          className="flex flex-col py-2.5 px-3 rounded hover:bg-brand-primaryLight transition-colors group"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm font-medium text-ink-primary group-hover:text-brand-primary leading-snug truncate">
                              {tool.name}
                            </span>
                            {tool.isNew && (
                              <span className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 bg-brand-primaryLight text-brand-primaryText rounded uppercase tracking-wider leading-none">
                                New
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-ink-muted mt-0.5 leading-snug line-clamp-1">
                            {tool.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
