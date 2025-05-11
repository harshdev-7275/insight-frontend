import React from 'react';
import { InsightCard } from './InsightCard';

interface CryptoDominanceData {
  name: string;
  percentage: string;
  color: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const dominanceData: CryptoDominanceData[] = [
  { name: 'Bitcoin', percentage: '60.4%', color: '#F7931A', change: '3.22%', trend: 'up' },
  { name: 'Ethereum', percentage: '10.0%', color: '#8B5CF6', change: '1.93%', trend: 'down' },
  { name: 'Others', percentage: '29.6%', color: '#6B7280', change: '1.45%', trend: 'down' },
];

const historicalData = [
  { name: 'High', date: 'Feb 08, 2023', btc: '61.0%', eth: '20.1%' },
  { name: 'Low', date: 'Feb 28, 2024', btc: '55.0%', eth: '10.1%' },
];

export const DominanceChart: React.FC = () => {
  // Calculate total for the chart
  const total = dominanceData.reduce((acc, item) => {
    return acc + parseFloat(item.percentage);
  }, 0);

  // Calculate the start position for each arc
  let currentPosition = 0;
  const segments = dominanceData.map((item) => {
    const percentage = parseFloat(item.percentage) / total;
    const startAngle = currentPosition * 2 * Math.PI;
    currentPosition += percentage;
    const endAngle = currentPosition * 2 * Math.PI;
    
    return {
      ...item,
      startAngle,
      endAngle,
      percentage,
    };
  });

  // Function to calculate path for each arc segment
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = {
      x: x + radius * Math.cos(startAngle),
      y: y + radius * Math.sin(startAngle),
    };
    
    const end = {
      x: x + radius * Math.cos(endAngle),
      y: y + radius * Math.sin(endAngle),
    };
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
    
    return [
      "M", x, y,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      "Z"
    ].join(" ");
  };

  return (
    <InsightCard title="Dominance">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          {dominanceData.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          {dominanceData.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-xl font-bold" style={{ color: item.color }}>{item.percentage}</span>
              <span className={`text-xs ${
                item.trend === 'up' ? 'text-crypto-green' : 
                item.trend === 'down' ? 'text-crypto-red' : 
                'text-muted-foreground'
              }`}>
                {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '■'} {item.change}
              </span>
            </div>
          ))}
        </div>
        
        <div className="relative w-full aspect-square max-w-[180px] mx-auto my-2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={describeArc(50, 50, 45, segment.startAngle - Math.PI / 2, segment.endAngle - Math.PI / 2)}
                fill={segment.color}
                opacity={0.8}
              />
            ))}
            <circle cx="50" cy="50" r="30" fill="#1A1B25" />
          </svg>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-2">
          {historicalData.map((data, index) => (
            <div key={index} className="bg-crypto-background p-2 rounded-md">
              <div className="text-xs text-muted-foreground mb-1">{data.name}</div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-muted-foreground">{data.date}</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-crypto-gold"></div>
                    <span className="text-xs">{data.btc}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-crypto-purple"></div>
                    <span className="text-xs">{data.eth}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InsightCard>
  );
};

export default DominanceChart;
