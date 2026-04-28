import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const HOMEPAGE_PATH = path.join(process.cwd(), "scratch", "homepage.json");

function getHomepage() {
  if (!fs.existsSync(HOMEPAGE_PATH)) return {};
  return JSON.parse(fs.readFileSync(HOMEPAGE_PATH, "utf8"));
}

function saveHomepage(data: any) {
  fs.writeFileSync(HOMEPAGE_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    return NextResponse.json(getHomepage());
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    saveHomepage(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update homepage" }, { status: 500 });
  }
}
