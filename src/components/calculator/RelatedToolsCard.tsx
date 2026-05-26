import Link from 'next/link';
import { CALCULATORS } from '@/data/calculators';

interface RelatedToolsCardProps {
  relatedSlugs: string[];
}

export function RelatedToolsCard({ relatedSlugs }: RelatedToolsCardProps) {
  const tools = relatedSlugs
    .map((slug) => CALCULATORS.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)
    .slice(0, 5);

  if (!tools.length) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
        Related calculators
      </h3>
      <div className="space-y-px">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.slug}/`}
            className="block text-sm text-ink-secondary hover:text-brand-primary transition-colors py-1.5 truncate"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
