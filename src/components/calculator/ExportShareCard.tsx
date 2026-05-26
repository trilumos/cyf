'use client';

import type { RefObject } from 'react';
import type { CalculatorModule } from '@/types/calculator';
import { IconDownload, IconShare2 } from '@tabler/icons-react';

interface ExportShareCardProps {
  module: CalculatorModule;
  inputs: Record<string, number | string>;
  results: Record<string, number>;
  currency: string;
  chartRef: RefObject<HTMLDivElement | null>;
  calcName: string;
}

export function ExportShareCard({
  module, inputs, results, currency, chartRef, calcName,
}: ExportShareCardProps) {
  const handlePDF = async () => {
    try {
      const { exportCalculatorPDF } = await import('@/lib/pdf-export');
      await exportCalculatorPDF({
        calcName,
        inputs: module.inputs,
        inputValues: inputs,
        results: module.results,
        resultValues: results,
        currency,
        chartEl: chartRef.current ?? undefined,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      });
    } catch (err) {
      console.error('PDF export failed:', err);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: calcName, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled or unsupported */
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
        Export &amp; share
      </h3>
      <div className="space-y-px">
        <button
          onClick={handlePDF}
          className="flex items-center gap-2 w-full text-sm text-ink-secondary hover:text-brand-primary transition-colors py-1.5 text-left"
        >
          <IconDownload size={13} strokeWidth={1.5} className="flex-shrink-0" />
          Download PDF report
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 w-full text-sm text-ink-secondary hover:text-brand-primary transition-colors py-1.5 text-left"
        >
          <IconShare2 size={13} strokeWidth={1.5} className="flex-shrink-0" />
          Share this calculator
        </button>
      </div>
    </div>
  );
}
