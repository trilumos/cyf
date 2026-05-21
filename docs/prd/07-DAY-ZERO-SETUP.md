# 07 — Day 0 Setup Checklist (For Claude Code)

This document is for **Claude Code** to read first on Day 0, before any other PRD document. It contains the exact commands and verifications needed to set up the project correctly.

**Claude Code: do not skip any step. Verify each one before proceeding to the next.**

---

## Account & repository facts

- **GitHub account:** `trilumos`
- **Repository:** `https://github.com/trilumos/cyf.git`
- **Final production domain (later):** `calcyourfinance.com` (currently pointing to Vercel MVP — do not touch yet)
- **Cloudflare Pages temp subdomain (during build):** `calcyourfinance.pages.dev`
- **Domain swap timing:** end of build, after final QA

---

## Step 1 — Verify the working environment

Run each command. Confirm output makes sense before continuing.

```bash
# Confirm we're starting clean
pwd
ls -la

# Check current date — this is critical (see PRD doc 01)
date "+%Y-%m-%d"
# Expected: today's actual date in [current year]. If output is older than May 2026,
# something is wrong with the environment. Stop and report to the user.

# Verify Node version (need Node 20+)
node --version
# Expected: v20.x or higher

# Verify npm
npm --version

# Verify git
git --version

# Verify git is configured
git config user.name
git config user.email
# If empty, set them:
#   git config --global user.name "trilumos"
#   git config --global user.email "[user's email — ask if not set]"
```

If any of these fail, stop and report to the user before continuing.

---

## Step 2 — Clone the repository

```bash
cd ~
git clone https://github.com/trilumos/cyf.git
cd cyf

# Check what's in the repo
ls -la
git log --oneline -10
git branch -a
```

If the repo is empty or has only a README, that's fine — we're starting from scratch.

If the repo has existing code from the Vercel MVP that the user wants preserved, **stop and ask the user** whether to:
- (a) Wipe everything and start fresh on `main`
- (b) Create a new branch (e.g. `rebuild`) and develop in parallel
- (c) Keep some files and replace others

Default assumption: **start fresh on `main`**. Confirm with the user before deleting anything.

---

## Step 3 — Copy the PRD into the repo

The PRD files are in `/calcyourfinance-prd/`. Copy them into the repo as a reference folder:

```bash
# Assuming PRD files are accessible at /calcyourfinance-prd/
mkdir -p docs/prd
cp /calcyourfinance-prd/*.md docs/prd/

# Verify
ls docs/prd/
# Expected: 00-README.md through 07-DAY-ZERO-SETUP.md
```

These stay in the repo permanently as the source of truth for design decisions.

---

## Step 4 — Initialize Next.js 14

```bash
# Create Next.js app in current directory
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbo

# When prompted "Would you like to use Turbopack for next dev?" — choose No
# (Turbopack is still maturing; standard webpack is more reliable)
```

If `create-next-app` complains because the directory isn't empty (because the repo had files), either:
- Move the existing files to a backup folder first
- Or run with `--force` (only if user confirmed wiping is OK in Step 2)

---

## Step 5 — Install all required dependencies

```bash
npm install \
  @tabler/icons-react \
  recharts \
  jspdf \
  html2canvas \
  fuse.js \
  next-mdx-remote \
  framer-motion \
  next-seo

npm install --save-dev \
  @types/jspdf
```

Verify:

```bash
npm list --depth=0
```

Check that all packages installed without errors. If anything failed, fix before proceeding.

---

## Step 6 — Configure Next.js for static export

Edit `next.config.mjs` (or `next.config.ts`):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
```

Edit `tsconfig.json` to ensure path alias works:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Verify the build pipeline works:

```bash
npm run build
```

Expected: build succeeds, output goes to `/out/` directory. Verify:

```bash
ls -la out/
# Should contain index.html, _next/, and other static assets
```

---

## Step 7 — Set up environment variables

Create `.env.local` for development:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SITE_URL=https://calcyourfinance.pages.dev
NEXT_PUBLIC_ADS_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_300_250=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_300_150=
NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD_BOTTOM=
NEXT_PUBLIC_ADSENSE_SLOT_EXPORT_BELOW=
EOF
```

Create `.env.example` for the repo (no secrets, safe to commit):

```bash
cat > .env.example << 'EOF'
NEXT_PUBLIC_SITE_URL=https://calcyourfinance.com
NEXT_PUBLIC_ADS_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_300_250=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_300_150=
NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD_BOTTOM=
NEXT_PUBLIC_ADSENSE_SLOT_EXPORT_BELOW=
EOF
```

Verify `.gitignore` excludes `.env.local`:

```bash
grep -E "\.env\.local" .gitignore || echo ".env.local" >> .gitignore
grep -E "\.env\*\.local" .gitignore || echo ".env*.local" >> .gitignore
```

---

## Step 8 — Verify Tailwind is wired correctly

Check that `tailwind.config.ts` exists and `globals.css` has the Tailwind directives:

```bash
cat tailwind.config.ts
cat src/app/globals.css | head -10
```

The CSS file should have at top:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Test by editing the default homepage to use a Tailwind class, then running dev mode briefly:

```bash
# Edit src/app/page.tsx — replace contents with a quick test:
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-600">
        CalcYourFinance — setup verified
      </h1>
    </main>
  );
}
EOF

# Test build
npm run build
# Expected: builds successfully

# Test dev mode briefly (run in background, verify, kill)
# Note: in Claude Code, do NOT leave npm run dev running.
# Just confirm build works.
```

---

## Step 9 — Create the project folder structure

```bash
mkdir -p src/components/layout
mkdir -p src/components/ads
mkdir -p src/components/calculator
mkdir -p src/components/ui
mkdir -p src/components/seo
mkdir -p src/calculators/_template
mkdir -p src/calculators/loan-emi
mkdir -p src/calculators/investment
mkdir -p src/calculators/tax
mkdir -p src/calculators/retirement
mkdir -p src/calculators/insurance
mkdir -p src/calculators/business
mkdir -p src/calculators/currency-fx
mkdir -p src/calculators/real-estate
mkdir -p src/calculators/personal-finance
mkdir -p src/calculators/stocks-crypto
mkdir -p src/calculators/economics
mkdir -p src/calculators/financial-math
mkdir -p src/content/blog
mkdir -p src/data/financial-rules
mkdir -p src/lib
mkdir -p scripts
mkdir -p .github/workflows

# Add a .gitkeep to each empty folder so git tracks them
find src/calculators src/content src/data scripts -type d -empty -exec touch {}/.gitkeep \;
```

Verify structure:

```bash
find src -type d | sort
```

Should match the structure documented in `04-TECHNICAL.md`.

---

## Step 10 — Initial commit and push

```bash
git add .
git status
# Review what's staged. Should include:
# - Next.js scaffold
# - PRD docs in docs/prd/
# - Empty folder structure with .gitkeep files
# - .env.example (but NOT .env.local)

git commit -m "chore: initial Next.js scaffold and project structure

- Next.js 14 with App Router, TypeScript, Tailwind
- Static export configured
- Full PRD copied to docs/prd/
- Project folder structure created per 04-TECHNICAL.md
- Environment variable template added"

git push origin main
```

If the push fails because of authentication:
- The user needs to set up either a GitHub Personal Access Token or SSH key
- Stop and report this — do not try to bypass auth

Verify the push:

```bash
git log --oneline -5
```

---

## Step 11 — Verify the repo on GitHub

Use web_fetch to confirm the repo state on GitHub:

```
web_fetch: https://github.com/trilumos/cyf
```

Expected to see the new files reflected on GitHub.

---

## Step 12 — Cloudflare Pages setup (user-driven, with verification)

**This step requires the user to do clicks in the Cloudflare dashboard. Claude Code cannot automate this.**

Tell the user to do the following:

> "Please go to Cloudflare dashboard → Workers & Pages → Create application → Pages → Connect to Git.
>
> 1. Authorize Cloudflare to access your GitHub `trilumos` account
> 2. Select the `cyf` repository
> 3. Project name: `cyf` (this gives you the temp subdomain `cyf.pages.dev`)
> 4. Production branch: `main`
> 5. Framework preset: **Next.js (Static HTML Export)**
> 6. Build command: `npm run build`
> 7. Build output directory: `out`
> 8. Root directory: `/` (leave blank)
> 9. Environment variables — add these:
>    - `NEXT_PUBLIC_SITE_URL` = `https://cyf.pages.dev`
>    - `NEXT_PUBLIC_ADS_ENABLED` = `false`
> 10. Click **Save and Deploy**
>
> Then send me the deployment URL once it's live (should be `https://cyf.pages.dev` or similar)."

Wait for the user to confirm. Then verify:

```
web_fetch: https://calcyourfinance.pages.dev
```

Expected: the test homepage from Step 8 renders. If you see the "CalcYourFinance — setup verified" page, Cloudflare Pages is working.

---

## Step 13 — Create the GitHub Actions deploy workflow (optional)

Cloudflare Pages auto-deploys on every push to `main`, so we technically don't need GHA for deploys. But we DO need a GHA workflow for the monthly rate verification (see `05-LIVING-DATA.md`).

Create the verify-rates workflow file:

```bash
mkdir -p .github/workflows

cat > .github/workflows/verify-rates.yml << 'EOF'
name: Monthly Rate Verification

on:
  schedule:
    - cron: '0 9 1 * *'
  workflow_dispatch:

jobs:
  check-rates:
    runs-on: ubuntu-latest
    permissions:
      issues: write
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
          GITHUB_REPOSITORY: ${{ github.repository }}
EOF
```

The actual `scripts/verify-rates.mjs` is built later in Week 1 of the build — for now, just commit the workflow file shell.

---

## Step 14 — Final pre-build verification

Run this checklist before starting Day 1 of the actual build:

```bash
# 1. Repo is clean
git status
# Expected: nothing to commit, working tree clean (or you have step 13's commit pending)

# 2. Date is correct
date "+%Y-%m-%d"
# Expected: today's actual date

# 3. Build works
npm run build
# Expected: success, output in /out/

# 4. PRD docs are present
ls docs/prd/
# Expected: 00 through 07 markdown files

# 5. Folder structure is correct
find src -type d | sort | head -25

# 6. Environment file ready (not committed)
cat .env.local
# Expected: matches Step 7

# 7. Cloudflare Pages site is live
curl -I https://calcyourfinance.pages.dev
# Expected: HTTP/2 200
```

If all 7 checks pass, the environment is ready for Day 1 of the build.

Commit anything outstanding:

```bash
git add .
git commit -m "chore: complete Day 0 setup verification"
git push origin main
```

---

## What Claude Code should NOT do on Day 0

- ❌ Do NOT touch the calcyourfinance.com domain (it's still pointing to Vercel)
- ❌ Do NOT delete the existing Vercel deployment
- ❌ Do NOT add custom domain to Cloudflare Pages yet (domain swap is Day 30)
- ❌ Do NOT start writing calculators yet — that's Day 6
- ❌ Do NOT install AdSense scripts (no AdSense account yet)
- ❌ Do NOT create accounts on third-party services (analytics, etc.) — those come post-launch
- ❌ Do NOT push to any branch other than `main` unless the user explicitly creates one
- ❌ Do NOT skip the `date` verification — many bugs trace back to using the wrong year

---

## Recap: state after Day 0

| Item | Status |
|------|--------|
| GitHub repo `trilumos/cyf` | Initialized with Next.js scaffold |
| Cloudflare Pages project | Connected to repo, auto-deploys on push to `main` |
| Temp dev URL | `calcyourfinance.pages.dev` (live, public) |
| Production domain | Still on Vercel (untouched) |
| PRD docs | In `docs/prd/` (committed) |
| Environment variables | Set in both `.env.local` and Cloudflare Pages |
| Folder structure | All directories created, `.gitkeep` placeholders in place |
| Build pipeline | `npm run build` succeeds and outputs to `/out/` |
| GitHub Actions | `verify-rates.yml` workflow shell in place |

You are now ready to start Day 1 of `04-TECHNICAL.md`'s build order.

Run `date` one more time before starting Day 1. Always.
