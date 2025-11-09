'use client';

import { memo } from 'react';

interface TableHeaderProps {
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export const TableHeader = memo(function TableHeader({
  sortKey,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  const HeaderCell = ({ label, sortKey: key }: { label: string; sortKey?: string }) => {
    const isActive = sortKey === key;
    
    return (
      <th
        className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
          key ? 'cursor-pointer hover:text-white' : ''
        } ${isActive ? 'text-blue-400' : 'text-gray-500'}`}
        onClick={() => key && onSort(key)}
      >
        <div className="flex items-center gap-1">
          {label}
          {key && isActive && (
            <span className="text-blue-400">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </th>
    );
  };

  return (
    <thead className="bg-[#0B0E14] border-b border-gray-800">
      <tr>
        <HeaderCell label="Pair Info" sortKey="name" />
        <HeaderCell label="Chart" />
        <HeaderCell label="Market Cap" sortKey="marketCap" />
        <HeaderCell label="Liquidity" sortKey="liquidity" />
        <HeaderCell label="Volume" sortKey="volume" />
        <HeaderCell label="TXNs" sortKey="txns" />
        <HeaderCell label="Token Info" />
        <HeaderCell label="Price" sortKey="price" />
        <HeaderCell label="Holders" sortKey="holders" />
        <HeaderCell label="Age" sortKey="age" />
        <HeaderCell label="Action" />
      </tr>
    </thead>
  );
});
