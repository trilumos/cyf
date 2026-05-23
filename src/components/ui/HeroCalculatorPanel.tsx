'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtINR(v: number): string {
  return '₹ ' + Math.round(v).toLocaleString('en-IN');
}

function fmtShort(v: number): string {
  if (v >= 10000000) return `₹${parseFloat((v / 10000000).toFixed(2))}Cr`;
  if (v >= 100000)   return `₹${parseFloat((v / 100000).toFixed(1))}L`;
  if (v >= 1000)     return `₹${parseFloat((v / 1000).toFixed(0))}K`;
  return `₹${v}`;
}

function decimalsOf(step: number): number {
  const s = step.toString();
  const d = s.indexOf('.');
  return d === -1 ? 0 : s.length - d - 1;
}

// ── Calculation formulas ──────────────────────────────────────────────────────

function calcEMI([principal, rate, years]: number[]): number {
  const r = rate / 12 / 100;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcSIP([monthly, rate, years]: number[]): number {
  const r = rate / 12 / 100;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function calcTax([income]: number[]): number {
  // New regime FY 2025-26: ₹75K std deduction, rebate if taxable ≤ ₹12L
  const taxable = Math.max(0, income - 75000);
  if (taxable <= 1200000) return 0;          // full rebate u/s 87A
  let tax = 0;
  const slabs: [number, number][] = [
    [400000, 0], [800000, 0.05], [1200000, 0.10],
    [1600000, 0.15], [2000000, 0.20], [2400000, 0.25], [Infinity, 0.30],
  ];
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, limit) - prev) * rate;
    prev = limit;
  }
  return Math.round(tax * 1.04); // 4% cess
}

function calcFD([principal, rate, years]: number[]): number {
  return principal * Math.pow(1 + rate / (4 * 100), 4 * years);
}

function calcFIRE([monthlyExp, withdrawal]: number[]): number {
  if (withdrawal === 0) return 0;
  return (monthlyExp * 12) / (withdrawal / 100);
}

// ── Config types ──────────────────────────────────────────────────────────────

interface InputCfg {
  label: string;
  min: number;
  max: number;
  step: number;
  fmtDisplay: (v: number) => string;
  fmtUnit: (v: number) => string;
  static?: boolean;
}

interface CalcCfg {
  id: string;
  title: string;
  slug: string;
  defaults: number[];
  inputs: InputCfg[];
  resultLabel: string;
  compute: (vals: number[]) => number;
  fmtResult: (v: number) => string;
  ctaText: string;
  ctaSub: string;
  buildParams: (vals: number[]) => string;
}

// ── Calculator definitions ────────────────────────────────────────────────────

const CALCS: CalcCfg[] = [
  {
    id: 'emi',
    title: 'EMI Calculator',
    slug: 'emi-calculator',
    defaults: [2500000, 8.5, 20],
    inputs: [
      {
        label: 'Loan amount', min: 100000, max: 10000000, step: 50000,
        fmtDisplay: v => `₹ ${v.toLocaleString('en-IN')}`,
        fmtUnit: fmtShort,
      },
      {
        label: 'Interest rate (% p.a.)', min: 1, max: 36, step: 0.1,
        fmtDisplay: v => `${v}%`,
        fmtUnit: () => 'per year',
      },
      {
        label: 'Loan tenure', min: 1, max: 30, step: 1,
        fmtDisplay: v => `${v} year${v !== 1 ? 's' : ''}`,
        fmtUnit: v => `${v * 12} months`,
      },
    ],
    resultLabel: 'Monthly EMI',
    compute: calcEMI,
    fmtResult: fmtINR,
    ctaText: 'Calculate & see full breakdown →',
    ctaSub: 'Opens with amortization schedule, charts and PDF export',
    buildParams: ([a, r, t]) => `?amount=${a}&rate=${r}&tenure=${t}`,
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    slug: 'sip-calculator',
    defaults: [10000, 12, 15],
    inputs: [
      {
        label: 'Monthly investment', min: 500, max: 100000, step: 500,
        fmtDisplay: v => `₹ ${v.toLocaleString('en-IN')}`,
        fmtUnit: fmtShort,
      },
      {
        label: 'Expected return (% p.a.)', min: 1, max: 30, step: 0.5,
        fmtDisplay: v => `${v}%`,
        fmtUnit: () => 'per year',
      },
      {
        label: 'Investment period', min: 1, max: 40, step: 1,
        fmtDisplay: v => `${v} year${v !== 1 ? 's' : ''}`,
        fmtUnit: v => `${v * 12} months`,
      },
    ],
    resultLabel: 'Estimated corpus',
    compute: calcSIP,
    fmtResult: fmtINR,
    ctaText: 'Calculate & see growth chart →',
    ctaSub: 'Opens with full corpus breakdown and SIP vs Lumpsum comparison',
    buildParams: ([m, r, y]) => `?monthly=${m}&rate=${r}&years=${y}`,
  },
  {
    id: 'tax',
    title: 'Income Tax Calculator',
    slug: 'income-tax-calculator-india',
    defaults: [1500000, 150000, 1],
    inputs: [
      {
        label: 'Annual income (CTC)', min: 300000, max: 5000000, step: 50000,
        fmtDisplay: v => `₹ ${v.toLocaleString('en-IN')}`,
        fmtUnit: fmtShort,
      },
      {
        label: 'Section 80C deductions', min: 0, max: 150000, step: 5000,
        fmtDisplay: v => `₹ ${v.toLocaleString('en-IN')}`,
        fmtUnit: v => v >= 150000 ? 'max ₹1.5L' : fmtShort(v),
      },
      {
        label: 'Tax regime', min: 0, max: 1, step: 1,
        fmtDisplay: () => 'New Regime',
        fmtUnit: () => 'FY 2025-26',
        static: true,
      },
    ],
    resultLabel: 'Tax payable (new regime)',
    compute: calcTax,
    fmtResult: fmtINR,
    ctaText: 'Compare old vs new regime →',
    ctaSub: 'Opens with full regime comparison, deductions and tax saving tips',
    buildParams: ([i, d]) => `?income=${i}&deductions=${d}&regime=new`,
  },
  {
    id: 'fd',
    title: 'FD Calculator',
    slug: 'fd-calculator',
    defaults: [500000, 7.5, 3],
    inputs: [
      {
        label: 'Principal amount', min: 10000, max: 5000000, step: 10000,
        fmtDisplay: v => `₹ ${v.toLocaleString('en-IN')}`,
        fmtUnit: fmtShort,
      },
      {
        label: 'Interest rate (% p.a.)', min: 1, max: 15, step: 0.25,
        fmtDisplay: v => `${v}%`,
        fmtUnit: () => 'per year',
      },
      {
        label: 'FD tenure', min: 1, max: 10, step: 1,
        fmtDisplay: v => `${v} year${v !== 1 ? 's' : ''}`,
        fmtUnit: v => `${v * 12} months`,
      },
    ],
    resultLabel: 'Maturity amount',
    compute: calcFD,
    fmtResult: fmtINR,
    ctaText: 'Calculate & see interest breakdown →',
    ctaSub: 'Opens with quarterly interest chart and comparison with RD and PPF',
    buildParams: ([p, r, t]) => `?principal=${p}&rate=${r}&tenure=${t}`,
  },
  {
    id: 'fire',
    title: 'FIRE Number Calculator',
    slug: 'fire-number-calculator',
    defaults: [80000, 4, 32],
    inputs: [
      {
        label: 'Monthly expenses', min: 10000, max: 500000, step: 5000,
        fmtDisplay: v => `₹ ${v.toLocaleString('en-IN')}`,
        fmtUnit: fmtShort,
      },
      {
        label: 'Safe withdrawal rate', min: 1, max: 10, step: 0.5,
        fmtDisplay: v => `${v}%`,
        fmtUnit: () => 'per year',
      },
      {
        label: 'Current age', min: 20, max: 60, step: 1,
        fmtDisplay: v => `${v} years`,
        fmtUnit: () => 'years old',
      },
    ],
    resultLabel: 'FIRE number needed',
    compute: calcFIRE,
    fmtResult: fmtINR,
    ctaText: 'Calculate my FIRE number →',
    ctaSub: 'Opens with retirement timeline, monthly savings plan and investment strategy',
    buildParams: ([e, w, a]) => `?expenses=${e}&withdrawal=${w}&age=${a}`,
  },
];

const TAB_LABELS = ['EMI', 'SIP', 'Income Tax', 'FD', 'FIRE'];

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroCalculatorPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [tabValues, setTabValues] = useState<number[][]>(
    CALCS.map(c => [...c.defaults])
  );
  const router = useRouter();

  const calc = CALCS[activeTab];
  const values = tabValues[activeTab];
  const result = useMemo(() => calc.compute(values), [calc, values]);

  function handleTabClick(i: number) {
    setActiveTab(i);
    setCtaHovered(false);
  }

  function handleSlider(inputIdx: number, raw: string) {
    const dec = decimalsOf(calc.inputs[inputIdx].step);
    const val = parseFloat(parseFloat(raw).toFixed(dec));
    setTabValues(prev =>
      prev.map((tv, ti) =>
        ti === activeTab ? tv.map((v, vi) => vi === inputIdx ? val : v) : tv
      )
    );
  }

  function handleCtaClick() {
    router.push(`/calculators/${calc.slug}/${calc.buildParams(values)}`);
  }

  function sliderBg(input: InputCfg, val: number): string {
    const pct = ((val - input.min) / (input.max - input.min)) * 100;
    return `linear-gradient(to right, #1B4FD8 ${pct}%, #EEF2FF ${pct}%)`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* "Try a calculator" label */}
      <p style={{
        fontSize: '10px', fontWeight: 600, color: '#9CA3AF',
        letterSpacing: '0.07em', textTransform: 'uppercase',
      }}>
        Try a calculator
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {TAB_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => handleTabClick(i)}
            className="hero-tab"
            style={{
              fontSize: '11.5px',
              color: activeTab === i ? '#1B4FD8' : '#6B7280',
              padding: '5px 11px',
              borderRadius: '6px',
              border: `0.5px solid ${activeTab === i ? '#C7D2FE' : 'transparent'}`,
              background: activeTab === i ? '#EEF2FF' : 'transparent',
              fontWeight: activeTab === i ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Calculator card */}
      <div style={{
        background: '#F8F9FC',
        border: '0.5px solid #E5E7EB',
        borderRadius: '12px',
        padding: '20px 20px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '14px',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
            {calc.title}
          </span>
          <Link
            href={`/calculators/${calc.slug}/`}
            style={{ fontSize: '10.5px', color: '#9CA3AF', textDecoration: 'none' }}
          >
            Full calculator &rarr;
          </Link>
        </div>

        {/* Inputs */}
        {calc.inputs.map((input, idx) => (
          <div key={idx} style={{ marginBottom: idx < calc.inputs.length - 1 ? '10px' : '0' }}>
            <div style={{ fontSize: '10.5px', color: '#6B7280', marginBottom: '4px' }}>
              {input.label}
            </div>
            {/* Value display row */}
            <div style={{
              background: '#ffffff',
              border: '0.5px solid #E5E7EB',
              borderRadius: '6px',
              height: '32px',
              padding: '0 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#111827' }}>
                {input.fmtDisplay(values[idx])}
              </span>
              <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>
                {input.fmtUnit(values[idx])}
              </span>
            </div>
            {/* Slider — interactive or static visual */}
            {input.static ? (
              <div style={{
                marginTop: '6px', height: '3px', background: '#EEF2FF',
                borderRadius: '2px', overflow: 'hidden',
              }}>
                <div style={{ width: '60%', height: '100%', background: '#1B4FD8', borderRadius: '2px' }} />
              </div>
            ) : (
              <input
                type="range"
                className="hero-slider"
                min={input.min}
                max={input.max}
                step={input.step}
                value={values[idx]}
                onChange={e => handleSlider(idx, e.target.value)}
                style={{ background: sliderBg(input, values[idx]) }}
              />
            )}
          </div>
        ))}

        {/* Result row */}
        <div style={{
          background: '#EEF2FF',
          border: '0.5px solid #C7D2FE',
          borderRadius: '8px',
          padding: '11px 13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px',
        }}>
          <span style={{ fontSize: '11px', color: '#3730A3' }}>{calc.resultLabel}</span>
          <span style={{ fontSize: '17px', fontWeight: 700, color: '#1B4FD8' }}>
            {calc.fmtResult(result)}
          </span>
        </div>

        {/* CTA button */}
        <button
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          onClick={handleCtaClick}
          style={{
            width: '100%',
            background: ctaHovered ? '#1740B5' : '#1B4FD8',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 600,
            padding: '11px',
            borderRadius: '8px',
            marginTop: '10px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            transform: ctaHovered ? 'translateY(-1px)' : 'translateY(0)',
            boxShadow: ctaHovered ? '0 6px 20px rgba(27,79,216,0.22)' : 'none',
          }}
        >
          {calc.ctaText}
        </button>

        {/* Sub-label */}
        <p style={{
          fontSize: '10px', color: '#9CA3AF',
          textAlign: 'center', marginTop: '7px', lineHeight: 1.5,
        }}>
          {calc.ctaSub}
        </p>
      </div>
    </div>
  );
}
