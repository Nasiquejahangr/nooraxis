import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/portfolio - Fetch all projects
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET Portfolio Error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 });
  }
}

// POST /api/portfolio - Create a new project (Protected)
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
    const { title, category, desc, tags, image, externalLink, codeLink } = body;

    if (!title || !category || !desc || !tags || !image) {
      return NextResponse.json(
        { error: "Title, category, description, tags, and image are required" },
        { status: 400 }
      );
    }

    const newProject = await Portfolio.create({
      title,
      category,
      desc,
      tags: Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim()),
      image,
      externalLink: externalLink || "",
      codeLink: codeLink || "",
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST Portfolio Error:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
