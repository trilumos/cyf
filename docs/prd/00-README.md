# CalcYourFinance — Claude Code Master Instructions

**Domain:** calcyourfinance.com
**Build start date:** May 2026
**Build deadline:** 1 month from start
**Hosting:** Cloudflare Pages (free tier)
**Cost target:** Zero — no paid APIs, no paid services at launch

---

## Read these documents IN ORDER before writing any code

| File | Purpose |
|------|---------|
| `00-README.md` | This file — read first |
| `01-FRESHNESS-AND-RESEARCH.md` | **Critical rules** about current data, dates, and regulations |
| `02-BLUEPRINT.md` | Site architecture, all pages, all 204 tools, URL structure |
| `03-DESIGN-SYSTEM.md` | Exact colors, typography, components, layouts |
| `04-TECHNICAL.md` | Tech stack, SEO, ads toggle, PDF export, build order |
| `05-LIVING-DATA.md` | How financial rules JSON files work + update workflow |
| `06-LAUNCH-AND-POST-LAUNCH.md` | Pre-launch checklist, AdSense application, SEO strategy, traffic roadmap |
| `07-DAY-ZERO-SETUP.md` | **READ FIRST.** Exact commands for repo setup, Next.js init, Cloudflare Pages connection |

---

## ABSOLUTE NON-NEGOTIABLE RULES

### Rule 1 — The current date is May 2026 or later. Verify before assuming.
Never write any year other than the actual current year anywhere on the site, in code comments, in copy, in metadata, in test data, in seed articles, in blog post dates, or in JSON `effective_from` fields. **Always run `date` in bash to check the actual current date when starting work.** If a calculator deals with anything year-specific (tax slabs, contribution limits, scheme rates), use the **current financial year** for that country.

### Rule 2 — Research before hardcoding any financial value.
For every calculator that uses real-world rates (tax slabs, EPF interest, PPF rates, 401k limits, GST percentages, stamp duty, capital gains rates, etc.), Claude Code MUST use the web_search and web_fetch tools to verify the current values from official sources before writing the JSON file. Citations must be added to the JSON `source_url` field. Acceptable sources:

- India: incometaxindia.gov.in, rbi.org.in, sebi.gov.in, epfindia.gov.in, data.gov.in
- US: irs.gov, ssa.gov, federalreserve.gov
- UK: gov.uk/hmrc, bankofengland.co.uk
- EU: ecb.europa.eu

If verification isn't possible for a value, mark `verified_by: "needs_manual_verification"` in the JSON and add a console warning when that calculator loads in development mode.

### Rule 3 — Architect for change. No hardcoded financial constants.
No calculator file may contain hardcoded tax slabs, interest rates, contribution limits, or government scheme rates. All such values live in `/src/data/financial-rules/*.json` files. Calculator components import from there. See `05-LIVING-DATA.md` for the exact structure.

### Rule 4 — Every regulated calculator shows "Last updated" date.
Pull from the JSON file's `last_verified` field. Display below the calculator title as: `Last updated: 21 May 2026 · Source: incometaxindia.gov.in`. This is critical for Google E-E-A-T trust signals.

### Rule 5 — Build the ad toggle system from day one.
All ad slots render as empty placeholder divs (with correct dimensions to avoid layout shift) when `NEXT_PUBLIC_ADS_ENABLED=false`. Flip the env var to `true` after AdSense approval. Never use any other mechanism.

### Rule 6 — Zero backend.
Static export only. No databases, no auth, no server functions, no API routes that need a server.

### Rule 7 — Match the approved page designs exactly.
Every page layout described in `03-DESIGN-SYSTEM.md` was reviewed and approved. Do not introduce new sections, change column ratios, change ad placements, or add features that weren't specified. If a layout question is ambiguous, ask before deviating.

### Rule 8 — The navbar is identical on every single page.
Same logo, same divider, same nav items in the same order (`Home`, `Calculators ▾`, `Blog`, `About`), same search bar, same "All Tools →" button. No exceptions — not even on About or Contact or 404 pages.

### Rule 9 — Professional design only. No emoji anywhere on the site. No decorative color. Color is functional only — brand blue #1B4FD8 for interactive elements only, #EEF2FF for active/hover fills only, chart colors only where encoding data meaning. No boxes or grid borders around tool rows inside dropdowns or lists. See 03-DESIGN-SYSTEM.md Global design principles for full rules.

---

## High-level build order

1. Initialize Next.js 14 project with `output: 'export'`, Tailwind, Recharts, Fuse.js
2. Set up `/src/data/financial-rules/` directory with all JSON files (use web_search to populate current values)
3. Build design system (Tailwind config with exact color tokens from `03-DESIGN-SYSTEM.md`)
4. Build global components: `Navbar`, `Footer`, `MegaMenu`, `AdSlot`, `LayoutShell`
5. Build the Homepage
6. Build the All Tools page
7. Build ONE complete calculator (EMI Calculator) end-to-end as the reference implementation
8. Use that calculator as the template for the remaining 203
9. Build calculators in priority order: highest-traffic first (EMI, SIP, Income Tax, FD, CAGR, Home Loan, FIRE, Currency Converter, etc.)
10. Build the Blog listing page + Article page template + 12 seed articles
11. Build About, Contact, Privacy Policy, Disclaimer, 404 pages
12. Generate sitemap.xml, robots.txt, all JSON-LD schemas
13. Set up Cloudflare Pages deployment with GitHub Actions
14. Set up the monthly rate-verification GitHub Action (see `05-LIVING-DATA.md`)

---

## Key decisions log

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 14 with `output: 'export'` | Best static SEO, large ecosystem, excellent Claude Code support |
| Hosting | Cloudflare Pages | Free unlimited bandwidth, global CDN, GitHub integration |
| Styling | Tailwind CSS | Fastest build, design tokens map cleanly |
| Charts | Recharts | React-native, works with SSG, lightweight |
| PDF export | jsPDF + html2canvas | Pure client-side, zero cost |
| Currency detection | `ipapi.co` free tier (1000/day) + browser `Intl` fallback | No cost at launch scale |
| Plain-English summary | Rule-based JavaScript per calculator | Zero cost; swap to Claude API later when ad revenue covers it |
| Search | Client-side Fuse.js over JSON index | No backend needed |
| Ads | Google AdSense (auto-ads + manual slots) with env var toggle | Toggle off until AdSense approval ~day 15-20 |
| Fonts | Inter via `next/font/google` | Free, fast, professional |
| Icons | Tabler Icons via `@tabler/icons-react` | Free, comprehensive, consistent style |
| Financial data | JSON files in `/src/data/financial-rules/` | Easy edits, GitHub history, no API costs |
| Rate updates | GitHub Action + manual Claude review monthly | Zero cost, takes 5 min when needed |
