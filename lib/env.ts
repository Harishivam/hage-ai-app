export const env = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/Hage_AI",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "your-development-secret",

  // Add other environment variables as needed
};
