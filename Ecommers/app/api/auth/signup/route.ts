import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User.model";

// Handle POST requests that create a new user.
export async function POST(request: NextRequest) {
  try {
    //  Ensure we are connected to MongoDB before making any queries.
    await connectMongoDB();
    console.log("hello");
    //  Read the data that the client sent in the request body.
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 }
      );
    }

    //  Check if the email already exists in the database.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // Securely hash the user's password before storing it.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //  Save the new user in MongoDB.
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //  Return a success response to the client.
    return NextResponse.json(
      {
        message: "Signup successful! You can now log in.",
        userId: createdUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the user." },
      { status: 500 }
    );
  }
}
