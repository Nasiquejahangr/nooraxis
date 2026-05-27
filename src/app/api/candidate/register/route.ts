import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { createSessionToken, getCandidateCookieName, generateSalt, hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Generate salt and hash
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    // Create candidate user
    const newUser = await User.create({
      name: name.trim(),
      email: sanitizedEmail,
      password: hashedPassword,
      salt,
    });

    // Create session token
    const token = createSessionToken(newUser.email);
    const cookieStore = await cookies();

    // Set candidate cookie
    cookieStore.set(getCandidateCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return NextResponse.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Candidate Registration API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
}
