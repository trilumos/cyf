import Link from 'next/link';
import type { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/all-tools/?category=${category.slug}`}
      className="category-card group flex flex-col"
      style={{
        background: '#ffffff',
        border: '0.5px solid #E5E7EB',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <p
        className="group-hover:text-brand-primary transition-colors"
        style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '6px' }}
      >
        {category.label}
      </p>
      <p style={{ fontSize: '12.5px', color: '#6B7280', lineHeight: 1.5, marginBottom: '14px' }}>
        {category.description}
      </p>
      <p style={{ fontSize: '12.5px', color: '#1B4FD8', fontWeight: 500, marginTop: 'auto' }}>
        {category.count} calculators &rarr;
      </p>
    </Link>
  );
}
