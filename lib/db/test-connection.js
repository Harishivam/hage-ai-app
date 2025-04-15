// This is a simple script to test MongoDB connection
// Run it with: node lib/db/test-connection.js

const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Hage_AI";

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB!");

    // Create a test document to verify write permissions
    const TestModel = mongoose.model(
      "Test",
      new mongoose.Schema({
        name: String,
        date: { type: Date, default: Date.now },
      })
    );

    const testDoc = new TestModel({ name: "Connection Test" });
    await testDoc.save();
    console.log("Successfully wrote test document to database!");

    // Remove the test document and disconnect
    await TestModel.deleteMany({ name: "Connection Test" });
    await mongoose.disconnect();
    console.log(
      "Connection test completed successfully. Disconnected from MongoDB."
    );

    return true;
  } catch (error) {
    console.error("MongoDB connection test failed:", error);
    return false;
  }
}

// Execute the test
testConnection().then((success) => {
  if (!success) {
    console.log("\nTROUBLESHOOTING TIPS:");
    console.log("1. Make sure MongoDB is installed and running on your system");
    console.log("2. Check that the connection string is correct");
    console.log("3. Verify that the database has proper access permissions");
    console.log("4. If using Atlas, check that your IP is in the allowlist");
  }
  process.exit(success ? 0 : 1);
});
