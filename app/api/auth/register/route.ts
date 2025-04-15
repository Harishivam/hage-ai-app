import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import { hash } from "bcrypt";
import { z } from "zod";

// Define validation schema for registration data
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/auth/register - Starting...");

    // Parse and validate request body
    const body = await req.json();

    console.log("Validating registration data...");
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.errors);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, password, name } = validationResult.data;

    // Connect to database
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Database connection successful");

    // Check if user already exists
    console.log("Checking if user already exists:", email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    console.log("Hashing password...");
    const hashedPassword = await hash(password, 10);

    // Create the user
    console.log("Creating new user:", email);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log("User created successfully:", user._id);

    // Return success response (without exposing the password)
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Registration failed",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
