import { connectMongoDB } from "@/lib/mongodb";
import { Banner } from "@/models/banner.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { image, link } = await req.json();

    if (!image || !link) {
      return NextResponse.json({
        Messagee: "Image or link dono require h bhai",
      });
    }

    if (!image.includes("res.cloudinary.com")) {
      return NextResponse.json(
        {
          message: "invalid images source - only Cloudinary URLs are allowed",
        },
        { status: 400 }
      );
    }

    const newbanner = await Banner.create({ image, link });
    return NextResponse.json(newbanner);
  } catch (error) {
    console.error("POST /api/admin/banner/add ERRORRR", error);
    return NextResponse.json({ message: "serverr errorr " });
  }
}
