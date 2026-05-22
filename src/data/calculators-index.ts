export interface CalcEntry {
  name: string;
  slug: string;
  category: string;
  description: string;
}

export const CALCULATORS_INDEX: CalcEntry[] = [
  // Loans
  { name: "EMI Calculator", slug: "emi-calculator", category: "Loans", description: "Monthly EMI for any loan" },
  { name: "Home Loan EMI Calculator", slug: "home-loan-emi-calculator", category: "Loans", description: "Home loan EMI, total interest & eligibility" },
  { name: "Personal Loan EMI Calculator", slug: "personal-loan-emi-calculator", category: "Loans", description: "EMI for personal loans" },
  { name: "Car Loan EMI Calculator", slug: "car-loan-emi-calculator", category: "Loans", description: "EMI for car or vehicle loans" },
  { name: "Loan Against Property Calculator", slug: "loan-against-property-calculator", category: "Loans", description: "LAP EMI and eligibility" },
  { name: "Loan Prepayment Calculator", slug: "loan-prepayment-calculator", category: "Loans", description: "Savings from prepaying your loan early" },
  { name: "Loan Eligibility Calculator", slug: "loan-eligibility-calculator", category: "Loans", description: "How much loan can you get?" },
  { name: "Business Loan EMI Calculator", slug: "business-loan-emi-calculator", category: "Loans", description: "EMI for business loans" },
  // Investment
  { name: "SIP Calculator", slug: "sip-calculator", category: "Investment", description: "Systematic Investment Plan returns" },
  { name: "Lumpsum Calculator", slug: "lumpsum-calculator", category: "Investment", description: "One-time investment returns" },
  { name: "SWP Calculator", slug: "swp-calculator", category: "Investment", description: "Systematic Withdrawal Plan" },
  { name: "FD Calculator", slug: "fd-calculator", category: "Investment", description: "Fixed deposit maturity and interest" },
  { name: "RD Calculator", slug: "rd-calculator", category: "Investment", description: "Recurring deposit returns" },
  { name: "PPF Calculator", slug: "ppf-calculator", category: "Investment", description: "Public Provident Fund maturity amount" },
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator", category: "Investment", description: "Compound interest growth over time" },
  { name: "Simple Interest Calculator", slug: "simple-interest-calculator", category: "Investment", description: "Simple interest calculation" },
  { name: "CAGR Calculator", slug: "cagr-calculator", category: "Investment", description: "Compound Annual Growth Rate" },
  { name: "Step-up SIP Calculator", slug: "step-up-sip-calculator", category: "Investment", description: "SIP with annual step-up increase" },
  { name: "ELSS Calculator", slug: "elss-calculator", category: "Investment", description: "ELSS mutual fund returns & tax savings" },
  { name: "NSC Calculator", slug: "nsc-calculator", category: "Investment", description: "National Savings Certificate returns" },
  // Tax
  { name: "Income Tax Calculator", slug: "income-tax-calculator", category: "Tax", description: "FY 2025-26 income tax (new & old regime)" },
  { name: "HRA Exemption Calculator", slug: "hra-exemption-calculator", category: "Tax", description: "House Rent Allowance exemption" },
  { name: "TDS Calculator", slug: "tds-calculator", category: "Tax", description: "Tax Deducted at Source" },
  { name: "Capital Gains Tax Calculator", slug: "capital-gains-tax-calculator", category: "Tax", description: "STCG and LTCG tax on investments" },
  { name: "80C Deduction Calculator", slug: "80c-deduction-calculator", category: "Tax", description: "Section 80C investment tax deductions" },
  { name: "Advance Tax Calculator", slug: "advance-tax-calculator", category: "Tax", description: "Advance tax liability and due dates" },
  // Retirement
  { name: "Retirement Corpus Calculator", slug: "retirement-corpus-calculator", category: "Retirement", description: "How much corpus you need to retire" },
  { name: "NPS Calculator", slug: "nps-calculator", category: "Retirement", description: "National Pension System returns" },
  { name: "EPF Calculator", slug: "epf-calculator", category: "Retirement", description: "Employee Provident Fund balance" },
  { name: "FIRE Calculator", slug: "fire-calculator", category: "Retirement", description: "Financial Independence Retire Early" },
  { name: "Gratuity Calculator", slug: "gratuity-calculator", category: "Retirement", description: "Gratuity amount on retirement" },
  // Insurance
  { name: "Life Insurance Calculator", slug: "life-insurance-calculator", category: "Insurance", description: "How much life cover do you need?" },
  { name: "Term Insurance Calculator", slug: "term-insurance-calculator", category: "Insurance", description: "Term plan coverage and premium" },
  { name: "Health Insurance Calculator", slug: "health-insurance-calculator", category: "Insurance", description: "Health cover based on family size" },
  // Stocks
  { name: "Stock P&L Calculator", slug: "stock-pl-calculator", category: "Stocks", description: "Profit and loss on stock trades" },
  { name: "Brokerage Calculator", slug: "brokerage-calculator", category: "Stocks", description: "Brokerage, STT and other trading charges" },
  { name: "SIP vs Lumpsum Calculator", slug: "sip-vs-lumpsum-calculator", category: "Investment", description: "Compare SIP and lumpsum returns" },
  // Real Estate
  { name: "Rent vs Buy Calculator", slug: "rent-vs-buy-calculator", category: "Real Estate", description: "Is it better to rent or buy a home?" },
  { name: "Stamp Duty Calculator", slug: "stamp-duty-calculator", category: "Real Estate", description: "Stamp duty and registration charges" },
  // Personal Finance
  { name: "Budget Planner", slug: "budget-planner", category: "Personal Finance", description: "50/30/20 budget calculator" },
  { name: "Net Worth Calculator", slug: "net-worth-calculator", category: "Personal Finance", description: "Calculate your total net worth" },
  { name: "Salary Calculator", slug: "salary-calculator", category: "Personal Finance", description: "In-hand salary after all deductions" },
  { name: "Inflation Calculator", slug: "inflation-calculator", category: "Personal Finance", description: "Future value adjusted for inflation" },
  // Business
  { name: "GST Calculator", slug: "gst-calculator", category: "Business", description: "GST amount, inclusive and exclusive price" },
  { name: "Break-even Calculator", slug: "break-even-calculator", category: "Business", description: "Break-even point for a business" },
  // Currency & Math
  { name: "Currency Converter", slug: "currency-converter", category: "Currency", description: "Convert between world currencies" },
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "Math", description: "Calculate percentages easily" },
  { name: "Ratio Calculator", slug: "ratio-calculator", category: "Math", description: "Simplify and compare ratios" },
];
