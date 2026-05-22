"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IconBuildingBank,
  IconTrendingUp,
  IconReceipt2,
  IconPigMoney,
  IconFlame,
  IconSearch,
} from "@tabler/icons-react";

const COLUMNS = [
  {
    id: "loans",
    title: "LOANS",
    icon: IconBuildingBank,
    color: "text-cat-loan",
    tools: [
      { name: "Home Loan EMI", slug: "home-loan-emi-calculator" },
      { name: "Personal Loan EMI", slug: "personal-loan-emi-calculator" },
      { name: "Car Loan EMI", slug: "car-loan-emi-calculator" },
      { name: "Loan Against Property", slug: "loan-against-property-calculator" },
    ],
    viewAllHref: "/all-tools/?category=loan-emi",
    viewAllCount: 18,
  },
  {
    id: "investment",
    title: "INVESTMENT",
    icon: IconTrendingUp,
    color: "text-cat-investment",
    tools: [
      { name: "SIP Calculator", slug: "sip-calculator" },
      { name: "Lumpsum Calculator", slug: "lumpsum-calculator" },
      { name: "FD Calculator", slug: "fd-calculator" },
      { name: "PPF Calculator", slug: "ppf-calculator" },
    ],
    viewAllHref: "/all-tools/?category=investment",
    viewAllCount: 20,
  },
  {
    id: "tax",
    title: "TAX & RETIREMENT",
    icon: IconReceipt2,
    color: "text-cat-tax",
    secondIcon: IconPigMoney,
    tools: [
      { name: "Income Tax Calculator", slug: "income-tax-calculator" },
      { name: "HRA Exemption", slug: "hra-exemption-calculator" },
      { name: "NPS Calculator", slug: "nps-calculator" },
      { name: "Retirement Corpus", slug: "retirement-corpus-calculator" },
    ],
    viewAllHref: "/all-tools/",
    viewAllCount: 28,
  },
];

const TRENDING = [
  { name: "SIP Calculator", slug: "sip-calculator" },
  { name: "Income Tax Calculator", slug: "income-tax-calculator" },
  { name: "EMI Calculator", slug: "emi-calculator" },
];

interface MegaMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function MegaMenu({
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  const [query, setQuery] = useState("");

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 bg-surface border-b border-border shadow-sm"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-page mx-auto px-6 py-4">
        <div className="grid grid-cols-4 gap-6">
          {COLUMNS.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.id}>
                <div className={`flex items-center gap-1.5 mb-3 ${col.color}`}>
                  <Icon size={14} />
                  <span className="text-mini uppercase tracking-widest text-ink-muted">
                    {col.title}
                  </span>
                </div>
                <ul className="space-y-1">
                  {col.tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/calculators/${tool.slug}/`}
                        className="block text-sm text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight rounded px-2 py-1 -mx-2 transition-colors"
                        onClick={onClose}
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={col.viewAllHref}
                  className="inline-block mt-3 text-sm font-medium text-brand-primary hover:text-brand-primaryDark transition-colors"
                  onClick={onClose}
                >
                  View all {col.viewAllCount} →
                </Link>
              </div>
            );
          })}

          {/* Column 4: Trending + Search */}
          <div className="border-l border-border pl-6">
            <span className="text-mini uppercase tracking-widest text-ink-muted block mb-3">
              TRENDING NOW
            </span>
            <ul className="space-y-2 mb-4">
              {TRENDING.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/calculators/${tool.slug}/`}
                    className="flex items-center gap-2 text-sm text-ink-secondary hover:text-brand-primary bg-warningBg hover:bg-amber-100 rounded px-2 py-1.5 transition-colors"
                    onClick={onClose}
                  >
                    <IconFlame size={14} className="text-warning shrink-0" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-brand-primaryLight border border-brand-primaryBorder rounded-lg p-3">
              <p className="text-xs font-semibold text-brand-primaryText mb-2">
                Can&apos;t find it?
              </p>
              <div className="relative">
                <IconSearch
                  size={14}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-muted"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search calculators…"
                  className="w-full pl-7 pr-3 py-1.5 text-xs bg-surface border border-brand-primaryBorder rounded focus:outline-none focus:border-brand-primary text-ink-secondary placeholder-ink-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
