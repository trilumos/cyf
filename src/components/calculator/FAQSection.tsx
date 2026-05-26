'use client';

import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface FAQSectionProps {
  faqs: Array<{ q: string; a: string }>;
}

function FAQItem({
  q, a, isOpen, onToggle,
}: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4 py-4"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-ink-primary leading-snug">{q}</span>
        <IconChevronDown
          size={15}
          strokeWidth={1.5}
          className={`flex-shrink-0 text-ink-muted mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <p className="text-sm text-ink-secondary leading-relaxed pb-4 pr-6">{a}</p>
      )}
    </div>
  );
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <div className="pt-6 border-t border-border">
      <h2 className="text-base font-semibold text-ink-primary mb-2">Frequently asked questions</h2>
      <div>
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            q={faq.q}
            a={faq.a}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
