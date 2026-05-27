import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/jobs - Fetch all careers
export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET Jobs Error:", error);
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
}

// POST /api/jobs - Create a new career (Protected)
export async function POST(request: Request) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { title, type, location, dept, description, category } = body;

    if (!title || !type || !location || !dept) {
      return NextResponse.json(
        { error: "Title, job type, location, and department are required" },
        { status: 400 }
      );
    }

    const newJob = await Job.create({
      title,
      type,
      location,
      dept,
      description: description || "",
      category: category || "Job",
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("POST Jobs Error:", error);
    return NextResponse.json({ error: "Failed to create job listing" }, { status: 500 });
  }
}
