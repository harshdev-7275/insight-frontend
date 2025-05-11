import React from 'react';
import MainChart from './MainChart';

interface QueryResult {
  query: string;
  chart: string;
  results: any[];
  chartData: Array<{
    name: string;
    value: number;
  }>;
  error: string | null;
}

interface QueryChartsProps {
  queries: Array<{ query: string; chart: string }>;
  results: QueryResult[];
}

const QueryCharts: React.FC<QueryChartsProps> = ({ queries, results }) => {
  const getChartTitle = (query: string) => {
    // Extract meaningful title from the query
    const match = query.match(/SELECT\s+(.*?)\s+FROM/i);
    if (match) {
      const columns = match[1].split(',').map(col => col.trim());
      return columns.map(col => {
        if (col.includes('COUNT')) return 'Count';
        return col.split(' ')[0];
      }).join(' vs ');
    }
    return 'Data Analysis';
  };

  const calculatePercentage = (data: QueryResult['chartData']) => {
    if (!data || data.length === 0) return '0%';
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const maxValue = Math.max(...data.map(item => item.value));
    const percentage = (maxValue / total) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {results.map((result, index) => (
        <MainChart
          key={index}
          title={getChartTitle(queries[index].query)}
          percentage={calculatePercentage(result.chartData)}
          handleChartClick={() => console.log('Chart clicked:', index)}
          chartType={queries[index].chart as 'bar' | 'pie' | 'area'}
          data={result.chartData}
          colors={['#F7931A', '#8B5CF6', '#EF4444', '#6B7280', '#10B981', '#3B82F6']}
        />
      ))}
    </div>
  );
};

export default QueryCharts; 