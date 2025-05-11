import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-crypto-border bg-crypto-card">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute bottom-3 left-3 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything..."
          disabled={isLoading}
          className="w-full bg-crypto-background border border-crypto-border rounded-full py-2 pl-10 pr-14 focus:outline-none focus:border-crypto-purple disabled:opacity-50"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !message.trim()}
          className="absolute right-1 bottom-1 rounded-full h-8 w-8 p-0 bg-crypto-purple hover:bg-purple-600 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 transform">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </Button>
      </form>
      <div className="mt-2 text-xs text-muted-foreground text-center">
        Press Enter to send your message
      </div>
    </div>
  );
};

export default ChatInput;
