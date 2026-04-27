"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, Package } from "lucide-react";
import Logo from "./Logo";
import { useCartStore } from "@/store/useCartStore";

const navItems = [
  { 
    name: "Men", 
    sub: [
      { name: "Kurtas", slug: "kurtas" },
      { name: "Waistcoats", slug: "waistcoats" },
      { name: "Sherwanis", slug: "sherwanis" },
      { name: "Unstitched", slug: "unstitched" },
      { name: "Luxury Formals", slug: "luxury-formals" },
      { name: "Trousers", slug: "trousers" }
    ] 
  },
  { 
    name: "Grooms", 
    sub: [
      { name: "Sherwanis", slug: "grooms-sherwanis" },
      { name: "Couture", slug: "grooms-couture" },
      { name: "Groom Accessories", slug: "grooms-accessories" },
      { name: "Prince Coats", slug: "grooms-prince-coats" }
    ] 
  },
  { 
    name: "Accessories", 
    sub: [
      { name: "Cufflinks", slug: "cufflinks" },
      { name: "Pocket Squares", slug: "pocket-squares" },
      { name: "Footwear", slug: "footwear" }
    ] 
  },
  { 
    name: "Special Offers", 
    sub: [
      { name: "Clearance Sale", slug: "clearance-sale" },
      { name: "Last Chance", slug: "last-chance" },
      { name: "Bundle Deals", slug: "bundle-deals" }
    ] 
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Men");
  const { items } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'h-14 mt-0' : 'h-20 mt-9'}`}>
        <div className="container-wide h-full flex items-center justify-between relative">
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2">
            <Menu size={24} />
          </button>

          {/* Left: Desktop Gender Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="group relative py-4">
                <button 
                  className={`text-[11px] font-bold uppercase tracking-widest underline-animate ${activeTab === item.name ? 'underline-active text-secondary' : 'text-primary'}`}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.name}
                </button>
                
                {/* Mega Menu Panel */}
                <div className="mega-menu-panel px-12 py-10">
                  <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-2 grid grid-cols-2 gap-8">
                       <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-2">{item.name} Categories</h4>
                          <ul className="space-y-4">
                             {item.sub.map(s => (
                               <li key={s.slug}><Link href={`/collection/${s.slug}`} className="text-sm hover:text-secondary transition-colors">{s.name}</Link></li>
                             ))}
                          </ul>
                       </div>
                       <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-2">Collections</h4>
                          <ul className="space-y-4">
                             <li><Link href="/collection/summer-26" className="text-sm hover:text-secondary transition-colors">Summer '26</Link></li>
                             <li><Link href="/collection/festive-edit" className="text-sm hover:text-secondary transition-colors">Festive Edit</Link></li>
                             <li><Link href="/collection/groom-couture" className="text-sm hover:text-secondary transition-colors">Groom Couture</Link></li>
                          </ul>
                       </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-6">
                       <div className="hover-zoom relative group/tile">
                          <div className="aspect-[3/4] bg-zinc-100 overflow-hidden rounded-sm">
                             <img src="/images/bestseller-1.svg" alt="Promo" className="w-full h-full object-cover" />
                          </div>
                          <div className="mt-4">
                             <p className="text-xs font-bold uppercase tracking-widest">New Arrivals</p>
                             <button className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1 border-b border-secondary">Avail Discount</button>
                          </div>
                       </div>
                       <div className="hover-zoom relative group/tile">
                          <div className="aspect-[3/4] bg-zinc-100 overflow-hidden rounded-sm">
                             <img src="/images/bestseller-2.svg" alt="Promo" className="w-full h-full object-cover" />
                          </div>
                          <div className="mt-4">
                             <p className="text-xs font-bold uppercase tracking-widest">Bestsellers</p>
                             <button className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1 border-b border-secondary">Explore More</button>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <Logo className={`transition-all duration-500 ${isScrolled ? 'h-8' : 'h-12'}`} />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Link href="/track-order" className="hidden lg:flex items-center space-x-2 px-3 py-2 hover:text-secondary transition-colors group">
              <Package size={18} strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Track Order</span>
            </Link>
            <button className="p-2 hover:text-secondary transition-colors"><Search size={20} /></button>
            <button className="p-2 hover:text-secondary transition-colors hidden sm:block"><Heart size={20} /></button>
            <Link href="/checkout" className="p-2 relative hover:text-secondary transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white transition-transform duration-350 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                 <Logo className="h-8" />
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
              </div>
              <nav className="space-y-6">
                 {navItems.map(item => (
                   <div key={item.name} className="border-b border-gray-50 pb-4">
                      <div className="mb-4">
                         <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{item.name}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-4 pl-2">
                         {item.sub.map(s => (
                           <Link 
                             key={s.slug} 
                             href={`/collection/${s.slug}`}
                             onClick={() => setIsMobileMenuOpen(false)}
                             className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-primary"
                           >
                              <span>{s.name}</span>
                              <ChevronRight size={14} className="text-secondary" />
                           </Link>
                         ))}
                      </div>
                   </div>
                 ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-gray-100 text-[10px] font-bold uppercase tracking-[0.2em] space-y-4">
                 <Link href="#" className="block">Store Locator</Link>
                 <Link href="/track-order" className="flex items-center space-x-3 text-gray-600 hover:text-secondary">
                    <Package size={16} />
                    <span>Track Order</span>
                 </Link>
                 <Link href="#" className="block text-secondary">Contact Support</Link>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;
