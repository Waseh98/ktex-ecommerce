"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  oldPrice: string;
  fabric: string;
  category: string;
  tags: string[];
  image: string;
  hoverImage: string;
  badge: string;
  desc: string;
  stock: number;
  // Aliases for backwards compat
  img?: string;
}

const categories = ["New Arrivals", "Luxury Pret", "Luxury Formals", "Unstitched", "Accessories"];

const categorySlugMap: Record<string, string> = {
  "New Arrivals": "new-arrivals",
  "Luxury Pret": "luxury-pret",
  "Luxury Formals": "luxury-formals",
  "Unstitched": "unstitched",
  "Accessories": "accessories",
};

/* ── Fullscreen Expanded View ────────────────────────────── */
const ExpandedView = ({
  product,
  originRect,
  onClose,
}: {
  product: Product;
  originRect: DOMRect;
  onClose: () => void;
}) => {
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("enter");
  const { addItem } = useCartStore();

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("active"));
    });
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setPhase("exit");
    setTimeout(onClose, 450);
  };

  const isExpanded = phase === "active";

  return (
    <div
      className="fixed inset-0 z-[200]"
      style={{ pointerEvents: phase === "exit" ? "none" : "auto" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{ opacity: isExpanded ? 0.6 : 0 }}
        onClick={handleClose}
      />

      {/* Expanding panel */}
      <div
        className="absolute bg-white overflow-y-auto md:overflow-hidden"
        style={{
          top: isExpanded ? "0px" : `${originRect.top}px`,
          left: isExpanded ? "0px" : `${originRect.left}px`,
          width: isExpanded ? "100vw" : `${originRect.width}px`,
          height: isExpanded ? "100vh" : `${originRect.height}px`,
          borderRadius: isExpanded ? "0px" : "4px",
          transition: phase === "exit"
            ? "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 201,
        }}
      >
        {/* Content — fades in after expansion */}
        <div
          className="h-full w-full flex flex-col md:flex-row"
          style={{
            opacity: isExpanded ? 1 : 0,
            transition: "opacity 0.3s ease 0.25s",
          }}
        >
          {/* Left: Product Image */}
          <div className="relative w-full md:w-[55%] h-[45vh] md:h-full bg-[#f5f3f0] overflow-hidden flex-shrink-0">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{
                transform: isExpanded ? "scale(1)" : "scale(1.1)",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 bg-primary text-white">
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10 md:py-0 relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div
              style={{
                transform: isExpanded ? "translateY(0)" : "translateY(30px)",
                opacity: isExpanded ? 1 : 0,
                transition: "all 0.5s ease 0.35s",
              }}
            >
              <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-4">K-TEX Collection</p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6 leading-tight">
                {product.name}
              </h2>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                {product.desc}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-10">
                <span className="text-2xl md:text-3xl font-bold text-primary">PKR {product.price}</span>
                {product.oldPrice && (
                  <span className="text-base text-gray-300 line-through">PKR {product.oldPrice}</span>
                )}
              </div>

              {/* Size selector */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Select Size</p>
                <div className="flex gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size, i) => (
                    <button
                      key={size}
                      className={`w-11 h-11 text-[11px] font-bold uppercase border transition-all duration-200 ${
                        i === 2
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addItem({ ...product, size: "M", color: "Original", quantity: 1, image: product.img || "" });
                    handleClose();
                  }}
                  className="flex-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 hover:bg-primary transition-colors duration-300"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Bag
                </button>
                <button className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:border-primary hover:text-secondary transition-all duration-300">
                  <Heart size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* View full details link */}
              <Link
                href={`/product/${product.id}`}
                className="inline-flex items-center gap-2 mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors group/link"
                onClick={handleClose}
              >
                View Full Details
                <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Product Card in Grid ────────────────────────────────── */
const ProductCard = ({ product, index, onExpand }: {
  product: Product;
  index: number;
  onExpand: (product: Product, rect: DOMRect) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        onExpand(product, rect);
      }
    }, 400); // 400ms delay so it doesn't fire on accidental pass-throughs
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  return (
    <Link
      href={`/product/${product.id}`}
      ref={cardRef as any}
      className="group block cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f3f0] mb-4">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
          />
        </div>

        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 ${
              product.badge === "NEW" ? "bg-primary text-white" : "bg-white text-primary border border-gray-200"
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Loading indicator - fills up while hovering */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent z-10">
          <div className="h-full bg-secondary w-0 group-hover:w-full transition-all duration-[400ms] ease-linear" />
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <h3 className="text-sm font-medium text-primary mb-1 group-hover:text-secondary transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-primary">PKR {product.price}</p>
          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">PKR {product.oldPrice}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

/* ── Loading Skeleton ──────────────────────────────────────── */
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-gray-200 mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-100 rounded w-1/2" />
  </div>
);

/* ── Main Section ─────────────────────────────────────────── */
const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<{ product: Product; rect: DOMRect } | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const slug = categorySlugMap[activeTab] || "new-arrivals";
        const res = await fetch(`/api/products?category=${slug}`);
        const data = await res.json();
        // Normalize image field
        const normalized = data.map((p: any) => ({ ...p, img: p.image }));
        setProducts(normalized);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab]);

  const handleExpand = useCallback((product: Product, rect: DOMRect) => {
    setExpanded({ product, rect });
  }, []);

  return (
    <>
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em] mb-4">Curated Selection</p>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">Most Trending</h2>
            <div className="w-12 h-[2px] bg-secondary mx-auto mt-4" />
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-14 overflow-x-auto pb-3 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative text-[10px] font-bold uppercase tracking-widest whitespace-nowrap pb-2 transition-colors duration-300 ${
                  activeTab === cat ? "text-primary" : "text-gray-300 hover:text-gray-500"
                }`}
              >
                {cat}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${
                  activeTab === cat ? "w-full" : "w-0"
                }`} />
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : products.length > 0 ? (
              products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} onExpand={handleExpand} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-400 text-sm">No products found in this category.</div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 md:mt-20">
            <Link
              href="/collection/new-in"
              className="relative inline-flex items-center gap-3 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-primary text-primary overflow-hidden group/btn transition-colors duration-300 hover:text-white"
            >
              <span className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-400 ease-out" />
              <span className="relative z-10">View All Products</span>
              <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Expanded View */}
      {expanded && (
        <ExpandedView
          product={expanded.product}
          originRect={expanded.rect}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
};

export default TrendingProducts;
