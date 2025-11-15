import { connectMongoDB } from "@/lib/mongodb";
import { Banner } from "@/models/banner.model";
import { channel } from "diagnostics_channel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const banner = await Banner.find().sort({ cratedAt: -1 });
    return NextResponse.json(banner);
  } catch (error) {
    console.error("GET /api/admin/banner ERROR", error);
    return NextResponse.json({ Message: "server Error" });
  }
}
