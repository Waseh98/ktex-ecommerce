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

    // Filter by slug (single product lookup)
    const slug = searchParams.get("slug");
    if (slug) {
      filtered = filtered.filter(
        (p: any) => p.slug === slug || p.id?.toString() === slug
      );
      return NextResponse.json(filtered);
    }

    // Filter by category slug
    const category = searchParams.get("category");
    if (category) {
      filtered = filtered.filter((p: any) => {
        if (!p.category) return p.tags?.includes(category);
        
        const pCat = p.category.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/s$/, "");
        const reqCat = category.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/s$/, "");
        
        return (
          pCat === reqCat ||
          reqCat.includes(pCat) ||
          pCat.includes(reqCat) ||
          p.tags?.includes(category)
        );
      });
    }

    // Filter by tag (e.g., bestseller, new-arrivals, sale)
    const tag = searchParams.get("tag");
    if (tag) {
      filtered = filtered.filter((p: any) => p.tags?.includes(tag));
    }

    // Filter by size
    const size = searchParams.get("size");
    if (size) {
      const sizes = size.split(",");
      filtered = filtered.filter((p: any) =>
        p.sizes?.some((s: string) => sizes.includes(s))
      );
    }

    // Filter by price range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filtered = filtered.filter((p: any) => {
        const price = parseInt(p.price.replace(/,/g, ""));
        if (minPrice && price < parseInt(minPrice)) return false;
        if (maxPrice && price > parseInt(maxPrice)) return false;
        return true;
      });
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
