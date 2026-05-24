#!/usr/bin/env node
/**
 * Monthly rate verification (see docs/prd/05-LIVING-DATA.md).
 *
 * Scans src/data/financial-rules/*.json and opens a GitHub issue for any file
 * that is (a) past its `review_due` date, or (b) inside a budget-calendar alert
 * window for its `country`. Each issue carries the file's current `data` block,
 * its source URL, and a paste-ready verification prompt for Claude.
 *
 * Env / flags:
 *   GITHUB_TOKEN, GITHUB_REPOSITORY  - provided by GitHub Actions (needs issues:write)
 *   DRY_RUN=1                        - never call the API; just log what would happen
 *   ASOF=YYYY-MM-DD                  - override "today" (testing only)
 *
 * If GITHUB_TOKEN or GITHUB_REPOSITORY is missing it runs in dry-run mode, so it
 * is always safe to run locally.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RULES_DIR = join(__dirname, '../src/data/financial-rules');

// The cron fires monthly (1st, 09:00 UTC). To guarantee an event is never
// skipped between two runs, the alert window is at least 35 days wide (>= the
// ~31-day gap between runs). Per-event offsets below widen it further if larger.
const MIN_WINDOW_DAYS = 35;

const BUDGET_CALENDAR = {
  IN: [
    { name: 'Union Budget', month: 2, day: 1, offsetDays: 7 },
    { name: 'Small-savings rate (Q1)', month: 3, day: 31, offsetDays: 7 },
    { name: 'Small-savings rate (Q2)', month: 6, day: 30, offsetDays: 7 },
    { name: 'Small-savings rate (Q3)', month: 9, day: 30, offsetDays: 7 },
    { name: 'Small-savings rate (Q4)', month: 12, day: 31, offsetDays: 7 },
  ],
  US: [
    { name: 'IRS annual inflation adjustment', month: 11, day: 1, offsetDays: 0 },
    { name: 'Tax filing deadline', month: 4, day: 15, offsetDays: 14 },
  ],
  UK: [
    { name: 'Spring Budget', month: 3, day: 15, offsetDays: 7 },
    { name: 'Autumn Statement', month: 11, day: 15, offsetDays: 7 },
  ],
};

const DAY_MS = 86_400_000;
const asof = process.env.ASOF ? new Date(`${process.env.ASOF}T00:00:00Z`) : new Date();
const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const dryRun = process.env.DRY_RUN === '1' || !token || !repo;

function isoToday() {
  return asof.toISOString().slice(0, 10);
}

// Next occurrence (this year or next) of a month/day, relative to `asof`.
function nextOccurrence(month, day) {
  const y = asof.getUTCFullYear();
  let d = new Date(Date.UTC(y, month - 1, day));
  if (d < asof) d = new Date(Date.UTC(y + 1, month - 1, day));
  return d;
}

function budgetAlert(country) {
  const events = BUDGET_CALENDAR[country];
  if (!events) return null;
  for (const ev of events) {
    const eventDate = nextOccurrence(ev.month, ev.day);
    const windowDays = Math.max(ev.offsetDays, MIN_WINDOW_DAYS);
    const daysLeft = Math.round((eventDate - asof) / DAY_MS);
    if (daysLeft >= 0 && daysLeft <= windowDays) {
      return `${ev.name} on ${eventDate.toISOString().slice(0, 10)} (in ${daysLeft} day(s))`;
    }
  }
  return null;
}

async function loadRuleFiles() {
  const names = (await readdir(RULES_DIR)).filter(
    (f) => f.endsWith('.json') && !f.startsWith('_'),
  );
  const files = [];
  for (const filename of names.sort()) {
    const raw = await readFile(join(RULES_DIR, filename), 'utf8');
    files.push({ filename, ...JSON.parse(raw) });
  }
  return files;
}

function buildIssue(file, reasons) {
  const title = `Rate review due: ${file.filename}`;
  const body = [
    `**File:** \`src/data/financial-rules/${file.filename}\``,
    `**Rule:** ${file.rule_name ?? '—'}`,
    `**Country:** ${file.country ?? '—'}`,
    `**Last verified:** ${file.last_verified ?? '—'}`,
    `**Review due:** ${file.review_due ?? '—'}`,
    `**Source:** ${file.source_url ?? file.source_name ?? '—'}`,
    '',
    `**Why flagged:** ${reasons.join('; ')}`,
    '',
    '---',
    '',
    '### Verification prompt (paste into Claude)',
    '',
    '```',
    `Verify whether ${file.filename} is still accurate as of ${isoToday()}.`,
    `Check the official source: ${file.source_url ?? file.source_name ?? '(add source)'}.`,
    'If anything changed, return the updated `data` block in exactly the same JSON',
    'structure, plus the new `last_verified` (today) and `review_due` (next expected change).',
    '```',
    '',
    '### Current `data` block',
    '',
    '```json',
    JSON.stringify(file.data, null, 2),
    '```',
  ].join('\n');
  return { title, body, labels: ['rates-update', 'priority-high'] };
}

async function gh(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'calcyourfinance-rate-verifier',
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(
      `GitHub API ${options.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`,
    );
  }
  return res.json();
}

async function openIssueTitles() {
  const issues = await gh(
    `/repos/${repo}/issues?state=open&labels=rates-update&per_page=100`,
  );
  return new Set(issues.map((i) => i.title));
}

async function main() {
  const files = await loadRuleFiles();
  const today = isoToday();

  const flagged = [];
  for (const file of files) {
    const reasons = [];
    if (file.review_due && file.review_due <= today) {
      reasons.push(`review_due ${file.review_due} has passed`);
    }
    const ba = budgetAlert(file.country);
    if (ba) reasons.push(`upcoming ${ba}`);
    if (reasons.length) flagged.push({ file, reasons });
  }

  const mode = dryRun
    ? token && repo
      ? ' (dry-run requested)'
      : ' (dry-run: no GITHUB_TOKEN/REPOSITORY)'
    : '';
  console.log(
    `Rate verification as of ${today} — ${flagged.length} of ${files.length} file(s) flagged.${mode}`,
  );
  if (!flagged.length) return;

  const existingTitles = dryRun ? new Set() : await openIssueTitles();

  for (const { file, reasons } of flagged) {
    const issue = buildIssue(file, reasons);
    if (dryRun) {
      console.log(
        `\n--- WOULD OPEN ISSUE ---\nTITLE:   ${issue.title}\nLABELS:  ${issue.labels.join(', ')}\nREASONS: ${reasons.join('; ')}`,
      );
      continue;
    }
    if (existingTitles.has(issue.title)) {
      console.log(`Skip (open issue already exists): ${issue.title}`);
      continue;
    }
    await gh(`/repos/${repo}/issues`, { method: 'POST', body: JSON.stringify(issue) });
    console.log(`Opened issue: ${issue.title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
