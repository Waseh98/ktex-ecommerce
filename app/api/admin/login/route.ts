import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Normalized credentials
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "password123";

    if (username?.trim().toLowerCase() === ADMIN_USERNAME && password?.trim() === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Setting cookie directly on the response object for better compatibility
      response.cookies.set("admin_token", "ktex-authenticated-admin-session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
        sameSite: "lax"
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
