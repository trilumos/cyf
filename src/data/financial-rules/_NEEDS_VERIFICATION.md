# Financial Rules — Needs Verification

Items marked `verified_by: "needs_manual_verification"` or flagged in notes as uncertain.

## Pending verification

| File | Field | Issue | Priority |
|------|-------|--------|----------|
| `india-tax-new-regime.json` | `surcharge[0].rate` (50L-1Cr) | bankbazaar shows 5%, historic rate is 10%. Verify from Income Tax Act 2025 official text or incometaxindia.gov.in. | Medium |
| `us-tax-brackets.json` | `capital_gains_rates` | LTCG thresholds are approximate; verify exact 2026 figures from IRS RP-25-32. | Low |
| `us-tax-brackets.json` | `standard_deduction.additional_blind` | $1,600 figure is approximate; verify exact 2026 amount from IRS. | Low |
| `us-401k-limits.json` | `four01k_403b_457_tsp.total_annual_additions` | 415(c) combined employer+employee limit not sourced; verify from IRS Notice 2025-82. | Low |
| `us-401k-limits.json` | `sep_ira.max` | 2026 SEP-IRA limit not confirmed; verify from IRS. | Low |
| `india-ppf-rates.json` | `current_interest_rate` | Confirmed at 7.1% for Q1 FY 2026-27. Must be reverified by 1-Jul-2026 for Q2 rate. | Medium — due 2026-07-01 |

## Already verified (no action needed)

| File | Source | Verified date |
|------|--------|---------------|
| `india-tax-new-regime.json` | bankbazaar.com/incometaxindia.gov.in | 2026-05-24 |
| `india-tax-old-regime.json` | bankbazaar.com/incometaxindia.gov.in | 2026-05-24 |
| `india-section-80c.json` | incometaxindia.gov.in/cleartax.in | 2026-05-24 |
| `india-section-80d.json` | incometaxindia.gov.in/cleartax.in | 2026-05-24 |
| `india-capital-gains.json` | incometaxindia.gov.in/cleartax.in | 2026-05-24 |
| `india-gst-rates.json` | cbic.gov.in/cleartax.in (56th GST Council) | 2026-05-24 |
| `india-epf-rates.json` | epfindia.gov.in/bajajfinserv.in | 2026-05-24 |
| `india-ppf-rates.json` | dea.gov.in/upstox.com (Q1 FY 2026-27 confirmed) | 2026-05-24 |
| `us-tax-brackets.json` | irs.gov (IRS newsroom 2026 adjustments) | 2026-05-24 |
| `us-401k-limits.json` | irs.gov (IR-2025-111) | 2026-05-24 |
