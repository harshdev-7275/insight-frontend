import React from 'react'
import { Button } from './ui/button'

const Home = ({user}: {user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}}) => {

  return (
    <main className="flex-1 flex flex-col p-6 gap-6">
    {/* Header */}
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Healthcare Performance Dashboard</h1>
        <p className="text-[var(--color-muted-foreground)] text-sm">Welcome{user ? `, ${user.name}` : ''}!</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask a question about your healthcare data..."
          className="px-4 py-2 rounded-lg border border-[var(--color-border)]  text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-w-[250px]"
        />
        <Button variant="secondary" className="ml-2">🔍</Button>
      </div>
    </header>
    {/* Metrics */}
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-[var(--color-card)] rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-[var(--color-primary)] font-bold text-lg">Patient Satisfaction</span>
        <span className="text-2xl font-extrabold mt-2">92%</span>
      </div>
      <div className="bg-[var(--color-card)] rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-[var(--color-primary)] font-bold text-lg">Avg Wait Time</span>
        <span className="text-2xl font-extrabold mt-2">18 min</span>
      </div>
      <div className="bg-[var(--color-card)] rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-[var(--color-primary)] font-bold text-lg">Readmission Rate</span>
        <span className="text-2xl font-extrabold mt-2">4.2%</span>
      </div>
      <div className="bg-[var(--color-card)] rounded-xl shadow p-4 flex flex-col items-center">
        <span className="text-[var(--color-primary)] font-bold text-lg">Staff Utilization</span>
        <span className="text-2xl font-extrabold mt-2">87%</span>
      </div>
    </section>
    {/* Insights & Patient Flow */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* AI-Generated Insights */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-2">AI-Generated Insights</h2>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <div className="font-bold text-green-700">Causal Relationship Detected</div>
          <div className="text-green-800 text-sm">Staff scheduling changes in ER have directly improved wait times.</div>
          <a href="#" className="text-green-600 hover:underline text-xs mt-1 inline-block">View detailed analysis →</a>
        </div>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="font-bold text-red-700">Anomaly Detected</div>
          <div className="text-red-800 text-sm">Prescription fulfillment times have increased 15% in the North Wing.</div>
          <a href="#" className="text-red-600 hover:underline text-xs mt-1 inline-block">Investigate now →</a>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="font-bold text-blue-700">Predictive Insight</div>
          <div className="text-blue-800 text-sm">Forecast shows potential capacity issues in Radiology dept next month.</div>
          <a href="#" className="text-blue-600 hover:underline text-xs mt-1 inline-block">View forecast details →</a>
        </div>
      </div>
      {/* Patient Flow Analysis */}
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-2">Patient Flow Analysis</h2>
        <div className="bg-[var(--color-card)] rounded-lg shadow p-4 flex flex-col items-center justify-center min-h-[180px]">
          {/* Placeholder for chart */}
          <div className="w-full h-24 flex items-end gap-2">
            <div className="bg-[var(--color-chart-1)] w-4 h-12 rounded" />
            <div className="bg-[var(--color-chart-2)] w-4 h-20 rounded" />
            <div className="bg-[var(--color-chart-3)] w-4 h-16 rounded" />
            <div className="bg-[var(--color-chart-4)] w-4 h-24 rounded" />
          </div>
          <Button variant="secondary" className="mt-4 w-full">Ask for Analysis</Button>
          <div className="text-xs text-[var(--color-muted-foreground)] mt-2 text-center">What's causing the increase in North Wing wait times?</div>
        </div>
      </div>
    </section>
  </main>
  )
}

export default Home