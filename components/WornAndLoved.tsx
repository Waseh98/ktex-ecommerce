"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Mail } from "lucide-react";
import Logo from "./Logo";

const ugcContent = [
  { user: "@ali_k", cat: "Sherwanis", img1: "/images/bestseller-1.svg", img2: "/images/bestseller-2.svg" },
  { user: "@zayn_j", cat: "Kurtas", img1: "/images/bestseller-3.svg", img2: "/images/bestseller-4.svg" },
  { user: "@faizan_x", cat: "Waistcoats", img1: "/images/bestseller-2.svg", img2: "/images/bestseller-1.svg" },
  { user: "@osman_r", cat: "Footwear", img1: "/images/bestseller-4.svg", img2: "/images/bestseller-3.svg" },
];

const WornAndLoved = () => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="bg-white overflow-hidden">
      <div className="py-24">
        <h2 className="text-center text-4xl font-serif mb-16">Worn & Loved ❤️</h2>
        
        <div className="relative flex group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] space-x-12 px-6">
            {[...ugcContent, ...ugcContent].map((ugc, idx) => (
              <div key={idx} className="flex-shrink-0 w-[500px]">
                 <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{ugc.user}</p>
                 <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-4">{ugc.cat}</p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[3/4] overflow-hidden rounded-sm">
                       <img src={ugc.img1} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm group/btn">
                       <img src={ugc.img2} alt="Product" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/10 flex items-end p-4 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                          <button className="w-full bg-white text-primary text-[10px] font-bold uppercase tracking-widest py-3">Shop Now</button>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="py-20 bg-ivory border-y border-gray-100">
         <div className="container-wide max-w-2xl text-center">
            <h2 className="text-3xl font-serif mb-4">Join our newsletter</h2>
            <p className="text-xs text-gray-400 mb-8 uppercase tracking-widest">We'll send you updates once per week.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
               <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-sm text-xs font-bold focus:outline-none focus:border-primary transition-colors"
                  />
               </div>
               <button 
                 onClick={() => setSubscribed(true)}
                 className={`w-full sm:w-auto px-12 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center space-x-2 ${subscribed ? 'bg-green-600 text-white' : 'bg-secondary text-white hover:bg-primary'}`}
               >
                 {subscribed ? <Check size={16} className="animate-[scaleIn_0.3s_ease-out]" /> : <span>Subscribe</span>}
               </button>
            </div>
         </div>
      </div>

      {/* Removed embedded footer, using shared Footer component instead */}

      <style jsx>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default WornAndLoved;
