export interface Review {
  id: string;
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  date: string;
  source?: string; // URL source of the review
  fileId?: string;
}

export interface ReviewAnalysis {
  sentiment: Review["sentiment"];
  confidence: number;
}

export interface FileAnalysis {
  id: string;
  name: string;
  reviews: Review[];
  stats: {
    totalReviews: number;
    averageSentiment: string;
    sentimentDistribution: Array<{
      name: string;
      value: number;
      count: number;
    }>;
  };
}