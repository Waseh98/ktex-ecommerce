"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  oldPrice: string;
  fabric: string;
  image: string;
  hoverImage: string;
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Map "new-in" to fetch all, otherwise filter by category
        const endpoint = slug === "new-in"
          ? "/api/products"
          : `/api/products?category=${slug}`;
        const res = await fetch(endpoint);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch collection:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  // Client-side sort
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return parseInt(a.price.replace(/,/g, "")) - parseInt(b.price.replace(/,/g, ""));
    if (sortBy === "price-desc") return parseInt(b.price.replace(/,/g, "")) - parseInt(a.price.replace(/,/g, ""));
    return 0; // newest = default order
  });

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="pt-40 pb-12 bg-ivory border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
           <p className="text-secondary font-bold uppercase tracking-[0.2em] mb-4 text-center">Collections</p>
           <h1 className="text-4xl md:text-6xl font-serif text-center capitalize mb-8">
             {slug?.replace(/-/g, " ") || "New In"}
           </h1>
           <div className="flex justify-center items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
              <span>/</span>
              <span className="text-primary">{slug?.replace(/-/g, " ") || "New In"}</span>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters */}
          <FilterSidebar />

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-500 font-medium">
                {loading ? "Loading..." : `Showing ${sortedProducts.length} Products`}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Sort By: Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 mb-6" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-serif mb-2">No products found</p>
                <p className="text-sm">Try a different collection or check back later.</p>
              </div>
            )}

            {/* Load More */}
            {sortedProducts.length > 0 && (
              <div className="mt-20 flex justify-center">
                <button className="px-12 py-4 border-2 border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-300">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
