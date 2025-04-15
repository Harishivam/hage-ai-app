'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ReviewAnalysis } from '@/lib/types/review';

interface AnalysisDetailsProps {
  analysis: ReviewAnalysis;
}

export function AnalysisDetails({ analysis }: AnalysisDetailsProps) {
  const getSentimentColor = (sentiment: ReviewAnalysis['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
        return 'text-yellow-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Sentiment</span>
            <Badge
              variant="secondary"
              className={getSentimentColor(analysis.sentiment)}
            >
              {analysis.sentiment}
            </Badge>
          </div>
          <Progress value={analysis.confidence * 100} className="h-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {(analysis.confidence * 100).toFixed(1)}% confidence
          </p>
        </div>
      </CardContent>
    </Card>
  );
}