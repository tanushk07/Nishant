import { NextResponse } from 'next/server';

const mockData = {
  newPairs: [
    {
      name: 'Axiom Token',
      symbol: 'AXIOM',
      marketCap: 1200000,
      price: 0.032,
      volume: 45000,
      holders: 1245,
      age: '2d',
      change24h: 5.3,
      logo: '🟣',
      txns: { buy: 420, sell: 353 },
      liquidity: 890000,
    },
    {
      name: 'Nova Coin',
      symbol: 'NOVA',
      marketCap: 850000,
      price: 0.021,
      volume: 28000,
      holders: 879,
      age: '1d',
      change24h: -2.1,
      logo: '⭕',
      txns: { buy: 280, sell: 219 },
      liquidity: 650000,
    },
    {
      name: 'Rocket Token',
      symbol: 'ROCK',
      marketCap: 450000,
      price: 0.015,
      volume: 18000,
      holders: 542,
      age: '12h',
      change24h: 12.5,
      logo: '🚀',
      txns: { buy: 190, sell: 145 },
      liquidity: 320000,
    },
    {
      name: 'Moon Coin',
      symbol: 'MOON',
      marketCap: 680000,
      price: 0.024,
      volume: 25000,
      holders: 678,
      age: '18h',
      change24h: 8.2,
      logo: '🌙',
      txns: { buy: 310, sell: 267 },
      liquidity: 490000,
    },
    {
      name: 'Star Token',
      symbol: 'STAR',
      marketCap: 920000,
      price: 0.038,
      volume: 32000,
      holders: 834,
      age: '3d',
      change24h: -5.6,
      logo: '⭐',
      txns: { buy: 380, sell: 412 },
      liquidity: 710000,
    },
    // Add more to test scrolling...
  ],
  finalStretch: [
    {
      name: 'LunaX',
      symbol: 'LNX',
      marketCap: 5600000,
      price: 1.21,
      volume: 500000,
      holders: 3250,
      age: '15d',
      change24h: 1.8,
      logo: '🌌',
      txns: { buy: 630, sell: 712 },
      liquidity: 3940000,
    },
    {
      name: 'Alpha Token',
      symbol: 'ALPHA',
      marketCap: 4200000,
      price: 0.98,
      volume: 420000,
      holders: 2890,
      age: '12d',
      change24h: 3.4,
      logo: '🔮',
      txns: { buy: 520, sell: 589 },
      liquidity: 3100000,
    },
  ],
  migrated: [
    {
      name: 'Quantum Token',
      symbol: 'QTM',
      marketCap: 9900000,
      price: 2.05,
      volume: 840000,
      holders: 5050,
      age: '30d',
      change24h: 0.6,
      logo: '⚛️',
      txns: { buy: 890, sell: 823 },
      liquidity: 6700000,
    },
    {
      name: 'Omega Coin',
      symbol: 'OMEGA',
      marketCap: 8500000,
      price: 1.85,
      volume: 720000,
      holders: 4320,
      age: '25d',
      change24h: -1.2,
      logo: '🔷',
      txns: { buy: 780, sell: 845 },
      liquidity: 5900000,
    },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as keyof typeof mockData;

  if (!category || !mockData[category]) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(mockData[category]);
}
