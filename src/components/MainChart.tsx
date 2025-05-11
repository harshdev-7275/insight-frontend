import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Data interfaces for different chart types
interface AreaChartData {
  name: string;
  crybs: number;
  eth: number;
  other: number;
}

interface BarChartData {
  name: string;
  value: number;
}

interface PieChartData {
  name: string;
  value: number;
}

type ChartType = 'area' | 'bar' | 'pie';

interface MainChartProps {
  title: string;
  percentage: string;
  handleChartClick: () => void;
  chartType: ChartType;
  data: AreaChartData[] | BarChartData[] | PieChartData[];
  colors?: string[];
}

const COLORS = ['#F7931A', '#8B5CF6', '#EF4444', '#6B7280'];

export const MainChart: React.FC<MainChartProps> = ({ 
  title, 
  percentage, 
  handleChartClick,
  chartType,
  data,
  colors = COLORS
}) => {
  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data as AreaChartData[]} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickFormatter={(value) => `${value.toFixed(0)}%`} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1B25',
                borderColor: '#2A2A35',
                borderRadius: '0.5rem',
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Area
              type="monotone"
              dataKey="crybs"
              stroke="#F7931A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#goldGradient)"
            />
            <Area
              type="monotone"
              dataKey="eth"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#purpleGradient)"
            />
            <Area
              type="monotone"
              dataKey="other"
              stroke="#6B7280"
              strokeWidth={2}
              fillOpacity={1}
              fill="transparent"
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data as BarChartData[]} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickFormatter={(value) => `${value.toFixed(0)}%`} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1B25',
                borderColor: '#2A2A35',
                borderRadius: '0.5rem',
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Bar dataKey="value" fill="#F7931A" />
          </BarChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data as PieChartData[]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {(data as PieChartData[]).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1B25',
                borderColor: '#2A2A35',
                borderRadius: '0.5rem',
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
          </PieChart>
        );
      
      default:
        return <AreaChart data={[]} />;
    }
  };

  return (
    <div className="p-6 bg-crypto-card rounded-xl border border-crypto-border flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9L9 15" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9L15 15" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="font-medium">{title}</h3>
          </div>
          <div className="ml-2 flex items-center bg-crypto-background rounded px-2 py-0.5 text-xs">
            <span className="text-crypto-gold">{percentage}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-8 w-8 bg-crypto-background rounded-full flex items-center justify-center">
            <span className="sr-only">User Profile</span>
            <span className="text-sm">👤</span>
          </div>
          <button onClick={handleChartClick} className="ml-2 p-1 hover:bg-crypto-card-hover rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative -mx-2">
        <svg height="0" width="0">
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F7931A" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#F7931A" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        
        <ResponsiveContainer width="100%" height={200}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;
