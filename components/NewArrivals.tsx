"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

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

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?tag=new-arrivals&limit=8");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch {
        // fallback to empty
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-[0.1em]">
            New Arrivals
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-3" />
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/collection/new-arrivals"
            className="inline-block border-2 border-primary text-primary px-10 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
