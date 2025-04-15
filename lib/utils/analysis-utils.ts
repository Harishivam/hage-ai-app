import type { Review } from "@/lib/types/review";

export function calculateAverageSentiment(reviews: Review[]): string {
  if (reviews.length === 0) return "N/A";

  const sentimentScores = {
    positive: 1,
    neutral: 0,
    negative: -1,
  };

  const totalScore = reviews.reduce(
    (sum, review) => sum + sentimentScores[review.sentiment],
    0
  );

  const averageScore = totalScore / reviews.length;

  if (averageScore > 0.3) return "Positive";
  if (averageScore < -0.3) return "Negative";
  return "Neutral";
}

export function calculateSentimentDistribution(
  reviews: Review[]
): Array<{ name: string; value: number; count: number }> {
  const distribution = [
    { name: "Positive", count: 0, value: 0 },
    { name: "Neutral", count: 0, value: 0 },
    { name: "Negative", count: 0, value: 0 },
  ];

  if (reviews.length === 0) {
    return [];
  }

  // Count occurrences of each sentiment
  reviews.forEach((review) => {
    const index = distribution.findIndex(
      (item) => item.name.toLowerCase() === review.sentiment
    );
    if (index !== -1) {
      distribution[index].count++;
    }
  });

  // Calculate percentages
  const total = reviews.length;
  distribution.forEach((item) => {
    item.value = Math.round((item.count / total) * 100);
  });

  // Only return sentiments with values greater than 0
  return distribution.filter(item => item.count > 0);
}

export function calculateFileStats(reviews: Review[]) {
  return {
    totalReviews: reviews.length,
    averageSentiment: calculateAverageSentiment(reviews),
    sentimentDistribution: calculateSentimentDistribution(reviews),
  };
}