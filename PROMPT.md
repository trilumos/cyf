# CalcYourFinance — Session Start

Project root: D:\Dev\calcyourfinance\calcyourfinance
PRD docs: docs/prd/
Repo: https://github.com/trilumos/cyf.git
Dev URL: https://calcyourfinance.pages.dev

## Before doing anything

1. Run `date "+%Y-%m-%d"` — confirm current date, never assume the year
2. Run `git log --oneline -10` — see what was last completed
3. Run `git status` — confirm clean working tree
4. Read `CLAUDE.md` completely
5. Read `docs/prd/CONTEXT.md` completely

Tell me: what is complete, what was last done, what needs to happen next.
Then wait for me to say "continue" before doing anything.

## Required skills — load before any UI work

/impeccable
/frontend-design
/ui-ux-pro-max

Load all three before writing any frontend code, component, or page.

## Session working rules

- Stop after every step — wait for "continue"
- Commit after every milestone with a descriptive message
- Push to GitHub after every commit
- After any build or deploy: stop and tell me to verify at https://calcyourfinance.pages.dev
- Warn me when approaching context limit — summarise exactly where you stopped
- Never use emoji anywhere on the site
- Never hardcode financial rates — use /src/data/financial-rules/ JSON files
- Always run `date` before writing any year, date, or financial year reference
- Update SESSION-LOG.md as the very last action before ending every session

## Design rules — never violate

- No emoji anywhere
- No decorative color — color is functional only
- No colored dots, no colored icon squares, no colored category indicators in UI
- No gradients, no glow, no blur, no decorative shadows
- No boxes or borders around tool rows inside lists or dropdowns
- Brand blue #1B4FD8 for interactive elements only
- Professional financial tool aesthetic — trust and credibility over decoration
- Apply /impeccable + /frontend-design + /design-taste-frontend to every UI decision