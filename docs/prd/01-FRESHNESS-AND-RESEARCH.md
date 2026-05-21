# 01 — Freshness, Research & Current Data Rules

This document is the most important part of the PRD. A finance calculator site lives or dies on whether its data is current. Read this entire document before writing any calculator.

---

## The current date

Before you start any work session, run this in bash:

```bash
date "+%Y-%m-%d"
```

Use that date as the reference for all financial year calculations, "last updated" timestamps, blog post dates, and copyright years. **Never assume the year from your training data.**

For Indian financial years: April 1 to March 31. If today is between April 1 and March 31 of the next year, the current FY is `FY [year]-[next year]`.

For US tax years: January 1 to December 31, but tax filing happens the following April.

---

## Mandatory research workflow before writing each calculator

For every calculator that depends on real-world rates, follow this exact workflow:

### Step 1 — Identify required values
List every rate, slab, or limit the calculator needs. Example for "Income Tax Calculator India":
- Old regime slab structure
- New regime slab structure
- Standard deduction amount
- Section 80C limit
- Section 80D limits (self, parents, senior)
- HRA exemption rules
- Surcharge thresholds and rates
- Health and education cess rate

### Step 2 — Search for current values
Use web_search with queries like:
```
"India income tax slabs FY [current FY]"
"Section 80C limit [current FY]"
"401k contribution limit [current year] IRS"
```

Always include the current financial year or tax year in the query.

### Step 3 — Verify from primary source
Use web_fetch on the actual government URL from search results. Don't trust news articles or blog posts as primary sources. Primary sources only:

**India:**
- `incometaxindia.gov.in` — tax slabs, deductions
- `rbi.org.in` — repo rate, bank rates
- `sebi.gov.in` — securities regulations
- `epfindia.gov.in` — EPF rates
- `data.gov.in` — official government datasets

**United States:**
- `irs.gov` — federal tax, 401k limits, IRA limits
- `ssa.gov` — social security
- `federalreserve.gov` — federal funds rate

**United Kingdom:**
- `gov.uk` — tax bands, NI rates
- `bankofengland.co.uk` — base rate
- `hmrc.gov.uk` — HMRC guidance

**EU / Global:**
- `ecb.europa.eu` — euro rates
- `oecd.org` — comparative data

### Step 4 — Populate JSON file with citation
Every value goes into a JSON file in `/src/data/financial-rules/` with full provenance:

```json
{
  "rule_name": "India Income Tax — New Regime",
  "country": "IN",
  "effective_from": "FY [current FY]",
  "effective_until": null,
  "source_url": "https://incometaxindia.gov.in/...",
  "source_name": "Income Tax Department, Government of India",
  "last_verified": "[today's date in YYYY-MM-DD]",
  "verified_by": "manual",
  "notes": "Verified during initial build. Re-verify after each Union Budget.",
  "data": {
    "slabs": [ ... ],
    "standard_deduction": [value]
  }
}
```

### Step 5 — Surface the date in the UI
Every calculator that reads from one of these JSON files must display a small line under its title:

```
Last updated: 21 May 2026 · Source: incometaxindia.gov.in
```

This line is critical for Google E-E-A-T and user trust.

### Step 6 — If verification fails
If you cannot verify a value from a primary source within reasonable search effort:

1. Set `"verified_by": "needs_manual_verification"` in the JSON
2. Add a code comment in the calculator file: `// TODO: Verify [value] from primary source`
3. Add a console.warn in development mode that logs which value needs verification
4. Add the calculator to a tracking file at `/src/data/financial-rules/_NEEDS_VERIFICATION.md`

Never silently use a value you couldn't verify.

---

## What needs research vs. what is pure math

**Needs research and JSON file:**
- Income tax slabs (India, US, UK, all countries supported)
- Tax deductions (80C, 80D, 80G, etc.)
- Capital gains rates (LTCG, STCG)
- EPF, PPF, NPS interest rates
- Government scheme rates (Sukanya Samriddhi, SCSS, NSC, KVP, Post Office schemes)
- GST/VAT rates by category
- TDS rates
- Stamp duty by state
- 401k, IRA contribution limits
- Social Security wage base
- HRA exemption rules
- Surcharge thresholds
- Cess rates
- Crypto tax rates by jurisdiction

**Pure math, no research needed:**
- EMI formula
- SIP / lumpsum compound growth
- CAGR / XIRR / IRR / NPV
- Simple and compound interest
- Percentage calculators
- Ratio calculators
- Black-Scholes formula
- Sharpe ratio formula
- Standard deviation
- Time value of money formulas
- Currency conversion (uses live API)

For pure-math calculators, no JSON file is needed. They take user inputs and apply a formula.

---

## Blog article freshness rules

When writing the 12 seed blog articles:

1. **Title and URL slug must reflect current year** — e.g., `sip-vs-lumpsum-[current-year]` not a hardcoded year
2. **All statistics, returns data, historical examples** must be from the most recent available period
3. **Tax-related articles** must use the current financial year
4. **No "as of 2023" or "in 2024" references** unless explicitly comparing past to present
5. **Schema markup `datePublished` and `dateModified`** must reflect the actual build date, not a fictional date
6. **Article copy must mention current rates** — e.g., "Under the new tax regime (FY 2026-27), individuals..."

Before publishing any article, web_search for the latest data on its topic. If new schemes, rates, or rules have changed the article's premise, update the article accordingly.

---

## Currency exchange rate handling

Currency Converter and any calculator using FX rates uses a **live API**, not hardcoded rates:

- Primary: `https://open.er-api.com/v6/latest/USD` (free, no key needed, updated daily)
- Backup: `https://api.exchangerate-api.com/v4/latest/USD` (free tier)

Cache the response client-side for 1 hour to reduce API hits. Show a small "Rates updated [time]" indicator. If both APIs fail, show a clear error message — never silently fall back to stale hardcoded rates.

---

## Inflation calculator data

Use CPI (Consumer Price Index) data from primary sources:

- India: MOSPI historical CPI from `data.gov.in`
- US: BLS CPI data from `bls.gov`
- UK: ONS CPI from `ons.gov.uk`

These can be embedded as JSON files (`/src/data/financial-rules/cpi-india.json`, etc.) with an annual update workflow. CPI is published monthly but historical values don't change.

---

## What "current" means by data type

| Data type | Update frequency | Action when changed |
|-----------|------------------|---------------------|
| India tax slabs | After Union Budget (Feb each year) | Update old + new regime JSONs by mid-Feb |
| US tax brackets | After IRS annual adjustment (Oct-Nov each year) | Update bracket JSON in November |
| UK tax bands | After Spring Budget (March each year) | Update by April |
| EPF interest rate | When EPFO declares (usually Feb) | Update epf-rates.json |
| PPF rate | Quarterly (Mar, Jun, Sep, Dec) | Update ppf-rates.json |
| Repo rate / Fed rate | When central bank changes | Update repo-rate.json |
| 401k limits | Annual IRS adjustment (Oct-Nov) | Update us-401k-limits.json |
| GST rates | When GST Council meets | Update gst-rates.json |
| FX rates | Daily | Auto from live API |
| Stamp duty | When state notifies change | Update stamp-duty.json |

This calendar is built into the GitHub Actions workflow described in `05-LIVING-DATA.md`.

---

## Final summary

The whole point of this document: **a finance site that ranks on Google and earns ad revenue is one whose data is verifiably current, sourced from authoritative places, and dated visibly on every page.** Stale data destroys trust, rankings, and revenue. Build the freshness system into the foundation, not as an afterthought.
