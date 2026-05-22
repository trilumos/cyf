import Link from 'next/link';
import * as TablerIcons from '@tabler/icons-react';
import type { Calculator } from '@/data/calculators';
import type { Category } from '@/data/categories';

type IconProps = { size?: number; className?: string };
type IconMap = Record<string, React.ComponentType<IconProps>>;

interface ToolCardProps {
  calculator: Calculator;
  category: Category;
}

export function ToolCard({ calculator, category }: ToolCardProps) {
  const IconComponent = (TablerIcons as unknown as IconMap)[category.icon];

  return (
    <Link
      href={`/calculators/${calculator.slug}/`}
      className="group flex flex-col gap-3 p-4 bg-surface border border-border rounded-xl hover:border-brand-primaryBorder hover:shadow-sm transition-all"
    >
      {/* Icon + badge row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primaryLight shrink-0">
          {IconComponent && (
            <IconComponent size={18} className="text-brand-primary" />
          )}
        </div>
        {calculator.isPopular && !calculator.isTrending && (
          <span className="text-mini uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-primaryLight text-brand-primaryText font-semibold">
            Popular
          </span>
        )}
        {calculator.isTrending && (
          <span className="text-mini uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-primaryLight text-brand-primaryText font-semibold">
            Trending
          </span>
        )}
      </div>

      {/* Name + description */}
      <div>
        <p className="text-sm font-semibold text-ink-primary group-hover:text-brand-primary transition-colors leading-snug">
          {calculator.name}
        </p>
        <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
          {calculator.description}
        </p>
      </div>
    </Link>
  );
}
