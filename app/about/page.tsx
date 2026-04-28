"use client";
import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      <div className="py-12 bg-white">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
            <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
            <span className="text-primary">About Us</span>
          </nav>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">The Story of K-TEX</h1>
            <div className="w-12 h-[2px] bg-secondary mx-auto mb-10" />
            <div className="space-y-6 text-[14px] text-gray-600 leading-[1.8] text-justify">
              <p>K-TEX was born out of a desire to bridge the gap between traditional craftsmanship and contemporary luxury. Rooted in the rich cultural tapestry of Pakistan, we believe that every thread tells a story of heritage, passion, and artisanal excellence.</p>
              <p>Our journey began in the heart of the textile industry, where we witnessed the incredible skill of local weavers and artisans. We set out to create a brand that would not only showcase this talent but elevate it to the global stage.</p>
              <p>Today, K-TEX is synonymous with premium menswear. From our structured formal shirts to our contemporary polo collections, every piece is crafted for the modern gentleman — confident, elegant, and discerning.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div><h3 className="text-lg font-bold text-primary mb-3">Artisanal Quality</h3><p className="text-[13px] text-gray-500 leading-relaxed">Every garment is meticulously crafted using time-honored techniques passed down through generations.</p></div>
            <div><h3 className="text-lg font-bold text-primary mb-3">Sustainable Luxury</h3><p className="text-[13px] text-gray-500 leading-relaxed">We are committed to ethical production and sourcing the finest natural fibers for our collections.</p></div>
            <div><h3 className="text-lg font-bold text-primary mb-3">Global Heritage</h3><p className="text-[13px] text-gray-500 leading-relaxed">While deeply rooted in Pakistan, our designs speak a universal language of elegance and sophistication.</p></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
