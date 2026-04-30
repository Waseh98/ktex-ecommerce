"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Mail, ShoppingBag, ArrowRight } from "lucide-react";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const email = searchParams.get("email");
  return (
    <div className="container-wide py-20 max-w-2xl mx-auto text-center">
      <div className="mb-6 flex justify-center">
        <div className="bg-green-50 p-4 rounded-full"><CheckCircle2 size={64} className="text-green-600" /></div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">Thank You for Your Order</h1>
      <p className="text-[13px] text-gray-500 mb-8">Your order has been placed successfully.</p>
      <div className="bg-gray-50 p-8 mb-8 text-left">
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
          <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Order Number</p><p className="text-sm font-bold font-mono">{orderId}</p></div>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 uppercase tracking-wider">Processing</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3"><Package size={18} className="text-secondary flex-shrink-0" /><div><p className="text-[11px] font-bold mb-1">Tracking</p><p className="text-[12px] text-gray-500">You can track your journey in real-time below.</p></div></div>
          <div className="flex gap-3"><Mail size={18} className="text-secondary flex-shrink-0" /><div><p className="text-[11px] font-bold mb-1">Support</p><p className="text-[12px] text-gray-500">Contact care@k-tex.pk for help.</p></div></div>
        </div>
        <div className="mt-8">
           <Link 
            href={`/track-order?orderId=${encodeURIComponent(orderId || "")}&email=${encodeURIComponent(email || "")}`}
            className="w-full bg-secondary text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/20"
           >
              <span>Track Your Order Now</span>
              <ArrowRight size={14} />
           </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/collection/new-arrivals" className="px-8 py-3 bg-primary text-white text-[11px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2"><span>Continue Shopping</span><ShoppingBag size={14} /></Link>
        <Link href="/account" className="px-8 py-3 border border-primary text-primary text-[11px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"><span>View Orders</span><ArrowRight size={14} /></Link>
      </div>
    </div>
  );
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container-wide py-20 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
