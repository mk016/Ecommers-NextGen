import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { generateToken } from "@/lib/jwt";

//  Handle POST requests that log a user in.
export async function POST(request: NextRequest) {
  try {
    //  Make sure we are connected to the database.
    await connectMongoDB();
    console.log("helellajdfklajsdfkl;jadsfl;kajdsf;lkjasfk;j");
    //  Read the email and password sent from the client.
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    //  Find the user by email in MongoDB.
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Account not found. Please sign up first." },
        { status: 404 }
      );
    }

    //  Compare the provided password with the stored hash.
    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    });
    console.log(token);
    //  Return a success response. You can add JWT/cookies here later.
    return NextResponse.json(
      {
        message: "Login successful!",
        token,
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong while logging in." },
      { status: 500 }
    );
  }
}
