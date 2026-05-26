import type { ReactNode } from 'react';

interface CalculatorShellProps {
  center: ReactNode;
  right: ReactNode;
}

export function CalculatorShell({ center, right }: CalculatorShellProps) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
      <div className="min-w-0">{center}</div>
      <div className="hidden lg:block">
        <div className="sticky top-24 flex flex-col gap-4">{right}</div>
      </div>
    </div>
  );
}
