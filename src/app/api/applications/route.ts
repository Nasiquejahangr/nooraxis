import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/models/Application";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/applications - Fetch all career applications (Protected)
export async function GET() {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const applications = await Application.find({}).sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("GET Applications Error:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

// POST /api/applications - Create a new career application (Public)
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, phone, position, portfolioUrl, resumeUrl, message } = body;

    if (!name || !email || !phone || !position || !resumeUrl) {
      return NextResponse.json(
        { error: "Name, email, phone, position applied, and resume link are required" },
        { status: 400 }
      );
    }

    const newApplication = await Application.create({
      name,
      email,
      phone,
      position,
      portfolioUrl: portfolioUrl || "",
      resumeUrl,
      message: message || "",
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("POST Application Error:", error);
    return NextResponse.json({ error: "Failed to submit job application" }, { status: 500 });
  }
}
