// This file handles interactions with social media platforms
// You'll need to install appropriate packages for each platform

type SocialMediaPlatform = "youtube" | "instagram" | "twitter";

interface Comment {
  text: string;
  author?: string;
  date?: string;
  likes?: number;
}

// Detect the social media platform from the URL
export function detectPlatform(url: string): SocialMediaPlatform {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  } else if (url.includes("instagram.com")) {
    return "instagram";
  } else if (url.includes("twitter.com") || url.includes("x.com")) {
    return "twitter";
  }
  throw new Error("Unsupported social media platform");
}

// Extract video/post ID from different platforms
export function extractId(url: string, platform: SocialMediaPlatform): string {
  switch (platform) {
    case "youtube": {
      // Extract YouTube video ID
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[7].length === 11 ? match[7] : "";
    }
    case "instagram": {
      // Extract Instagram post ID - simplified version
      const parts = url.split("/");
      return parts[parts.length - 2] || parts[parts.length - 1] || "";
    }
    case "twitter": {
      // Extract Twitter tweet ID - simplified version
      const parts = url.split("/");
      return parts[parts.length - 1] || "";
    }
    default:
      return "";
  }
}

// Fetch comments from social media platforms
// This is a mock implementation for now
export async function fetchComments(url: string): Promise<Comment[]> {
  try {
    const platform = detectPlatform(url);
    const id = extractId(url, platform);

    // This would be replaced with actual API calls in production
    // For now, we'll return mock data
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

    // Return mock comments
    return generateMockComments(platform, 15);
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// Generate mock comments for development
function generateMockComments(
  platform: SocialMediaPlatform,
  count: number
): Comment[] {
  const positiveComments = [
    "This is amazing! Absolutely love it.",
    "Great content, very helpful!",
    "I've been looking for this for ages. Thank you!",
    "The quality is excellent, very impressed.",
    "This is exactly what I needed, perfect!",
    "Love the attention to detail here. Amazing work!",
    "This is by far the best one I've seen. Great job!",
  ];

  const negativeComments = [
    "Not what I expected, quite disappointed.",
    "This could have been better honestly.",
    "I found several issues with this.",
    "The quality is lacking in my opinion.",
    "This didn't solve my problem at all.",
    "I regret spending time on this.",
    "There are much better alternatives available.",
  ];

  const neutralComments = [
    "Interesting approach, I have some questions though.",
    "It's okay, but could use some improvements.",
    "This seems standard, nothing special.",
    "I'm not sure if this is the right solution for me.",
    "I have mixed feelings about this.",
    "It works, but there are some limitations.",
    "It does what it claims, nothing more nothing less.",
  ];

  const allComments = [
    ...positiveComments,
    ...neutralComments,
    ...negativeComments,
  ];

  return Array.from({ length: count }, (_, i) => {
    const randomComment =
      allComments[Math.floor(Math.random() * allComments.length)];
    return {
      text: randomComment,
      author: `User${Math.floor(Math.random() * 1000)}`,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ).toISOString(),
      likes: Math.floor(Math.random() * 100),
    };
  });
}
