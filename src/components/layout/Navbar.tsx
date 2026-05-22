"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Fuse from "fuse.js";
import {
  IconChevronDown,
  IconMenu2,
  IconX,
  IconSearch,
} from "@tabler/icons-react";
import MegaMenu from "./MegaMenu";
import { CALCULATORS_INDEX, type CalcEntry } from "@/data/calculators-index";

const fuse = new Fuse(CALCULATORS_INDEX, {
  keys: ["name", "category", "description"],
  threshold: 0.35,
  includeScore: false,
});

const NAV_LINKS = [
  { label: "Blog",  href: "/blog/" },
  { label: "About", href: "/about/" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Loans:            "bg-cat-loan/10 text-cat-loan",
  Investment:       "bg-cat-investment/10 text-cat-investment",
  Tax:              "bg-cat-tax/10 text-cat-tax",
  Retirement:       "bg-cat-retirement/10 text-cat-retirement",
  Insurance:        "bg-cat-insurance/10 text-cat-insurance",
  Business:         "bg-cat-business/10 text-cat-business",
  Currency:         "bg-cat-currency/10 text-cat-currency",
  "Real Estate":    "bg-cat-realestate/10 text-cat-realestate",
  "Personal Finance": "bg-cat-personal/10 text-cat-personal",
  Stocks:           "bg-cat-stocks/10 text-cat-stocks",
  Math:             "bg-cat-math/10 text-cat-math",
};

export default function Navbar() {
  const [megaOpen, setMegaOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery]           = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hits, setHits]             = useState<CalcEntry[]>([]);

  const navRef    = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Esc closes both
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      setSearchFocused(false);
      setQuery("");
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Fuse search
  useEffect(() => {
    if (query.trim().length < 2) { setHits([]); return; }
    setHits(fuse.search(query.trim(), { limit: 7 }).map((r) => r.item));
  }, [query]);

  const showDropdown = searchFocused && query.trim().length >= 2;

  return (
    <header className="sticky top-0 z-50 bg-surface">
      {/*
        relative + border-b on this inner div so MegaMenu's top:100%
        lands flush with the bottom of the border line.
      */}
      <div
        ref={navRef}
        className="max-w-page mx-auto px-4 sm:px-6 relative border-b border-border"
      >
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-h4 font-bold text-brand-primary tracking-tight"
            onClick={() => setMegaOpen(false)}
          >
            CalcYourFinance
          </Link>

          {/* Divider */}
          <span className="hidden md:block w-px h-5 bg-border mx-5 shrink-0" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Calculators — click to toggle */}
            <button
              aria-expanded={megaOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                megaOpen
                  ? "bg-brand-primaryLight text-brand-primary"
                  : "text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
              }`}
              onClick={() => setMegaOpen((v) => !v)}
            >
              Calculators
              <IconChevronDown
                size={14}
                className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight transition-colors"
                onClick={() => setMegaOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right: Search + All Tools */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search input */}
            <div ref={searchRef} className="relative">
              <div className="relative flex items-center">
                <IconSearch
                  size={15}
                  className="absolute left-3 text-ink-muted pointer-events-none"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => { setSearchFocused(true); setMegaOpen(false); }}
                  placeholder="Search calculators…"
                  className="w-56 pl-9 pr-3 py-2 text-sm bg-page border border-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-surface text-ink-secondary placeholder-ink-muted transition-colors"
                />
                {query && (
                  <button
                    className="absolute right-2 text-ink-muted hover:text-ink-secondary"
                    onClick={() => { setQuery(""); setSearchFocused(false); }}
                    aria-label="Clear search"
                  >
                    <IconX size={14} />
                  </button>
                )}
              </div>

              {/* Search results dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  {hits.length > 0 ? (
                    <ul>
                      {hits.map((calc) => (
                        <li key={calc.slug}>
                          <Link
                            href={`/calculators/${calc.slug}/`}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-brand-primaryLight transition-colors"
                            onClick={() => { setQuery(""); setSearchFocused(false); setMegaOpen(false); }}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-ink-primary truncate">{calc.name}</p>
                              <p className="text-xs text-ink-muted truncate">{calc.description}</p>
                            </div>
                            <span
                              className={`shrink-0 text-mini uppercase px-2 py-0.5 rounded-full font-semibold ${
                                CATEGORY_COLORS[calc.category] ?? "bg-border-subtle text-ink-muted"
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
                        onClick={() => { setQuery(""); setSearchFocused(false); }}
                      >
                        Browse all 204+ calculators &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* All Tools button */}
            <Link
              href="/all-tools/"
              className="shrink-0 px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-md hover:bg-brand-primaryDark transition-colors"
              onClick={() => setMegaOpen(false)}
            >
              All Tools
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2 rounded-md text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => { setMobileOpen((v) => !v); setMegaOpen(false); }}
          >
            {mobileOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>

        {/* Mega menu — inside relative container so width = navbar width */}
        {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      </div>

      {/* Mobile nav panel — outside the relative container, full-width */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 space-y-1">
          <div className="relative mb-3">
            <IconSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search calculators…"
              className="w-full pl-9 pr-3 py-2 text-sm bg-page border border-border rounded-md focus:outline-none focus:border-brand-primary text-ink-secondary placeholder-ink-muted"
            />
          </div>
          <Link href="/all-tools/?category=loan-emi"  className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight" onClick={() => setMobileOpen(false)}>Loan Calculators</Link>
          <Link href="/all-tools/?category=investment" className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight" onClick={() => setMobileOpen(false)}>Investment Calculators</Link>
          <Link href="/all-tools/?category=tax"        className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight" onClick={() => setMobileOpen(false)}>Tax &amp; Retirement</Link>
          <div className="border-t border-border-subtle pt-2 mt-2 space-y-1">
            <Link href="/all-tools/" className="block px-3 py-2 rounded-md text-sm font-medium text-brand-primary bg-brand-primaryLight" onClick={() => setMobileOpen(false)}>All Tools</Link>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="block px-3 py-2 rounded-md text-sm text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight" onClick={() => setMobileOpen(false)}>{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
