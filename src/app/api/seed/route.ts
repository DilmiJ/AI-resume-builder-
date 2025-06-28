import { NextRequest, NextResponse } from "next/server";
import { seedTemplates } from "@/lib/seed";

export async function POST() {
  try {
    // In production, you might want to add authentication here
    // to prevent unauthorized seeding

    const result = await seedTemplates();

    if (result.success) {
      return NextResponse.json({
        message: result.message,
        success: true,
      });
    } else {
      return NextResponse.json(
        {
          error: result.error,
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Seed API error:", error);
    return NextResponse.json(
      {
        error: "Failed to seed database",
        success: false,
      },
      { status: 500 }
    );
  }
}
