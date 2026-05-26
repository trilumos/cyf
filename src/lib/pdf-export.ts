import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import type { CalculatorModule } from '@/types/calculator';
import { formatResult } from './format';

export interface ExportOpts {
  calcName: string;
  inputs: CalculatorModule['inputs'];
  inputValues: Record<string, number | string>;
  results: CalculatorModule['results'];
  resultValues: Record<string, number>;
  currency: string;
  chartEl?: HTMLElement;
  sourceUrl: string;
}

const BRAND = [27, 79, 216] as const;
const BRAND_TINT = [238, 242, 255] as const;

function inputDisplayValue(
  raw: number | string,
  type: CalculatorModule['inputs'][number]['type'],
  currency: string,
): string {
  switch (type) {
    case 'currency': return formatResult(Number(raw), 'currency', currency);
    case 'percent':  return formatResult(Number(raw), 'percent', currency);
    case 'years':    return `${raw} year${Number(raw) === 1 ? '' : 's'}`;
    case 'months':   return `${raw} month${Number(raw) === 1 ? '' : 's'}`;
    default:         return formatResult(Number(raw), 'number', currency);
  }
}

export async function exportCalculatorPDF(opts: ExportOpts): Promise<void> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  let y = 0;

  // Header band
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageW, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(opts.calcName, margin, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('calcyourfinance.com', pageW - margin, 13, { align: 'right' });
  y = 30;

  // Inputs table
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Your Inputs', margin, y);
  y += 3;

  autoTable(doc, {
    startY: y,
    head: [['Input', 'Value']],
    body: opts.inputs.map((inp) => [
      inp.label,
      inputDisplayValue(opts.inputValues[inp.name], inp.type, opts.currency),
    ]),
    margin: { left: margin, right: margin },
    styles: { fontSize: 9, cellPadding: 2.5 },
    headStyles: {
      fillColor: BRAND_TINT as unknown as [number, number, number],
      textColor: BRAND as unknown as [number, number, number],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [250, 251, 254] as unknown as [number, number, number] },
    tableLineColor: [229, 231, 235] as unknown as [number, number, number],
    tableLineWidth: 0.1,
  });

  y = (doc as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;
  y += 8;

  // Results table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Results', margin, y);
  y += 3;

  autoTable(doc, {
    startY: y,
    head: [['Result', 'Value']],
    body: opts.results.map((r) => [
      r.label,
      formatResult(opts.resultValues[r.name] ?? 0, r.format, opts.currency),
    ]),
    margin: { left: margin, right: margin },
    styles: { fontSize: 9, cellPadding: 2.5 },
    headStyles: {
      fillColor: BRAND_TINT as unknown as [number, number, number],
      textColor: BRAND as unknown as [number, number, number],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [250, 251, 254] as unknown as [number, number, number] },
    tableLineColor: [229, 231, 235] as unknown as [number, number, number],
    tableLineWidth: 0.1,
  });

  y = (doc as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;
  y += 8;

  // Chart snapshot (2× raster of the chart element only)
  if (opts.chartEl) {
    try {
      const canvas = await html2canvas(opts.chartEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const availW = pageW - margin * 2;
      const ratio = canvas.height / canvas.width;
      const imgH = availW * ratio;

      if (y + imgH + 12 > pageH - 16) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Repayment Chart', margin, y);
      y += 4;
      doc.addImage(imgData, 'PNG', margin, y, availW, imgH);
      y += imgH + 6;
    } catch {
      /* chart snapshot failed — skip silently */
    }
  }

  // Footer
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(130, 130, 130);
  const dateStr = new Date().toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  doc.text(`Generated: ${dateStr}  |  ${opts.sourceUrl}`, margin, pageH - 8);
  doc.text('For informational purposes only. Not financial advice. Verify rates with your lender.', margin, pageH - 4);

  doc.save(`${opts.calcName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
}
