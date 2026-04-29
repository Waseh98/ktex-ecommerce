import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { PLACEHOLDER_PRODUCTS } from "@/lib/constants";

export const dynamic = "force-dynamic";

async function getCollection() {
  try {
    const client = await clientPromise;
    const db = client.db("ktex_ecommerce");
    return db.collection("products");
  } catch (err) {
    console.error("MongoDB Connection Error in getCollection:", err);
    throw err;
  }
}

export async function GET() {
  try {
    const productsCollection = await getCollection();
    let products = await productsCollection.find({}).toArray();
    
    if (products.length === 0) {
      // Seed with placeholder products if DB is empty
      const seedProducts = PLACEHOLDER_PRODUCTS.map((p) => ({
        ...p,
        image: p.images?.[0] || "",
        hoverImage: p.images?.[1] || "",
        desc: p.description || "",
      }));
      try {
        await productsCollection.insertMany(seedProducts);
      } catch (insertErr) {
        console.error("Failed to seed database (possibly read-only permissions):", insertErr);
        // Continue and just return the empty array or the mock data
      }
      products = seedProducts as any;
    }
    
    return NextResponse.json(products);
  } catch (err: any) {
    console.error("Admin Fetch Error:", err);
    return NextResponse.json({ 
      error: "Failed to fetch products", 
      details: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const product = await req.json();
    const productsCollection = await getCollection();
    
    // Generate a new ID (numeric for compatibility)
    const lastProduct = await productsCollection.find().sort({ id: -1 }).limit(1).toArray();
    const maxId = lastProduct.length > 0 ? lastProduct[0].id || 0 : 0;
    
    const newProduct = {
      ...product,
      id: maxId + 1,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    };
    
    await productsCollection.insertOne(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("Admin Add Error:", err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updatedProduct = await req.json();
    const productsCollection = await getCollection();
    
    const { _id, ...updateData } = updatedProduct; // Remove MongoDB internal ID if present
    
    const result = await productsCollection.findOneAndUpdate(
      { id: updatedProduct.id },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    
    return NextResponse.json(result);
  } catch (err) {
    console.error("Admin Update Error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get("id");
    const id = parseInt(idStr || "0");
    
    if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    
    const productsCollection = await getCollection();
    const result = await productsCollection.deleteOne({ id: id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin Delete Error:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

