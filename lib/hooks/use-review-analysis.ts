'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { ReviewAnalysis, Review, FileAnalysis } from '@/lib/types/review';
import { analyzeReviewText, analyzeCsvFile, analyzeSocialMediaUrl } from '@/lib/services/review-service';
import { calculateFileStats } from '@/lib/utils/analysis-utils';

export function useReviewAnalysis() {
  const { toast } = useToast();
  const [currentAnalysis, setCurrentAnalysis] = useState<ReviewAnalysis | null>(null);
  const [fileAnalyses, setFileAnalyses] = useState<FileAnalysis[]>([]);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getCurrentFileAnalysis = () => {
    return currentFileId 
      ? fileAnalyses.find(f => f.id === currentFileId)
      : fileAnalyses[0];
  };

  const analyzeSocialMedia = async (url: string) => {
    try {
      setIsAnalyzing(true);
      const { analysis, text } = await analyzeSocialMediaUrl(url);
      setCurrentAnalysis(analysis);
      
      const newReview: Review = {
        id: Date.now().toString(),
        text,
        sentiment: analysis.sentiment,
        confidence: analysis.confidence,
        date: new Date().toISOString(),
        source: url,
      };

      const fileId = Date.now().toString();
      const newFileAnalysis: FileAnalysis = {
        id: fileId,
        name: 'Social Media Post',
        reviews: [newReview],
        stats: calculateFileStats([newReview]),
      };

      setFileAnalyses(prev => [newFileAnalysis, ...prev]);
      setCurrentFileId(fileId);
      
      toast({
        title: 'Analysis Complete',
        description: 'Social media post has been analyzed successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze social media post',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeCsv = async (file: File) => {
    try {
      setIsAnalyzing(true);
      const { analyses, texts } = await analyzeCsvFile(file);
      
      const newReviews: Review[] = analyses.map((analysis, index) => ({
        id: (Date.now() + index).toString(),
        text: texts[index],
        sentiment: analysis.sentiment,
        confidence: analysis.confidence,
        date: new Date().toISOString(),
      }));

      const fileId = Date.now().toString();
      const newFileAnalysis: FileAnalysis = {
        id: fileId,
        name: file.name,
        reviews: newReviews,
        stats: calculateFileStats(newReviews),
      };

      setFileAnalyses(prev => [newFileAnalysis, ...prev]);
      setCurrentFileId(fileId);
      
      if (analyses.length > 0) {
        setCurrentAnalysis(analyses[0]);
      }
      
      toast({
        title: 'CSV Analysis Complete',
        description: `Analyzed ${analyses.length} reviews successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze CSV file',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentFile = getCurrentFileAnalysis();

  return {
    currentAnalysis,
    isAnalyzing,
    analyzeCsv,
    analyzeSocialMedia,
    reviews: currentFile?.reviews || [],
    stats: currentFile?.stats || {
      totalReviews: 0,
      averageSentiment: 'N/A',
      sentimentDistribution: [],
    },
    fileAnalyses,
    currentFileId,
    setCurrentFileId,
  };
}