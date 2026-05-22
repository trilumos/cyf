import LayoutShell from "@/components/layout/LayoutShell";

export default function Home() {
  return (
    <LayoutShell>
      <div className="min-h-[60vh] flex items-center justify-center bg-page">
        <div className="text-center">
          <p className="text-mini uppercase tracking-widest text-brand-primaryText bg-brand-primaryLight px-3 py-1 rounded-full inline-block mb-4">
            Day 1 — Layout Shell
          </p>
          <h1 className="text-h1 text-ink-primary">
            Make smarter money decisions with{" "}
            <span className="text-brand-primary">CalcYourFinance</span>
          </h1>
          <p className="text-body text-ink-tertiary mt-3">
            Navbar, MegaMenu, Footer, and LayoutShell wired up.
          </p>
        </div>
      </div>
    </LayoutShell>
  );
}
