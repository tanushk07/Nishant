'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Badge } from '../atoms/Badge';
import { PriceDisplay } from '../molecules/PriceDisplay';
import { Button } from '../atoms/Button';
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
  txns?: {
    buy: number;
    sell: number;
  };
  chart?: string; // Mini chart image or component
}

interface TableRowProps {
  token: Token;
  onClick?: () => void;
}

export const TableRow = memo(function TableRow({ token, onClick }: TableRowProps) {
  const changeVariant =
    token.change24h > 0
      ? 'success'
      : token.change24h < 0
      ? 'danger'
      : 'neutral';

  const getMarketCapColor = (mc: number) => {
    if (mc > 1000000) return 'text-green-400';
    if (mc > 100000) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <tr
      onClick={onClick}
      className="border-b border-gray-800/50 hover:bg-gray-900/60 transition-all duration-200 cursor-pointer group"
    >
      {/* Pair Info - Logo, Name, Symbol */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3 min-w-[180px]">
          {token.logo ? (
            <Image
              src={token.logo}
              alt={token.name}
              width={40}
              height={40}
              className="rounded-lg"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {token.symbol.substring(0, 2)}
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {token.name}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {token.symbol}
            </div>
          </div>
        </div>
      </td>

      {/* Mini Chart */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="w-24 h-10 flex items-center">
          {token.chart ? (
            <Image src={token.chart} alt="chart" width={96} height={40} />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center text-[10px] text-gray-600">
              Chart
            </div>
          )}
        </div>
      </td>

      {/* Market Cap with change */}
      <td className="px-4 py-3 text-right">
        <div className="flex flex-col items-end">
          <span className={cn('font-semibold', getMarketCapColor(token.marketCap))}>
            ${(token.marketCap / 1000).toFixed(1)}K
          </span>
          <Badge variant={changeVariant} className="text-[10px] px-1.5 py-0.5">
            {token.change24h > 0 ? '+' : ''}
            {token.change24h.toFixed(2)}%
          </Badge>
        </div>
      </td>

      {/* Liquidity */}
      <td className="px-4 py-3 text-right text-white font-medium hidden md:table-cell">
        ${token.liquidity ? (token.liquidity / 1000).toFixed(1) + 'K' : 'N/A'}
      </td>

      {/* Volume */}
      <td className="px-4 py-3 text-right text-white font-medium hidden xl:table-cell">
        ${(token.volume / 1000).toFixed(1)}K
      </td>

      {/* TXNs (Buy/Sell) */}
      <td className="px-4 py-3 text-center hidden lg:table-cell">
        <div className="flex flex-col text-sm">
          <span className="text-green-400 font-semibold">{token.txns?.buy || 0}</span>
          <span className="text-gray-500 text-xs">{token.txns?.sell || 0}</span>
        </div>
      </td>

      {/* Token Info (Icons/Stats) */}
      <td className="px-4 py-3 text-center hidden 2xl:table-cell">
        <div className="flex items-center justify-center gap-2">
          {/* Example icons - you can use react-icons */}
          <span className="text-xs text-gray-500">🌐</span>
          <span className="text-xs text-blue-400">🐦</span>
          <span className="text-xs text-gray-500">📊</span>
        </div>
      </td>

      {/* Price Display */}
      <td className="px-4 py-3 text-right">
        <PriceDisplay value={token.price} decimals={8} />
      </td>

      {/* Holders */}
      <td className="px-4 py-3 text-right text-gray-300 hidden lg:table-cell">
        {token.holders.toLocaleString()}
      </td>

      {/* Age */}
      <td className="px-4 py-3 text-center text-gray-400 text-sm hidden md:table-cell">
        {token.age}
      </td>

      {/* Action Button */}
      <td className="px-4 py-3">
        <Button
          variant="primary"
          size="sm"
          className="min-w-[60px]"
          onClick={(e) => {
            e.stopPropagation();
            // Handle buy action
          }}
        >
          Buy
        </Button>
      </td>
    </tr>
  );
});
