'use client';

interface LastUpdatedBadgeProps {
  lastVerified: string;
  sourceName: string;
  sourceUrl?: string;
  className?: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function LastUpdatedBadge({
  lastVerified,
  sourceName,
  sourceUrl,
  className = '',
}: LastUpdatedBadgeProps) {
  const formattedDate = formatDate(lastVerified);
  const domain = sourceUrl ? extractDomain(sourceUrl) : null;

  return (
    <p className={`text-xs text-ink-muted mt-1 ${className}`}>
      Last updated: {formattedDate}
      {sourceUrl ? (
        <>
          {' · Source: '}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink-secondary transition-colors"
            title={sourceName}
          >
            {domain}
          </a>
        </>
      ) : (
        <> · Source: {sourceName}</>
      )}
    </p>
  );
}
