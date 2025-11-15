import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import { SubCategory } from "@/models/subcategoires.model";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category") || undefined;

    const filter: Record<string, unknown> = {};
    if (categoryId) {
      if (!isValidObjectId(categoryId)) {
        return NextResponse.json(
          { message: "Invalid category id" },
          { status: 400 }
        );
      }
      filter.category = categoryId;
    }

    const subCategories = await SubCategory.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json(subCategories);
  } catch (error) {
    console.error("Fetch Subcategories Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
