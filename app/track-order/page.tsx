"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Package, Clock } from "lucide-react";

const Truck = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><circle cx="7" cy="18" r="2"/><path d="M15 18h9V10l-3-3h-6v11"/><circle cx="21" cy="18" r="2"/></svg>
);
const CheckCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  return (
    <div className="container-wide py-12 max-w-2xl mx-auto">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Track Order</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 text-center">Track Your Order</h1>
      <p className="text-[13px] text-gray-500 text-center mb-8">Enter your Order ID and email to see the current status.</p>
      <form className="bg-gray-50 p-8 space-y-6 text-left">
        <div><label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Order ID</label><input type="text" placeholder="e.g. #KT-12345" className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
        <div><label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Billing Email</label><input type="email" placeholder="your@email.com" className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
        <button className="w-full bg-primary text-white py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-colors flex items-center justify-center gap-2"><Search size={16} /><span>Track Order</span></button>
      </form>
    </div>
  );
}
