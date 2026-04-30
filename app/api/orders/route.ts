import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingInfo, total } = body;

    // Generate a unique Order ID (e.g., KTX-482910)
    const orderId = `KTX-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      orderId,
      items,
      shippingInfo,
      total,
      status: "PENDING_PAYMENT",
      createdAt: new Date().toISOString(),
    };

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    const ordersCollection = db.collection("orders");
    
    console.log(`Saving new order to MongoDB: ${orderId}`);
    await ordersCollection.insertOne(newOrder);
    console.log(`Order ${orderId} saved successfully.`);

    // In a real PayMob/JazzCash integration, you would call their API here
    // to get a transaction token and then return their payment URL.
    // For now, we return our mock gateway URL.
    const paymentUrl = `/payments/mock-gateway?orderId=${orderId}&amount=${total}&email=${shippingInfo.email}`;

    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

