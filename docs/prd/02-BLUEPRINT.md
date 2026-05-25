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
calcyourfinance.com/terms/                     → Terms of Use
calcyourfinance.com/sitemap.xml               → Auto-generated sitemap
calcyourfinance.com/robots.txt                → Static
```

Trailing slashes everywhere for consistency. Configure Next.js with `trailingSlash: true`.

---

## All 200 calculators

Each calculator entry has: `name`, `slug`, `category`, `description`, `keywords`, `relatedSlugs[]`, `articleSlugs[]`, popularity flags.

**Category count summary:**

| Category | Count |
|----------|-------|
| Loan & EMI | 24 |
| Investment | 24 |
| Tax | 20 |
| Retirement | 16 |
| Insurance | 12 |
| Business | 18 |
| Currency & FX | 10 |
| Real Estate | 14 |
| Personal Finance | 18 |
| Stocks & Crypto | 16 |
| Economics | 12 |
| Financial Math | 16 |
| **Total** | **200** |

---

### Category 1 — Loan & EMI (24 tools)

| Name | Slug | Notes |
|------|------|-------|
| EMI Calculator | `emi-calculator` | Generic loan EMI |
| Home Loan EMI Calculator | `home-loan-emi-calculator` | Mortgage EMI |
| Car Loan EMI Calculator | `car-loan-emi-calculator` | Auto loan |
| Personal Loan EMI Calculator | `personal-loan-emi-calculator` | Unsecured loan |
| Education Loan EMI Calculator | `education-loan-emi-calculator` | Student loan |
| Business Loan EMI Calculator | `business-loan-emi-calculator` | Business loan |
| Loan Comparison Calculator | `loan-comparison-calculator` | Compare 2 loans side by side |
| Loan Prepayment Calculator | `loan-prepayment-calculator` | Early payoff savings |
| Loan Affordability Calculator | `loan-affordability-calculator` | Max loan eligibility |
| Debt-to-Income Ratio Calculator | `debt-to-income-ratio-calculator` | DTI ratio |
| Loan Refinance Calculator | `loan-refinance-calculator` | Refi break-even |
| Balloon Loan Calculator | `balloon-loan-calculator` | Final balloon payment |
| Interest-Only Loan Calculator | `interest-only-loan-calculator` | IO period calculator |
| Amortization Schedule Calculator | `amortization-schedule-calculator` | Full payment schedule table |
| Loan Payoff Calculator | `loan-payoff-calculator` | Time to pay off loan |
| Credit Card Payoff Calculator | `credit-card-payoff-calculator` | CC debt elimination |
| Debt Avalanche vs Snowball Calculator | `debt-avalanche-snowball-calculator` | Best debt payoff strategy |
| Debt Consolidation Calculator | `debt-consolidation-calculator` | Consolidation savings |
| Two Wheeler Loan EMI Calculator | `two-wheeler-loan-emi-calculator` | Bike/scooter loan |
| Loan Against Property Calculator | `loan-against-property-calculator` | LAP eligibility and EMI |
| Top-Up Loan Calculator | `top-up-loan-calculator` | Additional loan on existing home loan |
| Moratorium Impact Calculator | `moratorium-impact-calculator` | EMI moratorium cost impact |
| Loan Against Gold Calculator | `loan-against-gold-calculator` | Gold loan eligibility and EMI |
| Part Payment Calculator | `part-payment-calculator` | Impact of partial loan payments |

---

### Category 2 — Investment (24 tools)

| Name | Slug | Notes |
|------|------|-------|
| SIP Calculator | `sip-calculator` | Systematic Investment Plan returns |
| SIP Step-Up Calculator | `sip-step-up-calculator` | SIP with annual increase |
| SWP Calculator | `swp-calculator` | Systematic Withdrawal Plan |
| SIP vs Lumpsum Calculator | `sip-vs-lumpsum-calculator` | Compare both strategies |
| SWP vs SIP Comparison | `swp-vs-sip-calculator` | Withdrawal vs investment |
| Lumpsum Calculator | `lumpsum-calculator` | One-time investment returns |
| CAGR Calculator | `cagr-calculator` | Compound annual growth rate |
| FD Calculator | `fd-calculator` | Fixed deposit maturity |
| RD Calculator | `rd-calculator` | Recurring deposit maturity |
| PPF Calculator | `ppf-calculator` | Public Provident Fund returns |
| Mutual Fund Returns Calculator | `mutual-fund-returns-calculator` | MF investment growth |
| ELSS Calculator | `elss-calculator` | Equity-linked savings scheme |
| Sukanya Samriddhi Calculator | `sukanya-samriddhi-calculator` | SSY scheme returns |
| NSC Calculator | `nsc-calculator` | National Savings Certificate |
| Post Office MIS Calculator | `post-office-mis-calculator` | Monthly Income Scheme |
| Post Office RD Calculator | `post-office-rd-calculator` | Post Office recurring deposit |
| XIRR Calculator | `xirr-calculator` | Extended internal rate of return |
| IRR Calculator | `irr-calculator` | Internal rate of return |
| NPV Calculator | `npv-calculator` | Net present value |
| Rule of 72 Calculator | `rule-of-72-calculator` | Investment doubling time |
| Kisan Vikas Patra Calculator | `kisan-vikas-patra-calculator` | KVP maturity value |
| Senior Citizen Savings Scheme Calculator | `scss-calculator` | SCSS returns for senior citizens |
| Gold Investment Return Calculator | `gold-investment-return-calculator` | Gold price return over time |
| Sovereign Gold Bond Calculator | `sovereign-gold-bond-calculator` | SGB returns vs physical gold |

---

### Category 3 — Tax (20 tools)

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
| Advance Tax Calculator | `advance-tax-calculator` | india-advance-tax |
| Effective Tax Rate Calculator | `effective-tax-rate-calculator` | both regimes |
| Salary vs CTC Calculator | `salary-vs-ctc-calculator` | india-payroll-rules |
| Take-Home Salary Calculator India | `take-home-salary-calculator-india` | india-payroll-rules |
| Crypto Tax Calculator India | `crypto-tax-calculator-india` | india-crypto-tax |
| Income Tax Calculator UK | `income-tax-calculator-uk` | uk-tax-bands |
| Tax Saving Calculator | `tax-saving-calculator` | india-section-80c, india-section-80d |
| Section 80G Deduction Calculator | `section-80g-calculator` | Charitable donation deduction |
| Gratuity Tax Calculator | `gratuity-tax-calculator` | Tax on gratuity received |

---

### Category 4 — Retirement (16 tools)

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
| EPF vs NPS Comparison | `epf-vs-nps-calculator` | india-epf-rates, india-nps-rates |
| Coast FIRE Calculator | `coast-fire-calculator` | none |
| Lean FIRE Calculator | `lean-fire-calculator` | Minimalist early retirement |
| IRA Calculator | `ira-calculator` | US individual retirement account |

---

### Category 5 — Insurance (12 tools)

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
| Human Life Value Calculator | `human-life-value-calculator` |
| Insurance Needs Calculator | `insurance-needs-calculator` |

---

### Category 6 — Business (18 tools)

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
| Business Valuation Calculator | `business-valuation-calculator` |
| Accounts Receivable Turnover Calculator | `accounts-receivable-turnover-calculator` |
| Customer Acquisition Cost Calculator | `customer-acquisition-cost-calculator` |
| Lifetime Value Calculator | `lifetime-value-calculator` |

---

### Category 7 — Currency & FX (10 tools)

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
| Foreign Remittance Cost Calculator | `foreign-remittance-cost-calculator` |
| Exchange Rate Profit/Loss Calculator | `exchange-rate-profit-loss-calculator` |

---

### Category 8 — Real Estate (14 tools)

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
| Capital Gains on Property Calculator | `property-capital-gains-calculator` |
| Home Loan Eligibility Calculator | `home-loan-eligibility-calculator` |
| Lease vs Buy Calculator | `lease-vs-buy-calculator` |
| Real Estate IRR Calculator | `real-estate-irr-calculator` |
| Property Registration Cost Calculator | `property-registration-cost-calculator` |
| Real Estate vs Mutual Fund Calculator | `real-estate-vs-mutual-fund-calculator` |

---

### Category 9 — Personal Finance (18 tools)

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
| Leave Encashment Calculator | `leave-encashment-calculator` |
| Daily Interest Calculator | `daily-interest-calculator` |
| Household Budget Calculator | `household-budget-calculator` |
| Salary Increment Calculator | `salary-increment-calculator` |

---

### Category 10 — Stocks & Crypto (16 tools)

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
| Stock Average Price Calculator | `stock-average-price-calculator` |
| Options Profit/Loss Calculator | `options-profit-loss-calculator` |
| Crypto Tax Calculator | `crypto-tax-calculator` |
| Dividend Yield Calculator | `dividend-yield-calculator` |
| PE vs PB Ratio Comparison | `pe-vs-pb-ratio-calculator` |
| Portfolio Rebalancing Calculator | `portfolio-rebalancing-calculator` |

---

### Category 11 — Economics (12 tools)

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
| Real Interest Rate Calculator | `real-interest-rate-calculator` |
| Inflation Impact on Savings Calculator | `inflation-impact-savings-calculator` |

---

### Category 12 — Financial Math (16 tools)

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
| Price-to-Book Ratio Calculator | `price-to-book-ratio-calculator` |
| Debt-to-Equity Ratio Calculator | `debt-to-equity-ratio-calculator` |
| Current Ratio Calculator | `current-ratio-calculator` |
| Return on Equity Calculator | `return-on-equity-calculator` |

---

**Total: 200 calculators across 12 categories**

---

## Blog seed articles (12 at launch — one per category)

> **Article roadmap (added 2026-05-25):** 12 at launch is only the start. The long-term target is **~1 companion article per calculator** for internal-linking density and topical authority — the single strongest lever for organic ranking. Cadence: 4–6 articles/month → ~60–72 by month 12 → approaching 200+ by month 24. Each calculator's `articleSlugs[]` grows to 1–3 entries over time. Post-launch, every new calculator ships with its companion article in the same PR. This is post-launch ops, not part of the Day-6→Week-4 build.

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

Two-panel floating dropdown. See `03-DESIGN-SYSTEM.md` for full visual spec.

- Left panel: all 12 categories listed vertically with name + count + chevron. Active category highlighted with 3px blue left border.
- Right panel: all tools for active category shown as clean 3-column list rows (tool name + sub-label stacked, no boxes or borders around individual rows). Updates on hover.
- Trending strip above panels: 5 hardcoded trending pill tags.
- Footer strip below panels: total count left, "View all N [Category] tools →" right — links to `/all-tools/?category=[slug]`

**Click behavior for "View all N →":**
- Links to `/all-tools/?category=[category-slug]`
- The All Tools page reads the `?category=` query param on mount
- It auto-activates that category's filter pill
- It auto-scrolls to that category's section header

### Footer — identical on every page

White background (`bg-surface`) with a top border (`border-t border-border`) — NOT dark blue. Per CLAUDE.md, brand color is functional-only (buttons, links, active states), so the footer ground stays white; links use `text-brand-primary`. 4-column grid (2 columns on mobile):

- Column 1 (wider): Logo + tagline "Free finance calculators for every money decision. No sign-up required." + dynamic copyright `© {new Date().getFullYear()} CalcYourFinance. All rights reserved.`
- Column 2 **Calculators**: Loan & EMI, Investment, Tax, Retirement, All 200+ Calculators (links to the All Tools page filtered by each category)
- Column 3 **Popular Tools**: EMI, SIP, Income Tax, FD, Home Loan EMI (direct links to the highest-traffic calculators)
- Column 4 **Company** (About, Blog, Contact) + **Legal** (Privacy Policy, Disclaimer, Terms of Use), stacked

Bottom strip (separated by a thin top border): a single centered disclaimer — "All calculators provide estimates for informational purposes only. Not financial advice. Consult a qualified financial advisor before making any investment or financial decisions."

The copyright year is dynamic: `{new Date().getFullYear()}`.

**Legal pages (REVISED 2026-05-25):** Legal = Privacy Policy + Disclaimer + **Terms of Use**. The Terms page is **required**, not omitted — the live `calcyourfinance.com` MVP (currently under AdSense review) already has a Terms page, so the new build must keep legal-page parity before any domain swap to avoid breaking AdSense compliance. (This reverses the earlier "Terms omitted" decision.) **Deferred:** add a **Sitemap** link to the Company group once `/sitemap.xml` is generated (Day 26 — until then it would be a dead link).

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
  // all 200 entries
];
```

### `/src/data/categories.ts`

```typescript
export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;     // hex — data only, not rendered visually except mega menu active border
  icon: string;      // Tabler icon name
  count: number;     // must match actual calculator count for this category
}

export const categories: Category[] = [
  { name: 'Loan & EMI', slug: 'loan-emi', color: '#1B4FD8', icon: 'IconCalculator', description: 'Loan EMI, repayment, and debt management tools', count: 24 },
  { name: 'Investment', slug: 'investment', color: '#0EA5E9', icon: 'IconTrendingUp', description: 'SIP, mutual fund, FD, PPF and other investment tools', count: 24 },
  { name: 'Tax', slug: 'tax', color: '#8B5CF6', icon: 'IconReceiptTax', description: 'Income tax, GST, capital gains and deductions', count: 20 },
  { name: 'Retirement', slug: 'retirement', color: '#10B981', icon: 'IconUmbrella', description: 'EPF, NPS, FIRE and retirement planning', count: 16 },
  { name: 'Insurance', slug: 'insurance', color: '#F59E0B', icon: 'IconShieldCheck', description: 'Term, health, life and other insurance estimators', count: 12 },
  { name: 'Business', slug: 'business', color: '#EF4444', icon: 'IconBriefcase', description: 'Break-even, profit, valuation and SaaS metrics', count: 18 },
  { name: 'Currency & FX', slug: 'currency-fx', color: '#06B6D4', icon: 'IconCurrencyDollar', description: 'Live exchange rates and forex tools', count: 10 },
  { name: 'Real Estate', slug: 'real-estate', color: '#84CC16', icon: 'IconHome', description: 'Mortgage, rent vs buy, stamp duty and property ROI', count: 14 },
  { name: 'Personal Finance', slug: 'personal-finance', color: '#EC4899', icon: 'IconWallet', description: 'Budget, savings, net worth and life goal tools', count: 18 },
  { name: 'Stocks & Crypto', slug: 'stocks-crypto', color: '#F97316', icon: 'IconChartCandle', description: 'Stock P&L, crypto, DCA and trading tools', count: 16 },
  { name: 'Economics', slug: 'economics', color: '#6366F1', icon: 'IconWorld', description: 'Inflation, GDP, APR vs APY and rate conversions', count: 12 },
  { name: 'Financial Math', slug: 'financial-math', color: '#0EA5E9', icon: 'IconMath', description: 'Compound interest, percentages, WACC, Black-Scholes', count: 16 },
];
```