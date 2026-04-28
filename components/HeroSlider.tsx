"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Slide {
  id: number;
  image: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
}

const fallbackSlides: Slide[] = [
  {
    id: 1,
    image: "https://shopbrumano.com/cdn/shop/files/2_422bbc91-79f1-4967-9610-cd0aa11ada83.jpg?v=1744893498&width=1920",
    headline: "New Season Arrivals",
    subtext: "Discover the latest in premium menswear",
    ctaText: "Shop Now",
    ctaLink: "/collection/new-arrivals",
  },
  {
    id: 2,
    image: "https://shopbrumano.com/cdn/shop/files/1_e1a23c26-0c72-4c0a-af7e-e8cb1e95e0ab.jpg?v=1745497979&width=1920",
    headline: "Summer Collection",
    subtext: "Effortless style for the season",
    ctaText: "Explore",
    ctaLink: "/collection/mens",
  },
  {
    id: 3,
    image: "https://shopbrumano.com/cdn/shop/files/1_7e8f19a8-68ec-43c5-87dd-c8c17ca1b40e.jpg?v=1745326587&width=1920",
    headline: "Premium Formals",
    subtext: "Tailored for excellence",
    ctaText: "Shop Formals",
    ctaLink: "/collection/formal-shirts",
  },
];

const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((r) => r.json())
      .then((data) => {
        if (data?.heroSlides?.length) setSlides(data.heroSlides);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative w-full" style={{ height: "clamp(400px, 70vh, 700px)" }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index: number, className: string) =>
            `<span class="${className}" style="width:${index === activeIndex ? '24px' : '8px'};height:8px;border-radius:4px;transition:all 0.3s"></span>`,
        }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end pb-20 md:items-center md:pb-0">
                <div className="container-wide w-full">
                  <div className="max-w-xl">
                    <h2
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
                      style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
                    >
                      {slide.headline}
                    </h2>
                    <p className="text-white/80 text-sm md:text-lg mb-6 max-w-md">
                      {slide.subtext}
                    </p>
                    <Link
                      href={slide.ctaLink}
                      className="inline-block bg-secondary text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-300"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Critical CSS fix: ensure non-active slides are fully hidden */}
      <style jsx global>{`
        .hero-slider .swiper-slide {
          opacity: 0 !important;
          visibility: hidden;
          transition: opacity 0.6s ease, visibility 0.6s ease;
        }
        .hero-slider .swiper-slide-active {
          opacity: 1 !important;
          visibility: visible;
        }
        .hero-slider .swiper-slide:not(.swiper-slide-active) * {
          opacity: 0;
        }
        .hero-slider .swiper-slide-active * {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
