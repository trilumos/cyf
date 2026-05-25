# CalcYourFinance — Improvements & Refinement Report

A consolidated reference covering calculator content quality, technical fixes, and unresolved questions. Use this as a working doc — check items off as they're addressed.

---

## Validation outcome (2026-05-25) — decisions baked into the PRD

Each item below was validated against the actual codebase and the full PRD, then folded into the PRD where adopted. **The PRD is now the source of truth; this report is the rationale.**

| Item | Verdict | Where it lives now |
|------|---------|--------------------|
| §1–5 Anti-template (specific summaries, real FAQs, worked how-tos, per-calc charts) | **ADOPTED — core** | doc 08 §3 (enforced checklist), §4 (chart matrix) |
| §6 AdSense timing | **Moot — already applied via MVP** | doc 06 status note; legal-page parity now required |
| §7 ipapi.co fix | **ADOPTED, revised** — static-only detection, NOT a CF Function (avoids bending the zero-backend rule) | doc 04 currency §, doc 08 §7 |
| §8 Native jsPDF | **ADOPTED, scoped** — jsPDF + autotable + 2× raster chart; svg2pdf deferred | doc 04 PDF §, doc 08 §6 |
| §9.1 Per-calc OG images (satori) | **DEFERRED** — templated OG now, per-calc post-launch | not scheduled for build |
| §9.2 Build parallelization | **REJECTED** — no GHA deploy exists; Cloudflare builds on its own CI | doc 04 deploy § note |
| §9.3 Inline top-50 search index | **REJECTED** — premature; 200-item index is tiny | — |
| §9.4 Cloudflare Analytics | **ADOPTED — already in doc 06** (report's "no analytics" claim was inaccurate); GA4 dropped (cookie-banner cost) | doc 06 |
| §9.5 Contact form | **OPEN (Day 25)** — Formspree vs CF Function vs mailto; lean Formspree/mailto for zero-backend | doc 03 contact spec / decide Day 25 |
| §9.6 llms.txt | **ADOPTED** — auto-generate at build (Day 26) | doc 04 SEO § |
| §9.7 SoftwareApplication schema | **ADOPTED + guardrail** — never fabricate aggregateRating | doc 04 SEO §, doc 08 §5 |
| §9.8 1:1 article ratio | **ADOPTED as roadmap** — post-launch ops | doc 02 blog § |

**PRD loopholes found and fixed independently of this report:** (1) calculator-page grid was physically impossible (155px rails vs 300px ads) → replaced with center+right-rail in doc 03/08; (2) AdSlot rendered `null` instead of reserving space → fix scheduled Day 6; (3) dependency-version drift documented; (4) dead `next-seo` dep flagged for removal; (5) stale per-category file counts reconciled to blueprint; (6) phantom `deploy.yml` double-deploy clarified.

---

## 1. Refining Calculators — Anti-Template Discipline

The single biggest risk to the project is shipping 200 pages that look templated. Google's helpful-content systems specifically demote sites where every page is structurally identical with only the numbers swapped.

**Core principle:** Each calculator page should feel like it was written by someone who actually thought about *that specific calculation*, not by someone who built a content factory.

### Rules to enforce per calculator

- **Be willing to ship without a chart.** If a chart doesn't add information (e.g., Percentage Calculator, Rule of 72, Ratio Calculator), omit it. A bad chart is worse than no chart.
- **Be willing to skip the comparison table** if the calculator has nothing meaningful to compare. Don't force the four-element template onto every page.
- **`generateSummary` rules must reference specific thresholds and numbers**, not generic phrases. See section 2 below.
- **FAQs must come from real user questions**, researched on Reddit/Quora/MoneyControl forums. Not invented. See section 3 below.
- **`howToUse` steps must include a worked example** with realistic Indian numbers. See section 5 below.
- **Each calculator's `educationalContent.whatIs`** must mention something specific to that calculator, not boilerplate finance definitions.

### Checklist per calculator before marking it "done"

- [ ] Chart actually adds information (or is intentionally omitted)
- [ ] `generateSummary` has at least 5 calculator-specific rules
- [ ] At least 5 FAQs sourced from real user queries
- [ ] `howToUse` includes a worked example with real Indian rupee amounts
- [ ] `whatIs` references this calculator's specific use case
- [ ] If the calculator depends on rates/slabs, JSON file is verified from primary source
- [ ] LastUpdated badge shows real verification date
- [ ] No duplicate phrasing with sibling calculators in the same category

---

## 2. Plain-English Summary Engine (`generateSummary`)

The `generateSummary` function is your single biggest differentiator. It's also the easiest thing to template badly.

### Bad pattern (what to avoid)

> "Your monthly EMI is ₹45,123. You'll pay ₹58,29,520 in total interest over 20 years."

This is just the results restated. It adds nothing.

### Good pattern (what to build)

A rule-based engine that:
- References specific thresholds (the 30% income rule, the 50% basic salary rule for HRA, the 7.5L surcharge threshold, etc.)
- Compares the result to a sensible benchmark
- Suggests a concrete action with quantified impact
- Mentions a real-world consequence the user might not have thought about

### Worked examples

**EMI Calculator:**
> "Your EMI of ₹45,123 means roughly 32% of your monthly income if you earn ₹1.4L/month — slightly above the recommended 30% threshold. Over 20 years you'll pay ₹58.3L in interest, which is 90% of your loan amount. If you can increase your EMI by just ₹3,000/month, you'd close the loan 2 years 8 months earlier and save ₹9.1L in interest."

**Term Insurance Calculator:**
> "A cover of ₹1.2 crore at age 32 makes sense if you have a home loan of ₹50L and dependents. At your age, you can lock in this cover for ~₹1,100/month if you're a non-smoker, but premiums rise ~8-12% per year of delay. Waiting 3 years means paying roughly ₹400-500 more per month for the same cover."

**HRA Exemption Calculator:**
> "Your HRA exemption of ₹2.4L saves you ₹74,880 in tax under the 30% slab. This is the maximum because you live in a metro and pay more than 50% of your basic salary in rent. If you move to a non-metro city with the same salary, the cap drops to 40% — you'd lose ~₹48,000 of this exemption."

### Implementation guidance

- The engine is pure `if/else` logic — no AI runtime calls, no hidden costs.
- Each calculator gets 5-10 specific rules in its `generateSummary` function.
- Rules should fire in priority order: most-relevant insight first.
- Output should be 2-4 sentences, not a paragraph dump.
- If the user's inputs put them in an unusual scenario (very high income, very short tenure, etc.), have specific rules for that.

---

## 3. FAQs — Sourced from Real User Queries

### Bad pattern

> Q: How is EMI calculated?
> Q: What is interest rate?
> Q: How can I reduce my EMI?

These are dictionary-definition FAQs. Every competitor has them. They add no value.

### Good pattern

Research what real users actually ask. Sources:
- Reddit (r/IndiaInvestments, r/personalfinanceindia, r/IndiaTax, r/IndianRealEstate)
- Quora India finance topics
- MoneyControl forums and comment sections
- ValueResearchOnline forums
- Twitter/X searches for "[calculator topic] question"
- Google "People also ask" boxes for the calculator's primary keyword

### Worked examples

**EMI Calculator FAQs:**
- Why does my EMI barely reduce my loan balance in the first 5 years?
- If I get a salary hike, should I increase EMI or invest the difference?
- Why do banks reduce tenure instead of EMI when interest rates fall?
- What's the difference between flat rate and reducing balance EMI?
- Can I switch from fixed to floating rate mid-loan?

**Term Insurance Calculator FAQs:**
- Why does premium jump so much between age 35 and age 40?
- Is a 99-year cover worth it compared to a 60-year cover?
- Should the sum assured include my children's education or not?
- What's the catch with "premium return" term plans?
- Does claim settlement ratio actually matter for a healthy buyer?

### Implementation guidance

- 5-7 FAQs per calculator, no padding to a round number
- Wire into `FAQPage` JSON-LD schema (already in plan) for rich-result eligibility
- Answers should be 2-4 sentences each — long enough to be useful, short enough to not bury the calculator
- Update FAQs annually after Union Budget / IRS changes / major rate revisions

---

## 4. Charts — Per-Calculator, Not Per-Template

Replace the "every page gets a chart" assumption with: each chart must answer a question the calculator's user is actually asking.

### Charts that matter (build these well)

| Calculator | Chart type | What it shows |
|------------|------------|---------------|
| EMI Calculator | Amortization stacked area | Principal vs interest over time |
| SIP Calculator | Wealth ladder (stacked bars) | Year-by-year corpus: invested vs returns |
| Home Loan EMI | Amortization + prepayment overlay | Impact of annual prepayment |
| HRA Calculator | Three-scenario bars | Exemption across rent-vs-basic ratios |
| Capital Gains | Horizontal bars | Tax owed with vs without indexation |
| Term Insurance | Line chart | Premium curve by age — cost of delay |
| Old vs New Regime | Side-by-side stacked bars | Tax + savings under each regime |
| Compound Interest | Exponential curve | With doubling-point annotations |
| NPS Calculator | Pie + projection | Corpus split + annuity payout |
| Retirement Corpus | Two stacked areas | Accumulation phase vs decumulation phase |
| SIP vs Lumpsum | Dual line chart | Both strategies' growth trajectories |
| FD Calculator | Compound growth curve | Cumulative interest over tenure |
| Debt Avalanche vs Snowball | Two timeline bars | Months-to-payoff for each strategy |

### Charts to omit

For these, ship the calculator without a chart:
- Percentage Calculator
- Ratio Calculator
- Simple Interest Calculator (one input, one output — chart is noise)
- APR vs APY Calculator (a single number comparison)
- Rule of 72 / Rule of 70 Calculator
- Weighted Average / Standard Deviation Calculator
- Currency Converter (no temporal dimension)
- Stamp Duty Calculator (single-output)
- Markup Calculator
- Cross Rate Calculator

### Implementation guidance

- Use `recharts` per the existing plan, but render each chart's `builder` function with calculator-specific logic
- Annotate charts with reference lines where meaningful (e.g., "₹1 crore goal" line on retirement charts)
- Provide a text-table alternative for accessibility (already in spec — enforce it)
- Charts should be color-consistent with brand tokens, not rainbow-default Recharts colors

---

## 5. How-To-Use — Worked Examples, Not Step Lists

### Bad pattern

> 1. Enter loan amount
> 2. Enter interest rate
> 3. Enter tenure
> 4. Click calculate

This treats the user as someone who can't read form labels.

### Good pattern

Walk through a realistic scenario with real Indian numbers and contextual tips that only make sense for *that* calculator.

### Worked example

**EMI Calculator — How to use:**

> 1. Enter your loan amount. If you're considering a ₹50L home loan, enter 5000000.
>
> 2. Enter the interest rate the bank quoted you. Current home loan rates in India range from 8.4% to 9.5% — use the rate you've actually been offered, not an average. If your sanction letter says "RBI repo + 2.25%," use the current repo rate (verify at rbi.org.in) plus that spread.
>
> 3. Enter tenure in years. Most home loans are 15-30 years. Longer tenure = lower EMI but more total interest. Try 20 vs 25 years and compare the total interest in the results.
>
> 4. Use the prepayment slider to see what an annual prepayment of ₹1L would do — most home loans allow this without penalty under RBI guidelines for floating-rate loans.

### Implementation guidance

- Steps should mention specific Indian rupee amounts that match actual real-world scenarios
- Where applicable, reference primary sources users can verify themselves
- Mention what to do *after* getting the result, not just how to get it
- 3-5 steps is plenty; don't pad

---

## 6. AdSense Approval — Open Question

### Concern flagged earlier

Applying for AdSense on launch day (with 200 pages going live simultaneously) is increasingly risky in 2026. Common rejection patterns:
- "Low value content" classifier triggers on bulk simultaneous publishing
- New domains with no content history get held for review
- Thin About/Contact pages cause rejection

### Recommended approach

- Switch domain after 15 calculators are launched at flagship quality
- Wait 2-3 weeks after the switch before applying
- During the wait: add 5-10 more calculators, 3-5 more articles, accumulate some Search Console impressions (even 50/week is enough signal)
- Apply with a site that *exists*, not one that just appeared

### Open question for you

Do you want to:
- **(a)** Apply early and accept the risk of needing to reapply (no penalty for reapplying, but you wait 30 days between attempts)
- **(b)** Wait the 2-3 weeks and apply once
- **(c)** Apply now via `calcyourfinance.com` in its current state (10 basic tools) — get a baseline approval, then improve the site under that approved account

Option (c) is interesting if your current 10 tools are AdSense-ready (real About/Contact/Privacy pages exist, basic content quality). Some publishers find approval easier with simpler initial sites. Worth checking what's on `calcyourfinance.com` right now before deciding.

---

## 7. Currency Detection — The `ipapi.co` Problem

### The issue

Doc 04 uses `ipapi.co` free tier for IP-based currency detection. Free tier limit: 1,000 requests/day. With even modest traffic (2,000 visits/day), and first-visit users having no cached preference, you'll exceed this within hours. API will either rate-limit (HTTP 429) or block the IP.

### Recommended fix — three-tier fallback

Since the site is on Cloudflare Pages, use Cloudflare's built-in geolocation:

**Tier 1 — Cloudflare `CF-IPCountry` header (free, unlimited)**
- Cloudflare adds this header automatically to all requests routed through their network
- Available via a tiny Cloudflare Pages Function or Worker
- Maps country code to currency in a static lookup table (IN → INR, US → USD, etc.)

**Tier 2 — Browser `Accept-Language` / `navigator.language`**
- If CF header is unavailable (edge case), parse the browser's language tag
- `en-IN` → INR, `en-US` → USD, `en-GB` → GBP, etc.

**Tier 3 — Default fallback**
- If everything fails, default to USD (or INR if you're confident in your audience)
- Surface a clear currency selector so users can override

### Implementation sketch

```typescript
// /functions/_middleware.ts (Cloudflare Pages Function)
export const onRequest: PagesFunction = async ({ request, next }) => {
  const country = request.headers.get('CF-IPCountry') ?? 'XX';
  const response = await next();
  response.headers.set('X-Detected-Country', country);
  return response;
};
```

Then in client code, read `X-Detected-Country` from the response of the first navigation, or expose it via a small `/api/geo` endpoint. Cache the resolved currency in `localStorage` for 30 days as already planned.

### Why this is better

- Zero third-party dependency
- No rate limits — Cloudflare adds the header on every request anyway
- Lower latency (no external API call)
- Privacy-friendly (no IP is sent to a third party)

---

## 8. PDF Export — Replace `html2canvas` with Native jsPDF

### The issue

Doc 04 uses `jsPDF + html2canvas`. `html2canvas` rasterizes the DOM into a canvas image, which means:
- PDF text is not selectable or searchable
- Output looks blurry on retina screens
- Recharts SVGs often render with broken paths or missing labels
- File size balloons to 2-3 MB per PDF
- Looks amateur on a "professional finance calculator" promise

### Recommended fix — native jsPDF rendering

Generate the PDF programmatically with jsPDF directly:

- **Text**: Write strings as actual PDF text objects (selectable, searchable, small file size)
- **Tables**: Use `jspdf-autotable` plugin for clean amortization schedules, comparison tables
- **Charts**: Either re-render with jsPDF drawing primitives, or use `svg2pdf.js` to convert Recharts SVG directly to vector PDF paths
- **Branded header**: Already correct in current spec — keep it

### Why this matters

- Output is professional-looking, vector-quality, under 100 KB
- Text is selectable (users can copy numbers from the PDF)
- Indexable by search engines if hosted (future-proofing)
- Faster generation (under 1 second vs 3-5 seconds for html2canvas on mobile)
- No "screenshot of a webpage" amateur feel

### Implementation effort

- ~30 mins of refactoring per calculator's PDF builder, but the layout is the same across all 200, so it's largely a one-time helper-function rewrite
- Add `jspdf-autotable` and `svg2pdf.js` to dependencies

---

## 9. Smaller Technical Items

### 9.1 OG Images — Pre-generate at build time

**Issue:** `output: 'export'` (static export) means you can't dynamically generate per-calculator OG images at request time. Without per-page OG images, every shared link looks identical → lower share CTR.

**Fix:** Add a build-time script using `satori` (or `@vercel/og` in standalone mode) that generates 200+ PNG OG images during `npm run build` and writes them to `/public/og/[slug].png`.

**Sketch:**
```javascript
// /scripts/generate-og-images.mjs
import satori from 'satori';
import { calculators } from '../src/data/calculators.js';

for (const calc of calculators) {
  const svg = await satori(
    <div style={{ /* branded layout with calc.name */ }}>...</div>,
    { width: 1200, height: 630, fonts: [...] }
  );
  // convert SVG to PNG via sharp, write to /public/og/[slug].png
}
```

Add to the GHA workflow as a pre-build step.

### 9.2 Build-time parallelization

**Issue:** ~250 pages (200 calculators + 30+ articles + 12 static + all-tools filtered routes) means build time will creep into 3-5 minute territory. Slows iteration.

**Fix:**
- In `.github/workflows/deploy.yml`, use `next build` with `NEXT_BUILD_WORKERS=4` or higher (Next 14 supports parallel page generation)
- Consider splitting build into "data prep" and "render" jobs that run in parallel
- Use GHA cache for `.next/cache` so subsequent builds are 2-3x faster
- Use `actions/cache@v4` for both `node_modules` and `.next/cache`

### 9.3 Search index — inline top 50, lazy-load the rest

**Issue:** `fuse.js` over a 200-item JSON index requires fetching `search-index.json` on first keystroke. The network round-trip creates ~100-300ms perceived lag, especially on mobile.

**Fix:**
- Inline the index for the 50 most popular calculators (EMI, SIP, Income Tax, FD, PPF, etc.) directly in the JS bundle
- Show results from the inline index instantly on first keystroke
- In parallel, fetch the full 200-item index in the background and merge once loaded
- Subsequent searches use the full index

**Result:** Search feels instant for the queries that matter most (the popular calculators), and graceful degradation handles the long tail.

### 9.4 Analytics — Add Cloudflare Web Analytics

**Issue:** No analytics mentioned anywhere in the PRD. Without it, you have no idea which calculators get traffic, which articles convert to calculator visits, where users drop off, or which keywords are bringing impressions.

**Fix:** Add **Cloudflare Web Analytics** (free, privacy-friendly, no cookie banner needed because no PII is collected). Single script tag injection in `LayoutShell`. Add to Day 27 of the build order.

**Optional upgrade later:** Plausible (~$9/month) if you outgrow CF Analytics. **Avoid Google Analytics** — heavy, requires cookie banner, hurts Core Web Vitals.

### 9.5 Contact page — pick a backend strategy

**Issue:** Static export means no native form handling. Doc 02 mentions a Contact page but Doc 04 has no plan for what happens when someone submits the form.

**Fix — pick one:**
- **(a) Cloudflare Pages Function** at `/functions/contact.ts` that receives POST and forwards to email via Resend/Postmark/AWS SES. Free tier covers far more than you'll need.
- **(b) Formspree** — free tier handles 50 submissions/month, dead-simple HTML form action.
- **(c) `mailto:` link** with subject prefilled — zero backend, but spam-prone if exposed plainly. Obfuscate with simple JS.

Recommendation: **(a) Cloudflare Pages Function**, since you're already on Cloudflare. Keeps everything in one platform, free, and you control the data.

### 9.6 `llms.txt` — small upside, easy to add

**Issue:** Increasingly relevant in 2026 — AI search engines (Perplexity, ChatGPT search, Claude search, Bing Copilot) use `/llms.txt` and `/llms-full.txt` to understand what your site is about and which pages to surface in AI-generated answers.

**Fix:** Add `/public/llms.txt` with a structured index:

```
# CalcYourFinance

> Free finance calculators for Indian and global users — EMI, SIP, tax, retirement, insurance, and more. Each calculator includes plain-English explanations, charts, and PDF export.

## Calculators
- [EMI Calculator](https://calcyourfinance.com/calculators/emi-calculator/): Calculate loan EMI with amortization schedule
- [SIP Calculator](https://calcyourfinance.com/calculators/sip-calculator/): Project mutual fund SIP returns
- [Income Tax Calculator India](https://calcyourfinance.com/calculators/income-tax-calculator-india/): Compare old vs new tax regime for FY [current]
...

## Articles
- [SIP vs Lumpsum: Which strategy wins in [year]](...)
...
```

Auto-generate this file from `calculators.ts` at build time so it stays in sync. Also add `/llms-full.txt` with the full content of all pages (useful for AI training/citation).

### 9.7 Schema markup — use `SoftwareApplication` for free-tool rich results

**Issue:** Current spec uses `WebApplication` schema, which is fine but underutilizes Google's rich-result options for free tools.

**Fix:** Use the more specific `SoftwareApplication` schema on calculator pages:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "EMI Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": "https://calcyourfinance.com/calculators/emi-calculator/",
  "description": "Free EMI calculator for personal, home, car, and education loans...",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "[real number — only add when you have real ratings]"
  }
}
```

**Caveat:** Don't fabricate `aggregateRating`. Google will penalize this. Add it later only if you implement a real rating system. Without ratings, the rest of `SoftwareApplication` still qualifies for free-tool rich treatment.

### 9.8 Article-to-calculator ratio — 1:1 commitment

**Issue:** PRD currently plans 12 articles for 200 calculators. That's a ratio of 1:17, which is too thin for proper internal linking and topical authority signals.

**Fix — commit to 1 article per calculator over the long term:**

- Each calculator gets at least one dedicated companion article that explains the underlying concept in depth and links into the calculator
- Articles are not built simultaneously with calculators — they're added over time
- Realistic cadence: 4-6 articles per month for the first 12 months, reaching ~60-72 articles, then continue until parity

**Why this matters:**
- Internal linking density is one of the strongest topical-authority signals Google uses
- Articles capture informational-intent traffic that calculators don't ("what is XIRR" vs "XIRR calculator")
- Articles rank for the question, then funnel traffic into the calculator — your ad revenue compounds

**Practical structure per article:**
- 1,200-2,500 words
- Links to its companion calculator 2-3 times in natural prose (not stuffed footer links)
- Links to 3-8 related calculators from other paragraphs
- Has its own `FAQPage` schema (different FAQs from the calculator's)
- Has its own `Article` schema with `datePublished` and `dateModified`

**Update Doc 02 and Doc 04 to reflect:**
- Blog roadmap: 12 at launch → 60-72 by month 12 → 200+ by month 24
- Each calculator's `articleSlugs[]` field will eventually have 1-3 entries
- Build a routine: every new calculator added post-launch ships with its companion article in the same PR

---

## Action Item Summary

Items to fix before relaunch:
- [ ] Refactor PDF export to use native jsPDF + svg2pdf.js
- [ ] Replace ipapi.co with Cloudflare CF-IPCountry header via Pages Function
- [ ] Add OG image build script (satori-based) to GHA workflow
- [ ] Add Cloudflare Web Analytics to `LayoutShell`
- [ ] Pick contact-form strategy (recommendation: CF Pages Function)
- [ ] Add `/public/llms.txt` generation script
- [ ] Switch calculator schema to `SoftwareApplication`
- [ ] Inline top-50 search index, lazy-load the rest
- [ ] Add GHA cache for `.next/cache` and `node_modules`

Items to keep enforcing during build:
- [ ] No templated `generateSummary` — every calculator has specific rules
- [ ] No invented FAQs — research from real user queries
- [ ] No forced charts — omit where they don't add information
- [ ] No generic `howToUse` — worked example with Indian numbers
- [ ] Each calculator's content reviewed against the anti-template checklist

Decisions you still need to make:
- [ ] AdSense application timing — (a) early + reapply if rejected, (b) wait 2-3 weeks post-switch, or (c) apply now via current calcyourfinance.com
- [ ] Article-to-calculator commitment — confirm 1:1 long-term target
- [ ] Article cadence post-launch — 4/month or 6/month?