"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";

const Footer = () => {
  return (
    <footer 
      className="pt-24 pb-12 relative overflow-hidden" 
      style={{ backgroundColor: '#1A1C2B', color: '#F8F8F6' }}
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      
      <div className="container-wide">
        {/* Top Section: Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 border-b border-ivory/5 mb-20">
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <Truck size={20} className="text-secondary" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Worldwide Shipping</h5>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Fast & Secure delivery</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <RotateCcw size={20} className="text-secondary" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Easy Returns</h5>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">7-Day Return Policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <ShieldCheck size={20} className="text-secondary" />
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Authentic Quality</h5>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">100% Genuine Fabrics</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Main Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand Story */}
          <div className="lg:col-span-4">
            <Logo className="h-10 mb-8" invert />
            <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">
              Experience the pinnacle of South Asian luxury. K-TEX merges centuries-old craftsmanship with modern silhouettes to create timeless menswear for the discerning gentleman.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 text-xs text-gray-500">
                <MapPin size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Plot #123, Sector G-4, Korangi Industrial Area, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <Phone size={16} className="text-secondary flex-shrink-0" />
                <span>+92 21 111 222 333</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <Mail size={16} className="text-secondary flex-shrink-0" />
                <span>care@k-tex.pk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-2xl mb-8">Collection</h4>
            <ul className="space-y-4">
              {["New Arrivals", "Sherwanis", "Kurtas", "Waistcoats", "Accessories"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-500 uppercase tracking-widest hover:text-secondary hover:translate-x-1 transition-all inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-2xl mb-8">Assistance</h4>
            <ul className="space-y-4">
              {["Track Order", "Returns & Exchange", "Shipping Policy", "Privacy Policy", "FAQs"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-500 uppercase tracking-widest hover:text-secondary hover:translate-x-1 transition-all inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Connect */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-2xl mb-8">Join the inner circle</h4>
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-8 leading-loose">
              Subscribe to receive exclusive access to new collections and boutique events.
            </p>
            <div className="relative mb-12">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-ivory/20 pb-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-secondary transition-colors"
              />
              <button className="absolute right-0 bottom-4 text-secondary hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-500 hover:text-secondary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-secondary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-secondary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-secondary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600">
            © 2026 K-TEX. Handcrafted by <span className="text-gray-400">Advanced Agentic Coding</span>.
          </p>
          
          <div className="flex items-center gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <span className="text-xs font-black italic tracking-tighter text-white">VISA</span>
             <div className="flex items-center">
               <div className="w-5 h-5 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div>
               <div className="w-5 h-5 rounded-full bg-orange-400 opacity-80 mix-blend-multiply -ml-2"></div>
             </div>
             <span className="text-[10px] font-bold tracking-widest text-zinc-400">JAZZCASH</span>
             <span className="text-[10px] font-bold tracking-widest text-zinc-400">EASYPAISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
