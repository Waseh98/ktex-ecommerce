"use client";

import React, { useEffect } from "react";
import TopUtilityBar from "@/components/TopUtilityBar";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import CategoryMarquee from "@/components/CategoryMarquee";
import EditorialBanners from "@/components/EditorialBanners";
import TrendingProducts from "@/components/TrendingProducts";
import OccasionSlider from "@/components/OccasionSlider";
import WornAndLoved from "@/components/WornAndLoved";
import { Search, Heart, ShoppingBag, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  // Global scroll reveal listener
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal-hidden');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('reveal-visible');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  return (
    <main className="min-h-screen relative">
      <TopUtilityBar />
      <Header />
      
      {/* Homepage Sections */}
      <HeroSlider />
      <CategoryMarquee />
      <EditorialBanners />
      <TrendingProducts />
      <OccasionSlider />
      <WornAndLoved />
      <Footer />

      {/* Mobile Sticky Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 h-16 flex items-center justify-around z-[90] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
         <Link href="/" className="flex flex-col items-center space-y-1">
            <HomeIcon size={20} className="text-secondary" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
         </Link>
         <button className="flex flex-col items-center space-y-1">
            <Search size={20} className="text-gray-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Search</span>
         </button>
         <button className="flex flex-col items-center space-y-1">
            <Heart size={20} className="text-gray-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Wishlist</span>
         </button>
         <Link href="/checkout" className="flex flex-col items-center space-y-1">
            <ShoppingBag size={20} className="text-gray-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Bag</span>
         </Link>
      </div>
    </main>
  );
}
