"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrandStatement = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [statement, setStatement] = useState("");

  useEffect(() => {
    fetch("/api/admin/homepage", { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.brandStatement) setStatement(data.brandStatement);
        else setStatement("Rooted in heritage, designed for the future. Every stitch at K-TEX tells a story of artisanal excellence and modern luxury.");
      });
  }, []);

  useEffect(() => {
    if (!textRef.current || !statement) return;
    const chars = textRef.current.innerText.split("");
    textRef.current.innerHTML = chars
      .map((char) => `<span class="char opacity-0 inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    gsap.to(".char", {
      opacity: 1,
      duration: 0.1,
      stagger: 0.03,
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });
  }, [statement]);

  if (!statement) return null;

  return (
    <section className="py-32 bg-primary text-ivory">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-12">Crafted with Care</p>
          <h2
            ref={textRef}
            className="text-4xl md:text-6xl font-serif leading-tight mb-12"
          >
            {statement}
          </h2>
          <div className="flex justify-center">
             <div className="w-12 h-0.5 bg-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
