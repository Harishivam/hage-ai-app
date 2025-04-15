# HAGE-AI: Social Media Comments Analysis Platform

HAGE-AI is a powerful tool for analyzing social media comments to extract sentiment, aspects, and valuable insights.

## Backend Setup

### Prerequisites

- Node.js (v16 or newer)
- MongoDB (installed and running)
- NPM packages

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with the following variables:

```
# Database
MONGODB_URI=mongodb://localhost:27017/Hage_AI

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# API Keys
OPENAI_API_KEY=your-openai-api-key
YOUTUBE_API_KEY=your-youtube-api-key
```

3. Run the setup checks to verify your environment:

```bash
npm run setup
```

4. Seed the database with a test user:

```bash
npm run db:seed
```

### Running the Application

Start the development server:

```bash
npm run dev
```

This will start the Next.js application on [http://localhost:3000](http://localhost:3000).

## Troubleshooting

### MongoDB Connection Issues

If you're experiencing MongoDB connection issues:

1. Make sure MongoDB is installed and running:

```bash
mongod --version
```

2. Test the database connection:

```bash
npm run db:test
```

3. Check that the connection string in your `.env.local` file is correct:

```
MONGODB_URI=mongodb://localhost:27017/Hage_AI
```

### API Issues

If the API routes aren't working:

1. Check the server logs for detailed error messages
2. Make sure all environment variables are set correctly
3. Verify that MongoDB is running and accessible

## Login Credentials

After running the seed script, you can log in with:

- Email: test@example.com
- Password: password123

## Architecture

The application uses:

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **AI Services**: OpenAI API for sentiment analysis and summarization

## API Routes

- `POST /api/analysis` - Submit a URL for analysis
- `GET /api/analysis` - Get all analyses
- `GET /api/analysis/[id]` - Get a specific analysis
- `DELETE /api/analysis/[id]` - Delete a specific analysis
