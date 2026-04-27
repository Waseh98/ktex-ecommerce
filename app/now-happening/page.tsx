"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const posts = [
  {
    title: "Behind the Scenes: Summer '26 Shoot",
    date: "April 15, 2026",
    excerpt: "Explore the making of our upcoming collection, inspired by the gardens of Shalimar.",
    image: "/images/hero.png"
  },
  {
    title: "Art of Embroidery: The Zari Technique",
    date: "April 10, 2026",
    excerpt: "Discover the intricate process behind our hand-worked zari embroidery.",
    image: "/images/top-picks.png"
  },
  {
    title: "Style Guide: Dressing for a Royal Wedding",
    date: "April 05, 2026",
    excerpt: "Our top picks for the festive season and how to style them for maximum impact.",
    image: "/images/bestseller-1.png"
  }
];

const NowHappeningPage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-32">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center mb-20">
              <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-6">Discover More</p>
              <h1 className="text-5xl font-serif">Now Happening</h1>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {posts.map((post, idx) => (
                <div key={idx} className="group cursor-pointer">
                   <div className="relative h-96 overflow-hidden mb-8 bg-zinc-100">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">{post.date}</p>
                   <h3 className="text-2xl font-serif mb-4 group-hover:text-secondary transition-colors">{post.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed mb-6">{post.excerpt}</p>
                   <button className="text-[10px] font-bold uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
                      Read More
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default NowHappeningPage;
