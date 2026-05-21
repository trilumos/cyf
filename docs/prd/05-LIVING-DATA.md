# 05 — Living Financial Data System

This document defines how financial rules, tax slabs, and rates stay current over time. It's the operational heart of the site's long-term value.

---

## Directory layout

```
/src/data/financial-rules/
├── _LAST_UPDATED.json              ← machine-readable manifest of all files
├── _NEEDS_VERIFICATION.md          ← human-readable list of unverified values
├── _CHANGELOG.md                   ← audit log of every rule change
│
├── india-tax-old-regime.json
├── india-tax-new-regime.json
├── india-section-80c.json
├── india-section-80d.json
├── india-section-24.json
├── india-capital-gains.json
├── india-gst-rates.json
├── india-tds-rates.json
├── india-epf-rates.json
├── india-ppf-rates.json
├── india-nps-rates.json
├── india-sukanya-rates.json
├── india-nsc-rates.json
├── india-post-office-schemes.json
├── india-stamp-duty-by-state.json
├── india-crypto-tax.json
├── india-payroll-rules.json
├── india-advance-tax.json
│
├── us-tax-brackets.json
├── us-401k-limits.json
├── us-ira-limits.json
├── us-social-security.json
├── us-capital-gains.json
│
├── uk-tax-bands.json
├── uk-ni-rates.json
├── uk-pension-allowance.json
│
├── eu-vat-rates.json
│
├── cpi-india.json
├── cpi-us.json
├── cpi-uk.json
│
└── currency-meta.json              ← currency symbol/format metadata
```

---

## Standard JSON file structure

Every file in `financial-rules/` follows this exact shape:

```json
{
  "rule_name": "India Income Tax — New Regime",
  "country": "IN",
  "scope": "individual taxpayer",
  "effective_from": "FY 2026-27",
  "effective_until": null,
  "source_url": "https://incometaxindia.gov.in/Pages/tax-information-services.aspx",
  "source_name": "Income Tax Department, Government of India",
  "last_verified": "2026-05-21",
  "verified_by": "manual",
  "review_due": "2027-02-15",
  "notes": "Per Union Budget [year]. Re-verify after each Union Budget in February.",
  "data": {
    "standard_deduction": 75000,
    "rebate_under_87a_limit": 700000,
    "rebate_under_87a_amount": 25000,
    "slabs": [
      { "from": 0, "to": 400000, "rate": 0 },
      { "from": 400000, "to": 800000, "rate": 0.05 },
      { "from": 800000, "to": 1200000, "rate": 0.10 },
      { "from": 1200000, "to": 1600000, "rate": 0.15 },
      { "from": 1600000, "to": 2000000, "rate": 0.20 },
      { "from": 2000000, "to": 2400000, "rate": 0.25 },
      { "from": 2400000, "to": null, "rate": 0.30 }
    ],
    "surcharge": [
      { "income_over": 5000000, "rate": 0.10 },
      { "income_over": 10000000, "rate": 0.15 },
      { "income_over": 20000000, "rate": 0.25 }
    ],
    "cess_rate": 0.04
  }
}
```

**Field definitions:**

| Field | Required | Description |
|-------|----------|-------------|
| `rule_name` | yes | Human-readable name |
| `country` | yes | ISO 3166-1 alpha-2 (IN, US, UK, etc.) |
| `scope` | yes | Who this rule applies to |
| `effective_from` | yes | When this version started |
| `effective_until` | yes | `null` if still current, ISO date if expired |
| `source_url` | yes | Primary government source URL |
| `source_name` | yes | Name of the authority |
| `last_verified` | yes | ISO date when this was last confirmed correct |
| `verified_by` | yes | `"manual"`, `"github-action"`, or `"needs_manual_verification"` |
| `review_due` | yes | ISO date when this should next be checked |
| `notes` | optional | Free-text context, gotchas, special cases |
| `data` | yes | The actual financial data |

**Example values, NOT for use** — Claude Code must web-search and verify actual current values before writing any of these files. The structure above is the template only.

---

## Manifest file: `_LAST_UPDATED.json`

A machine-readable index of every rule file, kept in sync automatically:

```json
{
  "manifest_version": 1,
  "last_generated": "2026-05-21T10:30:00Z",
  "files": [
    {
      "filename": "india-tax-new-regime.json",
      "last_verified": "2026-05-21",
      "review_due": "2027-02-15",
      "verified_by": "manual"
    }
    // one entry per JSON file
  ]
}
```

Regenerated automatically by `/scripts/build-manifest.mjs` on every commit via a pre-commit hook AND in CI.

---

## How calculators consume the data

```typescript
// /src/calculators/tax/income-tax-india.tsx
import taxRules from '@/data/financial-rules/india-tax-new-regime.json';
import { LastUpdatedBadge } from '@/components/calculator/LastUpdatedBadge';

export const incomeTaxIndiaNewRegime: CalculatorModule = {
  // ...
  requiresLiveData: ['india-tax-new-regime'],

  compute: (inputs) => {
    const slabs = taxRules.data.slabs;
    // ... tax calculation logic uses slabs from JSON
  },

  metadata: {
    lastVerified: taxRules.last_verified,
    sourceUrl: taxRules.source_url,
    sourceName: taxRules.source_name,
  },
};
```

The `<LastUpdatedBadge>` component reads `metadata.lastVerified` and `metadata.sourceName` and renders the small "Last updated: 21 May 2026 · Source: incometaxindia.gov.in" line under the calculator title.

---

## The update workflow

### Annual budget calendar

The `/scripts/verify-rates.mjs` script knows when to alert for each country:

```javascript
const BUDGET_CALENDAR = {
  IN: {
    union_budget: { month: 2, day: 1, alert_offset_days: -7 },
    quarterly_small_savings: [
      { month: 3, day: 31 }, { month: 6, day: 30 },
      { month: 9, day: 30 }, { month: 12, day: 31 },
    ],
  },
  US: {
    irs_annual_adjustment: { month: 11, day: 1, alert_offset_days: 0 },
    tax_filing_deadline: { month: 4, day: 15, alert_offset_days: -14 },
  },
  UK: {
    spring_budget: { month: 3, day: 15, alert_offset_days: -7 },
    autumn_statement: { month: 11, day: 15, alert_offset_days: -7 },
  },
};
```

### Monthly GitHub Action

Runs on the 1st of every month:

```yaml
# .github/workflows/verify-rates.yml
name: Monthly Rate Verification

on:
  schedule:
    - cron: '0 9 1 * *'  # 9 AM UTC on the 1st of every month
  workflow_dispatch:      # also runs on manual trigger

jobs:
  check-rates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Run rate verification
        run: node scripts/verify-rates.mjs
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The `verify-rates.mjs` script:
1. Reads `_LAST_UPDATED.json`
2. For each file where `review_due` is in the past OR today is within budget calendar alert windows
3. Opens a GitHub Issue titled `🔔 Rate verification needed: [filename]` with:
   - The file path
   - The current `data` block
   - The source URL
   - A pre-written prompt for Claude: "Verify whether [file] is still accurate as of today. Check [source_url]. If outdated, return the updated `data` block in the same JSON structure."
4. Labels the issue `rates-update`, `priority-high`
5. The repo owner (you) gets a GitHub email notification

### The 5-minute manual update workflow

When you receive the alert email:

1. Click the issue
2. Copy the pre-written prompt
3. Open Claude.ai (you already have Pro), paste the prompt
4. Claude web-searches the official source, returns updated JSON
5. Copy Claude's JSON into the file via GitHub web editor (no local clone needed)
6. Update `last_verified` to today's date and `review_due` to next expected change
7. Append a line to `_CHANGELOG.md` describing the change
8. Commit directly to `main`
9. Cloudflare Pages auto-deploys within 60 seconds
10. Close the issue

**Total time: 5 minutes per file. About 6–12 files need updates per year.**

---

## Changelog format

`/src/data/financial-rules/_CHANGELOG.md` is human-readable history:

```markdown
# Financial Rules Changelog

## 2026-05-21
- **Initial population** — all India tax JSON files populated from Union Budget [year]
- **Initial population** — all US tax JSON files populated from IRS [year] adjustments

## 2026-02-05
- **india-tax-new-regime.json** — Updated slabs per Union Budget [year]
- **india-tax-old-regime.json** — No changes (regime unchanged)
- **india-section-80c.json** — No changes (limit remains ₹1,50,000)

## 2026-04-01
- **us-tax-brackets.json** — Annual inflation adjustment applied
- **us-401k-limits.json** — Contribution limit raised
```

---

## Surfacing freshness on the site

Every calculator that reads from a JSON file shows the `<LastUpdatedBadge>` below the H1:

```
Income Tax Calculator (India)
Last updated: 21 May 2026 · Source: incometaxindia.gov.in
```

For Google E-E-A-T, also include:
- `dateModified` in calculator page JSON-LD schema, pulled from `last_verified`
- A subtle "Data source" link in the FAQ section: "Where does this calculator get its tax rates from? — [source link]"

For the most critical pages (income tax, GST, capital gains), also add a small contextual line in the educational content:

> "These figures reflect the latest rules as per the [Union Budget / IRS adjustment / etc.] effective [date]. We re-verify these values monthly."

---

## The Phase 2 AI summary upgrade

When ad revenue allows (target: $200+/month, roughly 25K monthly pageviews), swap the rule-based summary for live Claude API calls:

**Phase 1 (now):** Each calculator has a JavaScript `generateSummary(inputs, results)` function that returns hard-coded patterns with the user's numbers interpolated.

**Phase 2 (later):** Same function signature, but calls the Anthropic API:

```typescript
// /src/lib/ai-summary.ts (Phase 2)
export async function generateAISummary(
  calculator: CalculatorMeta,
  inputs: Inputs,
  results: Results,
): Promise<Summary> {
  if (!process.env.NEXT_PUBLIC_AI_SUMMARY_ENABLED) {
    return ruleBasedSummary(calculator, inputs, results);
  }
  const res = await fetch('/api/summary', {
    method: 'POST',
    body: JSON.stringify({ calculator: calculator.slug, inputs, results }),
  });
  return res.json();
}
```

The switch is a single env var flip. The site architecture supports both modes.

---

## Initial population task list for Claude Code

On Day 5 of the build, populate these JSON files in this priority order. Use web_search + web_fetch on each step.

**Priority 1 — India tax (highest user demand)**
1. `india-tax-old-regime.json`
2. `india-tax-new-regime.json`
3. `india-section-80c.json`
4. `india-section-80d.json`
5. `india-capital-gains.json`
6. `india-gst-rates.json`

**Priority 2 — India savings schemes**
7. `india-epf-rates.json`
8. `india-ppf-rates.json`
9. `india-nps-rates.json`
10. `india-sukanya-rates.json`
11. `india-nsc-rates.json`

**Priority 3 — US tax & retirement**
12. `us-tax-brackets.json`
13. `us-401k-limits.json`
14. `us-social-security.json`

**Priority 4 — Other**
15. `india-tds-rates.json`
16. `india-stamp-duty-by-state.json` (only major states: MH, KA, DL, TN, UP, WB initially)
17. `india-crypto-tax.json`
18. `uk-tax-bands.json`
19. `eu-vat-rates.json`

After Priority 4, continue with remaining files only if time permits in Week 4. For calculators that need a JSON file not yet populated, mark them with `verified_by: "needs_manual_verification"` and use best-effort default values with prominent warnings in the UI.

---

## Final principle

**Never present unverified financial data as authoritative.** If a JSON file has `verified_by: "needs_manual_verification"`, the corresponding calculator shows a yellow warning banner:

> "⚠️ The rates in this calculator are awaiting manual verification. Use as a rough estimate only. We will update this within 7 days."

This costs you a tiny bit of credibility on one tool while protecting credibility on the whole site. Hiding the warning would be worse — Google catches stale finance content and demotes it across the entire domain.
