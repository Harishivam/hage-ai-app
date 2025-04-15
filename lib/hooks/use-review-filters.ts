'use client';

import { useState, useMemo } from 'react';
import { Review } from '@/lib/types/review';
import type { ReviewFilters } from '@/components/dashboard/review-filters';

export function useReviewFilters(reviews: Review[]) {
  const [filters, setFilters] = useState<ReviewFilters>({
    search: '',
    sentiment: 'all',
    status: 'all',
  });

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Search filter
      const matchesSearch = !filters.search || 
        review.text.toLowerCase().includes(filters.search.toLowerCase());
      
      // Sentiment filter
      const matchesSentiment = filters.sentiment === 'all' || 
        review.sentiment === filters.sentiment.toLowerCase();
      
      // Status filter
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'fake' ? review.isFake : !review.isFake);

      return matchesSearch && matchesSentiment && matchesStatus;
    });
  }, [reviews, filters]);

  return {
    filters,
    setFilters,
    filteredReviews,
  };
}