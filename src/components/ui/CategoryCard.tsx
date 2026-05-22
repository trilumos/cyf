import Link from 'next/link';
import type { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/all-tools/?category=${category.slug}`}
      className="group flex flex-col gap-2 p-4 bg-surface border border-border rounded-xl hover:border-brand-primaryBorder hover:shadow-sm transition-all overflow-hidden relative"
    >
      {/* 3px color bar at top — functional: encodes category identity */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: category.color }}
        aria-hidden="true"
      />

      <p className="text-sm font-semibold text-ink-primary group-hover:text-brand-primary transition-colors pt-1">
        {category.label}
      </p>
      <p className="text-xs text-ink-muted leading-relaxed">
        {category.description}
      </p>
      <p className="text-xs text-brand-primary font-medium mt-auto pt-1">
        {category.count} calculators &rarr;
      </p>
    </Link>
  );
}
