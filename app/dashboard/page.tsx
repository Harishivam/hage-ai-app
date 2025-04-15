"use client";

import { StatsOverview } from "@/components/dashboard/stats-overview";
import { AnalysisSection } from "@/components/dashboard/analysis-section";
import { ReviewSection } from "@/components/dashboard/review-section";
import { Footer } from "@/components/layout/footer";
import { DashboardHead } from "@/components/layout/dashboard-head";
import { useReviewAnalysis } from "@/lib/hooks/use-review-analysis";
import { FileSelector } from "@/components/dashboard/file-selector";
import { Card } from "@/components/ui/card";
import { Bot, MessagesSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const {
    currentAnalysis,
    isAnalyzing,
    analyzeCsv,
    analyzeSocialMedia,
    reviews,
    stats,
    fileAnalyses,
    currentFileId,
    setCurrentFileId,
  } = useReviewAnalysis();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHead />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <FileSelector
            files={fileAnalyses}
            currentFileId={currentFileId}
            onFileSelect={setCurrentFileId}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StatsOverview
              totalReviews={stats.totalReviews}
              averageSentiment={stats.averageSentiment}
            />
            <AnalysisSection
              currentAnalysis={currentAnalysis}
              onCsvUpload={analyzeCsv}
              onSocialMediaSubmit={analyzeSocialMedia}
              chartData={stats.sentimentDistribution}
              isAnalyzing={isAnalyzing}
            />
            <ReviewSection reviews={reviews} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">AI Assistant</h2>
                    <p className="text-sm text-muted-foreground">Your analysis companion</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm bg-muted rounded-lg p-3">
                        I can help you analyze your social media comments and provide insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <MessagesSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm bg-muted rounded-lg p-3">
                        Ask me questions about sentiment trends, common themes, or specific aspects of your comments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Ask me anything about your comments..."
                    className="bg-muted border-none"
                  />
                  <Button className="w-full">
                    Ask AI Assistant
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}