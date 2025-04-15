// This script performs various checks to ensure the backend is set up correctly
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 HAGE-AI Backend Setup Verification\n");

// Check for required environment variables
console.log("1️⃣ Checking environment variables...");
try {
  const envFile = fs.readFileSync(".env.local", "utf8");

  const requiredVars = [
    "MONGODB_URI",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "OPENAI_API_KEY",
  ];

  const missingVars = [];

  for (const envVar of requiredVars) {
    if (!envFile.includes(`${envVar}=`)) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    console.log(
      "❌ Missing required environment variables:",
      missingVars.join(", ")
    );
    console.log("➡️ Please add these variables to your .env.local file");
  } else {
    console.log("✅ All required environment variables found");
  }
} catch (error) {
  console.log("❌ .env.local file not found");
  console.log(
    "➡️ Create a .env.local file with the required environment variables"
  );
}

// Check MongoDB connection
console.log("\n2️⃣ Checking MongoDB...");
try {
  console.log("Attempting to verify if MongoDB is installed...");

  try {
    const mongoVersion = execSync("mongod --version", {
      stdio: "pipe",
    }).toString();
    console.log("✅ MongoDB is installed:", mongoVersion.split("\n")[0]);
  } catch (error) {
    console.log("❌ MongoDB not found on system path");
    console.log(
      "➡️ Make sure MongoDB is installed and added to your system PATH"
    );
  }

  console.log("Running MongoDB connection test...");
  console.log("(This will validate the connection string in .env.local)");
  console.log(
    "➡️ You can manually run this test with: node lib/db/test-connection.js"
  );
} catch (error) {
  console.log("❌ Error checking MongoDB:", error.message);
}

// Check required packages
console.log("\n3️⃣ Checking required packages...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  const requiredPackages = ["mongoose", "next-auth", "bcrypt", "openai"];

  const missingPackages = [];

  for (const pkg of requiredPackages) {
    if (!packageJson.dependencies[pkg]) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log("❌ Missing required packages:", missingPackages.join(", "));
    console.log(
      `➡️ Install missing packages: npm install ${missingPackages.join(" ")}`
    );
  } else {
    console.log("✅ All required packages are installed");
  }
} catch (error) {
  console.log("❌ Error checking package.json:", error.message);
}

// Check essential files
console.log("\n4️⃣ Checking essential files...");
const essentialFiles = [
  "lib/db/mongodb.ts",
  "lib/models/User.ts",
  "lib/models/Analysis.ts",
  "app/api/analysis/route.ts",
  "app/api/analysis/[id]/route.ts",
  "app/api/auth/[...nextauth]/route.ts",
];

const missingFiles = [];

for (const file of essentialFiles) {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.log("❌ Missing essential files:", missingFiles.join(", "));
} else {
  console.log("✅ All essential files exist");
}

console.log("\n✨ Setup verification complete");
console.log("Run your Next.js application with: npm run dev");
console.log("Watch the server logs for detailed debugging information");
