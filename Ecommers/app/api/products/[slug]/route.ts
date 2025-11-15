// app/api/products/[slug]/route.ts

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Products } from "@/models/products.model";
import { Category } from "@/models/categoires.model";
import { SubCategory } from "@/models/subcategoires.model";

// params se slug aayega (URL me jo [slug] hai)
interface ParamsType {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/products/some-product-slug
export async function GET(_request: Request, { params }: ParamsType) {
  try {
    const { slug } = await params;

    // Step 1: DB connect
    await connectMongoDB();

    // Step 2: Product find by slug
    const product = await Products.findOne({ slug })
      .populate("category")
      .populate("subCategory");

    // agar product hi nahi mila
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    // Step 3: Response
    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error while fetching product:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

