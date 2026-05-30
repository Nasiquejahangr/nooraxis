import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Offer from "@/models/Offer";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/offers - Fetch the active announcement banner config
export async function GET() {
  try {
    await connectToDatabase();
    let offer = await Offer.findOne({});
    
    // If no offer exists in the DB, return a default inactive fallback config
    if (!offer) {
      offer = {
        text: "Limited Time Offer: Get 20% OFF on All Website Packages",
        buttonText: "Call Now",
        buttonLink: "tel:+919508904653",
        isActive: true,
      };
    }
    
    return NextResponse.json(offer);
  } catch (error) {
    console.error("GET Offers Error:", error);
    return NextResponse.json({ error: "Failed to fetch offers config" }, { status: 500 });
  }
}

// POST /api/offers - Upsert (create or update) the global announcement configuration (Protected)
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
    const { text, buttonText, buttonLink, isActive } = body;

    if (!text) {
      return NextResponse.json({ error: "Announcement text is required" }, { status: 400 });
    }

    // Upsert the single global offer configuration
    const updatedOffer = await Offer.findOneAndUpdate(
      {}, // filter empty to match first document
      {
        text,
        buttonText: buttonText || "Call Now",
        buttonLink: buttonLink || "tel:+919508904653",
        isActive: isActive !== undefined ? isActive : true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(updatedOffer);
  } catch (error) {
    console.error("POST Offers Error:", error);
    return NextResponse.json({ error: "Failed to update offers config" }, { status: 500 });
  }
}
