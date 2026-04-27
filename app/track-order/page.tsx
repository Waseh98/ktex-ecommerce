"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Package, MapPin, Clock } from "lucide-react";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");

  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-32 bg-ivory">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-2xl">
          <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-6">Track Your Luxury</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Where is my K-TEX?</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-12">
            Enter your Order ID and the email address used during checkout to see the current status of your shipment.
          </p>

          <form className="bg-white p-8 md:p-12 shadow-xl space-y-8 text-left">
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</label>
               <input 
                 type="text" 
                 placeholder="e.g. #KT-12345" 
                 className="w-full px-4 py-3 border border-gray-100 focus:border-secondary focus:outline-none transition-colors text-sm"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Billing Email</label>
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="w-full px-4 py-3 border border-gray-100 focus:border-secondary focus:outline-none transition-colors text-sm"
               />
            </div>
            <button className="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all flex items-center justify-center space-x-3">
               <Search size={16} />
               <span>Track Order</span>
            </button>
          </form>

          {/* Status Timeline Placeholder (Hidden by default) */}
          <div className="mt-16 space-y-8 text-left animate-[fadeIn_0.5s_ease-out]">
             <div className="flex items-center space-x-6 pb-8 border-b border-gray-200">
                <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center text-forest">
                   <Package size={24} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-400">Current Status</p>
                   <p className="text-lg font-bold">Shipped & In Transit</p>
                </div>
             </div>
             
             <div className="relative pl-8 space-y-12">
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-100" />
                
                {[
                  { title: "Order Dispatched", time: "Today, 10:45 AM", icon: <Truck size={14} />, current: true },
                  { title: "Order Confirmed", time: "Yesterday, 02:20 PM", icon: <CheckCircle size={14} />, current: false },
                  { title: "Order Placed", time: "Yesterday, 02:15 PM", icon: <Clock size={14} />, current: false },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-10 top-0 w-4 h-4 rounded-full border-2 ${step.current ? 'bg-secondary border-secondary' : 'bg-white border-gray-200'}`} />
                    <div>
                       <p className={`text-sm font-bold ${step.current ? 'text-primary' : 'text-gray-400'}`}>{step.title}</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{step.time}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

const Truck = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><circle cx="7" cy="18" r="2"/><path d="M15 18h9V10l-3-3h-6v11"/><circle cx="21" cy="18" r="2"/></svg>
);

const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default TrackOrderPage;
