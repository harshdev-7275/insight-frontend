import React from 'react';
import { InsightCard } from '@/components/InsightCard';
import CoinCard from '@/components/CoinCard';

interface CoinData {
  symbol: string;
  name: string;
  price: string;
  percentage: string;
  trend: 'up' | 'down';
  chartData: Array<{ value: number }>;
}

const generateRandomChartData = (points: number, trend: 'up' | 'down') => {
  const result = [];
  let value = 50;
  const volatility = 5;
  const trendFactor = trend === 'up' ? 1 : -1;
  
  for (let i = 0; i < points; i++) {
    // Add some randomness, but maintain the overall trend direction
    const change = (Math.random() * volatility) * (Math.random() > 0.3 ? trendFactor : -trendFactor * 0.5);
    value = Math.max(10, Math.min(90, value + change));
    result.push({ value });
  }
  
  return result;
};

const coinData: CoinData = {
  symbol: 'ETH',
  name: 'Ethereum',
  price: '6.26%',
  percentage: '1.24%',
  trend: 'up',
  chartData: generateRandomChartData(20, 'up'),
};

export const MarketInsight: React.FC = () => {
  return (
    <InsightCard title="Market Insight">
      <CoinCard {...coinData} />
    </InsightCard>
  );
};

export default MarketInsight;
