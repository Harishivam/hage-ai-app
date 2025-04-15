'use client';

import { StatsCard } from './stats-card';
import { BarChart3, MessageCircle } from 'lucide-react';

interface StatsOverviewProps {
  totalReviews: number;
  averageSentiment: string;
}

export function StatsOverview({ totalReviews, averageSentiment }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <StatsCard
        title="Total Reviews"
        value={totalReviews}
        icon={<MessageCircle className="h-4 w-4" />}
      />
      <StatsCard
        title="Average Sentiment"
        value={averageSentiment}
        icon={<BarChart3 className="h-4 w-4" />}
      />
    </div>
  );
}