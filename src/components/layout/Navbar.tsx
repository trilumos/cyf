"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  IconChevronDown,
  IconMenu2,
  IconX,
  IconSearch,
} from "@tabler/icons-react";
import MegaMenu from "./MegaMenu";

const NAV_LINKS = [
  { label: "All Tools", href: "/all-tools/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
];

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const scheduleOpen = useCallback(() => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setMegaOpen(true), 100);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 200);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const closeMega = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setMegaOpen(false);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [megaOpen, closeMega]);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-page mx-auto px-4 sm:px-6 flex items-center h-16 gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-h4 font-bold text-brand-primary tracking-tight"
          onClick={closeMega}
        >
          CalcYourFinance
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {/* Calculators mega menu trigger */}
          <div
            className="relative"
            onMouseEnter={scheduleOpen}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                megaOpen
                  ? "bg-brand-primaryLight text-brand-primary"
                  : "text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
              }`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMegaOpen((v) => !v);
                }
              }}
            >
              Calculators
              <IconChevronDown
                size={14}
                className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight transition-colors"
              onClick={closeMega}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search icon (desktop) */}
        <Link
          href="/all-tools/"
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-ink-tertiary hover:text-brand-primary hover:bg-brand-primaryLight transition-colors"
          aria-label="Search calculators"
          onClick={closeMega}
        >
          <IconSearch size={16} />
          <span className="text-sm">Search</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 rounded-md text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((v) => !v);
            closeMega();
          }}
        >
          {mobileOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </div>

      {/* Mega menu panel */}
      {megaOpen && (
        <MegaMenu
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onClose={closeMega}
        />
      )}

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-4 space-y-1">
          <Link
            href="/all-tools/?category=loan-emi"
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
            onClick={() => setMobileOpen(false)}
          >
            Loan Calculators
          </Link>
          <Link
            href="/all-tools/?category=investment"
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
            onClick={() => setMobileOpen(false)}
          >
            Investment Calculators
          </Link>
          <Link
            href="/all-tools/?category=tax"
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
            onClick={() => setMobileOpen(false)}
          >
            Tax &amp; Retirement
          </Link>
          <Link
            href="/all-tools/"
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
            onClick={() => setMobileOpen(false)}
          >
            All Tools
          </Link>
          <div className="border-t border-border-subtle pt-2 mt-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-3 py-2 rounded-md text-sm text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
