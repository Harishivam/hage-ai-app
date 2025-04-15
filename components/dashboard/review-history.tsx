'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Review {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  date: string;
  source?: string;
}

interface ReviewHistoryProps {
  reviews: Review[];
}

export function ReviewHistory({ reviews }: ReviewHistoryProps) {
  const getSentimentColor = (sentiment: Review['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-500';
      case 'negative':
        return 'bg-red-500/10 text-red-500';
      case 'neutral':
        return 'bg-yellow-500/10 text-yellow-500';
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Review</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="max-w-[300px] truncate">
                {review.text}
              </TableCell>
              <TableCell>
                {review.source ? (
                  <Link 
                    href={review.source}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    View Source
                  </Link>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getSentimentColor(review.sentiment)}
                >
                  {review.sentiment}
                </Badge>
              </TableCell>
              <TableCell>{(review.confidence * 100).toFixed(1)}%</TableCell>
              <TableCell>{review.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}