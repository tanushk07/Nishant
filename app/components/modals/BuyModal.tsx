'use client';

import { memo, useEffect } from 'react';
import { Button } from '../atoms/Button';

interface Token {
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  volume?: number;
  liquidity?: number;
  holders: number;
  age: string;
  change24h: number;
  logo?: string;
}

interface BuyModalProps {
  token: Token;
  onClose: () => void;
}

export const BuyModal = memo(function BuyModal({ token, onClose }: BuyModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D1117] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl">
              {token.logo}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{token.name}</h2>
              <p className="text-sm text-gray-400 uppercase">{token.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Token Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-mono font-semibold">${token.price.toFixed(8)}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Market Cap</span>
            <span className="text-white font-semibold">
              ${(token.marketCap / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">24h Change</span>
            <span
              className={`font-semibold ${
                token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {token.change24h >= 0 ? '+' : ''}
              {token.change24h.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Holders</span>
            <span className="text-white">{token.holders.toLocaleString()}</span>
          </div>
        </div>

        {/* Buy Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Amount (SOL)</label>
          <input
            type="number"
            placeholder="0.0"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-2">≈ 0 {token.symbol}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              alert(`Buying ${token.symbol}!`);
              onClose();
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
});

export default BuyModal;
