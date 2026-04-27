import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PRODUCTS_PATH = path.join(process.cwd(), "scratch", "products.json");

function getProducts() {
  if (!fs.existsSync(PRODUCTS_PATH)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));
}

function saveProducts(products: any) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
}

export async function GET() {
  try {
    return NextResponse.json(getProducts());
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const product = await req.json();
    const products = getProducts();
    
    // Generate a new ID
    const maxId = products.length > 0 ? Math.max(...products.map((p: any) => p.id || 0)) : 0;
    const newProduct = {
      ...product,
      id: maxId + 1,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updatedProduct = await req.json();
    const products = getProducts();
    const index = products.findIndex((p: any) => p.id === updatedProduct.id);
    
    if (index === -1) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
    
    return NextResponse.json(products[index]);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "0");
    
    if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    
    const products = getProducts();
    const filteredProducts = products.filter((p: any) => p.id !== id);
    
    if (products.length === filteredProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    saveProducts(filteredProducts);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
