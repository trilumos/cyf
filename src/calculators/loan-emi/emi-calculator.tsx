import type { CalculatorModule } from '@/types/calculator';
import { formatCurrency, formatCompact } from '@/lib/format';

function emiCompute(inputs: Record<string, number | string>): Record<string, number> {
  const P = Number(inputs.loanAmount);
  const annualRate = Number(inputs.interestRate);
  const years = Number(inputs.tenureYears);
  const r = annualRate / 12 / 100;
  const n = years * 12;

  if (r === 0 || n === 0) {
    return { emi: P / n, totalPayment: P, totalInterest: 0, interestToLoan: 0 };
  }

  const factor = Math.pow(1 + r, n);
  const emi = (P * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  const interestToLoan = (totalInterest / P) * 100;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    interestToLoan: Math.round(interestToLoan * 100) / 100,
  };
}

function amortizationBuilder(
  inputs: Record<string, number | string>,
  results: Record<string, number>,
): unknown[] {
  const P = Number(inputs.loanAmount);
  const r = Number(inputs.interestRate) / 12 / 100;
  const n = Number(inputs.tenureYears) * 12;
  const emi = results.emi;

  const data: { year: number; principal: number; interest: number }[] = [];
  let balance = P;
  let cumPrincipal = 0;
  let cumInterest = 0;

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principal = Math.min(emi - interest, balance);
    balance = Math.max(0, balance - principal);
    cumPrincipal += principal;
    cumInterest += interest;

    if (month % 12 === 0 || month === n) {
      data.push({
        year: Math.ceil(month / 12),
        principal: Math.round(cumPrincipal),
        interest: Math.round(cumInterest),
      });
    }
  }

  return data;
}

export const emiCalculator: CalculatorModule = {
  slug: 'emi-calculator',
  seo: {
    title: 'EMI Calculator — Monthly Instalment for Any Loan',
    description:
      'Calculate monthly EMI for home loans, car loans and personal loans. See amortization schedule, total interest paid, and how prepayment saves money.',
    keywords: [
      'emi calculator', 'loan emi calculator', 'home loan emi',
      'monthly instalment calculator', 'emi formula',
    ],
  },
  defaultInputs: {
    loanAmount: 5000000,
    interestRate: 8.5,
    tenureYears: 20,
  },
  inputs: [
    {
      name: 'loanAmount',
      label: 'Loan amount',
      type: 'currency',
      min: 50000,
      max: 100000000,
      step: 50000,
      currencyAware: true,
    },
    {
      name: 'interestRate',
      label: 'Interest rate (% p.a.)',
      type: 'percent',
      min: 6,
      max: 24,
      step: 0.25,
    },
    {
      name: 'tenureYears',
      label: 'Loan tenure',
      type: 'years',
      min: 1,
      max: 30,
      step: 1,
    },
  ],
  compute: emiCompute,
  results: [
    { name: 'emi',           label: 'Monthly EMI',     format: 'currency' },
    { name: 'totalInterest', label: 'Total interest',  format: 'currency' },
    { name: 'totalPayment',  label: 'Total payment',   format: 'currency' },
    { name: 'interestToLoan',label: 'Interest / loan', format: 'percent'  },
  ],
  chart: {
    type: 'amortization-stack',
    builder: amortizationBuilder,
  },
  generateSummary: (inputs, results) => {
    const P = Number(inputs.loanAmount);
    const r = Number(inputs.interestRate);
    const n = Number(inputs.tenureYears);
    const { emi, totalInterest, totalPayment, interestToLoan } = results;

    const incomeFor30pct = Math.round(emi / 0.30);
    const rM = r / 12 / 100;
    const firstMonthInterest = P * rM;
    const interestPctOfEmi = Math.round((firstMonthInterest / emi) * 100);
    const repaymentMultiple = P > 0 ? (totalPayment / P).toFixed(2) : '1.00';

    const insights: Array<{
      type: 'insight' | 'caution' | 'tip';
      heading: string;
      body: string;
      relatedToolSlug?: string;
    }> = [
      {
        type: 'insight',
        heading: `You pay ${formatCompact(totalInterest, 'INR')} in interest — ${Math.round(interestToLoan)}% extra on top of what you borrowed`,
        body: `Total amount repaid: <strong>${formatCompact(totalPayment, 'INR')}</strong>. For every ₹1 lakh borrowed, you return ₹${repaymentMultiple} lakhs. In year one, <strong>${interestPctOfEmi}% of each EMI</strong> is just interest — only ${100 - interestPctOfEmi}% reduces what you owe. This is why making prepayments early in the loan has the biggest impact.`,
      },
      {
        type: 'insight',
        heading: `Monthly take-home you need: ${formatCurrency(incomeFor30pct, 'INR')}`,
        body: `Keep all EMIs under 30% of take-home pay — the safe personal finance rule. At <strong>${formatCurrency(emi, 'INR')}/month</strong>, your take-home should be at least <strong>${formatCurrency(incomeFor30pct, 'INR')}/month</strong>. Banks also calculate your FOIR (Fixed Obligation to Income Ratio) across all loans — applications where FOIR exceeds 55% are typically rejected.`,
      },
    ];

    if (n > 5) {
      const altN = (n - 5) * 12;
      const altFactor = rM > 0 ? Math.pow(1 + rM, altN) : 1;
      const altEmi = rM > 0 ? (P * rM * altFactor) / (altFactor - 1) : P / altN;
      const altInterest = altEmi * altN - P;
      const saved = Math.round(totalInterest - altInterest);
      const extra = Math.round(altEmi - emi);
      if (saved > 0) {
        insights.push({
          type: 'caution',
          heading: `Choosing ${n - 5} years instead saves you ${formatCompact(saved, 'INR')}`,
          body: `Your EMI goes up by <strong>${formatCurrency(extra, 'INR')}/month</strong> — but you save <strong>${formatCompact(saved, 'INR')}</strong> in total interest. That is money you keep instead of paying to the bank. If your income can support the higher EMI, the shorter tenure is almost always the better financial decision.`,
        });
      }
    }

    insights.push({
      type: 'tip',
      heading: 'One lump-sum prepayment can save lakhs',
      body: `A single prepayment — even just 3 months of EMI — cuts your interest bill significantly. Ask your bank to reduce the <strong>tenure</strong> (not the EMI) when prepaying; that saves more money over the long run. For floating-rate home loans, prepayment is <strong>free by law</strong> (RBI mandate since 2011). Fixed-rate loans may have a penalty in the agreement.`,
      relatedToolSlug: 'loan-prepayment-calculator',
    });

    return {
      headline: `${formatCurrency(emi, 'INR')} every month for ${n} ${n === 1 ? 'year' : 'years'}`,
      intro: `On a <strong>${formatCompact(P, 'INR')}</strong> loan at <strong>${r}%</strong> interest, your fixed monthly EMI is <strong>${formatCurrency(emi, 'INR')}</strong>. You pay this exact amount every month for <strong>${n} years</strong> (${n * 12} instalments total) until the loan is fully cleared.`,
      insights,
    };
  },
  educational: {
    whatIs:
      'The EMI (Equated Monthly Instalment) Calculator computes the fixed monthly amount you pay to repay a loan in full over its tenure. Unlike simple interest, EMI uses the reducing-balance method: each month\'s interest is charged only on the outstanding principal, so the interest component falls over time even though the EMI stays constant. This calculator works for all standard loan types — home loans, car loans, personal loans, and education loans — since they all use the same formula. Use it to compare loan offers side by side, decide between tenures, or verify whether a loan fits your budget before applying.',
    howToUse: [
      'Enter your loan amount. For example, ₹50,00,000 (₹50 lakhs) for a home loan you\'re considering.',
      'Enter the interest rate quoted by your lender. SBI home loan rates start at 8.50% p.a. as of mid-2026 — always verify the current rate at your bank\'s website before finalising.',
      'Set the loan tenure. Try both 15 years and 20 years to compare the EMI vs total interest trade-off.',
      'Read your EMI: ₹44,043/month for ₹50L at 8.5% over 20 years. Add this to any existing EMIs to calculate your total FOIR (Fixed Obligation to Income Ratio).',
      'Check the "What this means for you" section — it tells you whether the EMI is within the 30% income rule and how much you save with a shorter tenure.',
      'Use the amortization chart to see how the principal-to-interest split changes year by year. In the early years, most of your EMI is interest — this is why prepayments made early have the biggest impact.',
    ],
    formula: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]',
    formulaExplanation:
      'P = principal loan amount; r = monthly interest rate (annual rate ÷ 12 ÷ 100); n = total number of monthly instalments (tenure in years × 12). The formula assumes a fixed interest rate and equal payments throughout. For floating-rate loans, the EMI or tenure adjusts whenever the lender\'s benchmark rate changes.',
    comparison: {
      headers: ['', 'Fixed rate', 'Floating rate'],
      rows: [
        ['EMI stability',    'Constant throughout', 'Changes with repo rate'],
        ['Typical rate',     '0.5–1% above floating', 'Lower initial rate'],
        ['Best for',         'Rising-rate environments', 'Falling-rate environments'],
        ['Prepayment charge','May apply (check T&C)', 'Zero — RBI mandated (2011)'],
        ['Rate reset',       'Never (for fixed period)', 'Quarterly or on repo change'],
      ],
    },
    faqs: [
      {
        q: 'What is a good EMI-to-income ratio for a home loan?',
        a: 'Most banks and financial planners recommend keeping total EMI obligations below 40–50% of gross monthly income, and ideally below 30% of net (take-home) income. The RBI assesses borrowers\' Fixed Obligation to Income Ratio (FOIR) before sanctioning; a FOIR above 55% typically leads to rejection. Use the 30% net income rule as your planning benchmark — it leaves enough headroom for emergencies and investments.',
      },
      {
        q: 'Should I choose a shorter tenure to save interest, or a longer tenure for lower EMI?',
        a: 'A shorter tenure saves significantly on total interest but raises the monthly obligation. For example, a ₹50L home loan at 8.75%: 20 years gives an EMI of ₹44,043 and total interest of ₹55.7L; 10 years gives an EMI of ₹62,558 and total interest of ₹25.1L — you pay ₹30.6L less for ₹18,515 more per month. Choose the shorter tenure if your income comfortably supports it. If not, take the longer tenure but make partial prepayments whenever you have surplus cash.',
      },
      {
        q: 'Can I reduce my EMI after taking a loan?',
        a: 'Yes, two main ways. First, make a partial prepayment: most banks offer a choice between reducing the tenure (saves more interest) or reducing the EMI. Second, do a balance transfer (refinance) to a lender with a lower rate — though you must factor in processing fees, MOD charges, and stamp duty, which typically range from 0.5–1% of the outstanding loan. The RBI mandated zero prepayment charges on floating-rate home loans from 2011.',
      },
      {
        q: 'Does partial prepayment reduce EMI or loan tenure?',
        a: 'This depends on your bank\'s policy and your choice at the time of prepayment. Most banks default to reducing the tenure, which saves more interest overall. You can usually request EMI reduction instead at the time of prepayment. Mathematically, reducing the tenure is better in most scenarios; reducing the EMI is preferable if your monthly cash flow is tight.',
      },
      {
        q: 'What is the impact of a 1% rise or fall in interest rate on my EMI?',
        a: 'For a ₹50L home loan over 20 years, a 1% rate increase (from 8.5% to 9.5%) raises the EMI by approximately ₹3,200 per month and adds around ₹7.7L to total interest. This is why RBI repo rate changes — which flow through to EBLR-linked floating-rate loans — directly affect your EMI. On a floating-rate loan, typically 3 months elapse before a rate change is reflected in your EMI or tenure.',
      },
      {
        q: 'How does a processing fee affect the true cost of my loan?',
        a: 'Processing fees (typically 0.5–1% of the loan amount) are an upfront cost that increases the effective cost of borrowing. On a ₹50L loan with a 1% processing fee (₹50,000), the effective annual rate rises by roughly 0.1% over a 20-year tenure. Always compare the Annual Percentage Rate (APR), which includes all fees, rather than just the stated interest rate when choosing between lenders.',
      },
    ],
  },
};
