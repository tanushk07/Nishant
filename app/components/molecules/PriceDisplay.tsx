'use client';

import { useEffect, useState, memo } from 'react';
import { cn } from '../../lib/utils';

interface PriceDisplayProps {
  value: number;
  decimals?: number;
  showChange?: boolean;
}

export const PriceDisplay = memo(function PriceDisplay({
  value,
  decimals = 8,
  showChange = true,
}: PriceDisplayProps) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (showChange && value !== prevValue) {
      setFlash(value > prevValue ? 'up' : 'down');
      const timer = setTimeout(() => setFlash(null), 500);
      setPrevValue(value);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue, showChange]);

  return (
    <span
      className={cn(
        flash === 'up' && 'text-green-400',
        flash === 'down' && 'text-red-400'
      )}
    >
      ${value.toFixed(decimals)}
    </span>
  );
});
