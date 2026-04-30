import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  console.log("Webhook received");
  try {
    const { orderId, status } = await req.json();
    console.log(`Processing order: ${orderId}, status: ${status}`);

    // Set a 5-second timeout for DB operations
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 5000))
    ]) as any;

    const db = client.db("ktex_ecommerce");
    const ordersCollection = db.collection("orders");

    // Update status in MongoDB
    const result = await ordersCollection.updateOne(
      { orderId: orderId },
      { 
        $set: { 
          status: status === "success" ? "PAID" : "FAILED",
          updatedAt: new Date().toISOString()
        } 
      }
    );

    console.log(`DB Update result: ${result.matchedCount} matched, ${result.modifiedCount} modified`);

    if (result.matchedCount === 0) {
      console.error(`Order not found: ${orderId}`);
      return NextResponse.json({ success: false, message: "Order not found in database. Please check your order ID." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error: any) {
    console.error("Webhook Error details:", error.message || error);
    const message = error.message === "DB Timeout" 
      ? "Database is taking too long to respond. Please try again in a moment."
      : "Internal server error during payment verification.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
