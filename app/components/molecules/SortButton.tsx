'use client';

import { memo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '../../lib/utils';

interface SortButtonProps {
  label: string;
  sortKey: string;
  currentSort: string;
  direction: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export const SortButton = memo(function SortButton({
  label,
  sortKey,
  currentSort,
  direction,
  onSort,
}: SortButtonProps) {
  const isActive = currentSort === sortKey;

  return (
    <button
      onClick={() => onSort(sortKey)}
      className="flex items-center gap-1 hover:text-blue-400 transition-colors"
    >
      <span>{label}</span>
      <span className="flex flex-col">
        <ChevronUpIcon
          className={cn(
            'h-3 w-3 -mb-1',
            isActive && direction === 'asc' && 'text-blue-400'
          )}
        />
        <ChevronDownIcon
          className={cn(
            'h-3 w-3 -mt-1',
            isActive && direction === 'desc' && 'text-blue-400'
          )}
        />
      </span>
    </button>
  );
});
