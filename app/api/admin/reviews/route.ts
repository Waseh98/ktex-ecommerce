import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getCollection() {
  const client = await clientPromise;
  const db = client.db("ktex_ecommerce");
  return db.collection("reviews");
}

export async function GET() {
  try {
    const reviewsCollection = await getCollection();
    const reviews = await reviewsCollection.find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const review = await req.json();
    const reviewsCollection = await getCollection();
    
    const lastReview = await reviewsCollection.find().sort({ id: -1 }).limit(1).toArray();
    const maxId = lastReview.length > 0 ? lastReview[0].id || 0 : 0;
    
    const newReview = { 
      ...review, 
      id: maxId + 1, 
      date: new Date().toISOString().split("T")[0], 
      visible: true 
    };
    
    await reviewsCollection.insertOne(newReview);
    return NextResponse.json(newReview, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updated = await req.json();
    const reviewsCollection = await getCollection();
    
    const { _id, ...updateData } = updated;
    
    const result = await reviewsCollection.findOneAndUpdate(
      { id: updated.id },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "0");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    const reviewsCollection = await getCollection();
    const result = await reviewsCollection.deleteOne({ id: id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

