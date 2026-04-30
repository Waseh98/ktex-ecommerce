import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, Email and Message are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");

    const contact = {
      name,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
      status: "unread",
      createdAt: new Date().toISOString(),
    };

    await db.collection("contacts").insertOne(contact);

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you shortly!",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
