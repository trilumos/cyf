# 02 — Site Blueprint

## URL structure

```
calcyourfinance.com/                          → Homepage
calcyourfinance.com/all-tools/                → All Tools page
calcyourfinance.com/calculators/[slug]/       → Individual calculator pages
calcyourfinance.com/blog/                     → Blog listing page
calcyourfinance.com/blog/[slug]/              → Individual article pages
calcyourfinance.com/about/                    → About page
calcyourfinance.com/contact/                  → Contact page
calcyourfinance.com/privacy-policy/           → Privacy Policy
calcyourfinance.com/disclaimer/               → Disclaimer
calcyourfinance.com/sitemap.xml               → Auto-generated sitemap
calcyourfinance.com/robots.txt                → Static
```

Trailing slashes everywhere for consistency. Configure Next.js with `trailingSlash: true`.

---

## All 204 calculators

Each calculator entry has: `name`, `slug`, `category`, `description`, `keywords`, `relatedSlugs[]`, `articleSlugs[]`, popularity flags.

### Category 1 — Loan & EMI (18 tools)

| Name | Slug | Notes |
|------|------|-------|
| EMI Calculator | `emi-calculator` | Generic loan EMI |
| Home Loan EMI Calculator | `home-loan-emi-calculator` | Mortgage EMI |
| Car Loan EMI Calculator | `car-loan-emi-calculator` | Auto loan |
| Personal Loan EMI Calculator | `personal-loan-emi-calculator` | Unsecured loan |
| Education Loan EMI Calculator | `education-loan-emi-calculator` | Student loan |
| Business Loan EMI Calculator | `business-loan-emi-calculator` | Business loan |
| Loan Comparison Calculator | `loan-comparison-calculator` | Compare 2 loans |
| Loan Prepayment Calculator | `loan-prepayment-calculator` | Early payoff savings |
| Loan Affordability Calculator | `loan-affordability-calculator` | Max loan eligibility |
| Debt-to-Income Ratio Calculator | `debt-to-income-ratio-calculator` | DTI |
| Loan Refinance Calculator | `loan-refinance-calculator` | Refi break-even |
| Balloon Loan Calculator | `balloon-loan-calculator` | Final balloon payment |
| Interest-Only Loan Calculator | `interest-only-loan-calculator` | IO period |
| Amortization Schedule Calculator | `amortization-schedule-calculator` | Full table |
| Loan Payoff Calculator | `loan-payoff-calculator` | Time to payoff |
| Credit Card Payoff Calculator | `credit-card-payoff-calculator` | CC debt |
| Debt Avalanche vs Snowball Calculator | `debt-avalanche-snowball-calculator` | Strategy compare |
| Debt Consolidation Calculator | `debt-consolidation-calculator` | Consolidation savings |

### Category 2 — Investment (20 tools)

| Name | Slug |
|------|------|
| SIP Calculator | `sip-calculator` |
| SIP Step-Up Calculator | `sip-step-up-calculator` |
| SWP Calculator | `swp-calculator` |
| SIP vs Lumpsum Calculator | `sip-vs-lumpsum-calculator` |
| SWP vs SIP Comparison | `swp-vs-sip-calculator` |
| Lumpsum Calculator | `lumpsum-calculator` |
| CAGR Calculator | `cagr-calculator` |
| FD Calculator | `fd-calculator` |
| RD Calculator | `rd-calculator` |
| PPF Calculator | `ppf-calculator` |
| Mutual Fund Returns Calculator | `mutual-fund-returns-calculator` |
| ELSS Calculator | `elss-calculator` |
| Sukanya Samriddhi Calculator | `sukanya-samriddhi-calculator` |
| NSC Calculator | `nsc-calculator` |
| Post Office MIS Calculator | `post-office-mis-calculator` |
| Post Office RD Calculator | `post-office-rd-calculator` |
| XIRR Calculator | `xirr-calculator` |
| IRR Calculator | `irr-calculator` |
| NPV Calculator | `npv-calculator` |
| Rule of 72 Calculator | `rule-of-72-calculator` |

### Category 3 — Tax (16 tools)

| Name | Slug | Requires JSON file |
|------|------|---------------------|
| Income Tax Calculator India | `income-tax-calculator-india` | india-tax-old-regime, india-tax-new-regime |
| Income Tax Calculator US | `income-tax-calculator-us` | us-tax-brackets |
| Old vs New Tax Regime Calculator | `old-vs-new-tax-regime-calculator` | both India regimes |
| Capital Gains Tax Calculator | `capital-gains-tax-calculator` | india-capital-gains |
| GST Calculator | `gst-calculator` | india-gst-rates |
| VAT Calculator | `vat-calculator` | eu-vat-rates |
| TDS Calculator | `tds-calculator` | india-tds-rates |
| HRA Exemption Calculator | `hra-exemption-calculator` | india-tax-old-regime |
| Section 80C Deductions Calculator | `section-80c-calculator` | india-section-80c |
| Section 80D Calculator | `section-80d-calculator` | india-section-80d |
| Section 24 Home Loan Calculator | `section-24-calculator` | india-section-24 |
| Advance Tax Calculator | `advance-tax-calculator` | india-tax-current-regime |
| Effective Tax Rate Calculator | `effective-tax-rate-calculator` | both regimes |
| Salary vs CTC Calculator | `salary-vs-ctc-calculator` | india-payroll-rules |
| Take-Home Salary Calculator India | `take-home-salary-calculator-india` | india-payroll-rules |
| Crypto Tax Calculator India | `crypto-tax-calculator-india` | india-crypto-tax |

### Category 4 — Retirement (12 tools)

| Name | Slug | Requires JSON |
|------|------|---------------|
| Retirement Corpus Calculator | `retirement-corpus-calculator` | none (math) |
| EPF Calculator | `epf-calculator` | india-epf-rates |
| NPS Calculator | `nps-calculator` | india-nps-rates |
| NPS Tier 1 vs Tier 2 Calculator | `nps-tier-1-vs-tier-2-calculator` | india-nps-rates |
| 401k Calculator | `401k-calculator` | us-401k-limits |
| Pension Calculator | `pension-calculator` | none |
| FIRE Number Calculator | `fire-number-calculator` | none |
| Safe Withdrawal Rate Calculator | `safe-withdrawal-rate-calculator` | none |
| Retirement Age Calculator | `retirement-age-calculator` | none |
| Social Security Estimator | `social-security-estimator` | us-social-security |
| Annuity Calculator | `annuity-calculator` | none |
| Inflation-Adjusted Retirement Calculator | `inflation-adjusted-retirement-calculator` | cpi-india or cpi-us |

### Category 5 — Insurance (10 tools)

| Name | Slug |
|------|------|
| Life Insurance Cover Calculator | `life-insurance-cover-calculator` |
| Term Insurance Premium Calculator | `term-insurance-premium-calculator` |
| Health Insurance Premium Calculator | `health-insurance-premium-calculator` |
| Car Insurance Premium Calculator | `car-insurance-premium-calculator` |
| Home Insurance Estimator | `home-insurance-estimator` |
| Critical Illness Cover Calculator | `critical-illness-cover-calculator` |
| Child Plan Calculator | `child-plan-calculator` |
| ULIPs vs Term + MF Calculator | `ulips-vs-term-mf-calculator` |
| Surrender Value Calculator | `surrender-value-calculator` |
| Premium vs Cover Comparison | `premium-vs-cover-comparison` |

### Category 6 — Business (14 tools)

| Name | Slug |
|------|------|
| Break-Even Calculator | `break-even-calculator` |
| Profit Margin Calculator | `profit-margin-calculator` |
| Markup Calculator | `markup-calculator` |
| ROI Calculator | `roi-calculator` |
| Working Capital Calculator | `working-capital-calculator` |
| Burn Rate Calculator | `burn-rate-calculator` |
| Runway Calculator | `runway-calculator` |
| Employee Cost Calculator | `employee-cost-calculator` |
| Payroll Calculator | `payroll-calculator` |
| GST Invoice Calculator | `gst-invoice-calculator` |
| Revenue Forecast Calculator | `revenue-forecast-calculator` |
| DCF Valuation Calculator | `dcf-valuation-calculator` |
| SaaS Metrics Calculator | `saas-metrics-calculator` |
| Debt Service Coverage Ratio Calculator | `dscr-calculator` |

### Category 7 — Currency & FX (8 tools)

| Name | Slug |
|------|------|
| Currency Converter | `currency-converter` |
| Historical FX Calculator | `historical-fx-calculator` |
| Cross Rate Calculator | `cross-rate-calculator` |
| Forex Pip Calculator | `forex-pip-calculator` |
| Travel Money Calculator | `travel-money-calculator` |
| Purchasing Power Parity Calculator | `purchasing-power-parity-calculator` |
| Inflation Calculator | `inflation-calculator` |
| Cost of Living Comparison | `cost-of-living-comparison` |

### Category 8 — Real Estate (12 tools)

| Name | Slug |
|------|------|
| Home Affordability Calculator | `home-affordability-calculator` |
| Mortgage EMI Calculator | `mortgage-emi-calculator` |
| Down Payment Calculator | `down-payment-calculator` |
| Rent vs Buy Calculator | `rent-vs-buy-calculator` |
| Rental Yield Calculator | `rental-yield-calculator` |
| Property ROI Calculator | `property-roi-calculator` |
| Stamp Duty Calculator | `stamp-duty-calculator` |
| Property Tax Calculator | `property-tax-calculator` |
| Capital Gains on Property | `property-capital-gains-calculator` |
| Home Loan Eligibility Calculator | `home-loan-eligibility-calculator` |
| Lease vs Buy Calculator | `lease-vs-buy-calculator` |
| Real Estate IRR Calculator | `real-estate-irr-calculator` |

### Category 9 — Personal Finance (14 tools)

| Name | Slug |
|------|------|
| Budget Planner Calculator | `budget-planner-calculator` |
| Emergency Fund Calculator | `emergency-fund-calculator` |
| Net Worth Calculator | `net-worth-calculator` |
| Savings Goal Calculator | `savings-goal-calculator` |
| 50/30/20 Rule Calculator | `50-30-20-rule-calculator` |
| Cost of Credit Card Calculator | `cost-of-credit-card-calculator` |
| Balance Transfer Calculator | `balance-transfer-calculator` |
| Wedding Budget Calculator | `wedding-budget-calculator` |
| Car Ownership Cost Calculator | `car-ownership-cost-calculator` |
| Child Education Cost Calculator | `child-education-cost-calculator` |
| College Savings Calculator | `college-savings-calculator` |
| Vacation Savings Calculator | `vacation-savings-calculator` |
| Major Purchase Savings Calculator | `major-purchase-savings-calculator` |
| Gratuity Calculator | `gratuity-calculator` |

### Category 10 — Stocks & Crypto (10 tools)

| Name | Slug |
|------|------|
| Stock Profit/Loss Calculator | `stock-profit-loss-calculator` |
| Average Down Calculator | `average-down-calculator` |
| Dollar-Cost Averaging Calculator | `dollar-cost-averaging-calculator` |
| Crypto Profit/Loss Calculator | `crypto-profit-loss-calculator` |
| Portfolio Allocation Calculator | `portfolio-allocation-calculator` |
| Brokerage Fee Calculator | `brokerage-fee-calculator` |
| Dividend Reinvestment Calculator | `dividend-reinvestment-calculator` |
| Stock Intrinsic Value Calculator | `stock-intrinsic-value-calculator` |
| Sharpe Ratio Calculator | `sharpe-ratio-calculator` |
| LTCG & STCG Calculator | `ltcg-stcg-calculator` |

### Category 11 — Economics (10 tools)

| Name | Slug |
|------|------|
| CPI Inflation Calculator | `cpi-inflation-calculator` |
| GDP Growth Calculator | `gdp-growth-calculator` |
| APR vs APY Calculator | `apr-vs-apy-calculator` |
| Effective Interest Rate Calculator | `effective-interest-rate-calculator` |
| Rule of 70 Calculator | `rule-of-70-calculator` |
| Money Multiplier Calculator | `money-multiplier-calculator` |
| Real vs Nominal Return Calculator | `real-vs-nominal-return-calculator` |
| Time Value of Money Calculator | `time-value-of-money-calculator` |
| Future Value Calculator | `future-value-calculator` |
| Present Value Calculator | `present-value-calculator` |

### Category 12 — Financial Math (12 tools)

| Name | Slug |
|------|------|
| Compound Interest Calculator | `compound-interest-calculator` |
| Simple Interest Calculator | `simple-interest-calculator` |
| Percentage Calculator | `percentage-calculator` |
| Percentage Change Calculator | `percentage-change-calculator` |
| Ratio Calculator | `ratio-calculator` |
| Weighted Average Calculator | `weighted-average-calculator` |
| Standard Deviation Calculator | `standard-deviation-calculator` |
| WACC Calculator | `wacc-calculator` |
| Beta Calculator | `beta-calculator` |
| Black-Scholes Calculator | `black-scholes-calculator` |
| EV/EBITDA Calculator | `ev-ebitda-calculator` |
| P/E Ratio Calculator | `pe-ratio-calculator` |

**Total: 204 calculators**

---

## Blog seed articles (12 at launch — one per category)

When writing these, use the **actual current year** in titles and content. Update the JSON below with the live year before creating.

| Title pattern | Slug pattern | Category |
|---------------|--------------|----------|
| SIP vs Lumpsum: Which strategy wins in [current year]? | `sip-vs-lumpsum-[year]` | Investment |
| Old vs New Tax Regime: Complete [current FY] comparison | `old-vs-new-tax-regime-[year]` | Tax |
| How to calculate your FIRE number in India | `fire-number-india` | Retirement |
| Should you prepay your home loan or invest? | `prepay-home-loan-or-invest` | Loans |
| How much term insurance cover do you actually need? | `term-insurance-cover-calculation` | Insurance |
| Break-even analysis: A simple guide for small businesses | `break-even-analysis-guide` | Business |
| How to budget your travel money across currencies | `travel-money-budgeting` | Currency |
| Rent vs buy: What the numbers actually say in [current year] | `rent-vs-buy-india-[year]` | Real Estate |
| The 50/30/20 budget rule explained with real examples | `50-30-20-budget-rule` | Personal Finance |
| What is XIRR and why it matters more than returns % | `what-is-xirr` | Stocks |
| APR vs APY: Why your savings account pays less than advertised | `apr-vs-apy-explained` | Economics |
| Compound interest explained: The most powerful force in finance | `compound-interest-explained` | Financial Math |

---

## Navigation structure

### Global navbar — identical on every single page, no exceptions

```
[CalcYourFinance logo] | [Home] [Calculators ▾] [Blog] [About]    [Search bar]    [All Tools →]
```

The navbar is a single component (`<Navbar />`) used by the global `<LayoutShell>`. Every page wraps in `<LayoutShell>`. This guarantees identical navbar everywhere — there is no scenario where a page can have a different navbar. The About link is always present.

### Mega dropdown — opens under "Calculators"

4-column grid:

- Column 1: **Loans** — top 4 calculators (EMI, Home Loan EMI, Car Loan EMI, Loan Comparison) + `View all 18 →`
- Column 2: **Investment** — top 4 (SIP, SWP, FD, CAGR) + `View all 20 →`
- Column 3: **Tax & Retirement** — top 4 (Income Tax, GST, FIRE, EPF) + `View all 28 →` (links to combined view)
- Column 4: **Trending now** (3 flame-icon items) + inline search box "Can't find it?"

**Click behavior for "View all N →":**
- Links to `/all-tools/?category=[category-slug]`
- The All Tools page reads the `?category=` query param on mount
- It auto-activates that category's filter pill
- It auto-scrolls to that category's section header
- It collapses other categories (or just highlights the active one with the others still visible — see All Tools page spec)

### Footer — identical on every page

Dark blue background (`#1B4FD8`). 4-column grid:

- Column 1 (wider): Logo + "Free finance calculators for everyone. No sign-up, no nonsense — just accurate answers in seconds."
- Column 2 **Calculators**: Loan & EMI, Investment, Tax, Retirement (links to All Tools page filtered by each category)
- Column 3 **Company**: About, Blog, Contact, Sitemap
- Column 4 **Legal**: Privacy Policy, Disclaimer, Terms of Use

Bottom bar (separated by thin border):
- Left: `© [current year] CalcYourFinance. All results are estimates only.`
- Right: `Not financial advice.`

The current year in the footer is dynamic: `{new Date().getFullYear()}`.

---

## Data file structure

### `/src/data/calculators.ts`

```typescript
export interface Calculator {
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  description: string;
  keywords: string[];
  relatedSlugs: string[];      // 4–6 sibling tools (same category)
  articleSlugs: string[];      // 1–3 related blog post slugs
  requiresLiveData?: string[]; // names of JSON files this calc depends on
  isPopular?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

export const calculators: Calculator[] = [
  // all 204 entries
];
```

### `/src/data/categories.ts`

```typescript
export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;     // hex for the category color dot
  icon: string;      // Tabler icon name
  count: number;     // computed at build time
}

export const categories: Category[] = [
  { name: 'Loan & EMI', slug: 'loan-emi', color: '#1B4FD8', icon: 'IconCalculator', description: 'Loan EMI, repayment, and debt management tools', count: 18 },
  { name: 'Investment', slug: 'investment', color: '#0EA5E9', icon: 'IconTrendingUp', description: 'SIP, mutual fund, FD, PPF and other investment tools', count: 20 },
  { name: 'Tax', slug: 'tax', color: '#8B5CF6', icon: 'IconReceiptTax', description: 'Income tax, GST, capital gains and deductions', count: 16 },
  { name: 'Retirement', slug: 'retirement', color: '#10B981', icon: 'IconUmbrella', description: 'EPF, NPS, FIRE and retirement planning', count: 12 },
  { name: 'Insurance', slug: 'insurance', color: '#F59E0B', icon: 'IconShieldCheck', description: 'Term, health, life and other insurance estimators', count: 10 },
  { name: 'Business', slug: 'business', color: '#EF4444', icon: 'IconBriefcase', description: 'Break-even, profit, valuation and SaaS metrics', count: 14 },
  { name: 'Currency & FX', slug: 'currency-fx', color: '#06B6D4', icon: 'IconCurrencyDollar', description: 'Live exchange rates and forex tools', count: 8 },
  { name: 'Real Estate', slug: 'real-estate', color: '#84CC16', icon: 'IconHome', description: 'Mortgage, rent vs buy, stamp duty and property ROI', count: 12 },
  { name: 'Personal Finance', slug: 'personal-finance', color: '#EC4899', icon: 'IconWallet', description: 'Budget, savings, net worth and life goal tools', count: 14 },
  { name: 'Stocks & Crypto', slug: 'stocks-crypto', color: '#F97316', icon: 'IconChartCandle', description: 'Stock P&L, crypto, DCA and trading tools', count: 10 },
  { name: 'Economics', slug: 'economics', color: '#6366F1', icon: 'IconWorld', description: 'Inflation, GDP, APR vs APY and rate conversions', count: 10 },
  { name: 'Financial Math', slug: 'financial-math', color: '#0EA5E9', icon: 'IconMath', description: 'Compound interest, percentages, WACC, Black-Scholes', count: 12 },
];
```
