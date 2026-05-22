# CalcYourFinance — Claude Code Project Instructions

## Project identity

- **Name:** CalcYourFinance
- **One-liner:** A static site with 204 free finance calculators (EMI, SIP, tax, retirement, etc.) built with Next.js 14, hosted on Cloudflare Pages, monetised via AdSense.
- **Repo:** https://github.com/trilumos/cyf.git
- **Temp dev URL:** https://calcyourfinance.pages.dev
- **Production domain:** https://calcyourfinance.com (domain swap on launch day — do NOT touch until then)
- **Working directory:** `D:\Dev\calcyourfinance\calcyourfinance`

---

## MANDATORY session opening — do these 3 things FIRST, every single session

1. **Run `date "+%Y-%m-%d"`** — confirm the current date. Never assume the year from training data.
2. **Run `git log --oneline -10`** — see what was last completed and what branch you are on.
3. **Read the relevant PRD doc(s) for today's work** — all PRD docs are in `docs/prd/`. Read them before making any decisions.

Then tell the user: what has been completed, what is next, and **wait for them to say "continue"** before doing anything.

---

## Working rules — follow these in EVERY session without being asked

- **Stop after every individual step.** Tell the user: what you just did, whether it passed or failed, and what the next step is.
- **Wait for "continue" before starting the next step.** Never proceed through multiple steps in one response.
- **Commit to GitHub after every major milestone**, not just at the end of the session. Use `git push origin main`.
- **Warn immediately if approaching context limit.** If the conversation is getting long, stop at the next clean step boundary and summarise: which step you stopped at, what was completed, what is next, and any blockers. This allows a fresh session to resume without losing progress.
- **Update `SESSION-LOG.md` as the LAST action of every session** before ending. Never end a session without updating it.

---

## Visual checkpoint rule — MANDATORY after every visible change

**Trigger this rule whenever ANY of the following occurs:**
- A build is run (`npm run build`)
- A new page is created
- A new component is completed
- Any visible change is pushed to Cloudflare Pages

**What to do:**
1. Commit all changes
2. Push to GitHub (`git push origin main`)
3. Stop and tell the user exactly this:

> "Build deployed to https://calcyourfinance.pages.dev — please open the site, verify it looks correct, test the feature, and reply **'looks good'** or describe what needs fixing."

4. **Do not proceed with any further work until the user confirms with "looks good"** (or describes a fix, which you then address before asking again).

This rule exists because Cloudflare Pages auto-deploys on every push to `main`. A visual check after every change catches layout regressions, broken builds, and styling issues before they compound.

---

## Never do these things

- Never write any year other than the current actual year (verified by running `date`).
- Never hardcode tax slabs, interest rates, contribution limits, or government scheme rates in calculator files — all such values go in `/src/data/financial-rules/*.json`.
- Never add backend code (no API routes requiring a server, no databases, no auth).
- Never deviate from the page designs in `docs/prd/03-DESIGN-SYSTEM.md` without asking first.
- Never touch the `calcyourfinance.com` domain until launch day (it still points to Vercel).
- Never skip the `date` verification at session start.

---

## PRD documents — consult before making decisions

All 8 PRD files live in `docs/prd/`. Read the relevant one before building anything.

| File | When to read |
|------|-------------|
| `00-README.md` | Session start — contains the 8 non-negotiable rules |
| `01-FRESHNESS-AND-RESEARCH.md` | Before writing any calculator that uses real-world rates |
| `02-BLUEPRINT.md` | Before building any page, calculator, or navigation |
| `03-DESIGN-SYSTEM.md` | Before writing any component, layout, or styles |
| `04-TECHNICAL.md` | Before any tech stack, build config, or SEO decision |
| `05-LIVING-DATA.md` | Before creating any financial-rules JSON file |
| `06-LAUNCH-AND-POST-LAUNCH.md` | Before touching deployment, analytics, or AdSense |
| `07-DAY-ZERO-SETUP.md` | Reference for the initial setup steps |

---

## Build progress tracking

- Current progress is logged in `SESSION-LOG.md` — read it at the start of every session.
- The high-level build order is in `docs/prd/04-TECHNICAL.md` (Weeks 1–4).
- Day 0 setup checklist is in `docs/prd/07-DAY-ZERO-SETUP.md`.

---

## Design principles — non-negotiable

These rules apply to every component, page, and UI element in this project.
Never violate these without explicit user confirmation in chat.

1. NO EMOJI — not in UI, not in copy, not in labels, not in headings, not anywhere on the site
2. NO DECORATIVE COLOR — no colored dots, no colored icon squares, no color-coded category indicators, no amber/yellow/orange accents, no rainbow category colors in UI
3. COLOR IS FUNCTIONAL ONLY:
   - Brand blue #1B4FD8 → buttons, links, active states, hover borders, logo
   - #EEF2FF → active/hover fill backgrounds only
   - Charts → color only where it encodes data meaning, use #1B4FD8 as primary series
   - Result cards → #EEF2FF background allowed, encodes "this is your result"
   - Category colors → exist in data files only. ONLY visible use: 3px left border on active left panel row in mega menu. Nowhere else.
4. NO BOXES OR BORDERS around tool rows inside dropdowns, lists, or navigation menus
5. NO GRADIENTS — anywhere
6. NO SHADOWS — except the mega menu dropdown box-shadow
7. NO BLUR, NO GLOW, NO DECORATIVE EFFECTS
8. WHITESPACE OVER DECORATION — if a section feels empty, increase padding or improve typography. Never add decorative elements to fill space.
9. PROFESSIONAL FINANCIAL TOOL AESTHETIC — every design decision must reinforce trust and credibility. When choosing between two options always pick the more conservative, cleaner one.
10. BEFORE adding any visual element using color, ask: does this color communicate something functional to the user? If no → remove it.
11. VISUAL CHECKPOINT — any time a build is run, a new page is created, a new component is completed, or any visible change is deployed: stop, commit, push to GitHub, tell the user "Build deployed to https://calcyourfinance.pages.dev — please open the site, verify it looks correct, test the feature, and reply 'looks good' or describe what needs fixing." Do not proceed until the user confirms.
