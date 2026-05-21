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
  // Category accents (used as small color dots only)
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
- Calculator page grid: `155px` left col, `1fr` center, `155px` right col, `gap-4`
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
   - Pill tag: "204+ FREE FINANCE CALCULATORS" (uppercase, `text-mini`, `bg-brand-primaryLight`, `text-brand-primaryText`)
   - H1: "Make smarter money decisions with **CalcYourFinance**" (brand name in `text-brand-primary`)
   - Subtitle: "From EMI to SIP, tax to retirement — every calculator you'll ever need, free forever."
   - Big search bar (height 44px, `bg-page`, border, with search icon and "Search" button on the right)
   - 4 trust stats in a row: `204+` Calculators · `12` Categories · `100%` Free forever · `0` Sign-up needed
3. "Most popular tools" section
   - Heading + "View all →" link
   - 4-column grid (responsive: 2 cols tablet, 1 col mobile) of 8 ToolCards
   - Each card: icon in `bg-brand-primaryLight` square, tool name, description, optional "Popular"/"Trending" badge
4. Full-width ad banner (728×90)
5. "Browse by category" section
   - 4-column grid of 12 CategoryCards
   - Each card: small color bar on top (using `cat.[slug]` color), category name, "N calculators"
6. "Latest from the blog" section
   - Heading + "All articles →" link
   - 3-column blog grid
7. `<Footer />`

### All Tools page (`/all-tools/`)

**Structure:**

1. `<Navbar />`
2. Page header
   - H2: "All Finance Calculators"
   - Sub: "204+ free tools across 12 categories — no sign-up required"
   - Search bar (Fuse.js, filters the list below in real time)
3. Filter pills row (sticky to top when scrolled)
   - Pills: `All (204+)` + one for each category
   - Active pill: `bg-brand-primaryLight` border `border-brand-primaryBorder` text `text-brand-primary`
4. Two-column layout below filters
   - **Left rail (140px):** category nav list, sticky, vertical
     - Each item shows category name + count
     - Active item: blue left border + light blue background
     - Clicking scrolls to category section AND activates the pill filter
   - **Right area (1fr):** content with one section per category
     - Each section: header with colored dot + category name + count, then 3-column grid of tool items
     - Each tool item: small icon square, tool name, short description, optional "New" badge
5. `<Footer />`

**Query param behavior:**
- `/all-tools/?category=tax` → on mount, activate "Tax" filter pill, scroll to Tax section, highlight it briefly with a 1-second fade

### Individual calculator page (`/calculators/[slug]/`)

**Structure (top to bottom):**

1. `<Navbar />`
2. Breadcrumb: `Home › [Category] › [Calculator Name]`
3. Three-column grid layout (`gap-3`)
   - **Left column (155px):** floating cards stack, sticky until footer
     - AdSlot (300×250)
     - AdSlot (300×150)
   - **Center column (1fr):** single white card with everything inside
     - H2 (tool name)
     - Sub line: brief description
     - **LastUpdatedBadge** (only for calculators that read from a JSON file)
     - Inputs section
       - Each input: small label, input row (with embedded value tag), slider below
       - Sliders use `--brand-primary` track and thumb
     - AdSlot (728×90) — between inputs and results
     - Results section (background `bg-brand-primaryLight`, border `border-brand-primaryBorder`, `rounded-lg`, `p-4`)
       - "Your results" small label
       - 3-column grid of result number cards (label + big value)
       - Chart below (Recharts, uses `--brand-primary` palette)
       - **AI Summary block** (PlainEnglishSummary component)
         - Pill: "✦ AI Summary" + "What does this mean for you?"
         - Plain-English first paragraph using `<strong>` for key numbers
         - Yellow highlight box for the key insight (`bg-warningBg`, `border-l-2 border-warning`, `rounded-r`)
         - Green tip box with bulb icon (`bg-successBg`, `text-successText`), includes a link to a related tool
     - AdSlot (728×90) — below results
     - Educational content section
       - H3: "What is [tool]?"
       - 2–3 paragraphs of body text
       - H3: "How to use this calculator"
       - Numbered steps
       - H3: "Formula"
       - Math formula with worked example
       - ComparisonTable (only for tools where a comparison adds value)
       - FAQSection (4–5 Q&As, emits FAQ JSON-LD schema)
   - **Right column (155px):** floating cards stack, sticky until footer
     - RelatedToolsCard (5 sibling tools from same category)
     - RelatedArticlesCard (2–3 related blog articles)
     - ExportShareCard ("Export as PDF" primary button + "Copy result link" secondary button)
     - AdSlot (300×150) — **below the export card** (this was an explicit user requirement)
4. `<Footer />`

**Mobile behavior:** stacks to single column. Left ads collapse to 1 inline ad above the calculator. Right cards move to below the calculator content. Inline ads stay between inputs/results and below results.

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
   - `204+` Free calculators
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

When user hovers/clicks "Calculators ▾" in the navbar, render `<MegaMenu />` directly below the navbar (full width, white background, `border-b border-border`, `py-4 px-6`).

4-column grid (`grid-cols-4 gap-4`):

**Column 1 — "LOANS" header (text-mini, uppercase, text-muted)**
- 4 top tools as rows: icon + name (each row links to that calculator)
- "View all 18 →" link in `text-brand-primary` (links to `/all-tools/?category=loan-emi`)

**Column 2 — "INVESTMENT"** — same structure, top 4 tools + "View all 20 →"

**Column 3 — "TAX & RETIREMENT"** — top 4 tools (2 from tax, 2 from retirement) + "View all 28 →" (this links to the all-tools page but doesn't auto-filter since it spans two categories — instead shows a combined view)

**Column 4 — "TRENDING NOW" (left border for visual separation)**
- 3 flame-icon items in `bg-warningBg` mini cards
- Below: small `bg-brand-primaryLight` panel titled "Can't find it?" with an inline search input

**Click behavior for "View all N →":**
- Navigate to `/all-tools/?category=[slug]`
- The All Tools page reads the query param, activates the corresponding filter pill, scrolls to that category section

**Open/close behavior:**
- Desktop: opens on hover with 100ms delay, closes when mouse leaves both navbar and menu (with 200ms grace period to allow diagonal movement)
- Mobile: opens on tap, closes on tap outside or selecting an item
- Keyboard accessible: Esc closes, arrow keys navigate items

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

Each of the 204 calculators has its own `generateSummary` function tailored to that calculator's logic. Keep summaries short, conversational, and avoid jargon. Use comparisons ("roughly the cost of a decent dinner out, every day of the month") where helpful.

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
