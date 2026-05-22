"use client";

import Link from "next/link";
import { useState } from "react";
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
  IconChevronRight,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

interface Tool {
  name: string;
  slug: string;
}

interface Category {
  id: string;
  label: string;
  description: string;
  icon: ComponentType<{ size?: string | number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  viewAllHref: string;
  count: number;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    id: "loans",
    label: "Loans",
    description: "EMI, eligibility & prepayment calculators for every loan type",
    icon: IconBuildingBank,
    color: "text-cat-loan",
    bgColor: "bg-cat-loan/10",
    borderColor: "border-cat-loan",
    viewAllHref: "/all-tools/?category=loan-emi",
    count: 18,
    tools: [
      { name: "Home Loan EMI", slug: "home-loan-emi-calculator" },
      { name: "Personal Loan EMI", slug: "personal-loan-emi-calculator" },
      { name: "Car Loan EMI", slug: "car-loan-emi-calculator" },
      { name: "Loan Against Property", slug: "loan-against-property-calculator" },
      { name: "Loan Prepayment", slug: "loan-prepayment-calculator" },
      { name: "Loan Eligibility", slug: "loan-eligibility-calculator" },
      { name: "Business Loan EMI", slug: "business-loan-emi-calculator" },
      { name: "Education Loan EMI", slug: "education-loan-emi-calculator" },
      { name: "Top-up Loan EMI", slug: "top-up-loan-emi-calculator" },
    ],
  },
  {
    id: "investment",
    label: "Investment",
    description: "SIP, FD, PPF and all your investment return calculators",
    icon: IconTrendingUp,
    color: "text-cat-investment",
    bgColor: "bg-cat-investment/10",
    borderColor: "border-cat-investment",
    viewAllHref: "/all-tools/?category=investment",
    count: 20,
    tools: [
      { name: "SIP Calculator", slug: "sip-calculator" },
      { name: "Lumpsum Calculator", slug: "lumpsum-calculator" },
      { name: "Step-up SIP", slug: "step-up-sip-calculator" },
      { name: "SWP Calculator", slug: "swp-calculator" },
      { name: "FD Calculator", slug: "fd-calculator" },
      { name: "RD Calculator", slug: "rd-calculator" },
      { name: "PPF Calculator", slug: "ppf-calculator" },
      { name: "ELSS Calculator", slug: "elss-calculator" },
      { name: "Compound Interest", slug: "compound-interest-calculator" },
    ],
  },
  {
    id: "tax",
    label: "Tax",
    description: "Income tax, TDS, HRA and capital gains calculators",
    icon: IconReceipt2,
    color: "text-cat-tax",
    bgColor: "bg-cat-tax/10",
    borderColor: "border-cat-tax",
    viewAllHref: "/all-tools/?category=tax",
    count: 15,
    tools: [
      { name: "Income Tax Calculator", slug: "income-tax-calculator" },
      { name: "HRA Exemption", slug: "hra-exemption-calculator" },
      { name: "TDS Calculator", slug: "tds-calculator" },
      { name: "Capital Gains Tax", slug: "capital-gains-tax-calculator" },
      { name: "80C Deductions", slug: "80c-deduction-calculator" },
      { name: "Advance Tax", slug: "advance-tax-calculator" },
    ],
  },
  {
    id: "retirement",
    label: "Retirement",
    description: "Plan your retirement corpus, NPS, EPF and FIRE goals",
    icon: IconPigMoney,
    color: "text-cat-retirement",
    bgColor: "bg-cat-retirement/10",
    borderColor: "border-cat-retirement",
    viewAllHref: "/all-tools/?category=retirement",
    count: 13,
    tools: [
      { name: "Retirement Corpus", slug: "retirement-corpus-calculator" },
      { name: "NPS Calculator", slug: "nps-calculator" },
      { name: "EPF Calculator", slug: "epf-calculator" },
      { name: "FIRE Calculator", slug: "fire-calculator" },
      { name: "Gratuity Calculator", slug: "gratuity-calculator" },
      { name: "Superannuation", slug: "superannuation-calculator" },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    description: "Calculate the right cover for life, health and term insurance",
    icon: IconShieldCheck,
    color: "text-cat-insurance",
    bgColor: "bg-cat-insurance/10",
    borderColor: "border-cat-insurance",
    viewAllHref: "/all-tools/?category=insurance",
    count: 10,
    tools: [
      { name: "Life Insurance Cover", slug: "life-insurance-calculator" },
      { name: "Term Insurance", slug: "term-insurance-calculator" },
      { name: "Health Insurance", slug: "health-insurance-calculator" },
      { name: "Child Education Cover", slug: "child-education-insurance-calculator" },
      { name: "Critical Illness Cover", slug: "critical-illness-calculator" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    description: "Home buying, rental yield, stamp duty and affordability tools",
    icon: IconHome,
    color: "text-cat-realestate",
    bgColor: "bg-cat-realestate/10",
    borderColor: "border-cat-realestate",
    viewAllHref: "/all-tools/?category=realestate",
    count: 12,
    tools: [
      { name: "Rent vs Buy", slug: "rent-vs-buy-calculator" },
      { name: "Stamp Duty", slug: "stamp-duty-calculator" },
      { name: "Property ROI", slug: "property-roi-calculator" },
      { name: "Home Affordability", slug: "home-affordability-calculator" },
      { name: "Rental Yield", slug: "rental-yield-calculator" },
    ],
  },
  {
    id: "business",
    label: "Business",
    description: "GST, break-even, ROI and business finance calculators",
    icon: IconBriefcase,
    color: "text-cat-business",
    bgColor: "bg-cat-business/10",
    borderColor: "border-cat-business",
    viewAllHref: "/all-tools/?category=business",
    count: 12,
    tools: [
      { name: "GST Calculator", slug: "gst-calculator" },
      { name: "Break-even Calculator", slug: "break-even-calculator" },
      { name: "ROI Calculator", slug: "roi-calculator" },
      { name: "Profit Margin", slug: "profit-margin-calculator" },
      { name: "Invoice Generator", slug: "invoice-calculator" },
    ],
  },
  {
    id: "personal",
    label: "Personal Finance",
    description: "Budget, salary, net worth and savings goal planners",
    icon: IconWallet,
    color: "text-cat-personal",
    bgColor: "bg-cat-personal/10",
    borderColor: "border-cat-personal",
    viewAllHref: "/all-tools/?category=personal",
    count: 15,
    tools: [
      { name: "Budget Planner", slug: "budget-planner" },
      { name: "Salary Calculator", slug: "salary-calculator" },
      { name: "Net Worth Calculator", slug: "net-worth-calculator" },
      { name: "Inflation Calculator", slug: "inflation-calculator" },
      { name: "Emergency Fund", slug: "emergency-fund-calculator" },
      { name: "Savings Goal", slug: "savings-goal-calculator" },
    ],
  },
  {
    id: "stocks",
    label: "Stocks",
    description: "P&L, brokerage, SIP vs lumpsum and mutual fund calculators",
    icon: IconChartBar,
    color: "text-cat-stocks",
    bgColor: "bg-cat-stocks/10",
    borderColor: "border-cat-stocks",
    viewAllHref: "/all-tools/?category=stocks",
    count: 10,
    tools: [
      { name: "Stock P&L Calculator", slug: "stock-pl-calculator" },
      { name: "Brokerage Calculator", slug: "brokerage-calculator" },
      { name: "SIP vs Lumpsum", slug: "sip-vs-lumpsum-calculator" },
      { name: "Mutual Fund Returns", slug: "mutual-fund-returns-calculator" },
      { name: "CAGR Calculator", slug: "cagr-calculator" },
    ],
  },
  {
    id: "currency",
    label: "Currency",
    description: "Live and historical currency conversion for all major pairs",
    icon: IconCurrencyDollar,
    color: "text-cat-currency",
    bgColor: "bg-cat-currency/10",
    borderColor: "border-cat-currency",
    viewAllHref: "/all-tools/?category=currency",
    count: 8,
    tools: [
      { name: "Currency Converter", slug: "currency-converter" },
      { name: "USD to INR", slug: "usd-to-inr-calculator" },
      { name: "EUR to INR", slug: "eur-to-inr-calculator" },
      { name: "GBP to INR", slug: "gbp-to-inr-calculator" },
    ],
  },
  {
    id: "economics",
    label: "Economics",
    description: "Inflation, GDP, purchasing power and macroeconomic tools",
    icon: IconWorld,
    color: "text-cat-economics",
    bgColor: "bg-cat-economics/10",
    borderColor: "border-cat-economics",
    viewAllHref: "/all-tools/?category=economics",
    count: 8,
    tools: [
      { name: "Inflation Calculator", slug: "inflation-calculator" },
      { name: "Rule of 72", slug: "rule-of-72-calculator" },
      { name: "Purchasing Power", slug: "purchasing-power-calculator" },
      { name: "CPI Calculator", slug: "cpi-calculator" },
    ],
  },
  {
    id: "math",
    label: "Math",
    description: "Percentage, ratio, averages and everyday number tools",
    icon: IconCalculator,
    color: "text-cat-math",
    bgColor: "bg-cat-math/10",
    borderColor: "border-cat-math",
    viewAllHref: "/all-tools/?category=math",
    count: 10,
    tools: [
      { name: "Percentage Calculator", slug: "percentage-calculator" },
      { name: "Ratio Calculator", slug: "ratio-calculator" },
      { name: "Average Calculator", slug: "average-calculator" },
      { name: "Square Root Calculator", slug: "square-root-calculator" },
      { name: "HCF & LCM Calculator", slug: "hcf-lcm-calculator" },
    ],
  },
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
  const [activeId, setActiveId] = useState("loans");
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const ActiveIcon = active.icon;

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 bg-surface border-b border-border shadow-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-page mx-auto flex">
        {/* Left rail — category list */}
        <div className="w-52 shrink-0 border-r border-border bg-page py-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors ${
                  isActive
                    ? `bg-surface border-r-2 ${cat.borderColor} ${cat.color} font-medium`
                    : "text-ink-secondary hover:bg-surface hover:text-ink-primary"
                }`}
                onMouseEnter={() => setActiveId(cat.id)}
                onClick={() => setActiveId(cat.id)}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded shrink-0 ${
                    isActive ? cat.bgColor : "bg-border-subtle"
                  }`}
                >
                  <Icon
                    size={13}
                    className={isActive ? cat.color : "text-ink-muted"}
                  />
                </span>
                <span className="text-sm truncate">{cat.label}</span>
                {isActive && (
                  <IconChevronRight size={13} className="ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right panel — tools for active category */}
        <div className="flex-1 px-8 py-5">
          {/* Panel header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-lg ${active.bgColor}`}
              >
                <ActiveIcon size={18} className={active.color} />
              </span>
              <div>
                <h3 className={`text-h4 font-semibold ${active.color}`}>
                  {active.label}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  {active.description}
                </p>
              </div>
            </div>
            <Link
              href={active.viewAllHref}
              className="shrink-0 text-sm font-medium text-brand-primary hover:text-brand-primaryDark transition-colors"
              onClick={onClose}
            >
              View all {active.count} →
            </Link>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-3 gap-1">
            {active.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}/`}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-ink-secondary hover:text-brand-primary hover:bg-brand-primaryLight transition-colors group"
                onClick={onClose}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${active.bgColor} group-hover:${active.bgColor}`}
                  style={{ backgroundColor: "currentColor", opacity: 0.5 }}
                />
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
