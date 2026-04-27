import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PRODUCTS_PATH = path.join(process.cwd(), "scratch", "products.json");

export async function GET(req: Request) {
  try {
    if (!fs.existsSync(PRODUCTS_PATH)) {
      return NextResponse.json([]);
    }

    const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));
    const { searchParams } = new URL(req.url);

    let filtered = [...products];

    // Filter by category slug
    const category = searchParams.get("category");
    if (category) {
      filtered = filtered.filter(
        (p: any) =>
          p.category === category ||
          p.tags?.includes(category)
      );
    }

    // Filter by tag (e.g., bestseller)
    const tag = searchParams.get("tag");
    if (tag) {
      filtered = filtered.filter((p: any) => p.tags?.includes(tag));
    }

    // Sort
    const sort = searchParams.get("sort");
    if (sort === "price-asc") {
      filtered.sort((a: any, b: any) => parseInt(a.price.replace(/,/g, "")) - parseInt(b.price.replace(/,/g, "")));
    } else if (sort === "price-desc") {
      filtered.sort((a: any, b: any) => parseInt(b.price.replace(/,/g, "")) - parseInt(a.price.replace(/,/g, "")));
    }

    // Limit
    const limit = searchParams.get("limit");
    if (limit) {
      filtered = filtered.slice(0, parseInt(limit));
    }

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("Products API Error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
