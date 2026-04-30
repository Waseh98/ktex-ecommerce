"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight, Smartphone, CreditCard } from "lucide-react";

const MockPaymentGateway = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const email = searchParams.get("email");
  const [method, setMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (status: "success" | "failure") => {
    setIsProcessing(true);
    
    try {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 2000));

      // Use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch("/api/payments/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        if (status === "success") {
          router.push(`/checkout/success?orderId=${orderId}&email=${email}`);
        } else {
          alert("Payment Failed. Please try again.");
          setIsProcessing(false);
        }
      } else {
        alert(data.message || "Payment verification failed. Please contact support.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Webhook Error:", error);
      alert("Network error. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-8 text-white text-center relative">
          <div className="absolute top-4 left-4 opacity-20"><ShieldCheck size={40} /></div>
          <h1 className="text-2xl font-bold tracking-tighter mb-2">Secure Checkout</h1>
          <p className="text-ivory/60 text-xs uppercase tracking-widest">K-TEX Premium E-Commerce</p>
        </div>

        {/* Amount Section */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-zinc-50">
           <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total Amount</p>
              <p className="text-2xl font-bold text-primary">PKR {amount}</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order ID</p>
              <p className="text-xs font-mono text-gray-600">{orderId}</p>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="p-8 space-y-6">
           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Select Payment Method</p>
           
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setMethod("card")}
                className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${method === "card" ? "border-secondary bg-secondary/5" : "border-gray-100 hover:border-gray-200"}`}
              >
                <CreditCard size={24} className={method === "card" ? "text-secondary" : "text-gray-400"} />
                <span className="text-[10px] font-bold uppercase mt-2">Card</span>
              </button>
              <button 
                onClick={() => setMethod("wallet")}
                className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${method === "wallet" ? "border-secondary bg-secondary/5" : "border-gray-100 hover:border-gray-200"}`}
              >
                <Smartphone size={24} className={method === "wallet" ? "text-secondary" : "text-gray-400"} />
                <span className="text-[10px] font-bold uppercase mt-2">Wallet</span>
              </button>
           </div>

           {method === "wallet" && (
             <div className="flex justify-center space-x-6 py-4">
                <div className="text-xs font-bold text-blue-600">JazzCash</div>
                <div className="text-xs font-bold text-green-600">EasyPaisa</div>
                <div className="text-xs font-bold text-orange-600">SadaPay</div>
             </div>
           )}

           <div className="space-y-4 pt-4">
              <button 
                disabled={isProcessing}
                onClick={() => handlePayment("success")}
                className="w-full bg-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-secondary transition-all disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : <><span>Pay Now</span> <ArrowRight size={14} /></>}
              </button>
              <button 
                disabled={isProcessing}
                onClick={() => handlePayment("failure")}
                className="w-full text-red-500 py-2 text-[10px] font-bold uppercase tracking-widest hover:underline"
              >
                Cancel / Simulate Failure
              </button>
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex items-center justify-center space-x-2 text-[9px] text-gray-400 uppercase tracking-widest">
           <Lock size={12} />
           <span>256-bit SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
};

export default function MockPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MockPaymentGateway />
    </Suspense>
  );
}
