interface Educational {
  whatIs: string;
  howToUse: string[];
  formula?: string;
  formulaExplanation?: string;
  comparison?: { headers: string[]; rows: string[][] };
}

interface EducationalContentProps {
  educational: Educational;
}

export function EducationalContent({ educational }: EducationalContentProps) {
  return (
    <div className="space-y-8 pt-6 border-t border-border">
      <section>
        <h2 className="text-base font-semibold text-ink-primary mb-2">What is this calculator?</h2>
        <p className="text-sm text-ink-secondary leading-relaxed">{educational.whatIs}</p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-ink-primary mb-3">How to use</h2>
        <ol className="space-y-3">
          {educational.howToUse.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-secondary leading-relaxed">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EEF2FF] text-brand-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {educational.formula && (
        <section>
          <h2 className="text-base font-semibold text-ink-primary mb-2">Formula</h2>
          <div className="bg-surface rounded-lg border border-border px-4 py-3 overflow-x-auto">
            <code className="text-sm text-ink-primary font-mono whitespace-nowrap">{educational.formula}</code>
          </div>
          {educational.formulaExplanation && (
            <p className="text-sm text-ink-secondary mt-3 leading-relaxed">{educational.formulaExplanation}</p>
          )}
        </section>
      )}

      {educational.comparison && (
        <section>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {educational.comparison.headers.map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-ink-muted uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {educational.comparison.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-2.5 px-3 text-ink-secondary align-top ${j === 0 ? 'font-medium text-ink-primary' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
