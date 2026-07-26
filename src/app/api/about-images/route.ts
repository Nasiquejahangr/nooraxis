import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import AboutImage from "@/models/AboutImage";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const images = await AboutImage.find({}).sort({ createdAt: 1 }).lean();
    return NextResponse.json(images);
  } catch (error) {
    console.error("GET AboutImages Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about images" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { src } = body;
    if (!src || typeof src !== "string") {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    const created = await AboutImage.create({ src });
    return NextResponse.json(created);
  } catch (error) {
    console.error("POST AboutImages Error:", error);
    return NextResponse.json(
      { error: "Failed to save about image" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { id } = body;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid image id" }, { status: 400 });
    }

    const deleted = await AboutImage.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE AboutImages Error:", error);
    return NextResponse.json(
      { error: "Failed to delete about image" },
      { status: 500 },
    );
  }
}
