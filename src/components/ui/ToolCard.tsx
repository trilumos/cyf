import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import type { Calculator } from '@/data/calculators';
import type { Category } from '@/data/categories';

interface ToolCardProps {
  calculator: Calculator;
  category: Category;
}

// One functional badge style (brand blue) for both Popular and Trending —
// category/decorative color is not used (CLAUDE.md functional-color rule).
const badgeStyle: React.CSSProperties = {
  fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em',
  textTransform: 'uppercase', color: '#1B4FD8',
  background: '#EEF2FF', border: '0.5px solid #C7D2FE',
  borderRadius: '4px', padding: '2px 6px',
};

export function ToolCard({ calculator }: ToolCardProps) {
  return (
    <Link
      href={`/calculators/${calculator.slug}/`}
      className="tool-card group flex flex-col gap-2 p-4 bg-surface border border-border rounded-xl"
    >
      {/* Badge + arrow row */}
      <div className="flex items-center justify-between">
        <span style={badgeStyle}>
          {calculator.isTrending ? 'Trending' : 'Popular'}
        </span>
        <IconArrowRight
          size={14}
          className="text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Name */}
      <p
        className="group-hover:text-brand-primary transition-colors"
        style={{ fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}
      >
        {calculator.name}
      </p>

      {/* Description */}
      <p style={{ fontSize: '11.5px', color: '#6B7280', lineHeight: 1.5 }}>
        {calculator.description}
      </p>
    </Link>
  );
}
