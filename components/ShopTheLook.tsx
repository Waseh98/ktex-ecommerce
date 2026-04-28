"use client";

import React from "react";
import Link from "next/link";

const ShopTheLook = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-[0.1em]">
            Shop the Look
          </h2>
          <div className="w-12 h-[2px] bg-secondary mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Lifestyle Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(https://shopbrumano.com/cdn/shop/files/2_422bbc91-79f1-4967-9610-cd0aa11ada83.jpg?v=1744893498&width=1200)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/80 text-[11px] uppercase tracking-wider mb-2">Curated Style</p>
              <h3 className="text-white text-xl md:text-2xl font-bold">Summer Essentials</h3>
            </div>
          </div>

          {/* Product Cards Side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Product 1 */}
            <Link href="/product/white-self-striped-formal-shirt" className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                <img
                  src="https://shopbrumano.com/cdn/shop/files/2_422bbc91-79f1-4967-9610-cd0aa11ada83.jpg?v=1744893498&width=600"
                  alt="White Self Striped Formal Shirt"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-[13px] font-medium text-primary group-hover:text-secondary transition-colors">
                White Self Striped Formal Shirt
              </h4>
              <p className="text-[13px] font-bold text-primary mt-1">Rs. 8,290</p>
            </Link>

            {/* Product 2 */}
            <Link href="/product/olive-structured-polo-cutaway-collar" className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                <img
                  src="https://shopbrumano.com/cdn/shop/files/1_e1a23c26-0c72-4c0a-af7e-e8cb1e95e0ab.jpg?v=1745497979&width=600"
                  alt="Olive Structured Polo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-[13px] font-medium text-primary group-hover:text-secondary transition-colors">
                Olive Structured Polo
              </h4>
              <p className="text-[13px] font-bold text-primary mt-1">Rs. 5,290</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopTheLook;
