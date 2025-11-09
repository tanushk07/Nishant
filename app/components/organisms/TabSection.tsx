'use client';

import { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TokenCard } from './TokenCard';
import { Skeleton } from '../atoms/Skeleton';
import dynamic from 'next/dynamic';

// Dynamic import for modal
const BuyModal = dynamic(() => import('../modals/BuyModal'), {
  ssr: false,
});

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

interface TokenSectionProps {
  title: string;
  category: 'newPairs' | 'finalStretch' | 'migrated';
  headerColor?: string;
}

async function fetchTokens(category: string): Promise<Token[]> {
  const res = await fetch(`/api/tokens?category=${category}`);
  if (!res.ok) throw new Error('Failed to fetch tokens');
  return res.json();
}

export const TokenSection = memo(function TokenSection({ 
  title, 
  category,
  headerColor = 'text-white'
}: TokenSectionProps) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const { data: tokens, isLoading, error } = useQuery({
    queryKey: ['tokens', category],
    queryFn: () => fetchTokens(category),
    refetchInterval: 5000,
  });

  return (
    <div className="flex flex-col">
      {/* Section Header */}
      <h2 className={`text-xl font-bold mb-4 ${headerColor}`}>{title}</h2>
      
      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-400 text-sm p-4 bg-red-500/10 rounded-xl">
          Failed to load tokens
        </div>
      )}

      {/* Tokens List */}
      {tokens && (
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 custom-scrollbar">
          {tokens.map((token, index) => (
            <TokenCard
              key={`${token.symbol}-${index}`}
              token={token}
              onClick={() => setSelectedToken(token)}
            />
          ))}
        </div>
      )}

      {/* Buy Modal */}
      {selectedToken && (
        <BuyModal
          token={selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </div>
  );
});
