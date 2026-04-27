import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to a temporary mock database file
const DB_PATH = path.join(process.cwd(), "scratch", "orders.json");

// Ensure scratch directory exists
const SCRATCH_DIR = path.join(process.cwd(), "scratch");
if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingInfo, total } = body;

    // Generate a unique Order ID
    const orderId = `KTX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newOrder = {
      orderId,
      items,
      shippingInfo,
      total,
      status: "PENDING_PAYMENT",
      createdAt: new Date().toISOString(),
    };

    // Save to mock database
    const orders = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    orders.push(newOrder);
    fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));

    // In a real PayMob/JazzCash integration, you would call their API here
    // to get a transaction token and then return their payment URL.
    // For now, we return our mock gateway URL.
    const paymentUrl = `/payments/mock-gateway?orderId=${orderId}&amount=${total}`;

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
