import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

interface PromptItem {
  id: string;
  text: string;
}

interface SectionProps {
  title: string;
  items: PromptItem[];
}

const PromptSection: React.FC<SectionProps> = ({ title, items }) => (
  <div className="mt-6">
    <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-2 p-2 rounded-md hover:bg-crypto-card cursor-pointer group"
        >
          <div className="mt-1 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="17" y1="18" x2="3" y2="18"></line>
            </svg>
          </div>
          <span className="text-sm truncate">{item.text}</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Sidebar = () => {
  const today = [
    { id: '1', text: 'What are the key differences between Bitcoin and Ethereum?' },
    { id: '2', text: 'Explain the concept of decentralized finance.' },
    { id: '3', text: 'How does blockchain technology work?' },
    { id: '4', text: 'What are the risks and rewards of crypto investing?' }
  ];
  
  const yesterday = [
    { id: '5', text: 'What is a non-fungible token?' },
    { id: '6', text: 'How can I securely store my cryptocurrencies?' },
    { id: '7', text: 'What are the different types of blockchain consensus?' },
    { id: '8', text: 'What is the future of cryptocurrency regulation?' },
    { id: '9', text: 'How does cryptocurrency mining work?' }
  ];

  return (
    <div className="w-64 flex flex-col h-screen border-r border-gray-600 bg-[#0e0f16]">
      <div className="p-4">
        <Button className="w-full bg-[#1a1b25] hover:bg-crypto-card-hover flex gap-2 justify-start border border-crypto-border">
          <Plus className="h-4 w-4" />
          <span>New chat</span>
        </Button>
        <div className="mt-4 relative bg-[#1a1b25]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-9 bg-crypto-card border-crypto-border"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Prompt History</h2>
          <button className="text-red-500 hover:text-red-400 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        </div>
        
        <PromptSection title="Today" items={today} />
        <PromptSection title="Yesterday" items={yesterday} />
      </div>
      
      <div className="p-4 border-t border-crypto-border bg-gradient-to-t from-crypto-card to-crypto-background mt-auto">
        <div className="rounded-lg bg-crypto-card border border-crypto-border p-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-transparent"></div>
          <h3 className="font-semibold">Professional Plan</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Get prompt to biggest models with highest quality
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs font-medium">Upgrade</span>
            <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
