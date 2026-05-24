import { Suspense } from 'react';
import type { Metadata } from 'next';
import LayoutShell from '@/components/layout/LayoutShell';
import { AllToolsContent } from '@/components/ui/AllToolsContent';

export const metadata: Metadata = {
  title: 'All Finance Calculators — 200+ Free Tools | CalcYourFinance',
  description:
    'Browse all 200+ free finance calculators across 12 categories — EMI, SIP, tax, retirement, insurance, and more. No sign-up required.',
};

export default function AllToolsPage() {
  return (
    <LayoutShell>
      <Suspense>
        <AllToolsContent />
      </Suspense>
    </LayoutShell>
  );
}
