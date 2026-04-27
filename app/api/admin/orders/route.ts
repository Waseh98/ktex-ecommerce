import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "scratch", "orders.json");

export async function GET() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json([]);
    }

    const orders = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    
    // Sort by latest first
    const sortedOrders = orders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sortedOrders);
  } catch (error) {
    console.error("Admin Orders Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, notes } = await req.json();
    if (!fs.existsSync(DB_PATH)) return NextResponse.json({ error: "No orders found" }, { status: 404 });

    const orders = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    const orderIndex = orders.findIndex((o: any) => o.orderId === orderId);

    if (orderIndex === -1) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    orders[orderIndex].notes = notes;
    fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Notes Update Error:", error);
    return NextResponse.json({ error: "Failed to update notes" }, { status: 500 });
  }
}
