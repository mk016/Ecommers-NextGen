// import { connectMongoDB } from "@/lib/mongodb";
// import { Products } from "@/models/products.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     await connectMongoDB();
//     const data = await req.json();
//     const newProduct = await Products.create(data);
//     return NextResponse.json(newProduct, { status: 201 });
//   } catch (error) {
//     console.error("Add Product Error:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }

// app/api/admin/products/add/route.ts

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Products } from "@/models/products.model";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    // Request body ko parse karna
    const body = await request.json();
    const {
      title,
      price,
      Displayprice,
      discription,
      Tgags,
      isHighlights,
      images,
      slug,
      stock,
      category,
      subCategory,
    } = body;

    // Basic validation (simple rakha hai)
    if (
      !title ||
      !price ||
      !Displayprice ||
      !discription ||
      !Tgags ||
      !images ||
      !slug ||
      !category ||
      !subCategory
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        { status: 400 }
      );
    }

    // Naya product create karo
    const newProduct = await Products.create({
      title,
      price,
      Displayprice,
      discription,
      Tgags,
      isHighlights,
      images,
      slug,
      stock: stock || 0,
      category,
      subCategory,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Admin product ADD error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
