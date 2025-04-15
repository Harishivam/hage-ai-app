import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  MessageCircle,
  Sparkles,
  Link2,
  BrainCircuit,
  BarChart2,
  Bot,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Social Media Comments Analysis Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Powerful AI-driven analysis to understand social media sentiment,
              extract insights, and make data-driven decisions with confidence.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-5 gap-8">
              <Card className="p-6 hover:shadow-lg transition-all">
                <MessageCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Sentiment Analysis
                </h3>
                <p className="text-muted-foreground">
                  Advanced sentiment analysis to understand emotional tone in
                  social media comments.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <BarChart2 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Aspect Analysis</h3>
                <p className="text-muted-foreground">
                  Detailed analysis of specific aspects mentioned in comments
                  for targeted insights.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <BrainCircuit className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Comments Summarization
                </h3>
                <p className="text-muted-foreground">
                  AI-powered summarization of comments to extract key themes and
                  insights quickly.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <PieChart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Visual Insights</h3>
                <p className="text-muted-foreground">
                  Clear visual representations of your comment analysis with
                  interactive charts.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <Bot className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                <p className="text-muted-foreground">
                  Interactive AI chat to help analyze and understand your social
                  media engagement.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Link2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Connect Your Data
                </h3>
                <p className="text-muted-foreground text-center">
                  Add social media links or upload CSV files with comments
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  AI Analysis
                </h3>
                <p className="text-muted-foreground text-center">
                  Our AI analyzes sentiment, comments summurization and key
                  aspects of each comment
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <PieChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Visual Analysis
                </h3>
                <p className="text-muted-foreground text-center">
                  Get instant visual insights with interactive charts and graphs
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  AI Assistant
                </h3>
                <p className="text-muted-foreground text-center">
                  Chat with our AI for deeper analysis and insights
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 HAGE AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
