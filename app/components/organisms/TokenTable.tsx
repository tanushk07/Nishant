'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TokenCard } from '../organisms/TokenCard';
import { Skeleton } from '../atoms/Skeleton';
import { ErrorBoundary } from '../atoms/ErrorBoundary';
import dynamic from 'next/dynamic';

// ---- Types ----
interface Token {
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  volume: number;
  liquidity?: number;
  holders: number;
  age: string;
  change24h: number;
  logo?: string;
  chart?: string;
  txns?: {
    buy: number;
    sell: number;
  };
  tokenInfo?: {
    website?: boolean;
    twitter?: boolean;
    telegram?: boolean;
  };
}

interface TokenTableProps {
  category: 'newPairs' | 'finalStretch' | 'migrated';
}

// ---- Dynamic Modal ----
const BuyModal = dynamic(() => import('../modals/BuyModal'), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false,
});

// ---- Mock Data ----
const mockTokensData: Record<string, Token[]> = {
  newPairs: [
    {
      name: 'Ragebait',
      symbol: 'RAGE',
      marketCap: 741000,
      price: 0.00074100,
      volume: 65200,
      liquidity: 29600,
      holders: 773,
      age: '23m',
      change24h: -51.80,
      logo: '🐺',
      txns: { buy: 420, sell: 353 },
      tokenInfo: { website: true, twitter: true, telegram: false },
    },
    {
      name: '$WIFOUT',
      symbol: 'WIFOUT',
      marketCap: 324000,
      price: 0.00032400,
      volume: 32800,
      liquidity: 19400,
      holders: 499,
      age: '7m',
      change24h: -39.40,
      logo: '🐶',
      txns: { buy: 280, sell: 219 },
      tokenInfo: { website: true, twitter: false, telegram: true },
    },
  ],
  finalStretch: [
    {
      name: 'LunaX',
      symbol: 'LNX',
      marketCap: 5600000,
      price: 1.21000000,
      volume: 500000,
      liquidity: 394000,
      holders: 3250,
      age: '15d',
      change24h: 1.80,
      logo: '🌙',
      txns: { buy: 630, sell: 712 },
      tokenInfo: { website: true, twitter: true, telegram: true },
    },
  ],
  migrated: [
    {
      name: 'Quantum Token',
      symbol: 'QTM',
      marketCap: 9900000,
      price: 2.05000000,
      volume: 840000,
      liquidity: 670000,
      holders: 5050,
      age: '30d',
      change24h: 0.60,
      logo: '⚛️',
      txns: { buy: 890, sell: 823 },
      tokenInfo: { website: true, twitter: true, telegram: true },
    },
  ],
};

async function fetchTokens(category: string): Promise<Token[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTokensData[category] || []), 500);
  });
}

// ---- Main Component ----
export const TokenTable = memo(function TokenTable({ category }: TokenTableProps) {
  const [sortKey, setSortKey] = useState<keyof Token>('marketCap');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens', category],
    queryFn: () => fetchTokens(category),
    refetchInterval: 3000,
  });

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * multiplier;
      }
      return (aVal < bVal ? -1 : 1) * multiplier;
    });
  }, [data, sortKey, sortDirection]);

  const handleRowClick = useCallback((token: Token) => {
    setSelectedToken(token);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) throw error;

  return (
    <ErrorBoundary fallback={<div className="text-red-400 p-4">Failed to load tokens</div>}>
      {/* Column Headers */}
      <div className="grid grid-cols-[200px_100px_140px_120px_120px_100px_120px_140px_120px_100px_100px] gap-4 px-4 py-2 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-800/50 mb-2">
        <div>Pair Info</div>
        <div className="text-center">Chart</div>
        <div className="text-right">Market Cap ↓</div>
        <div className="text-right">Liquidity</div>
        <div className="text-right">Volume</div>
        <div className="text-center">TXNs</div>
        <div className="text-center">Token Info</div>
        <div className="text-right">Price</div>
        <div className="text-right">Holders</div>
        <div className="text-center">Age</div>
        <div className="text-right">Action</div>
      </div>

      {/* Token Cards */}
      <div className="space-y-2">
        {sortedData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No tokens found in this category
          </div>
        ) : (
          sortedData.map((token, index) => (
            <TokenCard
              key={`${token.symbol}-${index}`}
              token={token}
              onClick={() => handleRowClick(token)}
            />
          ))
        )}
      </div>

      {selectedToken && (
        <BuyModal token={selectedToken} onClose={() => setSelectedToken(null)} />
      )}
    </ErrorBoundary>
  );
});
