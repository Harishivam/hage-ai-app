import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Analysis from "@/lib/models/Analysis";
import { fetchComments } from "@/lib/services/social-media-service";
import { analyzeSentiment, generateSummary } from "@/lib/services/ai-service";
import { detectPlatform } from "@/lib/services/social-media-service";

// POST /api/analysis - Create a new analysis
export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/analysis - Starting...");
    const body = await req.json();
    const { url } = body;
    console.log("Request payload:", { url });

    if (!url) {
      console.log("Missing URL parameter");
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      // Connect to the database
      console.log("Connecting to database...");
      await connectToDatabase();
      console.log("Database connection successful");

      // Detect platform
      console.log("Detecting platform for URL:", url);
      const sourceType = detectPlatform(url);
      console.log("Platform detected:", sourceType);

      // Create a new analysis record
      console.log("Creating new analysis record...");
      const analysis = await Analysis.create({
        source: url,
        sourceType,
        status: "processing",
      });
      console.log("Analysis record created with ID:", analysis._id);

      // Start processing in the background
      console.log("Starting background processing...");
      processAnalysis(analysis._id.toString(), url);

      return NextResponse.json({
        success: true,
        message: "Analysis started",
        analysisId: analysis._id,
      });
    } catch (dbError: any) {
      console.error("Database operation failed:", dbError);
      return NextResponse.json(
        {
          error: "Database operation failed",
          details: dbError.message,
          stack:
            process.env.NODE_ENV === "development" ? dbError.stack : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// GET /api/analysis - Get all analyses
export async function GET(req: NextRequest) {
  try {
    console.log("GET /api/analysis - Starting...");

    // Connect to the database
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Database connection successful");

    // Get analyses (in a real app, you'd add pagination and filtering)
    console.log("Fetching analyses...");
    const analyses = await Analysis.find({}).sort({ createdAt: -1 }).limit(20);
    console.log(`Found ${analyses.length} analyses`);

    return NextResponse.json({
      success: true,
      data: analyses,
    });
  } catch (error: any) {
    console.error("Error fetching analyses:", error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// Background processing function
async function processAnalysis(analysisId: string, url: string) {
  try {
    console.log(`Starting analysis for ${url} (ID: ${analysisId})`);

    // Fetch comments from social media
    console.log("Fetching comments...");
    const comments = await fetchComments(url);
    console.log(`Fetched ${comments.length} comments`);

    // Process each comment
    console.log("Processing comments...");
    const processedComments = [];
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    // Collect all aspects for summary
    const aspectCounts: Record<
      string,
      { count: number; positiveCount: number; negativeCount: number }
    > = {};

    for (const comment of comments) {
      // Analyze sentiment
      const analysis = await analyzeSentiment(comment.text);

      // Add to processed comments
      processedComments.push({
        text: comment.text,
        sentiment: analysis.sentiment,
        confidence: analysis.confidence,
        aspects: analysis.aspects,
      });

      // Count sentiments
      if (analysis.sentiment === "positive") positiveCount++;
      else if (analysis.sentiment === "negative") negativeCount++;
      else neutralCount++;

      // Count aspects
      for (const aspect of analysis.aspects) {
        if (!aspectCounts[aspect.name]) {
          aspectCounts[aspect.name] = {
            count: 0,
            positiveCount: 0,
            negativeCount: 0,
          };
        }

        aspectCounts[aspect.name].count++;

        if (aspect.sentiment === "positive") {
          aspectCounts[aspect.name].positiveCount++;
        } else if (aspect.sentiment === "negative") {
          aspectCounts[aspect.name].negativeCount++;
        }
      }
    }

    console.log("Comment analysis complete");
    console.log(
      `Sentiment counts: Positive=${positiveCount}, Negative=${negativeCount}, Neutral=${neutralCount}`
    );

    // Determine overall sentiment
    let overallSentiment: "positive" | "negative" | "neutral" = "neutral";
    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      overallSentiment = "positive";
    } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
      overallSentiment = "negative";
    }

    // Calculate confidence score (simplified)
    const confidenceScore =
      Math.round(
        (Math.max(positiveCount, negativeCount, neutralCount) /
          comments.length) *
          100
      ) / 100;

    // Convert aspects to the format we need
    const aspectAnalysis = Object.entries(aspectCounts).map(([name, data]) => {
      let sentiment = "neutral";
      if (data.positiveCount > data.negativeCount) sentiment = "positive";
      if (data.negativeCount > data.positiveCount) sentiment = "negative";

      return {
        aspect: name,
        sentiment,
        count: data.count,
      };
    });

    // Generate a summary
    console.log("Generating summary...");
    const commentTexts = comments.map((c) => c.text);
    const summary = await generateSummary(commentTexts);

    // Update the analysis record
    console.log("Updating analysis record with results...");
    await connectToDatabase(); // Ensure connection is established
    const updatedAnalysis = await Analysis.findByIdAndUpdate(
      analysisId,
      {
        status: "completed",
        comments: processedComments,
        results: {
          overallSentiment,
          confidenceScore,
          aspectAnalysis,
          summary,
          commentCount: comments.length,
        },
      },
      { new: true } // Return the updated document
    );

    console.log("Analysis completed successfully:", updatedAnalysis?._id);
  } catch (error: any) {
    console.error("Error processing analysis:", error);

    try {
      // Update the analysis with error
      console.log("Updating analysis record with error status...");
      await connectToDatabase();
      await Analysis.findByIdAndUpdate(analysisId, {
        status: "failed",
        error: error.message || "Unknown error occurred",
      });
      console.log("Analysis marked as failed");
    } catch (updateError) {
      console.error(
        "Failed to update analysis with error status:",
        updateError
      );
    }
  }
}
