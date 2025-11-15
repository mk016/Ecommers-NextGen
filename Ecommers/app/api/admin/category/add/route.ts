import { connectMongoDB } from "@/lib/mongodb";
import { Categoire } from "@/models/categoires.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { title, slug, image } = await req.json();

    if (!title || !slug) {
      return NextResponse.json({ message: "Title and slug are required" });
    }
    const newCat = await Categoire.create({ title, slug, image });
    return NextResponse.json(newCat);
  } catch (error) {
    console.error("error Add to Category", error);
  }
}
