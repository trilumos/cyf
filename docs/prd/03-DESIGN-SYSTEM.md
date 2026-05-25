# 03 — Design System & Page Specifications

This document is the source of truth for visual design. Implement exactly as specified.

---

## Color tokens

Add to `tailwind.config.ts`:

```typescript
colors: {
  // Brand
  brand: {
    primary: '#1B4FD8',      // Main accent — buttons, links, charts
    primaryDark: '#1740B5',  // Hover state
    primaryLight: '#EEF2FF', // Backgrounds, soft accents
    primaryBorder: '#C7D2FE',// Borders on light primary backgrounds
    primaryText: '#3730A3',  // Text on primaryLight backgrounds
  },
  // Neutrals
  page: '#F9FAFB',           // Page background
  surface: '#FFFFFF',        // Card/section surface
  ink: {
    primary: '#111827',      // Headings, primary text
    secondary: '#374151',    // Body text
    tertiary: '#6B7280',     // Subdued text
    muted: '#9CA3AF',        // Captions, labels
  },
  border: {
    DEFAULT: '#E5E7EB',
    subtle: '#F3F4F6',
    strong: '#D1D5DB',
  },
  // Semantic
  success: '#10B981',
  successBg: '#F0FDF4',
  successText: '#166534',
  warning: '#F59E0B',
  warningBg: '#FFFBEB',
  warningBorder: '#FCD34D',
  warningText: '#92400E',
  danger: '#EF4444',
  dangerBg: '#FEF2F2',
  // Category accents — DATA ONLY. Per CLAUDE.md, category color is rendered in exactly ONE place:
  // the 3px left border on the active mega-menu category row. Never as dots, bars, or badges anywhere else.
  cat: {
    loan: '#1B4FD8',
    investment: '#0EA5E9',
    tax: '#8B5CF6',
    retirement: '#10B981',
    insurance: '#F59E0B',
    business: '#EF4444',
    currency: '#06B6D4',
    realestate: '#84CC16',
    personal: '#EC4899',
    stocks: '#F97316',
    economics: '#6366F1',
    math: '#0EA5E9',
  },
}
```

---

## Typography

Font: **Inter** via `next/font/google`, all weights 400/500/600/700.

```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
```

Apply `font-family: var(--font-inter), system-ui, sans-serif` globally.

### Type scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `text-h1` | 32px / 36px line | 700 | Hero titles |
| `text-h2` | 24px / 30px | 700 | Page titles |
| `text-h3` | 20px / 28px | 600 | Section titles |
| `text-h4` | 16px / 24px | 600 | Card titles |
| `text-body` | 14px / 22px | 400 | Body copy |
| `text-sm` | 13px / 20px | 400 | Secondary copy |
| `text-xs` | 12px / 18px | 400 | Captions, labels |
| `text-mini` | 10px / 14px | 600 | Tags, badges (uppercase, tracking +0.04em) |

---

## Spacing & sizing

- Page max width: `1200px`, centered with `px-4` on mobile, `px-6` desktop
- Calculator page grid: **`minmax(0,1fr)` center + `300px` right rail, `gap-8`** (no left rail). See `08-CALCULATOR-BUILD-STANDARD.md` §2 — this supersedes the old `155px / 1fr / 155px` three-column grid, which could not physically hold 300px ads.
- Card border radius: `rounded-xl` (12px) for major cards, `rounded-lg` (8px) for inner sections, `rounded-md` (6px) for buttons/pills
- Card border: `border border-border` (0.5px solid `#E5E7EB`)
- Card padding: `p-4` to `p-6` depending on density
- Section vertical rhythm: `py-8` between major sections

---

## Component library to build

Build these as reusable components in `/src/components/`:

### Global
- `Navbar.tsx` — top navigation with mega menu trigger
- `MegaMenu.tsx` — the dropdown panel
- `Footer.tsx`
- `LayoutShell.tsx` — wraps every page, includes Navbar + Footer
- `SearchBar.tsx` — Fuse.js client-side search
- `CurrencySelector.tsx` — small dropdown, persists in localStorage

### Ads (the toggle system — critical)
- `AdSlot.tsx` — props: `{ size: '300x250' | '300x150' | '728x90', position: string }`
  - Reads `process.env.NEXT_PUBLIC_ADS_ENABLED`
  - When `false`: renders a placeholder div with exact size + label "Advertisement" (matches mockup)
  - When `true`: renders the AdSense `<ins>` element with the proper data attributes
  - Either way, takes up the same space so no layout shift when toggle flips

### Calculator page
- `CalculatorShell.tsx` — 3-col layout wrapper (left ad cards, center, right cards)
- `CalculatorInputs.tsx` — composable inputs with sliders
- `CalculatorResults.tsx` — results card with the AI summary block
- `PlainEnglishSummary.tsx` — takes calculator output, generates plain-English text via rule-based logic
- `ResultsChart.tsx` — wraps Recharts components, accepts data and type
- `LastUpdatedBadge.tsx` — shows "Last updated: 21 May 2026 · Source: ..."
- `RelatedToolsCard.tsx` — floating right-rail card
- `RelatedArticlesCard.tsx` — floating right-rail card
- `ExportShareCard.tsx` — PDF export + copy link card
- `EducationalContent.tsx` — markdown content section below calc
- `ComparisonTable.tsx` — for SIP vs Lumpsum style comparisons
- `FAQSection.tsx` — also emits FAQ JSON-LD

### Cards & UI
- `ToolCard.tsx` — homepage and all-tools page tool card
- `CategoryCard.tsx` — homepage category cards with colored bar
- `BlogCard.tsx` — blog grid card
- `FeaturedBlogCard.tsx` — large featured post card
- `BreadcrumbNav.tsx`
- `CtaCalculatorCard.tsx` — inline blog CTA linking to a calculator
- `TocSidebar.tsx` — table of contents in articles

---

## Page-by-page specifications

### Homepage (`/`)

**Structure (top to bottom):**

1. `<Navbar />`
2. Hero section
   - Background: white
   - Centered content, max-width 480px
   - Pill tag: "200+ FREE FINANCE CALCULATORS" (uppercase, `text-mini`, `bg-brand-primaryLight`, `text-brand-primaryText`)
   - H1: "Make smarter money decisions with **CalcYourFinance**" (brand name in `text-brand-primary`)
   - Subtitle: "From EMI to SIP, tax to retirement — every calculator you'll ever need, free forever."
   - Big search bar (height 44px, `bg-page`, border, with search icon and "Search" button on the right)
   - 4 trust stats in a row: `200+` Calculators · `12` Categories · `100%` Free forever · `0` Sign-up needed
3. "Most popular tools" section
   - Heading + "View all →" link
   - 4-column grid (responsive: 2 cols tablet, 1 col mobile) of 8 ToolCards
   - Each card: icon in `bg-brand-primaryLight` square, tool name, description, optional "Popular"/"Trending" badge
4. Full-width ad banner (728×90)
5. "Browse by category" section
   - 4-column grid of 12 CategoryCards
   - Each card: category name, short description, "N calculators" count. NO color bar (category color is data-only per CLAUDE.md)
6. "Latest from the blog" section
   - Heading + "All articles →" link
   - 3-column blog grid
7. `<Footer />`

### All Tools page (`/all-tools/`)

**Structure:**

1. `<Navbar />`
2. Page header
   - H2: "All Finance Calculators"
   - Sub: "200+ free tools across 12 categories — no sign-up required"
   - Search bar (Fuse.js, filters the list below in real time)
3. Filter pills row (sticky to top when scrolled)
   - Pills: `All (200+)` + one for each category
   - Active pill: `bg-brand-primaryLight` border `border-brand-primaryBorder` text `text-brand-primary`
4. Two-column layout below filters
   - **Left rail (140px):** category nav list, sticky, vertical
     - Each item shows category name + count
     - Active item: blue left border + light blue background
     - Clicking scrolls to category section AND activates the pill filter
   - **Right area (1fr):** content with one section per category
     - Each section: header with category name + count (no colored dot), then 3-column grid of tool items
     - Each tool item: small icon square, tool name, short description, optional "New" badge
5. `<Footer />`

**Query param behavior:**
- `/all-tools/?category=tax` → on mount, activate "Tax" filter pill, scroll to Tax section, highlight it briefly with a 1-second fade

### Individual calculator page (`/calculators/[slug]/`)

> **AUTHORITATIVE SPEC: see `08-CALCULATOR-BUILD-STANDARD.md` §2.** The layout below is a summary; doc 08 is the source of truth for the calculator-page layout, module interface, content checklist, charts, PDF, and schema. The earlier "three-column with left + right ad rails" design has been replaced because 300px ads cannot fit a 155px rail and the double-rail layout hurt Core Web Vitals and AdSense standing.

**Structure (top to bottom):**

1. `<Navbar />`
2. Breadcrumb: `Home › [Category] › [Calculator Name]`
3. **Two-area grid: center column (`minmax(0,1fr)`, max ≈ 760px) + right rail (`300px`, sticky), `gap-8`. No left rail.**
   - **Center column:**
     - H1 (tool name) + sub line (brief description)
     - **LastUpdatedBadge** (only for calculators that read from a JSON file)
     - Inputs section — each input: small label, input row with embedded value tag, slider below (`--brand-primary` track/thumb)
     - AdSlot (responsive in-content) — between inputs and results
     - Results section (background `bg-brand-primaryLight` #EEF2FF, border `border-brand-primaryBorder`, `rounded-lg`, `p-4`)
       - "Your results" small label
       - grid of result number cards (label + big value)
       - Chart (Recharts v3, `#1B4FD8` palette) — **only when it adds information** (doc 08 §4)
       - **Plain-English summary block** — label "What this means for you" (plain text, no glyph/emoji), intro with `<strong>` numbers, key insight on a full-edge `#EEF2FF` tint (`rounded-lg`, `p-3`, NO colored side-stripe), tip line ending in a `text-brand-primary` related-tool link
     - AdSlot (responsive in-content) — below results
     - Educational content: H3 "What is [tool]?" (2–3 paras) · H3 "How to use" (worked example, real ₹ amounts) · H3 "Formula" (with worked example) · ComparisonTable (only where meaningful) · FAQSection (≥5 real-query Q&As, emits FAQ JSON-LD)
   - **Right rail (300px, sticky `top-24`):**
     - RelatedToolsCard (5 sibling tools from same category)
     - RelatedArticlesCard (2–3 related blog articles)
     - ExportShareCard ("Export as PDF" primary + "Copy result link" secondary)
     - AdSlot (300×250) — **below the export card**
4. `<Footer />`

**Total ad slots = 3** (2 responsive in-content + 1 right-rail 300×250). `AdSlot` must reserve slot dimensions even when ads are disabled (zero layout shift on enable) — see doc 08 §2.

**Mobile behavior (< lg):** single column. Right-rail cards move below the educational content in order Related Tools → Related Articles → Export/Share. In-content ads stay between inputs/results and below results; the right-rail 300×250 becomes an in-content responsive unit.

### Blog listing page (`/blog/`)

**Structure:**

1. `<Navbar />`
2. Breadcrumb: `Home › Blog`
3. Page header
   - H2: "Finance Blog"
   - Sub: "Plain-English guides, comparisons, and explainers for every money decision"
   - Category filter pills row (sticky when scrolled)
4. Two-column grid below
   - **Main column (1fr):**
     - FeaturedBlogCard (one large card with image-style gradient header, "FEATURED" badge, large title, excerpt, meta row with read button)
     - "Latest articles" heading
     - 2-column grid of BlogCards
     - Mid-list ad banner (728×90)
     - More BlogCards
     - Pagination (page 1, 2, 3...)
   - **Right rail (150px), sticky:**
     - "Browse topics" card — list of category links with article counts
     - "Most read" card — top 4 articles with numbered ranking (`01`, `02`, `03`, `04` in large faded number, then title)
     - AdSlot (300×250)
5. `<Footer />`

### Article page (`/blog/[slug]/`)

**Structure:**

1. `<Navbar />`
2. Two-column layout
   - **Main column:**
     - Breadcrumb: `Home › Blog › [Category]`
     - Category pill (uppercase)
     - H1: article title
     - Meta row: read time, date, difficulty level (icons)
     - Intro paragraph (slightly larger than body)
     - **Inline CalculatorCTA card** (light blue background, calculator icon, title, sub, "Calculate now →" button)
     - Article body (markdown rendered)
       - H2s for sections
       - Comparison tables where relevant
       - Inline mid-article ad banner (728×90)
       - Second inline CalculatorCTA card (different tool, contextually relevant)
       - More H2 sections
   - **Right rail (150px), sticky:**
     - "In this article" TOC card with numbered items
     - "Related articles" card
     - AdSlot (300×250)
3. `<Footer />`

### About page (`/about/`)

**Structure:**

1. `<Navbar />`
2. Hero strip (full-width blue background)
   - H1 white: "We make finance simple for everyone"
   - Sub paragraph: "Free calculators, plain-English explanations, zero sign-up. Built so anyone — not just finance professionals — can make confident money decisions."
3. Stats row (4 cards in a row)
   - `200+` Free calculators
   - `12` Finance categories
   - `100%` Free forever
   - `0` Data collected
4. Two-column layout
   - **Left column:**
     - H3 "Our mission" + 2 paragraphs
     - H3 "What makes us different" + 4 checkmark items
   - **Right column:**
     - H3 "Accuracy & disclaimer" + warning box (yellow background, important notice text)
     - H3 "Contact us" + email link
5. `<Footer />`

### Contact page (`/contact/`)

**Structure:**

1. `<Navbar />`
2. Two-column grid
   - **Left:** Contact form
     - H2: "Get in touch"
     - Sub
     - Fields: Name, Email, Subject, Message
     - "Send message" primary button
     - Form submission uses Cloudflare Pages Forms (free, no backend) OR `mailto:` fallback. Choose Cloudflare Forms.
   - **Right:** "Other ways to reach us"
     - 3 contact cards (Email, Report a bug, Suggest a calculator)
     - Response time info box (light blue background)
3. `<Footer />`

### Privacy Policy, Disclaimer

Standard text pages. Use the `LayoutShell`. Single column max-width 720px. Apply prose styling. Include a "Last updated" date that pulls from a constant.

### 404 page

Simple page with `<Navbar />` and `<Footer />` (yes, even 404 has the same navbar with About link).
- "Page not found" heading
- Sub: "The page you're looking for doesn't exist. Try one of these instead:"
- Search bar
- Grid of 6 popular tools

---

## Mega menu detailed spec

**Component path:** `/src/components/layout/MegaMenu.tsx`
**Wired into:** `/src/components/layout/Navbar.tsx`

### Behavior

- Opens on **click** of the "Calculators" nav item; `aria-expanded` is set on the trigger button
- Closes on: click outside the dropdown, or pressing Escape (focus returns to trigger)
- Width: spans the exact width of the navbar content area (logo left edge to All Tools button right edge). Achieved by rendering `position: absolute; top: 100%; left: 0; right: 0` inside the `relative` inner `max-w-page` container — not the full-viewport `<header>`
- Sits flush below the navbar with no gap
- `box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)` — below only
- Desktop: right panel updates instantly on hover over any left panel row
- Mobile: component collapses entirely; Navbar renders a simple stacked link list instead

### Structure — top to bottom

#### 1. Trending strip

```
background: #ffffff
border-bottom: 0.5px solid #f3f4f6
padding: 9px 20px
display: flex; align-items: center; gap: 8px; flex-wrap: wrap
```

- **Label "TRENDING":** `font-size: 11px; font-weight: 600; color: #9ca3af; letter-spacing: 0.04em; text-transform: uppercase`
- **Pills:** `border: 0.5px solid #e5e7eb; border-radius: 20px; padding: 4px 12px; font-size: 11.5px; color: #374151; background: #ffffff`
- **Pill hover:** `border-color: #1B4FD8; color: #1B4FD8; background: #EEF2FF; transition: all 0.1s`
- **Hardcoded pills (5):** "Old vs New Tax Regime", "FIRE Calculator", "SIP Step-Up", "Home Loan EMI", "Currency Converter"

#### 2. Two-panel body

```
display: flex; height: 400px
```

**Left panel**

```
width: 200px; flex-shrink: 0
background: #FAFAFA; border-right: 0.5px solid #e5e7eb
overflow-y: auto; padding: 8px 0
```

Each category row:

```
display: flex; align-items: center; padding: 10px 16px; gap: 10px
border-left: 3px solid transparent; cursor: pointer; transition: all 0.1s
```

| State | Styles |
|-------|--------|
| Default | `color: #374151; font-size: 12.5px; count color: #9ca3af / 10.5px; chevron: #d1d5db` |
| Hover | `background: #f3f4f6; border-left-color: #d1d5db` |
| Active | `background: #ffffff; border-left: 3px solid #1B4FD8; name color: #1B4FD8; font-weight: 600; count color: rgba(27,79,216,0.6); chevron color: #1B4FD8` |

First category active by default on open. Hovering any row immediately updates the right panel.

**Right panel**

```
flex: 1; display: flex; flex-direction: column; background: #ffffff; min-width: 0
```

Header:

```
padding: 16px 20px 12px; border-bottom: 0.5px solid #f3f4f6; background: #ffffff; flex-shrink: 0
```

- Top row: category name `font-size: 15px; font-weight: 700; color: #111827` + tool count `font-size: 11px; color: #9ca3af`
- Description line below: `font-size: 12px; color: #6b7280; margin-top: 3px`

Tools area:

```
flex: 1; overflow-y: auto; padding: 6px 0; display: flex
```

Three vertical columns — data pre-chunked:

```typescript
const chunkSize = Math.ceil(tools.length / 3);
const columns = [
  tools.slice(0, chunkSize),
  tools.slice(chunkSize, chunkSize * 2),
  tools.slice(chunkSize * 2),
];
```

Each column div: `flex: 1; border-right: 0.5px solid #f3f4f6` (last column has no border-right).

Each tool row:

```
display: flex; align-items: center; justify-content: space-between
padding: 8px 20px; gap: 8px; transition: background 0.08s; cursor: pointer
```

Row hover: `background: #EEF2FF`

Left `.tinfo` block: `display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0`

- Tool name: `font-size: 12px; font-weight: 500; color: #1f2937; line-height: 1.3` — hover: `color: #1B4FD8`
- Sub-label: `font-size: 10px; color: #b0b7c3; line-height: 1.2` — value = `description` field from `calculators.ts`

Right: `<IconChevronRight size={10}>` — `color: #1B4FD8; opacity: 0` by default — hover: `opacity: 1; transition: opacity 0.08s`

**No card borders, no boxes around individual tool rows.**

#### 3. Footer strip

```
border-top: 0.5px solid #f3f4f6; padding: 10px 20px
background: #FAFAFA; display: flex; justify-content: space-between; align-items: center
```

- Left: `font-size: 11px; color: #9ca3af` — "200 calculators across 12 categories — all free"
- Right: `font-size: 11.5px; font-weight: 600; color: #1B4FD8` — `<IconLayoutGrid size={12} /> View all [N] [Category Name] tools →` — updates with active category, links to `/all-tools/?category=[slug]`

### Data sources

| Data | Source |
|------|--------|
| Category list, slugs, counts | `/src/data/categories.ts` — `CATEGORIES` array |
| Tool names + sub-labels | `/src/data/calculators.ts` — `getByCategory(categoryId)` — `description` field is the sub-label |
| 3-column layout | Pre-chunked with `Math.ceil(tools.length / 3)` before rendering |

### Accessibility

- `role="navigation"` and `aria-label="Finance calculator categories"` on root div
- `aria-expanded` on the Calculators trigger button in Navbar
- `role="listbox"` / `aria-label="Calculator categories"` on the left panel
- `role="option"` + `aria-selected` on each category row
- Escape key closes menu; click outside closes menu
- All rows keyboard navigable

---

## Plain-English summary — rule-based logic

This component generates explanatory text based on calculator inputs and results. **No AI API calls** — pure JavaScript logic per calculator.

Each calculator exports a `generateSummary(inputs, results)` function that returns:

```typescript
interface Summary {
  intro: string;        // first paragraph with <strong> tags around key numbers
  highlight: string;    // the "aha" insight (rendered in yellow box)
  tip: {                // actionable advice
    text: string;
    relatedToolSlug?: string;  // optional link to a related calculator
  };
}
```

### Example for EMI Calculator

```typescript
function generateSummary(inputs, results) {
  const { loanAmount, rate, tenureYears } = inputs;
  const { emi, totalInterest, totalAmount } = results;
  const interestRatio = totalInterest / loanAmount;
  const tenureMonths = tenureYears * 12;

  return {
    intro: `You're borrowing <strong>${formatCurrency(loanAmount)}</strong> for ${tenureYears} years at ${rate}%. Every month, you'll pay <strong>${formatCurrency(emi)}</strong> for ${tenureMonths} months.`,
    highlight: `By the time you finish paying, you'll have paid back <strong>${formatCurrency(totalAmount)}</strong>${interestRatio > 1 ? ' — more than double what you borrowed' : ''}. That extra ${formatCurrency(totalInterest)} is the cost of borrowing this money.`,
    tip: {
      text: `Even paying ${formatCurrency(emi * 0.12)} extra per month could save you a significant amount in interest and cut years off your loan.`,
      relatedToolSlug: 'loan-prepayment-calculator',
    },
  };
}
```

Each of the 200 calculators has its own `generateSummary` function tailored to that calculator's logic. Keep summaries short, conversational, and avoid jargon. Use comparisons ("roughly the cost of a decent dinner out, every day of the month") where helpful.

---

## Charts

Use Recharts. Always use brand primary color (`#1B4FD8`) with opacity variations for multi-series charts. Charts should be:

- **Useful, not decorative** — only include if they add understanding
- Responsive (`ResponsiveContainer`)
- Accessible (proper ARIA labels)
- Display tooltips on hover with formatted values

### Recommended chart per calculator type

| Calculator type | Chart |
|------------------|-------|
| EMI, Home Loan, Car Loan | Stacked area: principal vs interest over months |
| SIP, SWP, Lumpsum | Line: investment value over time |
| Retirement / FIRE | Line: corpus growth + withdrawal phase |
| Compound Interest | Bar: contribution vs interest at intervals |
| Income Tax | Donut: tax breakdown by section |
| Budget Planner | Donut: 50/30/20 breakdown |
| Stock P&L | Bar: per-position P&L |
| Comparison tools | Side-by-side bar comparison |
| Pure math (percentages, ratios) | No chart |
