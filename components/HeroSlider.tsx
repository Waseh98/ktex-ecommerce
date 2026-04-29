"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Slide {
  id: any;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/admin/homepage", { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.heroSlides?.length) {
          // Map to ensure all required fields exist to prevent crashes
          const mappedSlides = data.heroSlides.map((s: any, idx: number) => ({
            id: s.id || idx,
            image: s.image || "",
            title: s.title || s.headline || "",
            subtitle: s.subtitle || s.subtext || "",
            link: s.link || s.ctaLink || "/",
          }));
          setSlides(mappedSlides);
        }
      })
      .catch(() => {});
  }, []);

  const validSlides = slides.filter(s => s.image && s.image.trim() !== "");
  
  const finalSlides = validSlides.length > 0 ? validSlides : [
    {
      id: 'default',
      image: "https://images.unsplash.com/photo-1441984908747-d4121f267011?q=80&w=1920",
      title: "Welcome to K-TEX",
      subtitle: "Experience Premium Quality & Style",
      link: "/collection/all"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(400px, 70vh, 700px)" }}>
      <Swiper
        key={finalSlides.length}
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index: number, className: string) =>
            `<span class="${className}" style="width:${index === activeIndex ? '24px' : '8px'};height:8px;border-radius:4px;transition:all 0.3s"></span>`,
        }}
        loop={finalSlides.length > 1}
        observer={true}
        observeParents={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {finalSlides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[5000ms] ease-linear scale-105 group-hover:scale-100"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="container-wide w-full px-4">
                  <div className="max-w-3xl mx-auto">
                    <h2
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight uppercase tracking-tight"
                      style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
                    >
                      {slide.title}
                    </h2>
                    <p className="text-white/90 text-sm md:text-xl mb-8 max-w-2xl mx-auto font-medium">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.link || "/"}
                      className="inline-block bg-white text-primary px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-300 rounded-full shadow-xl"
                    >
                      Shop the Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
