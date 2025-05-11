import React, { use, useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import MainChart from '@/components/MainChart';
import MarketInsight from '@/components/MarketInsight';
import DominanceChart from '@/components/DominanceChart';
import TrendingCoins from '@/components/TrendingCoins';
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import CrimeAnalysis from '@/components/CrimeAnalysis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/constant';

interface ChatMessage {
    id: string;
    content: string | React.ReactElement;
    isBot: boolean;
}

interface QueryResult {
    query: string;
    chart: string;
    results: any[];
    chartData: Array<{
        name: string;
        value: number;
    }>;
    error: string | null;
    explanation: string;
}

type ChartType = 'main' | 'market' | 'dominance' | 'trending' | null;
type UserData= {
    "created_at": string
    "email": string
    "id":string
    "table_name":string
    "updated_at":string
}

const Index = () => {
    const user = localStorage.getItem("insight-user") 
    const [userData, setUserData] = useState<UserData|null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState<QueryResult[]>([]);
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            content: 'Tell me about market domination last year?',
            isBot: false
        },
    ]);

    const [activeChart, setActiveChart] = useState<ChartType>(null);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    useEffect(() => {
        console.log("User", user);
        if (!user) {
            console.log("No user found");
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        console.log("User", JSON.parse(user as string));
       try {
        const res = await axios.post(`${API_URL}/users/get-user-data`, {
            email: JSON.parse(user as string)
        });
        console.log("User", res.data.user);
        setUserData(res.data.user)

    
       } catch (error) {
        console.log("Error", error);
        
       }
    }

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;
        
        setIsLoading(true);
        console.log("usr in h", userData)
        // Add user message
        const userMessageId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: userMessageId,
            content,
            isBot: false
        }]);

        try {
            const response = await fetch(`${API_URL}/chat/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userQuery: content,
                    email: userData?.email || "test"
                })
            });

            const data = await response.json();

            if (data.success) {
                // Store chart data if present
                if (data.data.type === 'data_with_chart') {
                    setChartData(data.data.results);
                }

                // Add the response message
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    content: data.data.type === 'data_with_chart' || data.data.type === 'data_no_chart' ? (
                        <CrimeAnalysis
                            analysis={data.data.analysis}
                        />
                    ) : (
                        data.data.message || data.data.explanation || "I'm here to help you analyze your data. Feel free to ask questions about your data, and I'll help you understand it better!"
                    ),
                    isBot: true
                }]);
            } else {
                throw new Error('Failed to get analysis');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content: "Sorry, I encountered an error while processing your request. Please try again.",
                isBot: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChartClick = (chartType: ChartType) => {
        setActiveChart(chartType);
    };

    return (
        <div className="flex h-screen bg-[#0e0f16] text-white overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-auto p-6 grid grid-cols-12 gap-6">
                    {/* Main Chart Area - 8 columns */}
                    <div className="w-[1300px]">
                        <div className="grid h-full">
                           

                            <div className="mt-6">
                                <div className="chat-container h-full w-full">
                                    <div className="space-y-4 px-4">
                                        {messages.map((msg) => (
                                            <ChatMessage
                                                key={msg.id}
                                                isBot={msg.isBot}
                                                content={msg.content}
                                            />
                                        ))}
                                        {isLoading && (
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <div className="animate-bounce">●</div>
                                                <div className="animate-bounce delay-100">●</div>
                                                <div className="animate-bounce delay-200">●</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default Index;
