import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getCollection() {
  const client = await clientPromise;
  const db = client.db("ktex_ecommerce");
  return db.collection("settings");
}

export async function GET() {
  try {
    const settingsCollection = await getCollection();
    const homepage = await settingsCollection.findOne({ type: "homepage" });
    return NextResponse.json(homepage || {});
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const settingsCollection = await getCollection();
    
    await settingsCollection.updateOne(
      { type: "homepage" },
      { $set: { ...data, type: "homepage" } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update homepage" }, { status: 500 });
  }
}

