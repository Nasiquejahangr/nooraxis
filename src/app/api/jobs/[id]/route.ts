import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/jobs/[id] - Update a job listing (Protected)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const body = await request.json();
    
    const { title, type, location, dept, description, category } = body;

    if (!title || !type || !location || !dept) {
      return NextResponse.json(
        { error: "Title, job type, location, and department are required" },
        { status: 400 }
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        type,
        location,
        dept,
        description: description || "",
        category: category || "Job",
      },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job listing not found" }, { status: 404 });
    }

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("PUT Jobs Error:", error);
    return NextResponse.json({ error: "Failed to update job listing" }, { status: 500 });
  }
}

// DELETE /api/jobs/[id] - Delete a job listing (Protected)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json({ error: "Job listing not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Job listing deleted successfully" });
  } catch (error) {
    console.error("DELETE Jobs Error:", error);
    return NextResponse.json({ error: "Failed to delete job listing" }, { status: 500 });
  }
}
