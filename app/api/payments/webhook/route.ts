import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "scratch", "orders.json");

export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json({ success: false, message: "No orders found" }, { status: 404 });
    }

    const orders = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    const orderIndex = orders.findIndex((o: any) => o.orderId === orderId);

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // Update status
    orders[orderIndex].status = status === "success" ? "PAID" : "FAILED";
    orders[orderIndex].updatedAt = new Date().toISOString();

    fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
