import React from 'react';
import QueryCharts from '../components/QueryCharts';

interface AnalysisData {
  summary: string;
  key_insights: string[];
  trends_anomalies: string[];
  recommendations: string[];
  business_impact: string[];
}

interface AnalysisPageProps {
  data: {
    queries: Array<{ query: string; chart: string }>;
    results: Array<{
      query: string;
      chart: string;
      results: any[];
      chartData: Array<{ name: string; value: number }>;
      error: string | null;
    }>;
    analysis: AnalysisData;
    table_info: {
      table_name: string;
      table_id: string;
    };
  };
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Data Analysis: {data.table_info.table_name}</h1>
        
        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p className="text-gray-700">{data.analysis.summary}</p>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Visualizations</h2>
          <QueryCharts queries={data.queries} results={data.results} />
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
            <ul className="list-disc list-inside space-y-2">
              {data.analysis.key_insights.map((insight, index) => (
                <li key={index} className="text-gray-700">{insight}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Trends & Anomalies</h2>
            <ul className="list-disc list-inside space-y-2">
              {data.analysis.trends_anomalies.map((trend, index) => (
                <li key={index} className="text-gray-700">{trend}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <ul className="list-disc list-inside space-y-2">
            {data.analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="text-gray-700">{recommendation}</li>
            ))}
          </ul>
        </div>

        {/* Business Impact Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Business Impact</h2>
          <ul className="list-disc list-inside space-y-2">
            {data.analysis.business_impact.map((impact, index) => (
              <li key={index} className="text-gray-700">{impact}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage; 