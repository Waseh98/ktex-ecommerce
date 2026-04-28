import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOGS_PATH = path.join(process.cwd(), "scratch", "blogs.json");

function getBlogs() {
  if (!fs.existsSync(BLOGS_PATH)) return [];
  return JSON.parse(fs.readFileSync(BLOGS_PATH, "utf8"));
}

function saveBlogs(blogs: any) {
  fs.writeFileSync(BLOGS_PATH, JSON.stringify(blogs, null, 2));
}

export async function GET() {
  try { return NextResponse.json(getBlogs()); }
  catch { return NextResponse.json([], { status: 500 }); }
}

export async function POST(req: Request) {
  try {
    const blog = await req.json();
    const blogs = getBlogs();
    const maxId = blogs.length > 0 ? Math.max(...blogs.map((b: any) => b.id || 0)) : 0;
    const slug = blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const newBlog = { ...blog, id: maxId + 1, slug, date: new Date().toISOString().split("T")[0], published: true };
    blogs.push(newBlog);
    saveBlogs(blogs);
    return NextResponse.json(newBlog, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add blog" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updated = await req.json();
    const blogs = getBlogs();
    const idx = blogs.findIndex((b: any) => b.id === updated.id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    blogs[idx] = { ...blogs[idx], ...updated };
    saveBlogs(blogs);
    return NextResponse.json(blogs[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "0");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const blogs = getBlogs();
    saveBlogs(blogs.filter((b: any) => b.id !== id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
