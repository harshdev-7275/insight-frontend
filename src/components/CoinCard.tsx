import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface CoinCardProps {
  symbol: string;
  name: string;
  price: string;
  percentage: string;
  chartData: Array<{ value: number }>;
  trend: 'up' | 'down';
  marketShare?: string;
  iconSrc?: string;
}

export const CoinCard: React.FC<CoinCardProps> = ({
  symbol,
  name,
  price,
  percentage,
  chartData,
  trend,
  marketShare,
  iconSrc,
}) => {
  const trendColor = trend === 'up' ? 'text-crypto-green' : 'text-crypto-red';
  const chartColor = trend === 'up' ? '#10B981' : '#EF4444';
  const gradientId = `${symbol.toLowerCase()}Gradient`;

  return (
    <div className="bg-crypto-card hover:bg-crypto-card-hover border border-crypto-border rounded-xl p-4 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {iconSrc ? (
            <img src={iconSrc} alt={symbol} className="w-6 h-6 rounded-full" />
          ) : (
            <div className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full",
              symbol === 'BTC' ? "bg-crypto-gold" : 
              symbol === 'ETH' ? "bg-crypto-purple" : "bg-gray-500"
            )}>
              <span className="text-xs font-bold text-white">{symbol.charAt(0)}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{symbol}</span>
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        </div>
        {marketShare && (
          <div className="text-sm font-medium">{marketShare}</div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">{price}</span>
          <div className={cn("text-sm font-medium flex items-center", trendColor)}>
            {trend === 'up' ? (
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {percentage}
          </div>
        </div>
      </div>

      <div className="mt-3 h-16">
        <svg height="0" width="0">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity="0.4"/>
              <stop offset="100%" stopColor={chartColor} stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity="0.4"/>
                <stop offset="100%" stopColor={chartColor} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              fill={`url(#${gradientId})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinCard;
