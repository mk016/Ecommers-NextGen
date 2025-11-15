import { NextResponse } from "next/server";
import { SubCategory } from "@/models/subcategoires.model";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { title, slug, image, category } = await req.json();

    if (!title || !slug || !category) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newSub = await SubCategory.create({ title, slug, image, category });
    return NextResponse.json(newSub, { status: 201 });
  } catch (err) {
    console.error("Add Subcategory Error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
