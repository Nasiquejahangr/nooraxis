import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/portfolio/[id] - Update a project (Protected)
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
    
    const { title, category, desc, tags, image, externalLink, codeLink } = body;

    if (!title || !category || !desc || !tags || !image) {
      return NextResponse.json(
        { error: "Title, category, description, tags, and image are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Portfolio.findByIdAndUpdate(
      id,
      {
        title,
        category,
        desc,
        tags: Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim()),
        image,
        externalLink: externalLink || "",
        codeLink: codeLink || "",
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("PUT Portfolio Error:", error);
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
  }
}

// DELETE /api/portfolio/[id] - Delete a project (Protected)
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

    const deletedProject = await Portfolio.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Portfolio item deleted successfully" });
  } catch (error) {
    console.error("DELETE Portfolio Error:", error);
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
  }
}
