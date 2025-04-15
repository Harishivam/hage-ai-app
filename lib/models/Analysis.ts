import mongoose, { Schema, Document } from "mongoose";

export interface IAnalysis extends Document {
  userId?: mongoose.Types.ObjectId;
  source: string;
  sourceType: "youtube" | "instagram" | "twitter" | "csv";
  title?: string;
  createdAt: Date;
  status: "pending" | "processing" | "completed" | "failed";
  error?: string;
  results?: {
    overallSentiment: "positive" | "negative" | "neutral";
    confidenceScore: number;
    aspectAnalysis: Array<{
      aspect: string;
      sentiment: string;
      count: number;
    }>;
    summary: string;
    commentCount: number;
  };
  comments: Array<{
    text: string;
    sentiment: string;
    confidence: number;
    aspects: Array<{
      name: string;
      sentiment: string;
    }>;
  }>;
}

const AnalysisSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  source: { type: String, required: true },
  sourceType: {
    type: String,
    enum: ["youtube", "instagram", "twitter", "csv"],
    required: true,
  },
  title: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending",
  },
  error: String,
  results: {
    overallSentiment: {
      type: String,
      enum: ["positive", "negative", "neutral"],
    },
    confidenceScore: Number,
    aspectAnalysis: [
      {
        aspect: String,
        sentiment: String,
        count: Number,
      },
    ],
    summary: String,
    commentCount: Number,
  },
  comments: [
    {
      text: String,
      sentiment: String,
      confidence: Number,
      aspects: [
        {
          name: String,
          sentiment: String,
        },
      ],
    },
  ],
});

export default mongoose.models.Analysis ||
  mongoose.model<IAnalysis>("Analysis", AnalysisSchema);
