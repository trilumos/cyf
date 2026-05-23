'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { IconSearch, IconX } from '@tabler/icons-react';
import { CALCULATORS_INDEX, type CalcEntry } from '@/data/calculators-index';

const fuse = new Fuse(CALCULATORS_INDEX, {
  keys: ['name', 'category', 'description'],
  threshold: 0.35,
  includeScore: false,
});

const CATEGORY_COLORS: Record<string, string> = {
  'Loan & EMI':       'bg-cat-loan/10 text-cat-loan',
  'Investment':       'bg-cat-investment/10 text-cat-investment',
  'Tax':              'bg-cat-tax/10 text-cat-tax',
  'Retirement':       'bg-cat-retirement/10 text-cat-retirement',
  'Insurance':        'bg-cat-insurance/10 text-cat-insurance',
  'Business':         'bg-cat-business/10 text-cat-business',
  'Currency & FX':    'bg-cat-currency/10 text-cat-currency',
  'Real Estate':      'bg-cat-realestate/10 text-cat-realestate',
  'Personal Finance': 'bg-cat-personal/10 text-cat-personal',
  'Stocks & Crypto':  'bg-cat-stocks/10 text-cat-stocks',
  'Economics':        'bg-cat-economics/10 text-cat-economics',
  'Financial Math':   'bg-cat-math/10 text-cat-math',
};

interface SearchBarProps {
  /** 'navbar' = compact inline bar; 'hero' = full-width 44px bar for homepage */
  size?: 'navbar' | 'hero';
  placeholder?: string;
  className?: string;
  /** Called after the user selects a result or clears — lets the parent react (e.g. close mega menu) */
  onSelect?: () => void;
}

export function SearchBar({
  size = 'navbar',
  placeholder = 'Search calculators…',
  className = '',
  onSelect,
}: SearchBarProps) {
  const [query, setQuery]       = useState('');
  const [focused, setFocused]   = useState(false);
  const [hits, setHits]         = useState<CalcEntry[]>([]);
  const containerRef            = useRef<HTMLDivElement>(null);

  // Fuse search
  useEffect(() => {
    if (query.trim().length < 2) { setHits([]); return; }
    setHits(fuse.search(query.trim(), { limit: 7 }).map((r) => r.item));
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFocused(false); setQuery(''); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const showDropdown = focused && query.trim().length >= 2;

  const handleSelect = () => {
    setQuery('');
    setFocused(false);
    onSelect?.();
  };

  const inputCls =
    size === 'hero'
      ? 'w-full h-11 pl-10 pr-10 text-sm bg-page border border-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-surface text-ink-secondary placeholder-ink-muted transition-colors'
      : 'w-56 pl-9 pr-8 py-2 text-sm bg-page border border-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-surface text-ink-secondary placeholder-ink-muted transition-colors';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <IconSearch
          size={15}
          className="absolute left-3 text-ink-muted pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className={inputCls}
          role="combobox"
          aria-label="Search calculators"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls="search-results"
        />
        {query && (
          <button
            className="absolute right-2.5 text-ink-muted hover:text-ink-secondary"
            onClick={() => { setQuery(''); setFocused(false); onSelect?.(); }}
            aria-label="Clear search"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[320px]">
          {hits.length > 0 ? (
            <ul id="search-results" role="listbox" aria-label="Search results">
              {hits.map((calc) => (
                <li key={calc.slug} role="option" aria-selected={false}>
                  <Link
                    href={`/calculators/${calc.slug}/`}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-brand-primaryLight transition-colors"
                    onClick={handleSelect}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink-primary truncate">{calc.name}</p>
                      <p className="text-xs text-ink-muted truncate">{calc.description}</p>
                    </div>
                    <span
                      className={`shrink-0 text-mini uppercase px-2 py-0.5 rounded-full font-semibold ${
                        CATEGORY_COLORS[calc.category] ?? 'bg-border-subtle text-ink-muted'
                      }`}
                    >
                      {calc.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-ink-tertiary">
                No results for &ldquo;{query}&rdquo;
              </p>
              <Link
                href="/all-tools/"
                className="text-sm text-brand-primary hover:underline mt-1 inline-block"
                onClick={handleSelect}
              >
                Browse all 200+ calculators &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
