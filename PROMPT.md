# New Session Starter Prompt

Paste this at the start of every new Claude Code session for this project.

---

Project root: D:\Dev\calcyourfinance\calcyourfinance
PRD docs: docs\prd
Repo: https://github.com/trilumos/cyf.git

First do these 3 things before anything else:

1. Run date "+%Y-%m-%d" and confirm the current date
2. Run git log --oneline -10 to see what was last completed
3. Read the relevant PRD doc for today's work

Then tell me: what has been completed, what is next, and wait for me to say continue.

Working rules: stop after every step, wait for 'continue', commit after every milestone, warn me if approaching context limit.
