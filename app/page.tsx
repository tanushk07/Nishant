'use client';

import { TokenSection } from '../app/components/organisms/TabSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0E17] text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50 bg-[#0A0E17]/95">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Token Trading Table</h1>
        </div>
      </header>

      {/* 3 Column Layout */}
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* New Pairs Column */}
          <TokenSection 
            title="New Pairs" 
            category="newPairs"
            headerColor="text-blue-400"
          />

          {/* Final Stretch Column */}
          <TokenSection 
            title="Final Stretch" 
            category="finalStretch"
            headerColor="text-yellow-400"
          />

          {/* Migrated Column */}
          <TokenSection 
            title="Migrated" 
            category="migrated"
            headerColor="text-green-400"
          />
        </div>
      </div>
    </main>
  );
}
