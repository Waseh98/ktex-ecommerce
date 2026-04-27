"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TopPicks = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax effect for image
    gsap.to(imageRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Reveal animation for text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Portrait Image Block */}
          <div className="relative w-full lg:w-1/2 h-[600px] md:h-[800px] overflow-hidden group">
            <div ref={imageRef} className="absolute inset-0 -top-20 -bottom-20">
              <Image
                src="/images/top-picks.svg"
                alt="Editorial Pick"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>

          {/* Text Block */}
          <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-start">
            <p className="text-secondary font-bold uppercase tracking-[0.2em] mb-4">
              The Editorial Choice
            </p>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-primary leading-tight">
              Crafted for the <br /> Modern Soul
            </h2>
            <div className="w-20 h-0.5 bg-secondary mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
              Explore our hand-picked selection of the season's most-loved styles. From intricate hand-embroidery to contemporary silhouettes, each piece tells a story of heritage and luxury.
            </p>
            <button className="group flex items-center space-x-4 text-sm font-bold uppercase tracking-[0.2em] hover:text-secondary transition-colors">
              <span>View All Picks</span>
              <span className="w-12 h-px bg-primary transition-all duration-300 group-hover:w-20 group-hover:bg-secondary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
