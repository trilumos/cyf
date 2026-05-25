# 06 — Launch & Post-Launch Playbook

This document covers everything that happens after Claude Code finishes building. The build is the easy part. Getting traffic and revenue is the work.

**Read this entire document before Day 1 of the build** so the technical implementation supports these requirements (e.g. analytics integration, AdSense readiness, schema markup, sitemap submission).

---

## Pre-launch checklist (Day 28–30 of build)

### Technical readiness

- [ ] All 200 calculators tested manually (at least sample 50 across categories)
- [ ] PDF export tested on at least 10 calculators
- [ ] Currency auto-detection tested with VPN to at least IN, US, UK locations
- [ ] Mobile responsive verified on iPhone-sized and Android-sized viewports
- [ ] All ad slots render as placeholders (since `NEXT_PUBLIC_ADS_ENABLED=false`)
- [ ] Search returns relevant results for top 20 tool searches
- [ ] Mega menu works on hover (desktop) and tap (mobile)
- [ ] All "View all" links from mega menu correctly filter the All Tools page
- [ ] 404 page works (test by visiting `/this-does-not-exist`)
- [ ] All footer links navigate correctly
- [ ] Lighthouse scores: Performance ≥ 95, SEO = 100, Accessibility ≥ 95 on calculator pages
- [ ] Core Web Vitals all green in Lighthouse

### Content readiness

- [ ] All 12 seed blog articles written with current-year content
- [ ] All articles have at least 2 inline calculator CTAs
- [ ] All articles have a "Last updated" date
- [ ] About, Contact, Privacy, Disclaimer pages have real content (no Lorem ipsum)
- [ ] Every calculator with regulated data shows the "Last updated" badge
- [ ] `_NEEDS_VERIFICATION.md` is empty OR every entry has a UI warning banner

### SEO readiness

- [ ] `sitemap.xml` generated and includes all pages (verify count: 200 calc + 12 blog + 8 static + homepage = 225+)
- [ ] `robots.txt` correctly points to sitemap
- [ ] Every page has unique title and meta description (no duplicates)
- [ ] All Open Graph tags set with proper og:image
- [ ] All JSON-LD schemas validate at schema.org validator
- [ ] No broken internal links (run a crawler check)
- [ ] All images have alt text
- [ ] No 404s in your own internal link structure
- [ ] Canonical URLs set on every page

### Legal readiness

- [ ] Privacy Policy includes: data collected (none), cookies (only AdSense post-approval), third-party services (Cloudflare, AdSense, FX API — note: ipapi.co removed), user rights
- [ ] Disclaimer explicitly states "not financial advice", "results are estimates", "consult a professional"
- [ ] **Terms of Use page live** (legal-page parity with the MVP under AdSense review — required before domain swap)
- [ ] Contact email (`hello@calcyourfinance.com`) is set up and monitored — use Cloudflare Email Routing to forward to your personal email (free)
- [ ] If targeting EU users: cookie consent banner ready (only needed once ads are enabled)

---

## Launch day

### Step 1 — Push to production

1. Final commit to `main` branch
2. Verify Cloudflare Pages build succeeds
3. Confirm `https://calcyourfinance.com` resolves and renders the homepage
4. Verify `https://www.calcyourfinance.com` redirects to apex (or whichever direction you chose)
5. Check that HTTPS is forced (no http:// version accessible)
6. Verify a sample of 5 calculator URLs load correctly

### Step 2 — Analytics setup

**Use Cloudflare Web Analytics (free, privacy-friendly, no cookie banner needed)**

- Enable it in Cloudflare dashboard for the domain
- Copy the beacon script tag and add to the root layout
- Verify hits start appearing within 30 minutes

**Add Google Analytics 4 as well** (also free, more detailed funnel data)

- Create GA4 property at `analytics.google.com`
- Add the gtag script to root layout
- Set up these events:
  - `calculator_view` (slug, category)
  - `calculator_calculate` (slug, inputs hash)
  - `pdf_export` (slug)
  - `currency_change` (from, to)
  - `search` (query)
  - `mega_menu_open`
  - `related_tool_click` (from_slug, to_slug)
  - `cta_calculator_click` (from_article, to_calculator)

Both can run together. Cloudflare Analytics is privacy-default. GA4 will need a cookie banner only after AdSense is enabled.

### Step 3 — Search Console submission

**Google Search Console:**

1. Go to `search.google.com/search-console`
2. Add property: `calcyourfinance.com` (domain property, not URL-prefix)
3. Verify via DNS TXT record in Cloudflare (takes 5 minutes)
4. Submit sitemap: `https://calcyourfinance.com/sitemap.xml`
5. Request indexing on these priority pages:
   - Homepage
   - All Tools page
   - Top 20 calculator pages (EMI, SIP, Income Tax, FD, CAGR, FIRE, etc.)
   - All 12 blog articles
6. Wait 7–14 days for initial indexing

**Bing Webmaster Tools:**

1. Go to `bing.com/webmasters`
2. Import directly from Google Search Console (one click)
3. Submit sitemap
4. Bing typically indexes faster than Google for new sites

**Yandex, Naver, Baidu** — only worth doing if you specifically target Russia/Korea/China. Skip for now.

### Step 4 — Set up email

Use Cloudflare Email Routing (free):

1. Cloudflare dashboard → Email → Email Routing
2. Enable for `calcyourfinance.com`
3. Create routes:
   - `hello@calcyourfinance.com` → your personal email
   - `bug@calcyourfinance.com` → your personal email
   - `suggest@calcyourfinance.com` → your personal email
4. Test by sending an email to each

This gives you professional email addresses for the contact page with zero cost.

---

## Week 1 post-launch (Days 1–7)

### Goal: index everything fast, surface any bugs, build initial signals

### Daily

- Check Search Console for crawl errors
- Check Cloudflare Analytics for any traffic
- Monitor email for bug reports
- Fix any 404s or broken links immediately

### One-time tasks this week

**Day 1**
- Share on personal LinkedIn / X / WhatsApp groups (your network is your first traffic source)
- Add the site to your personal social media bios

**Day 2**
- Submit to these free directories:
  - `dev.to` write a "Show HN"-style post about building it
  - `producthunt.com` (don't formally launch yet, just create the page)
  - `betalist.com`
  - `siteinspire.com`
- Add the site to `https://www.calculator.net`-style aggregator lists where possible

**Day 3**
- Reddit submissions (these need genuine community fit — no spam):
  - `r/personalfinance` (US-focused, very strict — only submit if you have a US-relevant unique angle)
  - `r/IndiaInvestments` (India-focused)
  - `r/FIREIndia`
  - `r/financialindependence`
  - **Rule:** lead with a useful comment or answer in the subreddit first, then later submit your site only if directly relevant to a discussion

**Day 4**
- Quora: find 10 questions that match your top calculators ("How to calculate EMI", "How does SIP work") and write detailed answers that link to your calculator (only where it genuinely adds value)

**Day 5**
- Comment thoughtfully on 5 finance YouTube videos with a relevant calculator link (only where it adds genuine value to that specific video's topic)

**Day 6**
- Submit a guest-post pitch to 5 mid-tier finance blogs offering to write original content with one backlink to a relevant calculator

**Day 7**
- Apply for Google AdSense (see "AdSense Application" section below)
- Review the week's analytics: which calculators got the most clicks, where users dropped off

---

## Weeks 2–4 post-launch

### Goal: AdSense approval, first organic clicks, content expansion

### AdSense Application Process

> **STATUS UPDATE (2026-05-25): AdSense has ALREADY been applied for** against the current `calcyourfinance.com` MVP (on Vercel). That MVP has About, Privacy, and Terms pages and calculator pages carrying how-to / what-is / FAQ content; it does **not** have blog articles. Implications for the new Cloudflare build:
> - **The application is tied to the domain.** When the new build swaps onto `calcyourfinance.com`, it must be at least as content-rich and policy-compliant as the MVP, or the account is at risk.
> - **Legal-page parity is mandatory before swap:** the new build must ship About + Privacy + Disclaimer + **Terms** (the Terms page was wrongly dropped in an earlier doc-02 draft — it is now required; see doc 02).
> - **No broken links / no thin pages** at swap time. Every calculator page's educational + FAQ content is exactly what's under review — this is why the anti-template content discipline (doc 08 §3) is load-bearing, not optional.
> - Do not re-apply or change anything in the AdSense dashboard during the build. The `NEXT_PUBLIC_ADS_ENABLED=false → true` flip happens only after approval is confirmed.
>
> The original application guidance below is retained for reference and for any future re-application.

**Requirements before applying** (verify each):

- [ ] Site is live for at least 7 days
- [ ] At least 30 high-quality content pages (you'll have 200+ calculators + 12 articles = vastly more than needed)
- [ ] Privacy Policy live and accessible from footer
- [ ] About page with real content
- [ ] Contact page with working email
- [ ] Disclaimer page live
- [ ] No copyrighted images or content
- [ ] Original content on every page (educational sections must be unique)
- [ ] Site loads fast (Lighthouse Performance ≥ 90)
- [ ] No broken links
- [ ] Custom domain (not a subdomain like `.vercel.app` — you already have this)

**Apply at** `https://www.google.com/adsense/`

**Approval timeline:** 1–14 days typical, sometimes longer for finance niche

**If rejected:**
- Read the rejection reason carefully
- Most common reasons for finance sites: "low value content" (add more original text per calculator), "navigation issues" (verify mega menu works), "site not ready" (usually means content depth — add more blog articles)
- Fix the issue, wait 7 days, reapply

**Once approved:**

1. AdSense dashboard → Sites → verify approval
2. Enable Auto Ads for the domain (let Google place ads automatically)
3. Create 5 manual ad units for the explicit placements:
   - Sidebar 300×250
   - Sidebar 300×150
   - Leaderboard 728×90 (between inputs/results)
   - Leaderboard 728×90 (below results)
   - Sidebar 300×150 (below export buttons)
4. Copy each ad unit's `data-ad-slot` ID
5. Update your Cloudflare Pages env vars:
   - `NEXT_PUBLIC_ADS_ENABLED=true`
   - `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXX`
   - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_300_250=XXXX`
   - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_300_150=XXXX`
   - `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD_TOP=XXXX`
   - `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD_BOTTOM=XXXX`
   - `NEXT_PUBLIC_ADSENSE_SLOT_EXPORT_BELOW=XXXX`
6. Trigger a redeploy
7. Verify ads now show in production

### Content expansion (Weeks 2–4)

Write 2 new blog articles per week for the first 3 months. Prioritize:

**High-volume search topics:**
- "How to save tax in India" (highest finance search volume in India)
- "SIP for beginners"
- "Best mutual funds [year]"
- "How much should I save for retirement"
- "How to calculate income tax"
- "Old vs new tax regime which is better"
- "Compound interest explained"
- "How to budget money"

**Comparison articles (highest click-through):**
- "ELSS vs PPF vs NPS"
- "FD vs RD vs PPF"
- "Term insurance vs life insurance"
- "Mutual funds vs stocks"
- "Old vs new tax regime"
- "Mortgage vs renting"

Each article must:
- Be 1,200+ words original content
- Link to 2–3 of your calculators inline
- Have FAQ section with schema markup
- Use current-year data (web-search before writing)
- Include at least one comparison table
- Internal-link to 3+ related articles

---

## Months 2–3 post-launch

### Goal: Organic traffic growth, backlinks, AdSense optimization

### SEO work

**Internal linking audit:**
- Use a free crawler (Screaming Frog free tier — 500 pages) to map all internal links
- Every calculator should have 5+ incoming internal links (from related calculators, from blog articles, from category pages)
- Every blog article should link to 3+ other articles

**Schema markup audit:**
- Test 20 random pages at `search.google.com/test/rich-results`
- Fix any errors or warnings

**Backlink building (free methods only):**

1. **HARO (Help A Reporter Out) / Featured.com / Qwoted**
   - Sign up free, get 3 daily emails of journalist queries
   - Respond to finance-related queries with quotable expert answers + your URL
   - Conversion rate: 1–3 backlinks per week if consistent
   - Highest authority backlinks possible (NYT, WSJ, Forbes, Business Insider)

2. **Guest posting**
   - Pitch original articles to mid-tier finance blogs (`groww.in/blog`, `freefincal.com`, `cleartax.in/blog`)
   - Each successful guest post = 1 backlink to a calculator + your About page

3. **Tool roundup outreach**
   - Find articles ranking for "best EMI calculator", "best SIP calculator" etc.
   - Email the author with a polite "you might want to include our calculator because [unique feature: plain-English explanations, PDF export, etc.]"
   - 5–10% response rate is normal

4. **Resource page outreach**
   - Find university finance department resource pages
   - Find financial literacy nonprofits with tool lists
   - Email asking to be added (educational sites = high authority)

5. **Reddit / Quora consistency**
   - Don't spam. Be a useful community member.
   - When you genuinely have a calculator that answers a question, link it. Otherwise just help.

### AdSense optimization (only after 30 days of data)

- Check AdSense dashboard for: which ad slots earn most, which pages earn most, which countries earn most
- If a slot is consistently low-performing (e.g. left sidebar second slot), remove it to clean up UX
- Experiment with ad size variations within the same slots (only A/B test one change at a time)

### Traffic milestones to watch

| Stage | Monthly pageviews | Expected MRR |
|-------|-------------------|--------------|
| Month 1 | 0 – 1,000 | $0 – $5 |
| Month 2 | 1,000 – 5,000 | $5 – $30 |
| Month 3 | 5,000 – 20,000 | $30 – $150 |
| Month 6 | 30,000 – 100,000 | $200 – $800 |
| Month 12 | 100,000 – 400,000 | $800 – $4,000 |
| Month 18 | 300,000 – 800,000 | $2,500 – $8,000 |
| Month 24 | 600,000 – 1.5M | $5,000 – $15,000 |

**Reality check:** Hitting $5–10K MRR is realistic in 12–24 months with consistent SEO work. Hitting it in the first 3 months is essentially impossible from a cold start with no existing audience or backlinks. Plan for the long game.

---

## Months 4–12

### Goal: Compound the SEO flywheel

### What changes

- 1 new calculator per month for niche long-tail (responding to user suggestions from the contact form)
- 4–6 new blog articles per month
- Refresh existing top-10-traffic articles every 6 months
- Build a free email newsletter (use ConvertKit free tier up to 1,000 subscribers) — newsletters = direct traffic that doesn't depend on Google

### When to consider upgrading

Once the site earns consistent $500/month:

- Switch from AdSense to a premium ad network: **Ezoic** ($10/month minimum traffic), **Mediavine** (50K sessions/month minimum), or **Raptive** (100K sessions/month). RPMs jump from $5–15 (AdSense) to $20–50 (premium networks). This alone can 3–4x your revenue at the same traffic.
- Enable the Phase 2 AI summary via the env var flip (now affordable).
- Consider a paid Lighthouse-grade hosting upgrade only if your free tier is hitting limits (highly unlikely on Cloudflare Pages — they offer unlimited bandwidth).

### When to consider hiring

Don't, unless MRR is consistently above $3,000. The site is designed to be maintained by one person with AI assistance.

---

## Risk mitigation

### What can go wrong

| Risk | Mitigation |
|------|------------|
| AdSense rejection | You have 30+ pages requirement covered by 200 calculators. Most rejections in finance niche are due to thin content — your educational + FAQ sections solve this. |
| Google de-ranking due to stale tax data | The Living Data system + visible "Last updated" badges + monthly GHA verification handle this. |
| Cloudflare Pages outage | Free tier has 99.9% uptime SLA. Mitigation: backup `git push` to GitHub Pages as failover (free, takes 1 hour to set up). |
| Lost domain | Set domain auto-renewal. Set 2FA on the registrar account. |
| AdSense account ban | Never click your own ads. Never ask others to. Never use traffic exchanges. Don't show ads on policy-violating content. |
| Negative SEO / spam backlinks | Use Search Console's Disavow tool if you see toxic backlinks. Don't worry about this until you have decent traffic. |
| AI-generated content penalty | All your educational content should be human-reviewed and original. Don't let AI write articles end-to-end — use AI as a research assistant, then write originally. |
| Currency API rate limit | `open.er-api.com` free tier is generous, but if you exceed it, switch to `exchangerate-api.com` (also free tier) or `currencyapi.com` (free tier 300 req/month — paid above). Cache aggressively (1 hour minimum). |
| ipapi.co rate limit (1000 req/day) | If exceeded, fall back to `Intl.DateTimeFormat().resolvedOptions().timeZone` for currency detection. No cost impact. |

### What to monitor weekly

- Search Console: clicks, impressions, average position, indexing status
- Cloudflare Analytics: pageviews, top pages, bounce rate
- AdSense (once enabled): RPM, CTR, top-earning pages
- Email inbox: bug reports, calculator suggestions
- `_NEEDS_VERIFICATION.md`: any pending verifications past their `review_due` date

### What to monitor monthly

- All GitHub Action runs (rate verification, deploy)
- Lighthouse scores across top 20 pages
- Top 10 keywords by impression and click
- Conversion: visitor → calculator use → PDF export (funnel)

---

## Long-term revenue beyond ads

When the site is mature (12+ months), consider adding (NOT before — they require traffic foundation):

1. **Affiliate links** — finance products (insurance, demat accounts, credit cards) pay $10–100 per sign-up. Place contextually in articles, not in calculators (would hurt UX trust).
2. **Sponsored calculator badges** — once a calculator gets 5K+ monthly views, "Sponsored by X bank" placements can be very lucrative. Only do this without compromising calculator accuracy.
3. **Premium PDF reports** — Phase 2 AI summary + custom branding for a small fee. Realistic only at scale.
4. **API access** — let other sites embed your calculators via iframe. Free with attribution, paid for white-label.

**Critical:** Do NOT pursue these in the first year. Ad revenue from organic SEO traffic is the proven model. Diversification too early dilutes focus.

---

## Final principle

This is not a "build it and they will come" project. The build is 20% of the work. The other 80% is:

- Writing better content than competitors
- Earning backlinks through genuine outreach
- Updating data when regulations change
- Responding to user suggestions
- Compounding small SEO wins over months

If you commit to 5 hours/week of consistent post-launch work for 12 months, $5K MRR is realistic. If you build it and walk away, the site will earn close to nothing. Decide which version of this story you want before you start.
