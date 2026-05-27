import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/enquiries - Fetch all contact/service enquiries (Protected)
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
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("GET Enquiries Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

// POST /api/enquiries - Create a new enquiry (Public)
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, service choice, and message are required" },
        { status: 400 }
      );
    }

    const newEnquiry = await Enquiry.create({
      firstName,
      lastName,
      email,
      phone: phone || "",
      service,
      message,
    });

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    console.error("POST Enquiry Error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
