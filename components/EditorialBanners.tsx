"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const EditorialBanners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.reveal-hidden');
            children.forEach((child, idx) => {
              setTimeout(() => {
                child.classList.add('reveal-visible');
              }, idx * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white">
      {/* Section 5: Asymmetric Split */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] h-auto md:h-[90vh]">
        <Link href="/collection/new-in" className="relative group overflow-hidden hover-zoom reveal-hidden">
          <img src="/images/hero-banner-1.svg" alt="Unstitched" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-12">
            <h3 className="text-white text-4xl font-serif">Men's Unstitched</h3>
          </div>
        </Link>
        <div className="grid grid-rows-2 h-full">
           <Link href="/collection/new-in" className="relative group overflow-hidden hover-zoom reveal-hidden">
              <img src="/images/bestseller-3.svg" alt="RTW" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-10">
                <h3 className="text-white text-2xl font-serif">Kurtas & Trousers</h3>
              </div>
           </Link>
           <Link href="/collection/new-in" className="relative group overflow-hidden hover-zoom reveal-hidden">
              <img src="/images/bestseller-4.svg" alt="Luxe" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-10">
                <h3 className="text-white text-2xl font-serif">Luxury Waistcoats</h3>
              </div>
           </Link>
        </div>
      </div>

      {/* Section 6: Feature Tiles */}
      <div className="container-wide py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Groomswear", img: "/images/bestseller-1.svg" },
             { name: "Cufflinks & Watches", img: "/images/bestseller-2.svg" },
             { name: "Footwear", img: "/images/bestseller-3.svg" }
           ].map((item, idx) => (
             <Link key={idx} href="/collection/new-in" className="group reveal-hidden text-center">
                <div className="aspect-[3/4] overflow-hidden mb-6 hover-zoom rounded-sm shadow-sm">
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary group-hover:text-secondary transition-colors">
                  {item.name}
                </h4>
             </Link>
           ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialBanners;
