# 04 — Technical Implementation

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) with `output: 'export'` | Static export, excellent SEO, large ecosystem |
| Language | TypeScript | Type safety across 200+ calculators |
| Styling | Tailwind CSS | Fast iteration, design tokens map cleanly |
| Icons | `@tabler/icons-react` | Free, comprehensive, consistent |
| Charts | `recharts` | React-native, SSG-compatible |
| PDF | `jspdf` + `html2canvas` | Pure client-side |
| Search | `fuse.js` | Fast fuzzy search over JSON index |
| Animations | `framer-motion` (sparingly) | Smooth mega menu, results reveals |
| Markdown | `next-mdx-remote` for blog articles | Authoring flexibility |
| Schema | `next-seo` + manual JSON-LD | Granular control |

### `next.config.mjs`

```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },   // required for static export
  reactStrictMode: true,
};
export default nextConfig;
```

### `package.json` (key deps)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "@tabler/icons-react": "^3.0.0",
    "recharts": "^2.12.0",
    "jspdf": "^2.5.0",
    "html2canvas": "^1.4.0",
    "fuse.js": "^7.0.0",
    "next-mdx-remote": "^5.0.0",
    "framer-motion": "^11.0.0"
  }
}
```

---

## Project structure

```
/
├── public/
│   ├── favicon.ico
│   ├── og-default.png
│   ├── robots.txt
│   └── sitemap.xml (generated at build)
├── src/
│   ├── app/
│   │   ├── layout.tsx                     // root layout w/ LayoutShell
│   │   ├── page.tsx                       // homepage
│   │   ├── all-tools/page.tsx
│   │   ├── calculators/[slug]/page.tsx    // dynamic calculator pages
│   │   ├── blog/
│   │   │   ├── page.tsx                   // blog listing
│   │   │   └── [slug]/page.tsx            // article page
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   └── not-found.tsx                  // 404
│   ├── components/
│   │   ├── layout/        Navbar, Footer, MegaMenu, LayoutShell, SearchBar, CurrencySelector
│   │   ├── ads/           AdSlot
│   │   ├── calculator/    CalculatorShell, Inputs, Results, PlainEnglishSummary, ResultsChart, LastUpdatedBadge, RelatedToolsCard, RelatedArticlesCard, ExportShareCard, EducationalContent, ComparisonTable, FAQSection
│   │   ├── ui/            ToolCard, CategoryCard, BlogCard, FeaturedBlogCard, BreadcrumbNav, CtaCalculatorCard, TocSidebar
│   │   └── seo/           JsonLd, MetaTags
│   ├── calculators/
│   │   ├── _template/      Reference implementation
│   │   ├── loan-emi/       18 files
│   │   ├── investment/     20 files
│   │   ├── tax/            16 files
│   │   ├── retirement/     12 files
│   │   ├── insurance/      10 files
│   │   ├── business/       14 files
│   │   ├── currency-fx/    8 files
│   │   ├── real-estate/    12 files
│   │   ├── personal-finance/ 14 files
│   │   ├── stocks-crypto/  10 files
│   │   ├── economics/      10 files
│   │   └── financial-math/ 12 files
│   ├── content/
│   │   └── blog/                          // 12 MDX articles at launch
│   ├── data/
│   │   ├── calculators.ts                 // all 204 entries
│   │   ├── categories.ts                  // 12 categories
│   │   └── financial-rules/               // JSON files (see 05-LIVING-DATA.md)
│   ├── lib/
│   │   ├── currency.ts                    // FX detection + conversion
│   │   ├── pdf-export.ts                  // generatePdf(calculator, inputs, results)
│   │   ├── format.ts                      // formatCurrency, formatPercent, etc.
│   │   ├── seo.ts                         // schema generators
│   │   └── fuse-index.ts                  // search index builder
│   └── styles/
│       └── globals.css
├── scripts/
│   ├── generate-sitemap.mjs
│   ├── verify-rates.mjs                   // monthly GHA script
│   └── build-search-index.mjs
├── .github/
│   └── workflows/
│       ├── deploy.yml                     // Cloudflare Pages deploy
│       └── verify-rates.yml               // monthly rate check
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Calculator component pattern

Each calculator lives in its own file. They all follow the same interface so the dynamic route `/calculators/[slug]/page.tsx` can load and render any of them.

```typescript
// /src/calculators/loan-emi/emi-calculator.tsx

import type { CalculatorModule } from '@/types/calculator';

export const emiCalculator: CalculatorModule = {
  slug: 'emi-calculator',
  meta: {
    title: 'EMI Calculator — Calculate Loan EMI Online Free | CalcYourFinance',
    description: 'Free EMI calculator for personal, home, car, and education loans. Calculate monthly instalments instantly with charts and PDF export.',
    keywords: ['emi calculator', 'loan emi', ...],
  },
  defaultInputs: { loanAmount: 1000000, rate: 8.5, tenureYears: 20 },
  inputs: [
    { name: 'loanAmount', label: 'Loan amount', type: 'currency', min: 10000, max: 50000000, step: 10000 },
    { name: 'rate', label: 'Interest rate (% p.a.)', type: 'percent', min: 0.1, max: 36, step: 0.1 },
    { name: 'tenureYears', label: 'Loan tenure', type: 'years', min: 1, max: 30, step: 1 },
  ],
  compute: (inputs) => {
    const { loanAmount, rate, tenureYears } = inputs;
    const r = rate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (loanAmount * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - loanAmount;
    return { emi, totalInterest, totalAmount };
  },
  results: [
    { name: 'emi', label: 'Monthly EMI', format: 'currency' },
    { name: 'totalInterest', label: 'Total interest', format: 'currency' },
    { name: 'totalAmount', label: 'Total amount', format: 'currency' },
  ],
  chart: {
    type: 'amortization-stack',
    builder: (inputs, results) => { /* returns Recharts data array */ },
  },
  generateSummary: (inputs, results) => {
    // returns { intro, highlight, tip }
  },
  educationalContent: {
    whatIs: '...',
    howToUse: ['Step 1...', 'Step 2...'],
    formula: 'EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]',
    formulaExplanation: '...',
    faqs: [
      { q: 'What is an EMI?', a: '...' },
      { q: 'How is EMI calculated?', a: '...' },
    ],
  },
  requiresLiveData: [],  // none for pure-math calculators
};
```

All calculators are registered in a single index file:

```typescript
// /src/calculators/index.ts
import { emiCalculator } from './loan-emi/emi-calculator';
// ... import all 204
export const allCalculators = { 'emi-calculator': emiCalculator, /* ... */ };
```

The dynamic page loads the right one:

```typescript
// /src/app/calculators/[slug]/page.tsx
import { allCalculators } from '@/calculators';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';

export async function generateStaticParams() {
  return Object.keys(allCalculators).map(slug => ({ slug }));
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = allCalculators[params.slug];
  if (!calc) return notFound();
  return <CalculatorShell calculator={calc} />;
}
```

---

## SEO requirements

### Per-page meta tags

Every page must set:
- `<title>` — unique, under 60 chars, includes primary keyword + brand
- `<meta name="description">` — unique, 150–160 chars
- `<link rel="canonical">` — absolute URL
- `<meta name="robots" content="index, follow">` (default)
- Open Graph: og:title, og:description, og:image, og:url, og:type
- Twitter: twitter:card="summary_large_image", twitter:title, twitter:description, twitter:image

### JSON-LD schemas per page type

**All pages:** `Organization`, `WebSite` with `SearchAction`

**Calculator pages:** `FAQPage` (from the FAQ section), `HowTo` (from the "How to use this calculator" steps), `BreadcrumbList`, `WebApplication` (the calculator itself with `applicationCategory: "FinanceApplication"`)

**Article pages:** `Article` (with `headline`, `datePublished`, `dateModified`, `author`, `image`), `BreadcrumbList`, `FAQPage` if applicable

**Homepage:** `WebSite` with prominent `SearchAction`

Build a helper `<JsonLd>` component:

```typescript
// /src/components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

### Sitemap & robots

Auto-generate at build time via `/scripts/generate-sitemap.mjs`:
- All static pages
- All 204 calculator pages
- All blog post slugs (read from MDX files)
- `lastmod` from file modified date OR JSON `last_verified` for regulated calculators

`/public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://calcyourfinance.com/sitemap.xml
```

### Core Web Vitals targets

- LCP < 2.0s
- FID < 100ms
- CLS < 0.1 (the ad placeholders prevent layout shift when ads load)
- Lighthouse Performance score ≥ 95 on calculator pages
- Lighthouse SEO score = 100

---

## Ad system

### Component contract

```typescript
// /src/components/ads/AdSlot.tsx
interface AdSlotProps {
  size: '300x250' | '300x150' | '300x600' | '728x90' | 'responsive';
  slotId?: string;       // for manual AdSense ad units
  position: string;      // for analytics labeling, e.g. "calc-left-1"
  className?: string;
}

export function AdSlot({ size, slotId, position, className }: AdSlotProps) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const [width, height] = parseSize(size);

  if (!enabled) {
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{ width, height, /* light dashed border, "Advertisement" label centered */ }}
        data-position={position}
        aria-hidden="true"
      >
        Advertisement
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width, height }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
```

### Auto-ads toggle

In root layout, conditionally inject the AdSense script:

```typescript
{process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' && (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)}
```

### Ad slot inventory per calculator page

Total: 5 ad slots per calculator page

1. Left rail top — 300×250 (sticky)
2. Left rail bottom — 300×150 (sticky)
3. Center between inputs and results — 728×90
4. Center below results — 728×90
5. Right rail bottom — 300×150 (below export buttons)

Plus 1 ad in the homepage ("Browse by category" banner) and 1 mid-article ad on each article page, and 1 ad in the blog listing sidebar.

### Environment variables

```
NEXT_PUBLIC_ADS_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
```

Set in Cloudflare Pages env settings. To enable ads post-AdSense-approval, change `NEXT_PUBLIC_ADS_ENABLED=true` and redeploy — that's the entire workflow.

---

## PDF export

### Library setup

```typescript
// /src/lib/pdf-export.ts
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportCalculatorPDF(opts: {
  calculatorName: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  summary: { intro: string; highlight: string; tip: { text: string } };
  chartElement?: HTMLElement;
}) {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

  // 1. Branded header
  pdf.setFillColor(27, 79, 216); // brand primary
  pdf.rect(0, 0, 210, 25, 'F');
  pdf.setTextColor(255);
  pdf.setFontSize(16);
  pdf.text('CalcYourFinance', 15, 16);
  pdf.setFontSize(10);
  pdf.text(opts.calculatorName, 15, 22);

  // 2. Inputs section
  // 3. Results section (numbers in cards)
  // 4. Chart (rendered via html2canvas if chartElement provided)
  // 5. Plain-English summary
  // 6. Footer with date + URL + disclaimer

  pdf.save(`${opts.calculatorName.replace(/\s/g, '-')}-result.pdf`);
}
```

The "Export as PDF" button in ExportShareCard calls this. Should complete in under 2 seconds on a mid-range device.

---

## Currency detection

```typescript
// /src/lib/currency.ts

const CACHE_KEY = 'cyf_currency_pref';
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function detectCurrency(): Promise<CurrencyCode> {
  // 1. Check localStorage override
  const saved = localStorage.getItem(CACHE_KEY);
  if (saved) return JSON.parse(saved).currency;

  // 2. Try ipapi.co (free tier, no key)
  try {
    const res = await fetch('https://ipapi.co/json/');
    const { currency } = await res.json();
    if (currency) return currency;
  } catch { /* fall through */ }

  // 3. Fallback to browser locale
  const locale = navigator.language || 'en-US';
  return localeToCurrency(locale) ?? 'USD';
}

export function setUserCurrency(code: CurrencyCode) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ currency: code, savedAt: Date.now() }));
}
```

The CurrencySelector dropdown in the navbar reflects/updates this. All currency-aware calculators read this value from a React context.

Live FX rates fetched once on app load:

```typescript
const FX_CACHE_KEY = 'cyf_fx_rates';
const FX_CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function getFxRates(): Promise<Record<CurrencyCode, number>> {
  const cached = localStorage.getItem(FX_CACHE_KEY);
  if (cached) {
    const { rates, savedAt } = JSON.parse(cached);
    if (Date.now() - savedAt < FX_CACHE_TTL) return rates;
  }
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  const { rates } = await res.json();
  localStorage.setItem(FX_CACHE_KEY, JSON.stringify({ rates, savedAt: Date.now() }));
  return rates;
}
```

---

## Search

Client-side fuzzy search via Fuse.js over a pre-built JSON index:

```typescript
// /scripts/build-search-index.mjs — runs at build time
// reads calculators.ts and outputs /public/search-index.json

// /src/lib/search.ts
import Fuse from 'fuse.js';
let fuse: Fuse | null = null;

export async function search(query: string) {
  if (!fuse) {
    const res = await fetch('/search-index.json');
    const items = await res.json();
    fuse = new Fuse(items, {
      keys: ['name', 'description', 'keywords', 'categoryName'],
      threshold: 0.3,
      includeScore: true,
    });
  }
  return fuse.search(query).map(r => r.item);
}
```

SearchBar component shows results in a dropdown below the input as user types. Each result is a clickable link to the calculator.

---

## Build order (detailed)

> **RULE: Complete each Day fully before starting the next.** Sessions may span multiple days or restart mid-day. Always check `SESSION-LOG.md` for the exact stopping point and resume from there. Never skip a Day or start a later Day while tasks from an earlier Day remain incomplete.

### Week 1 — Foundations

**Day 1**
- Run `date` to confirm current date
- Initialize Next.js 14 project
- Install all deps
- Configure Tailwind with full color tokens from `03-DESIGN-SYSTEM.md`
- Set up TypeScript paths
- Set up project structure (all folders empty)

**Day 2**
- Build `LayoutShell`, `Navbar`, `MegaMenu`, `Footer`
- Build `AdSlot` with toggle
- Build `SearchBar` (without functionality yet)
- Build `CurrencySelector`

**Day 3**
- Populate `/src/data/calculators.ts` with all 204 entries (name, slug, category, description, keywords)
- Populate `/src/data/categories.ts` with all 12 categories
- Build the homepage end-to-end

**Day 4**
- Build the All Tools page with query param filtering
- Build the search index and connect SearchBar
- Wire up the mega menu "View all" links

**Day 5**
- Set up `/src/data/financial-rules/` directory
- Web-search and populate current values for top-priority JSON files:
  - india-tax-old-regime.json
  - india-tax-new-regime.json
  - india-gst-rates.json
  - india-epf-rates.json
  - india-ppf-rates.json
  - us-tax-brackets.json
  - us-401k-limits.json
- Build `LastUpdatedBadge` component

**Day 6**
- Build the EMI Calculator end-to-end as the reference template
  - CalculatorShell
  - Inputs with sliders
  - Results with cards
  - Chart (amortization stack)
  - PlainEnglishSummary with rule-based logic
  - PDF export wiring
  - Educational content
  - FAQ section with JSON-LD
  - Related tools card
  - Related articles card
- Document the calculator module interface

**Day 7**
- Review the EMI Calculator with the user
- Adjust pattern based on feedback
- Build the article page template
- Build the blog listing page

### Week 2 — High-traffic calculators

Build in priority order (highest Google search volume first):

**Days 8–9** — Loan & EMI category (18 tools)
**Days 10–11** — Investment category (20 tools)
**Days 12–14** — Tax category (16 tools, more research-heavy due to JSON dependencies)

### Week 3 — Mid-priority calculators

**Days 15–16** — Retirement (12) + Insurance (10) = 22 tools
**Days 17–18** — Business (14) + Real Estate (12) = 26 tools
**Days 19–20** — Personal Finance (14) + Currency & FX (8) = 22 tools

### Week 4 — Remaining + polish

**Days 21–22** — Stocks & Crypto (10) + Economics (10) + Financial Math (12) = 32 tools
**Days 23–24** — Write 12 seed blog articles
**Day 25** — About, Contact, Privacy, Disclaimer, 404
**Day 26** — Sitemap, robots.txt, all JSON-LD schemas, OG images
**Day 27** — Cloudflare Pages deployment, GitHub repo setup, GHA workflows
**Day 28** — Submit sitemap to Google Search Console + Bing Webmaster Tools, apply for AdSense
**Days 29–30** — Lighthouse audits, fix any Core Web Vitals issues, manual QA every page

---

## Cloudflare Pages deployment

### GitHub Actions workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: calcyourfinance          directory: out
```

### Cloudflare Pages settings

- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`
- Environment variables:
  - `NEXT_PUBLIC_ADS_ENABLED=false` (flip to `true` after AdSense approval)
  - `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXX` (set after AdSense application)
  - `NEXT_PUBLIC_SITE_URL=https://calcyourfinance.com`

### Custom domain

Point `calcyourfinance.com` and `www.calcyourfinance.com` at Cloudflare Pages via Cloudflare DNS. Force HTTPS. Redirect `www` → apex.

---

## Performance budget

- HTML per page: under 60 KB gzipped
- JS per page: under 200 KB gzipped (excluding ads when enabled)
- CSS per page: under 30 KB gzipped
- Images: only when essential, use AVIF/WebP, all under 100 KB
- LCP element: server-rendered, not hydration-blocked
- All third-party scripts: async/defer, no render blocking

---

## Accessibility

- All interactive elements keyboard-focusable
- Visible focus ring (`focus:ring-2 focus:ring-brand-primary`)
- ARIA labels on all icon-only buttons
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Form inputs have proper `<label>` associations
- Sliders have `aria-valuetext` for current value
- Charts have a text equivalent (table) toggle
