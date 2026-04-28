import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REVIEWS_PATH = path.join(process.cwd(), "scratch", "reviews.json");

function getReviews() {
  if (!fs.existsSync(REVIEWS_PATH)) return [];
  return JSON.parse(fs.readFileSync(REVIEWS_PATH, "utf8"));
}

function saveReviews(reviews: any) {
  fs.writeFileSync(REVIEWS_PATH, JSON.stringify(reviews, null, 2));
}

export async function GET() {
  try {
    return NextResponse.json(getReviews());
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const review = await req.json();
    const reviews = getReviews();
    const maxId = reviews.length > 0 ? Math.max(...reviews.map((r: any) => r.id || 0)) : 0;
    const newReview = { ...review, id: maxId + 1, date: new Date().toISOString().split("T")[0], visible: true };
    reviews.push(newReview);
    saveReviews(reviews);
    return NextResponse.json(newReview, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updated = await req.json();
    const reviews = getReviews();
    const idx = reviews.findIndex((r: any) => r.id === updated.id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    reviews[idx] = { ...reviews[idx], ...updated };
    saveReviews(reviews);
    return NextResponse.json(reviews[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "0");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const reviews = getReviews();
    const filtered = reviews.filter((r: any) => r.id !== id);
    saveReviews(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
