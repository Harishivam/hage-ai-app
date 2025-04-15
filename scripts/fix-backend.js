// This script runs all necessary fixes to make the backend work
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("📋 HAGE-AI Backend Fix Script\n");

function runCommand(command, description) {
  console.log(`Running: ${description}`);
  try {
    const output = execSync(command, { stdio: "inherit" });
    console.log("✅ Command completed successfully\n");
    return true;
  } catch (error) {
    console.error("❌ Command failed:", error.message);
    return false;
  }
}

// Check if MongoDB is installed
console.log("1️⃣ Checking for MongoDB installation...");
try {
  execSync("mongod --version", { stdio: "pipe" });
  console.log("✅ MongoDB is installed\n");
} catch (error) {
  console.log("❌ MongoDB is not installed or not in PATH");
  console.log(
    "❗ Please install MongoDB: https://www.mongodb.com/try/download/community\n"
  );
}

// Install required dependencies
console.log("2️⃣ Installing required dependencies...");
runCommand(
  "npm install mongoose next-auth bcrypt openai dotenv socket.io socket.io-client",
  "Installing backend dependencies"
);

// Create directories if needed
console.log("3️⃣ Creating any missing directories...");
const directories = [
  "lib/db",
  "scripts",
  "app/api/analysis",
  "app/api/analysis/[id]",
  "app/api/auth/[...nextauth]",
];

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});
console.log("✅ Directories checked/created\n");

// Run setup checks
console.log("4️⃣ Running setup checks...");
runCommand("npm run setup", "Setup checks");

// Test database connection
console.log("5️⃣ Testing database connection...");
runCommand("npm run db:test", "Database connection test");

// Seed test user
console.log("6️⃣ Creating test user in database...");
runCommand("npm run db:seed", "Database user seeding");

console.log("\n🎉 Backend fix process completed!");
console.log("You can now run the application with: npm run dev");
console.log("\nIf you still encounter issues:");
console.log("1. Make sure MongoDB is running");
console.log(
  "2. Check that your .env.local file has the correct environment variables"
);
console.log("3. Review the logs for detailed error messages");
