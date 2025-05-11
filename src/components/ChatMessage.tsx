import React from 'react';

interface ChatMessageProps {
  isBot: boolean;
  content: string | React.ReactElement;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, content }) => {
  return (
    <div className="mb-6">
      <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
        {isBot && (
          <div className="h-8 w-8 rounded-full bg-crypto-card border border-[#8b5cf6] flex items-center justify-center mr-3 flex-shrink-0">
            <div className="p-1 bg-[#8b5cf6] rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L21 7.5V16.5L12 21L3 16.5V7.5L12 3Z" fill="white"/>
              </svg>
            </div>
          </div>
        )}

        <div className={`max-w-[80%] p-3 rounded-2xl ${
          isBot 
            ? 'bg-[#1a1b25]' 
            : 'bg-[#1a1b25] text-gray-300'
        }`}>
          {typeof content === 'string' ? (
            <p className="text-sm">{content}</p>
          ) : (
            content
          )}
        </div>

        {!isBot && (
          <div className="h-8 w-8 rounded-full bg-crypto-card border border-crypto-border flex items-center justify-center ml-3 flex-shrink-0">
            <span className="text-sm">👤</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
