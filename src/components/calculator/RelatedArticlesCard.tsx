import Link from 'next/link';

interface RelatedArticlesCardProps {
  articleSlugs: string[];
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RelatedArticlesCard({ articleSlugs }: RelatedArticlesCardProps) {
  if (!articleSlugs.length) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
        Related articles
      </h3>
      <div className="space-y-px">
        {articleSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/blog/${slug}/`}
            className="block text-sm text-ink-secondary hover:text-brand-primary transition-colors py-1.5 leading-snug"
          >
            {slugToTitle(slug)}
          </Link>
        ))}
      </div>
    </div>
  );
}
