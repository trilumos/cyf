import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calcyourfinance.com";
const SITE_DESCRIPTION =
  "200+ free finance calculators for EMI, SIP, tax, retirement, and more. No sign-up required.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CalcYourFinance — Free Finance Calculators",
    template: "%s | CalcYourFinance",
  },
  description: SITE_DESCRIPTION,
  applicationName: "CalcYourFinance",
  openGraph: {
    type: "website",
    siteName: "CalcYourFinance",
    title: "CalcYourFinance — Free Finance Calculators",
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcYourFinance — Free Finance Calculators",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="bg-page text-ink-primary antialiased">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
