'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TabId = 'emi' | 'sip' | 'tax' | 'fd' | 'fire';

const TABS: { id: TabId; label: string }[] = [
  { id: 'emi',  label: 'EMI' },
  { id: 'sip',  label: 'SIP' },
  { id: 'tax',  label: 'Income Tax' },
  { id: 'fd',   label: 'FD' },
  { id: 'fire', label: 'FIRE' },
];

type CalcDisplay = {
  title: string;
  slug: string;
  inputs: { label: string; value: string; hint: string; barPct: number }[];
  resultLabel: string;
  result: string;
  subtitle: string;
};

const DISPLAYS: Record<TabId, CalcDisplay> = {
  emi: {
    title: 'EMI Calculator',
    slug: 'emi-calculator',
    inputs: [
      { label: 'Loan amount',           value: '₹ 25,00,000', hint: '₹25L',       barPct: 50 },
      { label: 'Interest rate (% p.a.)', value: '8.5%',        hint: 'per year',   barPct: 34 },
      { label: 'Loan tenure',            value: '20 years',    hint: '240 months', barPct: 67 },
    ],
    resultLabel: 'Monthly EMI',
    result: '₹ 21,695',
    subtitle: 'Opens with amortization schedule, charts and PDF export',
  },
  sip: {
    title: 'SIP Calculator',
    slug: 'sip-calculator',
    inputs: [
      { label: 'Monthly investment',      value: '₹ 10,000', hint: '',          barPct: 33 },
      { label: 'Expected return (% p.a.)', value: '12%',      hint: 'per year', barPct: 48 },
      { label: 'Investment period',        value: '15 years',  hint: '',         barPct: 50 },
    ],
    resultLabel: 'Maturity value',
    result: '₹ 50,45,760',
    subtitle: 'With year-by-year growth chart and inflation-adjusted values',
  },
  tax: {
    title: 'Income Tax Calculator',
    slug: 'income-tax-calculator',
    inputs: [
      { label: 'Annual income (CTC)',       value: '₹ 15,00,000', hint: '',            barPct: 50 },
      { label: 'Deductions (80C, HRA…)',    value: '₹ 1,50,000',  hint: '',            barPct: 30 },
      { label: 'Tax regime',                value: 'New regime',   hint: 'FY 2025-26', barPct: 0  },
    ],
    resultLabel: 'Tax payable',
    result: '₹ 97,500',
    subtitle: 'Compare old vs new regime side-by-side',
  },
  fd: {
    title: 'FD Calculator',
    slug: 'fd-calculator',
    inputs: [
      { label: 'Principal amount',          value: '₹ 5,00,000', hint: '',                      barPct: 50 },
      { label: 'Interest rate (% p.a.)',     value: '7.5%',        hint: 'per year',              barPct: 30 },
      { label: 'Tenure',                     value: '3 years',     hint: 'Quarterly compounding', barPct: 30 },
    ],
    resultLabel: 'Maturity amount',
    result: '₹ 6,23,632',
    subtitle: 'With interest payout schedule and TDS details',
  },
  fire: {
    title: 'FIRE Calculator',
    slug: 'fire-number-calculator',
    inputs: [
      { label: 'Monthly expenses',       value: '₹ 80,000', hint: '',          barPct: 40 },
      { label: 'Safe withdrawal rate',   value: '4%',        hint: 'per year', barPct: 20 },
      { label: 'Current age',            value: '32 years',  hint: '',         barPct: 35 },
    ],
    resultLabel: 'FIRE corpus needed',
    result: '₹ 2,40,00,000',
    subtitle: 'With timeline, savings rate analysis and coast FIRE',
  },
};

export function HeroCalculatorPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('emi');
  const router = useRouter();
  const calc = DISPLAYS[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Tab row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <span style={{ fontSize: '9.5px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: '10px', whiteSpace: 'nowrap' }}>
          TRY A CALCULATOR
        </span>
        {TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={active ? undefined : 'hero-tab'}
              style={{
                padding: '5px 11px',
                borderRadius: '6px',
                border: active ? '1px solid #C7D2FE' : '1px solid transparent',
                background: active ? '#EEF2FF' : 'transparent',
                color: active ? '#1B4FD8' : '#6B7280',
                fontSize: '12px',
                fontWeight: active ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Calculator card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '0.5px solid #E5E7EB',
        padding: '20px 22px 22px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
      }}>
        {/* Card header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
            {calc.title}
          </span>
          <button
            onClick={() => router.push(`/calculators/${calc.slug}/`)}
            style={{ fontSize: '12px', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Full calculator &rarr;
          </button>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {calc.inputs.map((input) => (
            <div key={input.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>{input.label}</span>
                {input.hint && (
                  <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>{input.hint}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{input.value}</span>
              </div>
              {input.barPct > 0 && (
                <div style={{ height: '3px', background: '#EEF2FF', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${input.barPct}%`, background: '#1B4FD8', borderRadius: '2px' }} />
                </div>
              )}
              {input.barPct === 0 && (
                <div style={{ height: '1px', background: '#F3F4F6', borderRadius: '1px' }} />
              )}
            </div>
          ))}
        </div>

        {/* Result */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '18px',
          padding: '12px 14px',
          background: '#EEF2FF',
          borderRadius: '8px',
        }}>
          <span style={{ fontSize: '12.5px', color: '#374151', fontWeight: 500 }}>{calc.resultLabel}</span>
          <span style={{ fontSize: '17px', fontWeight: 700, color: '#1B4FD8' }}>{calc.result}</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push(`/calculators/${calc.slug}/`)}
          style={{
            display: 'block',
            width: '100%',
            marginTop: '12px',
            padding: '11px',
            background: '#1B4FD8',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          Calculate &amp; see full breakdown &rarr;
        </button>

        <p style={{ margin: '8px 0 0', fontSize: '10.5px', color: '#9CA3AF', textAlign: 'center' }}>
          {calc.subtitle}
        </p>
      </div>
    </div>
  );
}
