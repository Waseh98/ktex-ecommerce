import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to Base64 data URL
    // This is a temporary fix for Vercel because Vercel doesn't allow writing to the local file system.
    // For a production app, we recommend using Vercel Blob, Cloudinary, or AWS S3.
    const base64Image = buffer.toString('base64');
    const fileUrl = `data:${file.type};base64,${base64Image}`;

    return NextResponse.json({ url: fileUrl, success: true }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
