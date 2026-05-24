#!/usr/bin/env node
/**
 * Regenerates src/data/financial-rules/_LAST_UPDATED.json from all JSON files
 * in that directory, and exits non-zero if any file's review_due has passed.
 * Run manually after editing any rule file: node scripts/build-manifest.mjs
 * (The monthly CI job runs scripts/verify-rates.mjs, which opens review issues.)
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RULES_DIR = join(__dirname, '../src/data/financial-rules');
const MANIFEST_PATH = join(RULES_DIR, '_LAST_UPDATED.json');

async function buildManifest() {
  const entries = await readdir(RULES_DIR);
  const jsonFiles = entries.filter(
    (f) => f.endsWith('.json') && f !== '_LAST_UPDATED.json'
  );

  const files = [];
  for (const filename of jsonFiles.sort()) {
    const raw = await readFile(join(RULES_DIR, filename), 'utf8');
    const data = JSON.parse(raw);
    files.push({
      filename,
      rule_name: data.rule_name ?? filename,
      country: data.country ?? 'XX',
      last_verified: data.last_verified ?? null,
      review_due: data.review_due ?? null,
      verified_by: data.verified_by ?? 'needs_manual_verification',
    });
  }

  const manifest = {
    manifest_version: 1,
    last_generated: new Date().toISOString(),
    files,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`Manifest updated: ${files.length} files indexed.`);

  // Report overdue reviews
  const today = new Date().toISOString().slice(0, 10);
  const overdue = files.filter((f) => f.review_due && f.review_due <= today);
  if (overdue.length) {
    console.warn('\nOverdue reviews:');
    overdue.forEach((f) => console.warn(`  - ${f.filename} (due ${f.review_due})`));
    process.exitCode = 1;
  }
}

buildManifest().catch((err) => {
  console.error(err);
  process.exit(1);
});
