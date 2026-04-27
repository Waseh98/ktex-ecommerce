"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    ).fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full scale-105 animate-[kenburns_12s_ease-in-out_infinite_alternate]">
          <Image
            src="/images/hero.svg"
            alt="K-TEX Festive Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div ref={textRef}>
          <p className="text-ivory text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
            New Collection 2026
          </p>
          <h1 className="text-ivory text-5xl md:text-8xl font-serif mb-8 max-w-4xl leading-tight">
            The Festive Edit: <br /> Luxuriously Rooted
          </h1>
        </div>
        
        <div ref={buttonRef}>
          <button className="group relative px-10 py-4 bg-transparent border border-ivory text-ivory text-sm font-bold uppercase tracking-widest overflow-hidden transition-colors duration-500 hover:text-primary">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">Explore Collection</span>
            <div className="absolute inset-0 bg-ivory transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
