"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const occasions = [
  { id: 1, title: "Nikkah Formals '26", heading: "Shop By Occasion", text: "Celebrate your Nikkah in effortless elegance. Timeless designs made for moments that matter.", img: "/images/hero-banner-1.svg" },
  { id: 2, title: "Groom's Edit", heading: "Vibrant Heritage", text: "Regal silhouettes and intricate handwork for your wedding festivities.", img: "/images/hero-banner-2.svg" },
];

const OccasionSlider = () => {
  const [groomProducts, setGroomProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroomProducts = async () => {
      try {
        const res = await fetch("/api/products?tag=groomswear&limit=2");
        const data = await res.json();
        setGroomProducts(data);
      } catch (err) {
        console.error("Failed to fetch groom products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroomProducts();
  }, []);

  return (
    <section className="py-24 bg-ivory overflow-hidden">
      <div className="container-wide">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 4000 }}
          speed={500}
          className="relative"
        >
          {occasions.map((occ) => (
            <SwiperSlide key={occ.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="order-2 lg:order-1">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em] mb-6">{occ.title}</p>
                    <h2 className="text-6xl md:text-8xl font-serif mb-8 text-primary">{occ.heading}</h2>
                    <p className="text-lg text-gray-500 italic max-w-md mb-10 leading-relaxed">{occ.text}</p>
                    <Link href="/collection/new-in" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">
                       Shop The Look
                    </Link>
                 </div>
                 <div className="order-1 lg:order-2">
                    <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
                       <img src={occ.img} alt={occ.title} className="w-full h-full object-cover" />
                    </div>
                 </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Custom Arrows */}
          <div className="hidden lg:flex absolute bottom-0 left-0 space-x-4 z-10">
             <button className="p-4 border border-primary/10 rounded-full hover:bg-primary hover:text-white transition-all"><ChevronLeft size={20} /></button>
             <button className="p-4 border border-primary/10 rounded-full hover:bg-primary hover:text-white transition-all"><ChevronRight size={20} /></button>
          </div>
        </Swiper>
      </div>

      {/* Section 9: Groom Feature */}
      <div className="container-wide mt-40">
         <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-serif">Grooms</h2>
            <Link href="/collection/new-in" className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 pb-1 hover:text-secondary hover:border-secondary transition-all">View All</Link>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <div className="reveal-hidden reveal-visible">
               <div className="aspect-[2/3] overflow-hidden rounded-sm shadow-xl">
                  <img src="/images/bestseller-3.svg" alt="Groom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
               {loading ? (
                 Array.from({ length: 2 }).map((_, i) => (
                   <div key={i} className="animate-pulse">
                     <div className="aspect-[1/1.3] bg-gray-200 mb-6" />
                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                     <div className="h-3 bg-gray-100 rounded w-1/2" />
                   </div>
                 ))
               ) : (
                 groomProducts.map((product: any) => (
                   <Link href={`/product/${product.id}`} key={product.id} className="group block text-left">
                      <div className="relative aspect-[1/1.3] overflow-hidden mb-6 bg-zinc-50 rounded-sm">
                         <img src={product.image || product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                         <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="w-full bg-white text-primary text-[10px] font-bold uppercase tracking-widest py-4 shadow-xl hover:bg-secondary hover:text-white transition-colors">View Details</button>
                         </div>
                      </div>
                      <div className="px-2">
                        <h3 className="text-lg font-serif mb-1 group-hover:text-secondary transition-colors">{product.name}</h3>
                        <p className="text-xs font-bold text-gray-400">PKR {product.price}</p>
                      </div>
                   </Link>
                 ))
               )}
            </div>
         </div>
      </div>
    </section>
  );
};

export default OccasionSlider;

