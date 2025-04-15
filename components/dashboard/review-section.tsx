'use client';

import { ReviewFilters } from './review-filters';
import { ReviewHistory } from './review-history';
import { useReviewFilters } from '@/lib/hooks/use-review-filters';
import type { Review } from '@/lib/types/review';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  const { filteredReviews, setFilters } = useReviewFilters(reviews);

  return (
    <div className="mb-8">
      <ReviewFilters onFilterChange={setFilters} />
      <div className="h-[400px]"> {/* Fixed height container */}
        <ScrollArea className="h-full rounded-md border">
          {filteredReviews.length > 0 ? (
            <ReviewHistory reviews={filteredReviews} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No reviews match the selected filters
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}