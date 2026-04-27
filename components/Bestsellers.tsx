"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  fabric: string;
  image: string;
  hoverImage: string;
}

const Bestsellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const res = await fetch("/api/products?tag=bestseller");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch bestsellers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-secondary font-bold uppercase tracking-[0.2em] mb-2">Our Favorites</p>
            <h2 className="text-4xl md:text-5xl font-serif">Bestsellers</h2>
          </div>
          <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all">
            View All
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 mb-6" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1.2}
            navigation
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4 },
            }}
            className="product-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Link href={`/product/${product.id}`} className="block group cursor-pointer">
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                    {/* Primary Image */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    {/* Hover Image */}
                    <Image
                      src={product.hoverImage}
                      alt={product.name}
                      fill
                      className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                    
                    {/* Sale Badge */}
                    {product.oldPrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 animate-[bounceIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
                        40% OFF
                      </div>
                    )}

                    {/* Quick Add Button */}
                    <div className="absolute inset-x-0 bottom-0 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 z-20">
                      <button className="w-full bg-secondary text-ivory py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="text-left mt-4 px-2">
                     <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{product.fabric}</p>
                     <h3 className="text-lg font-serif mb-2 group-hover:text-secondary transition-colors">{product.name}</h3>
                     <div className="flex justify-start items-center space-x-3">
                        <span className="text-primary font-bold">PKR {product.price}</span>
                        {product.oldPrice && (
                          <span className="text-gray-400 line-through text-sm">PKR {product.oldPrice}</span>
                        )}
                     </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .product-swiper .swiper-button-next,
        .product-swiper .swiper-button-prev {
          color: #1a1a1a;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .product-swiper:hover .swiper-button-next,
        .product-swiper:hover .swiper-button-prev {
          opacity: 1;
        }

        .product-swiper .swiper-button-next::after,
        .product-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }

        @keyframes bounceIn {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Bestsellers;
