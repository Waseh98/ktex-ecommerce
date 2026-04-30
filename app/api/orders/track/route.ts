import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawOrderId = searchParams.get("orderId")?.trim() || "";
    const rawEmail = searchParams.get("email")?.trim() || "";

    if (!rawOrderId || !rawEmail) {
      return NextResponse.json(
        { success: false, message: "Order ID and Email are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    const ordersCollection = db.collection("orders");

    console.log(`[DEBUG] Tracking attempt - ID: "${rawOrderId}", Email: "${rawEmail}"`);

    // Clean orderId (remove # if present)
    const cleanId = rawOrderId.replace(/^#/, "");

    // Flexible query:
    const query = {
      $and: [
        {
          $or: [
            { orderId: cleanId },
            { orderId: `KTX-${cleanId}` },
            { orderId: { $regex: new RegExp(`^${cleanId}$`, "i") } }
          ]
        },
        { 
          "shippingInfo.email": { $regex: new RegExp(`^${rawEmail}$`, "i") } 
        }
      ]
    };

    const order = await ordersCollection.findOne(query);
    console.log(`[DEBUG] Order search result: ${order ? "Found" : "Not Found"}`);

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
        courier: order.courier,
        trackingNumber: order.trackingNumber,
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
