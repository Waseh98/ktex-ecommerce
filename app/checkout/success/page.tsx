"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Mail, ArrowRight, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="pt-40 pb-20 bg-ivory">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
           <div className="bg-green-50 p-4 rounded-full">
              <CheckCircle2 size={64} className="text-green-600 animate-[scaleIn_0.5s_ease-out]" />
           </div>
        </div>
        
        <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-4">Payment Successful</p>
        <h1 className="text-4xl md:text-6xl font-serif mb-8">Thank You for Your Order</h1>
        
        <div className="bg-white p-10 shadow-sm border border-gray-100 mb-12">
           <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-8 border-b border-gray-50">
              <div className="text-left mb-4 md:mb-0">
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order Number</p>
                 <p className="text-sm font-mono font-bold text-primary">{orderId}</p>
              </div>
              <div className="text-left md:text-right">
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</p>
                 <p className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block uppercase tracking-widest">Processing</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="flex space-x-4">
                 <div className="bg-ivory p-3 rounded-xl h-fit"><Package size={20} className="text-primary" /></div>
                 <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Track Shipping</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">You will receive an SMS and email as soon as your items are dispatched.</p>
                 </div>
              </div>
              <div className="flex space-x-4">
                 <div className="bg-ivory p-3 rounded-xl h-fit"><Mail size={20} className="text-primary" /></div>
                 <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Need Help?</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Contact us at support@k-tex.pk for any order-related queries.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
           <Link href="/collection/new-in" className="w-full md:w-auto px-10 py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center space-x-2">
              <span>Continue Shopping</span>
              <ShoppingBag size={14} />
           </Link>
           <Link href="/account" className="w-full md:w-auto px-10 py-4 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2">
              <span>View Order History</span>
              <ArrowRight size={14} />
           </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
