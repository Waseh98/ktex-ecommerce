"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryLabel, getCategoryBreadcrumb } from "@/lib/megaMenuData";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  salePrice?: string;
  oldPrice?: string;
  fabric: string;
  image: string;
  hoverImage: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  badge?: string;
}

const SIZES = ["S", "M", "L", "XL", "XXL"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "best-selling" },
];

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const categoryLabel = getCategoryLabel(slug);
  const breadcrumb = getCategoryBreadcrumb(slug);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = slug === "new-in" || slug === "new-arrivals"
          ? "/api/products?tag=new-arrivals"
          : slug === "sale"
          ? "/api/products?tag=sale"
          : slug === "mens"
          ? "/api/products?tag=mens"
          : slug === "junior"
          ? "/api/products?tag=junior"
          : `/api/products?category=${slug}`;
        const res = await fetch(endpoint);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  // Client-side sort
  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price-asc")
      return parseInt(a.price.replace(/,/g, "")) - parseInt(b.price.replace(/,/g, ""));
    if (sortBy === "price-desc")
      return parseInt(b.price.replace(/,/g, "")) - parseInt(a.price.replace(/,/g, ""));
    return 0;
  });

  // Client-side size filter
  const filtered = selectedSizes.length > 0
    ? sorted.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)))
    : sorted;

  return (
    <>
      {/* Breadcrumb + Header */}
      <div className="bg-white border-b border-gray-100 pt-6 pb-8">
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>/</span>
            {breadcrumb.grandparent && (
              <>
                <span>{breadcrumb.grandparent.label}</span>
                <span>/</span>
              </>
            )}
            {breadcrumb.parent && (
              <>
                <Link href={`/collection/${breadcrumb.parent.slug}`} className="hover:text-secondary transition-colors">
                  {breadcrumb.parent.label}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-primary font-medium">{categoryLabel}</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-primary">{categoryLabel}</h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-wide py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <p className="text-[12px] text-gray-400">
              {loading ? "Loading..." : `${filtered.length} products`}
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[11px] font-bold uppercase tracking-wider bg-transparent border border-gray-200 px-3 py-2 focus:outline-none focus:border-secondary cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-36 space-y-6">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSizes((prev) =>
                        prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                      )}
                      className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                        selectedSizes.includes(size)
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSizes.length > 0 && (
                <button
                  onClick={() => setSelectedSizes([])}
                  className="text-[11px] font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm">Try a different collection or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[300px] bg-white p-6 overflow-y-auto animate-fadeDown">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSizes((prev) =>
                        prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                      )}
                      className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                        selectedSizes.includes(size)
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelectedSizes([]); setFilterOpen(false); }}
                className="w-full py-3 bg-secondary text-white text-[11px] font-bold uppercase tracking-wider"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
