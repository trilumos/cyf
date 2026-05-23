"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import MegaMenu from "./MegaMenu";
import { SearchBar } from "./SearchBar";
import { CurrencySelector } from "./CurrencySelector";

const NAV_LINKS = [
  { label: "Blog",  href: "/blog/" },
  { label: "About", href: "/about/" },
];

export default function Navbar() {
  const [megaOpen, setMegaOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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

  // Esc closes mega menu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-surface">
      <div
        ref={navRef}
        className="px-5 sm:px-8 relative border-b border-border"
      >
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 font-bold text-brand-primary tracking-tight"
            style={{ fontSize: '18px' }}
            onClick={() => setMegaOpen(false)}
          >
            CalcYourFinance
          </Link>

          {/* Divider */}
          <span className="hidden md:block w-px h-5 bg-border mx-5 shrink-0" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
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
            <SearchBar onSelect={() => setMegaOpen(false)} />
            <CurrencySelector />

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

        {/* Mega menu */}
        {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 space-y-1">
          <SearchBar
            className="mb-3"
            onSelect={() => setMobileOpen(false)}
          />
          <Link
            href="/all-tools/"
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
            onClick={() => setMobileOpen(false)}
          >
            Calculators
          </Link>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-border-subtle pt-3 mt-2 flex items-center justify-between">
            <CurrencySelector />
            <Link
              href="/all-tools/"
              className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-md hover:bg-brand-primaryDark transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              All Tools
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
