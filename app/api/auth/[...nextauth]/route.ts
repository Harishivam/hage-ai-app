import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import { compare } from "bcrypt";

console.log("Setting up NextAuth...");

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Auth attempt with email:", credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            throw new Error("Email and password are required");
          }

          console.log("Connecting to database for authentication...");
          await connectToDatabase();
          console.log("Database connection successful");

          console.log("Looking up user...");
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log("No user found with email:", credentials.email);
            throw new Error("No user found with this email");
          }
          console.log("User found:", user._id);

          // In a real app, you'd use bcrypt to compare passwords
          // const isPasswordValid = await compare(credentials.password, user.password);

          console.log("Validating password...");
          // For development, using a simpler check
          const isPasswordValid = credentials.password === user.password;

          if (!isPasswordValid) {
            console.log("Invalid password for user:", user._id);
            throw new Error("Invalid password");
          }
          console.log("Password validation successful");

          console.log("Authentication successful for user:", user._id);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Adding user data to JWT for user:", user.id);
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log("Adding user ID to session:", token.id);
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
  debug: process.env.NODE_ENV === "development",
});

console.log("NextAuth setup complete");

export { handler as GET, handler as POST };
