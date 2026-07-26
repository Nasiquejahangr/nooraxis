import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/settings - Fetch contact settings (public)
export async function GET() {
  try {
    await connectToDatabase();
    const setting = await Setting.findOne({});
    if (!setting) {
      // If no settings document exists, create one with default values
      const created = await Setting.create({});
      return NextResponse.json(created);
    }
    return NextResponse.json(setting);
  } catch (error) {
    console.error("GET Settings Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

// POST /api/settings - Update contact settings (protected)
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
    const { phone, email, address, registrationDate, whatsapp } = body;
    // Basic validation (allow partial update)
    const update: any = {};
    if (phone !== undefined) update.phone = phone;
    if (email !== undefined) update.email = email;
    if (address !== undefined) update.address = address;
    if (registrationDate !== undefined)
      update.registrationDate = registrationDate;
    if (whatsapp !== undefined) update.whatsapp = whatsapp;

    const updated = await Setting.findOneAndUpdate({}, update, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("POST Settings Error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
