'use client';

import { memo } from 'react';
import { cn } from '../../lib/utils';

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

interface TokenCardProps {
  token: Token;
  onClick?: () => void;
}

export const TokenCard = memo(function TokenCard({ token, onClick }: TokenCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#0D1117] border border-gray-800/50 rounded-xl p-4 hover:bg-gray-900/60 hover:border-gray-700 transition-all duration-200 cursor-pointer"
    >
      {/* Top Row: Logo + Name + Change */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
            {token.logo}
          </div>
          <div>
            <div className="font-semibold text-white text-base">{token.name}</div>
            <div className="text-xs text-gray-500 uppercase">{token.symbol}</div>
          </div>
        </div>
        <div
          className={cn(
            'text-sm font-bold px-2 py-1 rounded',
            token.change24h >= 0
              ? 'text-green-400 bg-green-500/10'
              : 'text-red-400 bg-red-500/10'
          )}
        >
          {token.change24h >= 0 ? '+' : ''}
          {token.change24h.toFixed(2)}%
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Market Cap */}
        <div>
          <div className="text-gray-500 text-xs mb-1">Market Cap</div>
          <div className="text-white font-semibold">{formatNumber(token.marketCap)}</div>
        </div>

        {/* Price */}
        <div>
          <div className="text-gray-500 text-xs mb-1">Price</div>
          <div className="text-white font-mono text-sm">${token.price.toFixed(8)}</div>
        </div>

        {/* Liquidity */}
        <div>
          <div className="text-gray-500 text-xs mb-1">Liquidity</div>
          <div className="text-white font-semibold">
            {token.liquidity ? formatNumber(token.liquidity) : 'N/A'}
          </div>
        </div>

        {/* Volume */}
        <div>
          <div className="text-gray-500 text-xs mb-1">Volume</div>
          <div className="text-white font-semibold">{formatNumber(token.volume)}</div>
        </div>

        {/* Holders */}
        <div>
          <div className="text-gray-500 text-xs mb-1">Holders</div>
          <div className="text-white">{token.holders.toLocaleString()}</div>
        </div>

        {/* Age */}
        <div>
          <div className="text-gray-500 text-xs mb-1">Age</div>
          <div className="text-white">{token.age}</div>
        </div>
      </div>

      {/* Bottom Row: TXNs + Icons */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
        {/* TXNs */}
        <div className="flex gap-3 text-xs">
          <span className="text-green-400 font-semibold">
            ↑ {token.txns?.buy || 0}
          </span>
          <span className="text-gray-500">
            ↓ {token.txns?.sell || 0}
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-2">
          {token.tokenInfo?.website && <span className="text-blue-400">🌐</span>}
          {token.tokenInfo?.twitter && <span className="text-blue-400">🐦</span>}
          {token.tokenInfo?.telegram && <span className="text-blue-400">📱</span>}
        </div>
      </div>
    </div>
  );
});
