"use client";

import React from "react";
import Link from "next/link";

const categories = [
  {
    label: "Shirts",
    slug: "mens-shirts",
    image: "https://shopbrumano.com/cdn/shop/files/2_422bbc91-79f1-4967-9610-cd0aa11ada83.jpg?v=1744893498&width=600",
  },
  {
    label: "Polos",
    slug: "mens-polos",
    image: "https://shopbrumano.com/cdn/shop/files/1_e1a23c26-0c72-4c0a-af7e-e8cb1e95e0ab.jpg?v=1745497979&width=600",
  },
  {
    label: "Trousers",
    slug: "mens-trousers",
    image: "https://shopbrumano.com/cdn/shop/files/1_7e8f19a8-68ec-43c5-87dd-c8c17ca1b40e.jpg?v=1745326587&width=600",
  },
  {
    label: "T-Shirts",
    slug: "mens-tshirts",
    image: "https://shopbrumano.com/cdn/shop/files/1_5fecb4c6-4b32-40ad-bd0c-8ab3f67e8c12.jpg?v=1745411287&width=600",
  },
];

const CategoryTiles = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collection/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-[0.15em]">
                  {cat.label}
                </h3>
                <div className="mt-2 h-[2px] w-8 bg-secondary mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
