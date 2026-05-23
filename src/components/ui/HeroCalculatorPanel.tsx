'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeroCalcInput {
  label: string;
  display: string;
  unit: string;
  sliderPct: number;
}

interface HeroCalc {
  id: string;
  title: string;
  slug: string;
  inputs: HeroCalcInput[];
  resultLabel: string;
  resultVal: string;
  ctaText: string;
  ctaSub: string;
  urlParams: string;
}

const HERO_CALCS: HeroCalc[] = [
  {
    id: 'emi',
    title: 'EMI Calculator',
    slug: 'emi-calculator',
    inputs: [
      { label: 'Loan amount', display: '₹ 25,00,000', unit: '₹25L', sliderPct: 50 },
      { label: 'Interest rate (% p.a.)', display: '8.5%', unit: 'per year', sliderPct: 28 },
      { label: 'Loan tenure', display: '20 years', unit: '240 months', sliderPct: 67 },
    ],
    resultLabel: 'Monthly EMI',
    resultVal: '₹ 21,695',
    ctaText: 'Calculate & see full breakdown →',
    ctaSub: 'Opens with amortization schedule, charts and PDF export',
    urlParams: '?amount=2500000&rate=8.5&tenure=20',
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    slug: 'sip-calculator',
    inputs: [
      { label: 'Monthly investment', display: '₹ 10,000', unit: '₹10K/mo', sliderPct: 33 },
      { label: 'Expected return (% p.a.)', display: '12%', unit: 'per year', sliderPct: 40 },
      { label: 'Investment period', display: '15 years', unit: '180 months', sliderPct: 50 },
    ],
    resultLabel: 'Estimated corpus',
    resultVal: '₹ 50,45,760',
    ctaText: 'Calculate & see growth chart →',
    ctaSub: 'Opens with full corpus breakdown and SIP vs Lumpsum comparison',
    urlParams: '?monthly=10000&rate=12&years=15',
  },
  {
    id: 'tax',
    title: 'Income Tax Calculator',
    slug: 'income-tax-calculator-india',
    inputs: [
      { label: 'Annual income (CTC)', display: '₹ 12,00,000', unit: '₹12L', sliderPct: 40 },
      { label: 'Section 80C deductions', display: '₹ 1,50,000', unit: 'max ₹1.5L', sliderPct: 100 },
      { label: 'Tax regime', display: 'New Regime', unit: 'FY 2026-27', sliderPct: 60 },
    ],
    resultLabel: 'Tax payable (new regime)',
    resultVal: '₹ 82,500',
    ctaText: 'Compare old vs new regime →',
    ctaSub: 'Opens with full regime comparison, deductions breakdown and tax saving tips',
    urlParams: '?income=1200000&deductions=150000&regime=new',
  },
  {
    id: 'fd',
    title: 'FD Calculator',
    slug: 'fd-calculator',
    inputs: [
      { label: 'Principal amount', display: '₹ 5,00,000', unit: '₹5L', sliderPct: 33 },
      { label: 'Interest rate (% p.a.)', display: '7.5%', unit: 'per year', sliderPct: 50 },
      { label: 'FD tenure', display: '3 years', unit: '36 months', sliderPct: 30 },
    ],
    resultLabel: 'Maturity amount',
    resultVal: '₹ 6,24,376',
    ctaText: 'Calculate & see interest breakdown →',
    ctaSub: 'Opens with quarterly interest chart and comparison with RD and PPF',
    urlParams: '?principal=500000&rate=7.5&tenure=3',
  },
  {
    id: 'fire',
    title: 'FIRE Number Calculator',
    slug: 'fire-number-calculator',
    inputs: [
      { label: 'Monthly expenses', display: '₹ 80,000', unit: '₹80K/mo', sliderPct: 40 },
      { label: 'Safe withdrawal rate', display: '4%', unit: 'per year', sliderPct: 40 },
      { label: 'Current age', display: '32 years', unit: 'years old', sliderPct: 47 },
    ],
    resultLabel: 'FIRE number needed',
    resultVal: '₹ 2,40,00,000',
    ctaText: 'Calculate my FIRE number →',
    ctaSub: 'Opens with retirement timeline, monthly savings plan and investment strategy',
    urlParams: '?expenses=80000&withdrawal=4&age=32',
  },
];

const TAB_LABELS = ['EMI', 'SIP', 'Income Tax', 'FD', 'FIRE'];

export function HeroCalculatorPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);
  const router = useRouter();
  const calc = HERO_CALCS[activeTab];

  function handleTabClick(i: number) {
    setActiveTab(i);
    setCtaHovered(false);
  }

  function handleCtaClick() {
    router.push(`/calculators/${calc.slug}/${calc.urlParams}`);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* "Try a calculator" label */}
      <p style={{
        fontSize: '10px',
        fontWeight: 600,
        color: '#9CA3AF',
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
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

      {/* Calculator card — the floating element, #F8F9FC on white column */}
      <div style={{
        background: '#F8F9FC',
        border: '0.5px solid #E5E7EB',
        borderRadius: '12px',
        padding: '20px 20px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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

        {/* Inputs — visual only, not interactive */}
        {calc.inputs.map((input, idx) => (
          <div key={idx} style={{ marginBottom: idx < calc.inputs.length - 1 ? '10px' : '0' }}>
            <div style={{ fontSize: '10.5px', color: '#6B7280', marginBottom: '4px' }}>
              {input.label}
            </div>
            {/* Input display row — white on the off-white card */}
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
                {input.display}
              </span>
              <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>
                {input.unit}
              </span>
            </div>
            {/* Visual slider bar */}
            <div style={{
              marginTop: '5px',
              height: '3px',
              background: '#EEF2FF',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${input.sliderPct}%`,
                height: '100%',
                background: '#1B4FD8',
                borderRadius: '2px',
              }} />
            </div>
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
            {calc.resultVal}
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
          fontSize: '10px',
          color: '#9CA3AF',
          textAlign: 'center',
          marginTop: '7px',
          lineHeight: 1.5,
        }}>
          {calc.ctaSub}
        </p>
      </div>
    </div>
  );
}
