'use client';

import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TokenCard } from '../organisms/TokenCard';
import { Skeleton } from '../atoms/Skeleton';

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
  txns?: { buy: number; sell: number };
  tokenInfo?: { website?: boolean; twitter?: boolean; telegram?: boolean };
}

interface TokenTableProps {
  category: 'newPairs' | 'finalStretch' | 'migrated';
}

async function fetchTokens(category: string): Promise<Token[]> {
  const res = await fetch(`/api/tokens?category=${category}`);
  if (!res.ok) throw new Error('Failed to fetch tokens');
  return res.json();
}

export const TokenTable = memo(function TokenTable({ category }: TokenTableProps) {
  const { data: tokens, isLoading, error } = useQuery({
    queryKey: ['tokens', category],
    queryFn: () => fetchTokens(category),
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm p-4 bg-red-500/10 rounded-xl">
        Failed to load tokens
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tokens?.map((token, index) => (
        <TokenCard key={`${token.symbol}-${index}`} token={token} />
      ))}
    </div>
  );
});
