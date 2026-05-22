"use client";

import Link from "next/link";
import {
  IconBuildingBank,
  IconTrendingUp,
  IconReceipt2,
  IconPigMoney,
  IconShieldCheck,
  IconBriefcase,
  IconCurrencyDollar,
  IconHome,
  IconWallet,
  IconChartBar,
  IconWorld,
  IconCalculator,
  IconFlame,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

interface Tool {
  name: string;
  slug: string;
}

interface Category {
  id: string;
  title: string;
  icon: ComponentType<{ size?: string | number; className?: string }>;
  color: string;
  bgColor: string;
  tools: Tool[];
  viewAllHref: string;
  count: number;
}

const COLUMNS: Category[][] = [
  [
    {
      id: "loans",
      title: "Loans",
      icon: IconBuildingBank,
      color: "text-cat-loan",
      bgColor: "bg-cat-loan/10",
      tools: [
        { name: "Home Loan EMI", slug: "home-loan-emi-calculator" },
        { name: "Personal Loan EMI", slug: "personal-loan-emi-calculator" },
        { name: "Car Loan EMI", slug: "car-loan-emi-calculator" },
      ],
      viewAllHref: "/all-tools/?category=loan-emi",
      count: 18,
    },
    {
      id: "investment",
      title: "Investment",
      icon: IconTrendingUp,
      color: "text-cat-investment",
      bgColor: "bg-cat-investment/10",
      tools: [
        { name: "SIP Calculator", slug: "sip-calculator" },
        { name: "FD Calculator", slug: "fd-calculator" },
        { name: "PPF Calculator", slug: "ppf-calculator" },
      ],
      viewAllHref: "/all-tools/?category=investment",
      count: 20,
    },
    {
      id: "stocks",
      title: "Stocks",
      icon: IconChartBar,
      color: "text-cat-stocks",
      bgColor: "bg-cat-stocks/10",
      tools: [
        { name: "Stock P&L Calculator", slug: "stock-pl-calculator" },
        { name: "Brokerage Calculator", slug: "brokerage-calculator" },
        { name: "SIP vs Lumpsum", slug: "sip-vs-lumpsum-calculator" },
      ],
      viewAllHref: "/all-tools/?category=stocks",
      count: 10,
    },
  ],
  [
    {
      id: "tax",
      title: "Tax",
      icon: IconReceipt2,
      color: "text-cat-tax",
      bgColor: "bg-cat-tax/10",
      tools: [
        { name: "Income Tax Calculator", slug: "income-tax-calculator" },
        { name: "HRA Exemption", slug: "hra-exemption-calculator" },
        { name: "Capital Gains Tax", slug: "capital-gains-tax-calculator" },
      ],
      viewAllHref: "/all-tools/?category=tax",
      count: 15,
    },
    {
      id: "retirement",
      title: "Retirement",
      icon: IconPigMoney,
      color: "text-cat-retirement",
      bgColor: "bg-cat-retirement/10",
      tools: [
        { name: "Retirement Corpus", slug: "retirement-corpus-calculator" },
        { name: "NPS Calculator", slug: "nps-calculator" },
        { name: "FIRE Calculator", slug: "fire-calculator" },
      ],
      viewAllHref: "/all-tools/?category=retirement",
      count: 13,
    },
    {
      id: "insurance",
      title: "Insurance",
      icon: IconShieldCheck,
      color: "text-cat-insurance",
      bgColor: "bg-cat-insurance/10",
      tools: [
        { name: "Life Insurance", slug: "life-insurance-calculator" },
        { name: "Term Insurance", slug: "term-insurance-calculator" },
        { name: "Health Insurance", slug: "health-insurance-calculator" },
      ],
      viewAllHref: "/all-tools/?category=insurance",
      count: 10,
    },
  ],
  [
    {
      id: "realestate",
      title: "Real Estate",
      icon: IconHome,
      color: "text-cat-realestate",
      bgColor: "bg-cat-realestate/10",
      tools: [
        { name: "Rent vs Buy", slug: "rent-vs-buy-calculator" },
        { name: "Stamp Duty", slug: "stamp-duty-calculator" },
        { name: "Property ROI", slug: "property-roi-calculator" },
      ],
      viewAllHref: "/all-tools/?category=realestate",
      count: 12,
    },
    {
      id: "business",
      title: "Business",
      icon: IconBriefcase,
      color: "text-cat-business",
      bgColor: "bg-cat-business/10",
      tools: [
        { name: "GST Calculator", slug: "gst-calculator" },
        { name: "Break-even Calculator", slug: "break-even-calculator" },
        { name: "Business Loan EMI", slug: "business-loan-emi-calculator" },
      ],
      viewAllHref: "/all-tools/?category=business",
      count: 12,
    },
    {
      id: "personal",
      title: "Personal Finance",
      icon: IconWallet,
      color: "text-cat-personal",
      bgColor: "bg-cat-personal/10",
      tools: [
        { name: "Budget Planner", slug: "budget-planner" },
        { name: "Salary Calculator", slug: "salary-calculator" },
        { name: "Net Worth Calculator", slug: "net-worth-calculator" },
      ],
      viewAllHref: "/all-tools/?category=personal",
      count: 15,
    },
  ],
  [
    {
      id: "currency",
      title: "Currency",
      icon: IconCurrencyDollar,
      color: "text-cat-currency",
      bgColor: "bg-cat-currency/10",
      tools: [
        { name: "Currency Converter", slug: "currency-converter" },
        { name: "USD to INR", slug: "usd-to-inr-calculator" },
        { name: "EUR to INR", slug: "eur-to-inr-calculator" },
      ],
      viewAllHref: "/all-tools/?category=currency",
      count: 8,
    },
    {
      id: "economics",
      title: "Economics",
      icon: IconWorld,
      color: "text-cat-economics",
      bgColor: "bg-cat-economics/10",
      tools: [
        { name: "Inflation Calculator", slug: "inflation-calculator" },
        { name: "GDP Calculator", slug: "gdp-calculator" },
        { name: "Rule of 72", slug: "rule-of-72-calculator" },
      ],
      viewAllHref: "/all-tools/?category=economics",
      count: 8,
    },
    {
      id: "math",
      title: "Math",
      icon: IconCalculator,
      color: "text-cat-math",
      bgColor: "bg-cat-math/10",
      tools: [
        { name: "Percentage Calculator", slug: "percentage-calculator" },
        { name: "Ratio Calculator", slug: "ratio-calculator" },
        { name: "Square Root Calculator", slug: "square-root-calculator" },
      ],
      viewAllHref: "/all-tools/?category=math",
      count: 10,
    },
  ],
];

const TRENDING = [
  { name: "SIP Calculator", slug: "sip-calculator" },
  { name: "Income Tax Calculator", slug: "income-tax-calculator" },
  { name: "Home Loan EMI", slug: "home-loan-emi-calculator" },
  { name: "FD Calculator", slug: "fd-calculator" },
  { name: "Budget Planner", slug: "budget-planner" },
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
  return (
    <div
      className="absolute left-0 right-0 top-full z-40 bg-surface border-b border-border shadow-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-page mx-auto px-6 py-5">
        {/* 4 columns × 3 categories */}
        <div className="grid grid-cols-4 gap-x-6">
          {COLUMNS.map((col, colIdx) => (
            <div
              key={colIdx}
              className={colIdx > 0 ? "border-l border-border-subtle pl-6" : ""}
            >
              {col.map((cat, catIdx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className={catIdx > 0 ? "mt-4 pt-4 border-t border-border-subtle" : ""}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded ${cat.bgColor}`}
                      >
                        <Icon size={12} className={cat.color} />
                      </span>
                      <Link
                        href={cat.viewAllHref}
                        className={`text-mini uppercase tracking-widest font-semibold ${cat.color} hover:opacity-75 transition-opacity`}
                        onClick={onClose}
                      >
                        {cat.title}
                      </Link>
                      <span className="text-mini text-ink-muted ml-auto">
                        {cat.count}
                      </span>
                    </div>

                    {/* Top tools */}
                    <ul className="space-y-0.5">
                      {cat.tools.map((tool) => (
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

                    {/* View all */}
                    <Link
                      href={cat.viewAllHref}
                      className="inline-block mt-1.5 px-2 -mx-2 text-xs font-medium text-brand-primary hover:text-brand-primaryDark transition-colors"
                      onClick={onClose}
                    >
                      View all {cat.count} →
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Trending strip */}
        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-mini uppercase tracking-widest text-ink-muted shrink-0">
            <IconFlame size={12} className="text-warning" />
            Trending
          </span>
          {TRENDING.map((tool) => (
            <Link
              key={tool.slug}
              href={`/calculators/${tool.slug}/`}
              className="text-xs text-ink-secondary bg-warningBg border border-warningBorder px-2.5 py-0.5 rounded-full hover:bg-amber-100 transition-colors"
              onClick={onClose}
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
