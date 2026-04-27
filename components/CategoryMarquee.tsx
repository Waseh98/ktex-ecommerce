"use client";

import React from "react";
import Link from "next/link";

const categories = [
  { name: "Kurtas", img: "/images/bestseller-1.svg" },
  { name: "Waistcoats", img: "/images/bestseller-2.svg" },
  { name: "Sherwanis", img: "/images/bestseller-3.svg" },
  { name: "Cufflinks", img: "/images/bestseller-4.svg" },
  { name: "Perfumes", img: "/images/hero-banner-1.svg" },
  { name: "Kids Boys", img: "/images/hero-banner-2.svg" },
  { name: "Footwear", img: "/images/hero-banner-3.svg" },
  { name: "Accessories", img: "/images/bestseller-1.svg" },
];

const CategoryMarquee = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-2">Eid Edit 🌙</h2>
        <p className="text-xs text-gray-400 italic tracking-widest">Explore the newest festive arrivals curated especially for Eid ✨</p>
      </div>

      <div className="relative flex group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] space-x-6 px-3">
          {[...categories, ...categories].map((cat, idx) => (
            <Link 
              key={idx} 
              href="/collection/new-in"
              className="flex-shrink-0 w-[180px] group/tile transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-[4/5] bg-ivory rounded-xl overflow-hidden mb-4 border border-gray-50">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-center opacity-70 group-hover/tile:opacity-100 transition-opacity">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMarquee;
