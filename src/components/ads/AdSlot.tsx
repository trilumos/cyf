'use client';

const SIZE_MAP: Record<string, { width: number; height: number }> = {
  '300x250': { width: 300, height: 250 },
  '300x150': { width: 300, height: 150 },
  '300x600': { width: 300, height: 600 },
  '728x90':  { width: 728, height: 90  },
};

interface AdSlotProps {
  size: '300x250' | '300x150' | '300x600' | '728x90' | 'responsive';
  slotId?: string;
  position: string;
  className?: string;
}

export function AdSlot({ size, slotId, className = '' }: AdSlotProps) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const dims = size !== 'responsive' ? SIZE_MAP[size] : null;
  const style = dims ? { width: dims.width, height: dims.height } : { width: '100%', height: 90 };

  if (!enabled) {
    return null;
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={slotId}
      data-ad-format={size === 'responsive' ? 'auto' : undefined}
      data-full-width-responsive={size === 'responsive' ? 'true' : undefined}
    />
  );
}
