"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  { id: 1, img: "/images/hero-banner-1.svg", label: "Men's Festive Collection" },
  { id: 2, img: "/images/hero-banner-2.svg", label: "The Groom's Edit" },
  { id: 3, img: "/images/hero-banner-3.svg", label: "New Arrivals" },
];

const HeroSlider = () => {
  return (
    <section className="w-full h-screen overflow-hidden pt-20 md:pt-0">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={800}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full w-full overflow-hidden">
             {({ isActive }) => (
               <div className="relative h-full w-full cursor-pointer">
                 <img 
                   src={slide.img} 
                   alt={slide.label}
                   className={`w-full h-full object-cover transition-transform duration-[5000ms] linear ${isActive ? 'scale-[1.04]' : 'scale-100'}`}
                 />
                 {/* Ken Burns effect handled by isActive and CSS transition */}
               </div>
             )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
