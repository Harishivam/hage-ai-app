"use client";

import { ReviewAnalysis } from "@/lib/types/review";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeReviewText(text: string): Promise<ReviewAnalysis> {
  await delay(1000); // Simulate API call

  // Simple sentiment analysis based on keywords
  const positiveWords = [
    "great",
    "good",
    "excellent",
    "amazing",
    "love",
    "perfect",
    "awesome",
    "fantastic",
    "wonderful",
    "happy",
    "pleased",
    "satisfied",
    "recommend",
    "helpful",
    "impressed",
  ];
  const negativeWords = [
    "bad",
    "poor",
    "terrible",
    "awful",
    "hate",
    "worst",
    "disappointed",
    "horrible",
    "useless",
    "waste",
    "unhappy",
    "frustrated",
    "annoyed",
    "avoid",
    "never",
    "regret",
  ];

  const words = text.toLowerCase().split(" ");
  const positiveCount = words.filter((word) =>
    positiveWords.includes(word)
  ).length;
  const negativeCount = words.filter((word) =>
    negativeWords.includes(word)
  ).length;

  let sentiment: ReviewAnalysis["sentiment"] = "neutral";
  if (positiveCount > negativeCount) sentiment = "positive";
  if (negativeCount > positiveCount) sentiment = "negative";

  return {
    sentiment,
    confidence: 0.7 + Math.random() * 0.3, // Random confidence between 0.7 and 1.0
  };
}

export async function analyzeCsvFile(
  file: File
): Promise<{ analyses: ReviewAnalysis[]; texts: string[] }> {
  const text = await file.text();
  const lines = text.split("\n").filter((line) => line.trim());

  // Skip header row if present
  const reviews = lines.slice(1);

  const analyses = await Promise.all(
    reviews.map(async (review) => {
      return analyzeReviewText(review);
    })
  );

  return {
    analyses,
    texts: reviews,
  };
}

export async function analyzeSocialMediaUrl(
  url: string
): Promise<{ analysis: ReviewAnalysis; text: string }> {
  await delay(1500); // Simulate API call

  // Simulate fetching and analyzing social media content
  const mockText = "This is a simulated social media post content. It's great!";
  const analysis = await analyzeReviewText(mockText);

  return {
    analysis,
    text: mockText,
  };
}