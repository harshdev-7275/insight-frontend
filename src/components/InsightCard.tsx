import React from 'react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  viewAll?: boolean;
  onViewAll?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  children,
  className,
  viewAll = true,
  onViewAll,
}) => {
  return (
    <div className={cn(
      "bg-crypto-card border border-crypto-border rounded-xl p-4 h-full",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        {viewAll && (
          <button 
            className="text-xs text-muted-foreground hover:text-white transition-colors"
            onClick={onViewAll}
          >
            View All
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default InsightCard;
