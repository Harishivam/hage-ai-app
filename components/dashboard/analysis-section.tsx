'use client';

import { CSVUpload } from './csv-upload';
import { AnalysisDetails } from './analysis-details';
import { SentimentChart } from './sentiment-chart';
import { SocialMediaInput } from './social-media-input';
import type { ReviewAnalysis } from '@/lib/types/review';
import { Card } from '@/components/ui/card';

interface AnalysisSectionProps {
  currentAnalysis: ReviewAnalysis | null;
  onCsvUpload: (file: File) => Promise<void>;
  onSocialMediaSubmit: (url: string) => Promise<void>;
  chartData: Array<{ name: string; value: number; count: number }>;
  isAnalyzing: boolean;
}

export function AnalysisSection({
  currentAnalysis,
  onCsvUpload,
  onSocialMediaSubmit,
  chartData,
  isAnalyzing,
}: AnalysisSectionProps) {
  return (
    <div className="space-y-8 mb-8">
      <Card className="p-6">
        <div className="flex gap-4">
          <CSVUpload onUpload={onCsvUpload} isAnalyzing={isAnalyzing} />
          <SocialMediaInput onSubmit={onSocialMediaSubmit} isLoading={isAnalyzing} />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {currentAnalysis && <AnalysisDetails analysis={currentAnalysis} />}
        </div>
        <div className="lg:col-span-2">
          <SentimentChart data={chartData} />
        </div>
      </div>
    </div>
  );
}