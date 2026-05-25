# 08 — Calculator Build Standard (Authoritative)

**Read this document before building ANY calculator, starting with the Day-6 EMI reference template.**

This is the single source of truth for how every calculator page is structured, coded, and quality-checked. Where this document conflicts with older wording in docs 02–05, **this document wins** (the others have been reconciled to match). It exists because the project's biggest risk is shipping 200 templated pages that Google's helpful-content system demotes — so the bar here is "each page reads like someone thought about *that specific calculation*."

---

## 0. Decisions locked in (do not re-litigate)

| Topic | Decision | Source |
|-------|----------|--------|
| Calculator page layout | **Center column + one right rail.** No left ad rail. | §2 below |
| PDF export | **Native jsPDF text + `jspdf-autotable` tables + crisp 2× raster chart snapshot.** No full DOM `html2canvas`. | §6 |
| Currency detection | **Static-only**: `navigator.language` + timezone heuristic + manual selector. ipapi.co removed. | §7 |
| Calculator schema | **`SoftwareApplication`** (not `WebApplication`). **Never** fabricate `aggregateRating`. | §5 |
| Charts | **Per-calculator decision.** Omit when a chart adds no information. | §4 |
| Content | **Anti-template checklist enforced per calculator.** | §3 |
| Legal pages | About, Privacy, Disclaimer **and Terms** must all exist before any domain swap (AdSense parity). | doc 02 / doc 06 |

---

## 1. Installed dependency versions (build against THESE, not the older doc-04 samples)

| Package | Installed | Notes for the build |
|---------|-----------|---------------------|
| `next` | 14.2.35 | App Router, `output: 'export'`, `trailingSlash: true`. |
| `recharts` | **3.x** | API differs from the 2.x snippets in doc 04. Verify prop names against v3 before copying any chart code. |
| `jspdf` | **4.x** | Use the v4 API. |
| `jspdf-autotable` | **add this dep** | For tables in the PDF. Not yet installed — `npm i jspdf-autotable` on Day 6. |
| `html2canvas` | 1.4.1 (installed) | Use ONLY to snapshot the single chart element at 2× scale, not the whole page. May be removed later. |
| `next-mdx-remote` | 6.x | Blog only (Day 7+), not calculators. |
| `next-seo` | installed but **unused** | SEO is done via the App Router Metadata API + a `<JsonLd>` component. Do not import `next-seo`; it is slated for removal. |
| `fuse.js` | 7.x | Search (already wired). |
| `@tabler/icons-react` | 3.x | Icons. |

---

## 2. Calculator page layout (FINAL — supersedes doc 03's 155px three-column spec)

The old spec placed 300px-wide ads inside 155px rails — physically impossible. The real layout:

```
Desktop (≥ lg):
┌───────────────────────────────────────────────┬──────────────┐
│  CENTER COLUMN  (flex-1, max-w ≈ 760px)         │  RIGHT RAIL  │
│                                                 │  (~300px,    │
│  H1  (calc.name)                                │   sticky)    │
│  short description (calc.description)           │              │
│  LastUpdatedBadge  ← only if requiresLiveData   │  RelatedTools│
│                                                 │   Card       │
│  ── Inputs (labels + value tag + slider) ──     │  ────────    │
│                                                 │  Related     │
│  ·· responsive in-content ad ··                 │   Articles   │
│                                                 │   Card       │
│  ── Results card (bg #EEF2FF) ──                │  ────────    │
│     result number cards (grid)                  │  Export/Share│
│     chart (if any)                              │   Card       │
│     "What this means for you" block             │  ────────    │
│                                                 │  AdSlot      │
│  ·· responsive in-content ad ··                 │   300x250    │
│                                                 │              │
│  ── Educational: What is / How to / Formula ──  │              │
│  ── ComparisonTable (only if meaningful) ──     │              │
│  ── FAQSection (emits FAQ JSON-LD) ──           │              │
└───────────────────────────────────────────────┴──────────────┘
   Page wrapper: max-w-page (1200px) mx-auto, px-4 sm:px-6
   Grid: lg:grid-cols-[minmax(0,1fr)_300px] gap-8 ; right rail sticky top-24
```

**Ad inventory per calculator page = 3 slots** (down from the old 5; lighter page = better Core Web Vitals + better AdSense standing):
1. In-content responsive unit between inputs and results
2. In-content responsive unit below the results card
3. `300x250` in the right rail, below the Export/Share card

**Mobile (< lg):** single column. Right-rail cards move to **below** the results/educational content in this order: Related Tools → Related Articles → Export/Share. In-content ads stay where they are. The right-rail `300x250` becomes an in-content responsive unit.

**AdSlot placeholder rule (fixes the no-CLS contract):** when `NEXT_PUBLIC_ADS_ENABLED !== 'true'`, `AdSlot` must render an empty `div` that **reserves the slot's exact dimensions** (responsive slots reserve a fixed min-height) so enabling ads later causes **zero layout shift**. The current `return null` must be replaced on Day 6. Keep the reserved space visually quiet (no border/label in production; a faint dashed "Advertisement" box is fine in dev only).

---

## 3. Anti-template content checklist (ENFORCED per calculator)

A calculator is **not "done"** until every box is true. This is the part that earns rankings and ad revenue.

- [ ] **`generateSummary` has ≥ 5 calculator-specific rules** that reference real thresholds/benchmarks, not restated outputs. (e.g. EMI: the 30%-of-income rule, interest-as-%-of-principal, prepayment impact in months+rupees.) Output 2–4 sentences, most-relevant insight first. Bad: "Your EMI is ₹45,123." Good: "₹45,123 is ~32% of a ₹1.4L monthly income — just above the 30% comfort threshold; adding ₹3,000/month closes the loan ~2y8m early and saves ₹9.1L."
- [ ] **≥ 5 FAQs sourced from real user questions** (Reddit r/IndiaInvestments, r/personalfinanceindia; Quora; MoneyControl/ValueResearch forums; Google "People also ask"). Web-search before writing them. No dictionary-definition filler ("What is interest rate?"). 2–4 sentence answers. Wire into `FAQPage` JSON-LD.
- [ ] **`howToUse` is a worked example with real ₹ amounts**, not a "fill the form" list. Mention what to do *after* getting the result, and cite a primary source where the user can verify a rate.
- [ ] **`whatIs` references this calculator's specific use case**, not boilerplate finance definitions.
- [ ] **Chart adds information, or is intentionally omitted** (see §4).
- [ ] **No duplicate phrasing with sibling calculators** in the same category. Read the siblings before writing.
- [ ] **If it reads a rate/slab/limit**, the value comes from a verified `/src/data/financial-rules/*.json` file and the page shows `LastUpdatedBadge` (§8). Pure-math calculators have neither.

---

## 4. Chart decision matrix

Use `recharts` v3, brand-blue (`#1B4FD8`) primary with opacity variants — never rainbow defaults. Always provide a screen-reader text-table alternative. **Build a chart only when it answers a question the user is actually asking.**

| Build a chart | Type |
|---------------|------|
| EMI / Home / Car loans | Stacked area: principal vs interest over time (amortization) |
| SIP / Step-up | Stacked bars: invested vs returns by year |
| Lumpsum / FD / Compound interest | Growth curve (cumulative) |
| SWP / Retirement / FIRE | Accumulation vs decumulation areas |
| Income tax / Budget | Donut: breakdown by slab/bucket |
| Comparison tools (SIP vs Lumpsum, Old vs New) | Side-by-side / dual-line |

| Omit the chart (ship without) |
|--------------------------------|
| Percentage, Percentage-change, Ratio, Weighted average, Std deviation |
| Simple Interest, Rule of 72/70, APR vs APY |
| Currency Converter, Cross Rate, Markup, Stamp Duty (single-output) |

---

## 5. Calculator module interface & how a page is composed

Calculator **logic** lives in one module per calculator under `src/calculators/<category>/<slug>.tsx`, registered in `src/calculators/index.ts`. This is **separate** from the lightweight `CALCULATORS` index in `src/data/calculators.ts` (which only carries name/slug/category/description/keywords/related/articles/flags).

The `[slug]` page (`src/app/calculators/[slug]/page.tsx`, a **server component** — keeps `generateStaticParams` + `generateMetadata`) composes three sources:

1. **`CALCULATORS` index** (`@/data/calculators`) → name, category, `relatedSlugs`, `articleSlugs`, breadcrumb. Look up with `.find(c => c.slug === params.slug)`.
2. **The calculator module** (`@/calculators` registry) → inputs, compute, results, chart, summary, educational content.
3. **`getCategoryBySlug(calc.category)`** (`@/data/categories`) → `category.label` for breadcrumb/schema. **Note the real field is `label`, not `name`** (and the index field is `categoryName`). Do not invent `category.name`.

Interactive parts (sliders, live compute, chart, PDF button) must be **client components** (`'use client'`) nested inside the server page. JSON-LD is injected server-side via `<JsonLd>`.

```typescript
// src/types/calculator.ts  (create on Day 6)
export interface CalculatorModule {
  slug: string;                       // must match CALCULATORS entry
  seo?: { title: string; description: string; keywords?: string[] };
                                      // overrides calculators.ts for the page <title>/<meta> when present
  defaultInputs: Record<string, number | string>;
  inputs: Array<{
    name: string;
    label: string;
    type: 'currency' | 'percent' | 'years' | 'months' | 'number' | 'select';
    min?: number; max?: number; step?: number;
    options?: Array<{ value: string; label: string }>; // for 'select'
    currencyAware?: boolean;          // value reflects active CurrencyProvider currency
  }>;
  compute: (inputs: Record<string, number | string>) => Record<string, number>;
  results: Array<{ name: string; label: string; format: 'currency' | 'percent' | 'number' | 'years' }>;
  chart?: {
    type: string;                     // e.g. 'amortization-stack'
    builder: (inputs: any, results: any) => any[];   // recharts v3 data array
  };
  generateSummary: (inputs: any, results: any) => {
    intro: string;                    // <strong> around key numbers
    highlight: string;                // the "aha" insight (rendered on #EEF2FF tint, NO colored side-stripe)
    tip: { text: string; relatedToolSlug?: string };
  };
  educational: {
    whatIs: string;                   // specific to THIS calculator
    howToUse: string[];               // worked example with real ₹ amounts
    formula?: string;
    formulaExplanation?: string;
    comparison?: { headers: string[]; rows: string[][] };  // only when meaningful
    faqs: Array<{ q: string; a: string }>;                 // ≥ 5, from real queries
  };
  requiresLiveData?: string[];        // JSON filenames (no extension), e.g. ['india-tax-new-regime']
}
```

### JSON-LD per calculator page (via `<JsonLd>` in `src/components/seo/JsonLd.tsx`)
- `SoftwareApplication` — `applicationCategory: "FinanceApplication"`, `operatingSystem: "Web"`, `offers.price: "0"`. **Omit `aggregateRating` entirely** until a real rating system exists.
- `FAQPage` — built from `educational.faqs`.
- `HowTo` — built from `educational.howToUse`.
- `BreadcrumbList` — Home › Category › Calculator.
- For JSON-backed calculators, set `dateModified` from the rule file's `last_verified`.

---

## 6. PDF export standard

`src/lib/pdf-export.ts` → `exportCalculatorPDF(opts)`:
- **Branded header** band (`#1B4FD8`), title = calculator name.
- **Inputs** and **Results** as real jsPDF **text** (selectable, searchable).
- **Tables** (amortization, comparison) via **`jspdf-autotable`**.
- **Chart**: snapshot the single chart `HTMLElement` with `html2canvas` at `scale: 2`, embed as an image. (Do NOT rasterize the whole page. Full-vector `svg2pdf.js` was considered and deferred — not worth the per-chart tuning across 200 calculators.)
- **Footer**: date, source URL, "estimates only — not financial advice" disclaimer.
- Target: < 150 KB, generates in < 2 s on mid-range mobile.

---

## 7. Currency

- `CurrencyProvider` (already exists) is the single source of truth. **Remove the ipapi.co fetch** — it breaks past ~1000 req/day. Detection order: saved localStorage pref → `navigator.language` (and `Intl.DateTimeFormat().resolvedOptions().timeZone` as a tiebreaker, e.g. `Asia/Kolkata` → INR) → default INR. The navbar `CurrencySelector` is the real control and persists to localStorage.
- `currencyAware` inputs/results read the active currency from context. The **hero panel** must also consume this context (deferred item from CLAUDE.md) once Day-6 compute functions exist.
- Live FX (Currency Converter only) uses `open.er-api.com` cached 1h; on failure show an error, never silent stale rates.

---

## 8. LastUpdatedBadge

`src/components/calculator/LastUpdatedBadge.tsx` already exists. Props: `{ lastVerified, sourceName, sourceUrl? }` — feed them from the rule JSON's `last_verified` / `source_name` / `source_url`. Render directly under the H1 **only on calculators with `requiresLiveData`**. Pure-math calculators (EMI, SIP, compound interest, etc.) do **not** show it.

---

## 9. Definition of Done (per calculator)

1. Module created under correct category folder, registered in `src/calculators/index.ts`, `slug` matches `CALCULATORS`.
2. Builds clean: `npm run build` + `npx tsc --noEmit` green.
3. §3 anti-template checklist fully satisfied.
4. Chart present per §4 (or intentionally omitted) with accessible text alternative.
5. PDF export works per §6.
6. JSON-LD validates (SoftwareApplication + FAQPage + HowTo + BreadcrumbList).
7. If JSON-backed: values verified from primary source, `LastUpdatedBadge` shown, `_NEEDS_VERIFICATION.md` clean for it.
8. Visual checkpoint: pushed, deployed, user confirmed "looks good".

---

## 10. Day-6 scope = the EMI reference template

Day 6 builds **only** the EMI Calculator end-to-end as the reference all 200 follow, plus the shared infrastructure it needs:
- `src/types/calculator.ts` (interface above)
- `CalculatorShell` (layout §2), `CalculatorInputs` (slider rows), `CalculatorResults` (result cards + #EEF2FF), `PlainEnglishSummary`, `ResultsChart` (recharts v3 amortization stack), `RelatedToolsCard`, `RelatedArticlesCard`, `ExportShareCard`, `EducationalContent`, `FAQSection`, `JsonLd`
- `src/lib/pdf-export.ts` (§6), `src/lib/format.ts` (currency/percent)
- AdSlot reserved-placeholder fix (§2)
- EMI module (`src/calculators/loan-emi/emi-calculator.tsx`) meeting §3
- Replace the `[slug]` placeholder with shell rendering; register EMI in `src/calculators/index.ts`
- Wire hero panel EMI tab to the shared `compute()` + `CurrencyProvider` (deferred items)

EMI is pure-math → no JSON, no LastUpdatedBadge. After user review of EMI, the same pattern is applied to the remaining 199 in priority order (doc 04 build order).
