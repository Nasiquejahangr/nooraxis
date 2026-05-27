import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/models/Application";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE /api/applications/[id] - Delete a career application (Protected)
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

    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("DELETE Application Error:", error);
    return NextResponse.json({ error: "Failed to delete job application" }, { status: 500 });
  }
}
