// app/api/products/route.ts

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Products } from "@/models/products.model";
import { Category } from "@/models/categoires.model";
import { SubCategory } from "@/models/subcategoires.model";

// ye function GET request handle karega: /api/products
export async function GET(request: Request) {
  try {
    // 🔗 Step 1: Database connect karo
    await connectMongoDB();

    // 🔍 Step 2: Query params handle (optional) – search, category, etc.
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || ""; // e.g. /api/products?search=shoes

    // Simple filter: agar search diya hai to title par filter
    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 🧠 Step 3: Products find karo (category/subCategory populate bhi kar sakte hain)
    const products = await Products.find(query)
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 }); // latest products first

    // ✅ Step 4: Response bhejo
    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error while fetching products:", error);

    // ❌ Error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
