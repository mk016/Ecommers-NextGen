// app/api/admin/products/[id]/route.ts

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Products } from "@/models/products.model";

interface ParamsType {
  params: Promise<{
    id: string;
  }>;
}

// GET - single admin product (prefill form ke liye)
export async function GET(_req: Request, { params }: ParamsType) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const product = await Products.findById(id)
      .populate("category")
      .populate("subCategory");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    console.error("Admin product GET(id) error:", error);
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

// PUT - update product
export async function PUT(request: Request, { params }: ParamsType) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const body = await request.json();

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      body,
      { new: true } // updated document return karega
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin product PUT error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - remove product
export async function DELETE(_req: Request, { params }: ParamsType) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin product DELETE error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
