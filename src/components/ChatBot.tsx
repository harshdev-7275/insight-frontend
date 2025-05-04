import { API_URL } from '@/env'
import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Components } from 'react-markdown'
import Modal from 'react-modal'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface Visualization {
  chartType: string
  title: string
  description: string
  data: any[]
  xAxis: string
  yAxis: string
  options?: {
    sortBy?: string
    limit?: number
  }
}

interface ChatResponse {
  success: boolean
  message: string
  response: string
  insights: string[]
  patterns: string
  followUpQuestions: string[]
  visualizations: Visualization[]
  timestamp: string
  queryType: string
}

const chartTypes = [
  { label: 'Line Chart', value: 'line' },
  { label: 'Bar Chart', value: 'bar' },
  { label: 'Pie Chart', value: 'pie' },
]

const ChatBot = ({user_id, email}: {user_id: string, email: string}) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [chartType, setChartType] = useState('auto')
  const [response, setResponse] = useState<ChatResponse | null>(null)
  const [expandedChart, setExpandedChart] = useState<string | null>(null)
  const [showCarousel, setShowCarousel] = useState(false)
  const [carouselStartIndex, setCarouselStartIndex] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [chatHistory, setChatHistory] = useState<
    { sender: 'user' | 'bot', message: string, insights?: string[], visualizations?: Visualization[] }[]
  >([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [response, loading])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message to chat history
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', message: query }
    ])

    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/chat/response`, {
        query,
        user_id,
        email
      })
      setResponse(res.data)
      // Add bot response to chat history
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'bot',
          message: res.data.response,
          insights: res.data.insights,
          visualizations: res.data.visualizations
        }
      ])
      setQuery('')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatMessage = (text: string) => {
    // Convert currency symbols and numbers to proper markdown
    return text
      .replace(/\u20b9\s*([\d,]+\.?\d*)/g, '**₹$1**') // Format currency
      .replace(/(\d+(?:,\d+)*(?:\.\d+)?%)/g, '**$1**') // Format percentages
      .replace(/(\d+(?:,\d+)*(?:\.\d+)?)/g, '**$1**') // Format numbers
  }

  const markdownComponents: Components = {
    p: ({children}) => <p className="mb-2">{children}</p>,
    ul: ({children}) => <ul className="list-disc list-inside space-y-1 mt-2">{children}</ul>,
    li: ({children}) => <li className="text-gray-300">{children}</li>,
    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
    h4: ({children}) => <h4 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h4>,
  }

  const renderMessage = (message: string) => {
    return (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {formatMessage(message)}
      </ReactMarkdown>
    )
  }

  const renderChartPreview = (viz: Visualization, idx: number) => {
    if (viz.chartType === 'bar') {
      return (
        <div key={viz.title + idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-2 mb-2 w-full max-w-xs cursor-pointer hover:bg-gray-800/70 transition" onClick={() => { setShowCarousel(true); setCarouselStartIndex(idx) }}>
          <div className="text-white text-sm font-semibold mb-1 truncate">{viz.title}</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viz.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey={viz.xAxis} stroke="#fff" hide />
                <YAxis stroke="#fff" hide />
                <Bar dataKey={viz.yAxis} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }
    return null
  }

  const renderFullChart = (viz: Visualization, idx: number) => {
    if (viz.chartType === 'bar') {
      return (
        <div key={viz.title + idx} className="bg-gray-800/90 border border-gray-700 rounded-xl p-4 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white mb-2">{viz.title}</h3>
          <p className="text-gray-400 mb-4">{viz.description}</p>
          <div className="h-[400px] w-full max-w-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viz.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey={viz.xAxis} stroke="#fff" angle={-45} textAnchor="end" height={100} tick={{ fill: '#fff' }} />
                <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#fff' }} />
                <Legend />
                <Bar dataKey={viz.yAxis} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50"
      >
        {/* Render chat history */}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={
              msg.sender === 'user'
                ? 'bg-blue-500 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]'
                : 'bg-gray-700 text-white rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]'
            }>
              {renderMessage(msg.message)}
              {/* If bot, show insights and chart previews */}
              {msg.sender === 'bot' && msg.insights && msg.insights.length > 0 && (
                <div className="mt-4 border-t border-gray-600 pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Key Insights:</h4>
                  <div>
                    {renderMessage(msg.insights.map(i => `- ${i}`).join('\n'))}
                  </div>
                </div>
              )}
              {msg.sender === 'bot' && msg.visualizations && msg.visualizations.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 items-start mt-2">
                  {msg.visualizations.slice(0, 2).map((viz, idx2) => renderChartPreview(viz, idx2))}
                  {msg.visualizations.length > 2 && (
                    <button
                      className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition ml-0 sm:ml-2 mt-2 sm:mt-0"
                      onClick={() => { setShowCarousel(true); setCarouselStartIndex(2) }}
                    >
                      +{msg.visualizations.length - 2} more, click to expand
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Modal with carousel for all charts (use last bot message with charts) */}
        <Modal
          isOpen={showCarousel}
          onRequestClose={() => setShowCarousel(false)}
          contentLabel="Charts Carousel"
          ariaHideApp={false}
          style={{
            overlay: { backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000 },
            content: { background: 'none', border: 'none', padding: 0, inset: '5%' }
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <button className="self-end mb-2 text-white text-2xl font-bold px-4 py-2" onClick={() => setShowCarousel(false)}>&times;</button>
            <Carousel
              selectedItem={carouselStartIndex}
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              className="w-full max-w-3xl"
            >
              {(chatHistory.filter(m => m.sender === 'bot' && m.visualizations && m.visualizations.length > 0).slice(-1)[0]?.visualizations || []).map((viz, idx) => renderFullChart(viz, idx)).filter(Boolean)}
            </Carousel>
          </div>
        </Modal>
      </div>

      <form onSubmit={onSubmit} className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700 p-4">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your data..."
            className="w-full h-20 p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            style={{ minHeight: '5rem' }}
          />
          <div className="absolute bottom-2 right-2 flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="auto">Auto-detect</option>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="scatter">Scatter Plot</option>
            </select>
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatBot