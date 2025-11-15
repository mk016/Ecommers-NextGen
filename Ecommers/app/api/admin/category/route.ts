import { NextResponse } from "next/server";
import { Category } from "@/models/categoires.model";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectMongoDB();
    const cats = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(cats);
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  }
}
