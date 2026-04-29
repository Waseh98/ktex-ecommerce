import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    const productsCollection = db.collection("products");

    const { searchParams } = new URL(req.url);
    const query: any = {};

    // Filter by slug (single product lookup)
    const slug = searchParams.get("slug");
    if (slug) {
      const product = await productsCollection.findOne({
        $or: [{ slug: slug }, { id: slug }, { id: parseInt(slug) || -1 }]
      });
      return NextResponse.json(product ? [product] : []);
    }

    // Filter by category slug
    const category = searchParams.get("category");
    if (category) {
      // Create regex for flexible category matching
      const catRegex = new RegExp(category.replace(/s$/, ""), "i");
      query.$or = [
        { category: catRegex },
        { tags: category }
      ];
    }

    // Filter by tag (e.g., bestseller, new-arrivals, sale)
    const tag = searchParams.get("tag");
    if (tag) {
      query.tags = tag;
    }

    // Filter by size
    const size = searchParams.get("size");
    if (size) {
      const sizes = size.split(",");
      query.sizes = { $in: sizes };
    }

    // Filter by price range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      query.price = {};
      // MongoDB stores price as a string "2,450", so we need to handle that.
      // Ideally, we'd store prices as numbers. For now, we'll fetch and filter if needed, 
      // or use a more complex aggregation if performance becomes an issue.
    }

    let products = await productsCollection.find(query).toArray();

    // Secondary filtering for price (since price is currently stored as a formatted string)
    if (minPrice || maxPrice) {
      products = products.filter((p: any) => {
        const priceValue = typeof p.price === 'string' ? parseInt(p.price.replace(/,/g, "")) : p.price;
        if (minPrice && priceValue < parseInt(minPrice)) return false;
        if (maxPrice && priceValue > parseInt(maxPrice)) return false;
        return true;
      });
    }

    // Sort
    const sort = searchParams.get("sort");
    if (sort === "price-asc") {
      products.sort((a: any, b: any) => {
        const pA = typeof a.price === 'string' ? parseInt(a.price.replace(/,/g, "")) : a.price;
        const pB = typeof b.price === 'string' ? parseInt(b.price.replace(/,/g, "")) : b.price;
        return pA - pB;
      });
    } else if (sort === "price-desc") {
      products.sort((a: any, b: any) => {
        const pA = typeof a.price === 'string' ? parseInt(a.price.replace(/,/g, "")) : a.price;
        const pB = typeof b.price === 'string' ? parseInt(b.price.replace(/,/g, "")) : b.price;
        return pB - pA;
      });
    }

    // Limit
    const limit = searchParams.get("limit");
    if (limit) {
      products = products.slice(0, parseInt(limit));
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("Products API Error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

