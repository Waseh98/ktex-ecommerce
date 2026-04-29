"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Heart, Minus, Plus, Ruler, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  salePrice?: string;
  oldPrice?: string;
  fabric: string;
  description: string;
  image: string;
  hoverImage: string;
  images?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  badge?: string;
  category?: string;
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?slug=${slug}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const p = data[0];
          setProduct(p);
          setSelectedSize(p.sizes?.[1] || p.sizes?.[0] || "M");
          setSelectedColor(p.colors?.[0]?.name || "");

          // Fetch related products
          if (p.category) {
            const relRes = await fetch(`/api/products?category=${p.category}&limit=4`);
            const relData = await relRes.json();
            if (Array.isArray(relData)) {
              setRelatedProducts(relData.filter((r: Product) => r.id !== p.id).slice(0, 4));
            }
          }
        }
      } catch {
        // error
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: `Rs. ${product.price}`,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor || "Default",
    });
    openCart();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  if (loading) {
    return (
      <div className="container-wide py-20">
        <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
          <div className="lg:w-3/5">
            <div className="aspect-[3/4] bg-gray-200" />
          </div>
          <div className="lg:w-2/5 space-y-4">
            <div className="h-4 bg-gray-200 w-1/3" />
            <div className="h-8 bg-gray-200 w-3/4" />
            <div className="h-6 bg-gray-200 w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
        <Link href="/" className="text-secondary hover:text-primary underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const images = (product.images?.length 
    ? product.images 
    : [product.image, product.hoverImage]
  ).filter(img => img && typeof img === 'string' && img.trim() !== "" && img !== "null");
  
  // Ensure we don't crash if all images are filtered out
  const finalImages = images.length > 0 ? images : ["/placeholder.png"];
  const hasDiscount = product.oldPrice || product.salePrice;
  const originalPrice = product.oldPrice || product.salePrice || "";
  let discountPercent = "";
  if (hasDiscount) {
    const current = parseInt(product.price.replace(/,/g, ""));
    const original = parseInt(originalPrice.replace(/,/g, ""));
    if (original > current) {
      discountPercent = `${Math.round(((original - current) / original) * 100)}% OFF`;
    }
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-wide pt-4 pb-2">
        <nav className="flex items-center gap-2 text-[11px] text-gray-400">
          <Link href="/" className="hover:text-secondary">Home</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/collection/${product.category}`} className="hover:text-secondary capitalize">
                {product.category.replace(/-/g, " ")}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-primary font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="container-wide pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:w-3/5 flex flex-col md:flex-row gap-3">
            {/* Thumbnails */}
            <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
              {finalImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-20 flex-shrink-0 border-2 transition-all ${
                    selectedImage === idx ? "border-secondary" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 flex-1 relative aspect-[3/4] overflow-hidden bg-gray-100 group cursor-zoom-in">
              <img
                src={finalImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150"
              />
              <button className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full hover:bg-white shadow-sm transition-all">
                <Heart size={18} className="text-primary hover:text-red-500 transition-colors" />
              </button>
              {product.badge && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-2/5">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">{product.fabric}</p>
            <h1 className="text-xl md:text-2xl font-bold text-primary mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl font-bold text-primary">Rs. {product.price}</span>
              {hasDiscount && (
                <>
                  <span className="text-base text-gray-400 line-through">Rs. {originalPrice}</span>
                  <span className="bg-red-50 text-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {discountPercent}
                  </span>
                </>
              )}
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3">
                  Color: {selectedColor}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                        selectedColor === color.name ? "border-secondary" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="w-full h-full rounded-full border border-gray-100" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[11px] font-bold uppercase tracking-wider">Size: {selectedSize}</p>
                <Link href="/size-guide" className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors">
                  <Ruler size={14} />
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-[11px] font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-gray-200 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 h-12">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 hover:text-secondary">
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="px-4 hover:text-secondary">
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full h-12 border-2 border-primary text-primary text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Product Tabs */}
            <div className="border-t border-gray-100">
              {[
                { key: "description", label: "Description", content: product.description },
                { key: "size-guide", label: "Size Guide", content: "Please refer to our size guide for accurate measurements. Visit the Size Guide page for detailed sizing information." },
                { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders above Rs. 5,000. Standard delivery takes 3-5 business days. Easy 7-day exchange & return policy." },
              ].map((tab) => (
                <div key={tab.key} className="border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab(activeTab === tab.key ? "" : tab.key)}
                    className="w-full py-4 flex justify-between items-center group"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] group-hover:text-secondary transition-colors">
                      {tab.label}
                    </span>
                    <Plus size={14} className={`transition-transform ${activeTab === tab.key ? "rotate-45" : ""}`} />
                  </button>
                  {activeTab === tab.key && (
                    <div className="pb-4 text-[13px] text-gray-600 leading-relaxed animate-fadeIn">
                      {tab.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="flex flex-col items-center text-center">
                <Truck size={20} className="text-secondary mb-2" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw size={20} className="text-secondary mb-2" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={20} className="text-secondary mb-2" />
                <span className="text-[9px] font-bold uppercase tracking-wider">100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-wide">
            <h2 className="text-xl font-bold text-primary mb-8 uppercase tracking-[0.1em]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Sticky Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold truncate">{product.name}</p>
            <p className="text-[11px] text-gray-500">Rs. {product.price}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 h-11 bg-primary text-white text-[10px] font-bold uppercase tracking-wider"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
