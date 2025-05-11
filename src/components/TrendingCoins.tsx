import React from 'react';
import { InsightCard } from './InsightCard';

interface TrendingCoin {
  id: number;
  symbol: string;
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const trendingCoins: TrendingCoin[] = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: '95,680', change: '1.24%', trend: 'up' },
  { id: 2, symbol: 'BNB', name: 'Binance Coin', price: '107', change: '2.35%', trend: 'up' },
  { id: 3, symbol: 'ETH', name: 'Ethereum', price: '3,240', change: '0.89%', trend: 'down' },
  { id: 4, symbol: 'VIPS', name: 'Vipshop', price: '21.95', change: '5.21%', trend: 'up' },
  { id: 5, symbol: 'CLAM', name: 'Clams', price: '1.80', change: '0.50%', trend: 'neutral' },
  { id: 6, symbol: 'HPC', name: 'Happycoin', price: '0.015', change: '3.25%', trend: 'down' },
];

export const TrendingCoins: React.FC = () => {
  return (
    <InsightCard title="Trending Coins">
      <div className="space-y-3">
        {trendingCoins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{coin.id}</span>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  coin.symbol === 'BTC' ? 'bg-crypto-gold' : 
                  coin.symbol === 'ETH' ? 'bg-crypto-purple' : 
                  'bg-gray-500'
                }`}>
                  <span className="text-xs text-white font-medium">{coin.symbol.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{coin.symbol}</span>
                  <span className="text-xs text-muted-foreground">{coin.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">${coin.price}</span>
                <span className={`text-xs ${
                  coin.trend === 'up' ? 'text-crypto-green' : 
                  coin.trend === 'down' ? 'text-crypto-red' : 
                  'text-muted-foreground'
                }`}>
                  {coin.trend === 'up' ? '+' : coin.trend === 'down' ? '-' : ''}
                  {coin.change}
                </span>
              </div>
              <div className="w-16 h-10">
                <svg viewBox="0 0 100 30" className="w-full h-full">
                  {coin.trend === 'up' && (
                    <path 
                      d="M0,20 Q25,5 50,15 T100,10" 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="2"
                    />
                  )}
                  {coin.trend === 'down' && (
                    <path 
                      d="M0,10 Q25,25 50,15 T100,20" 
                      fill="none" 
                      stroke="#EF4444" 
                      strokeWidth="2"
                    />
                  )}
                  {coin.trend === 'neutral' && (
                    <path 
                      d="M0,15 Q25,18 50,12 T100,15" 
                      fill="none" 
                      stroke="#6B7280" 
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InsightCard>
  );
};

export default TrendingCoins;
