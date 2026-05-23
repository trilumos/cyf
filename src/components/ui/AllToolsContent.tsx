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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(CALCULATORS, {
        keys: ['name', 'description', 'keywords'],
        threshold: 0.35,
        includeScore: true,
      }),
    [],
  );

  // On mount: activate ?category= param, scroll + briefly highlight section
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
      setTimeout(() => setHighlightedCategory(null), 1200);
    };
    setTimeout(attempt, 300);
  }, [searchParams]);

  // IntersectionObserver: auto-update left rail active state as user scrolls
  useEffect(() => {
    if (query.trim()) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute('data-category');
            if (slug) setActiveCategory(slug);
          }
        });
      },
      { rootMargin: '-130px 0px -60% 0px', threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [query]);

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
      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-page mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-h1 font-bold tracking-tight text-ink-primary">
            All Finance Calculators
          </h1>
          <p className="mt-1.5 text-body text-ink-tertiary">
            {CALCULATORS.length} free tools across {CATEGORIES.length} categories — no sign-up required
          </p>

          <div className="mt-6 max-w-xl relative">
            <IconSearch
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators by name or keyword..."
              className="w-full h-12 pl-11 pr-11 border border-border rounded-lg text-sm text-ink-primary bg-page focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primaryBorder placeholder:text-ink-muted transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-secondary transition-colors"
                aria-label="Clear search"
              >
                <IconX size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filter pills — sticky below navbar (top-16 = 64px) ────── */}
      <div className="sticky top-16 z-20 bg-surface border-b border-border">
        <div className="max-w-page mx-auto px-4 sm:px-6">
          <div
            className="flex gap-1 py-2.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => scrollToCategory('all')}
              className={`flex-shrink-0 h-7 px-3 rounded text-xs font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-brand-primaryLight border border-brand-primaryBorder text-brand-primary'
                  : 'text-ink-muted hover:text-ink-secondary hover:bg-border-subtle'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => scrollToCategory(cat.slug)}
                className={`flex-shrink-0 h-7 px-3 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-brand-primaryLight border border-brand-primaryBorder text-brand-primary'
                    : 'text-ink-muted hover:text-ink-secondary hover:bg-border-subtle'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-column layout ──────────────────────────────────────── */}
      <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-10">
          {/* Left rail — sticky category nav */}
          <aside className="hidden lg:block w-[140px] flex-shrink-0" aria-label="Category navigation">
            <nav className="sticky top-[120px]">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => scrollToCategory(cat.slug)}
                    className="w-full text-left flex items-center justify-between py-[9px] px-3 transition-colors group"
                    style={
                      isActive
                        ? { borderLeft: '3px solid #1B4FD8', backgroundColor: '#EEF2FF' }
                        : { borderLeft: '3px solid transparent' }
                    }
                  >
                    <span
                      className={`text-[11.5px] leading-tight ${
                        isActive
                          ? 'text-brand-primary font-semibold'
                          : 'text-ink-tertiary group-hover:text-ink-secondary'
                      }`}
                    >
                      {cat.label}
                    </span>
                    <span
                      className={`text-[10.5px] tabular-nums flex-shrink-0 ml-1 ${
                        isActive ? 'text-brand-primary opacity-60' : 'text-ink-muted'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            {/* Search result count */}
            {query.trim() && (
              <div className="mb-8 flex items-center gap-3">
                <p className="text-sm text-ink-tertiary">
                  {filteredCalcs.length === 0 ? (
                    'No results'
                  ) : (
                    <>
                      <span className="font-semibold text-ink-secondary">{filteredCalcs.length}</span>{' '}
                      result{filteredCalcs.length === 1 ? '' : 's'}
                    </>
                  )}{' '}
                  for{' '}
                  <span className="font-medium text-ink-secondary">&ldquo;{query}&rdquo;</span>
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-brand-primary hover:underline"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Empty state */}
            {grouped.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-body text-ink-tertiary">
                  No calculators found for &ldquo;{query}&rdquo;
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-3 text-sm text-brand-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Category sections */}
            {grouped.map(({ category: cat, tools }, i) => (
              <section
                key={cat.slug}
                data-category={cat.slug}
                ref={(el) => {
                  sectionRefs.current[cat.slug] = el;
                }}
                className={`
                  ${i > 0 ? 'border-t border-border pt-10 mt-10' : ''}
                  ${highlightedCategory === cat.slug ? 'relative' : ''}
                `}
              >
                {/* Highlight overlay on URL-param activation */}
                {highlightedCategory === cat.slug && (
                  <div
                    className="absolute inset-0 -mx-4 rounded-xl pointer-events-none transition-opacity duration-700"
                    style={{ backgroundColor: '#EEF2FF', opacity: 0.4 }}
                  />
                )}

                {/* Section header */}
                <div className="mb-5 relative">
                  <div className="flex items-baseline gap-3">
                    <h2
                      className="font-serif text-[26px] leading-tight text-ink-primary"
                    >
                      {cat.label}
                    </h2>
                    <span className="text-xs text-ink-muted tabular-nums font-normal">
                      {tools.length} tools
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Tool grid — 3 columns, clean hover rows, no decoration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/calculators/${tool.slug}/`}
                      className="group flex flex-col py-3 px-3 rounded-lg hover:bg-brand-primaryLight transition-colors"
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="flex-1 text-sm font-medium text-ink-primary group-hover:text-brand-primary leading-snug transition-colors">
                          {tool.name}
                        </span>
                        {tool.isNew && (
                          <span className="flex-shrink-0 mt-px text-[9px] font-bold px-1.5 py-[3px] bg-brand-primaryLight text-brand-primaryText border border-brand-primaryBorder rounded-sm uppercase tracking-widest leading-none">
                            New
                          </span>
                        )}
                      </div>
                      <span className="mt-1 text-[11px] text-ink-muted leading-snug line-clamp-1">
                        {tool.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
