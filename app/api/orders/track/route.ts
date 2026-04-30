import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const email = searchParams.get("email");

    if (!orderId || !email) {
      return NextResponse.json(
        { success: false, message: "Order ID and Email are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    const ordersCollection = db.collection("orders");

    console.log(`Tracking attempt - ID: ${orderId}, Email: ${email}`);

    // Flexible query:
    // 1. Matches exact Order ID
    // 2. Matches ID without # prefix
    // 3. Case-insensitive email match
    const query = {
      $and: [
        {
          $or: [
            { orderId: orderId },
            { orderId: orderId.startsWith("#") ? orderId.substring(1) : orderId },
            { orderId: { $regex: new RegExp(orderId.replace("#", ""), "i") } }
          ]
        },
        { 
          "shippingInfo.email": { $regex: new RegExp(`^${email}$`, "i") } 
        }
      ]
    };

    const order = await ordersCollection.findOne(query);
    console.log(`Order search result: ${order ? "Found" : "Not Found"}`);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found. Please check your ID and Email." },
        { status: 404 }
      );
    }

    // Map internal status to user-friendly status
    const statusMap: Record<string, string> = {
      "PENDING_PAYMENT": "Pending Payment",
      "PAID": "Payment Received",
      "PROCESSING": "Processing",
      "SHIPPED": "Shipped",
      "DELIVERED": "Delivered",
      "CANCELLED": "Cancelled"
    };

    return NextResponse.json({
      success: true,
      order: {
        orderId: order.orderId,
        status: statusMap[order.status] || order.status,
        statusKey: order.status,
        total: order.total,
        createdAt: order.createdAt,
        itemsCount: order.items?.length || 0,
        shippingInfo: {
          firstName: order.shippingInfo.firstName,
          lastName: order.shippingInfo.lastName,
          city: order.shippingInfo.city
        }
      }
    });
  } catch (error) {
    console.error("Order Tracking Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while tracking order" },
      { status: 500 }
    );
  }
}
