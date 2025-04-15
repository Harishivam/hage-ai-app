// This script creates a test user in the database
// Run with: node scripts/seed-user.js

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const { hash } = require("bcrypt");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Hage_AI";

// Define User schema for this script
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

async function seedUser() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    console.log("Checking if test user already exists...");
    const existingUser = await User.findOne({ email: "test@example.com" });

    if (existingUser) {
      console.log("Test user already exists:", existingUser._id);
      return existingUser;
    }

    console.log("Creating test user...");
    // In a production app, you would hash the password
    // const hashedPassword = await hash('password123', 10);

    // For simplicity in development, using plain text password
    const hashedPassword = "password123";

    const newUser = new User({
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Test user created successfully:", newUser._id);
    return newUser;
  } catch (error) {
    console.error("Error seeding user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Execute the function
seedUser();
