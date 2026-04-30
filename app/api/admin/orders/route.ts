import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getCollection() {
  try {
    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    return db.collection("orders");
  } catch (err) {
    console.error("MongoDB Connection Error in getCollection (Orders):", err);
    throw err;
  }
}

export async function GET() {
  try {
    const ordersCollection = await getCollection();
    const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Admin Orders Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, notes, status, courier, trackingNumber } = await req.json();
    const ordersCollection = await getCollection();

    const updateData: any = {};
    if (notes !== undefined) updateData.notes = notes;
    if (status !== undefined) updateData.status = status;
    if (courier !== undefined) updateData.courier = courier;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;

    const result = await ordersCollection.updateOne(
      { orderId: orderId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Order Update Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const ordersCollection = await getCollection();
    const result = await ordersCollection.deleteOne({ orderId: orderId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Order Deletion Error:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
