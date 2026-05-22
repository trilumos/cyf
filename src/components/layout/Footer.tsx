import Link from "next/link";

const links = {
  calculators: [
    { label: "Loan Calculators", href: "/all-tools/?category=loan-emi" },
    { label: "Investment Calculators", href: "/all-tools/?category=investment" },
    { label: "Tax Calculators", href: "/all-tools/?category=tax" },
    { label: "Retirement Calculators", href: "/all-tools/?category=retirement" },
    { label: "All 204+ Calculators", href: "/all-tools/" },
  ],
  popular: [
    { label: "EMI Calculator", href: "/calculators/emi-calculator/" },
    { label: "SIP Calculator", href: "/calculators/sip-calculator/" },
    { label: "Income Tax Calculator", href: "/calculators/income-tax-calculator/" },
    { label: "FD Calculator", href: "/calculators/fd-calculator/" },
    { label: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator/" },
  ],
  company: [
    { label: "About", href: "/about/" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Disclaimer", href: "/disclaimer/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-h4 font-bold text-brand-primary tracking-tight"
            >
              CalcYourFinance
            </Link>
            <p className="mt-2 text-sm text-ink-tertiary leading-relaxed">
              Free finance calculators for every money decision. No sign-up
              required.
            </p>
            <p className="mt-4 text-xs text-ink-muted">
              © {new Date().getFullYear()} CalcYourFinance.
              <br />
              All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-mini uppercase tracking-widest text-ink-muted mb-3">
              Calculators
            </h3>
            <ul className="space-y-2">
              {links.calculators.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-tertiary hover:text-brand-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-mini uppercase tracking-widest text-ink-muted mb-3">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              {links.popular.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-tertiary hover:text-brand-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-mini uppercase tracking-widest text-ink-muted mb-3">
              Company
            </h3>
            <ul className="space-y-2 mb-6">
              {links.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-tertiary hover:text-brand-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-mini uppercase tracking-widest text-ink-muted mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              {links.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-tertiary hover:text-brand-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-subtle">
          <p className="text-xs text-ink-muted text-center">
            All calculators provide estimates for informational purposes only.
            Not financial advice. Consult a qualified financial advisor before
            making any investment or financial decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
