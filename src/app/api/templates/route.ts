import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const includeContent = searchParams.get("includeContent") === "true";

    const query: Record<string, any> = { isActive: true };

    if (category && category !== "all") {
      query.category = category;
    }

    let selectFields = "-__v";
    if (!includeContent) {
      selectFields += " -htmlTemplate -cssStyles";
    }

    const templates = await Template.find(query)
      .select(selectFields)
      .sort({ isPremium: 1, name: 1 });

    return NextResponse.json({
      templates,
      success: true,
    });
  } catch (error) {
    console.error("Get templates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // This would typically require admin authentication
    const templateData = await request.json();

    const template = new Template(templateData);
    await template.save();

    return NextResponse.json(
      {
        message: "Template created successfully",
        template,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create template error:", error);
    return NextResponse.json(
      { error: "Failed to create template", success: false },
      { status: 500 }
    );
  }
}
