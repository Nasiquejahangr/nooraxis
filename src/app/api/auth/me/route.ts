import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(getSessionCookieName());

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = verifySessionToken(tokenCookie.value);

    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      email: payload.email,
    });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
