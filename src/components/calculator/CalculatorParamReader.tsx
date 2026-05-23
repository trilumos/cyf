'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CalculatorParamReader() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length > 0) {
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    }
  }, [searchParams]);

  return null;
}
