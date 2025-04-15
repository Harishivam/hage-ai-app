import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Analysis from "@/lib/models/Analysis";

// GET /api/analysis/[id] - Get a specific analysis
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`GET /api/analysis/${id} - Starting...`);

    // Connect to the database
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Database connection successful");

    // Find the analysis
    console.log(`Fetching analysis with ID: ${id}`);
    const analysis = await Analysis.findById(id);

    if (!analysis) {
      console.log(`Analysis with ID ${id} not found`);
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 }
      );
    }

    console.log(`Analysis found: ${analysis._id}`);
    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error(`Error fetching analysis ${params.id}:`, error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/analysis/[id] - Delete a specific analysis
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`DELETE /api/analysis/${id} - Starting...`);

    // Connect to the database
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Database connection successful");

    // Find and delete the analysis
    console.log(`Deleting analysis with ID: ${id}`);
    const analysis = await Analysis.findByIdAndDelete(id);

    if (!analysis) {
      console.log(`Analysis with ID ${id} not found`);
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 }
      );
    }

    console.log(`Analysis deleted: ${id}`);
    return NextResponse.json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error: any) {
    console.error(`Error deleting analysis ${params.id}:`, error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
