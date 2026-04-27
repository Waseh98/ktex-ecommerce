"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import { useCartStore } from "@/store/useCartStore";
import { ChevronRight, CreditCard, Truck, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";

const steps = ["Shipping", "Review", "Payment"];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { items } = useCartStore();

  const subtotal = items.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
           <Link href="/" className="block">
              <Logo className="h-8" />
           </Link>
           <div className="flex items-center space-x-4 md:space-x-8">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center space-x-2 md:space-x-4">
                   <div className={`text-[10px] font-bold uppercase tracking-widest ${idx <= currentStep ? 'text-primary' : 'text-gray-300'}`}>
                      {step}
                   </div>
                   {idx < steps.length - 1 && <ChevronRight size={14} className="text-gray-300" />}
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Side */}
          <div className="flex-1">
             <Link href="/" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={14} />
                <span>Back to Store</span>
             </Link>

             {currentStep === 0 && (
               <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-serif">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="relative group">
                        <input type="text" placeholder="First Name" className="w-full px-0 py-4 bg-transparent border-b border-gray-200 focus:border-secondary focus:outline-none transition-colors peer" />
                        <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-gray-400 -translate-y-full transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-full peer-focus:text-[10px]">First Name</label>
                     </div>
                     <div className="relative">
                        <input type="text" placeholder="Last Name" className="w-full px-0 py-4 bg-transparent border-b border-gray-200 focus:border-secondary focus:outline-none transition-colors peer" />
                        <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-gray-400 -translate-y-full transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-full peer-focus:text-[10px]">Last Name</label>
                     </div>
                  </div>
                  <div className="relative">
                     <input type="text" placeholder="Shipping Address" className="w-full px-0 py-4 bg-transparent border-b border-gray-200 focus:border-secondary focus:outline-none transition-colors peer" />
                     <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-gray-400 -translate-y-full transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-full peer-focus:text-[10px]">Shipping Address</label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <input type="text" placeholder="City" className="w-full px-0 py-4 bg-transparent border-b border-gray-200 focus:border-secondary focus:outline-none" />
                     <input type="text" placeholder="Postal Code" className="w-full px-0 py-4 bg-transparent border-b border-gray-200 focus:border-secondary focus:outline-none" />
                     <input type="tel" placeholder="Phone Number" className="w-full px-0 py-4 bg-transparent border-b border-gray-200 focus:border-secondary focus:outline-none" />
                  </div>
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-primary text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all"
                  >
                    Continue to Review
                  </button>
               </div>
             )}

             {currentStep === 1 && (
               <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-serif">Review Your Order</h2>
                  <div className="bg-white p-8 space-y-6 shadow-sm">
                     <div className="flex justify-between items-start pb-6 border-b border-gray-100">
                        <div>
                           <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Contact</p>
                           <p className="text-sm font-medium">customer@example.com</p>
                        </div>
                        <button onClick={() => setCurrentStep(0)} className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">Change</button>
                     </div>
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Ship to</p>
                           <p className="text-sm font-medium leading-relaxed">House 123, Street 456, Karachi, Pakistan</p>
                        </div>
                        <button onClick={() => setCurrentStep(0)} className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">Change</button>
                     </div>
                  </div>
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-primary text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all"
                  >
                    Continue to Payment
                  </button>
               </div>
             )}

             {currentStep === 2 && (
               <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                  <h2 className="text-2xl font-serif">Payment Method</h2>
                  <div className="space-y-4">
                     <label className="flex items-center justify-between p-6 bg-white border border-gray-200 cursor-pointer hover:border-secondary transition-colors group">
                        <div className="flex items-center space-x-4">
                           <input type="radio" name="payment" className="w-4 h-4 accent-secondary" defaultChecked />
                           <span className="text-sm font-bold uppercase tracking-widest">Cash on Delivery (COD)</span>
                        </div>
                        <Truck size={20} className="text-gray-300 group-hover:text-secondary" />
                     </label>
                     <label className="flex items-center justify-between p-6 bg-white border border-gray-200 cursor-pointer hover:border-secondary transition-colors group">
                        <div className="flex items-center space-x-4">
                           <input type="radio" name="payment" className="w-4 h-4 accent-secondary" />
                           <span className="text-sm font-bold uppercase tracking-widest">Credit / Debit Card</span>
                        </div>
                        <CreditCard size={20} className="text-gray-300 group-hover:text-secondary" />
                     </label>
                  </div>
                  <button 
                    onClick={async () => {
                      const btn = document.getElementById('complete-order-btn');
                      if (btn) btn.innerText = 'Processing...';
                      
                      try {
                        const response = await fetch('/api/orders', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            items,
                            total: total.toLocaleString(),
                            shippingInfo: {
                              address: "House 123, Street 456, Karachi, Pakistan", // Placeholder from UI
                              email: "customer@example.com"
                            }
                          })
                        });
                        
                        const data = await response.json();
                        if (data.success && data.paymentUrl) {
                          window.location.href = data.paymentUrl;
                        } else {
                          alert('Failed to create order');
                          if (btn) btn.innerText = 'Complete Order';
                        }
                      } catch (err) {
                        console.error(err);
                        alert('Something went wrong');
                        if (btn) btn.innerText = 'Complete Order';
                      }
                    }}
                    id="complete-order-btn"
                    className="w-full bg-primary text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all"
                  >
                    Complete Order
                  </button>
               </div>
             )}
          </div>

          {/* Summary Side */}
          <div className="w-full lg:w-[400px]">
             <div className="bg-white p-8 shadow-sm">
                <h3 className="text-lg font-serif mb-8">Order Summary</h3>
                <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
                   {items.map((item) => (
                     <div key={item.id} className="flex space-x-4">
                        <div className="relative w-20 h-24 flex-shrink-0 bg-gray-50">
                           <Image src={item.image} alt={item.name} fill className="object-cover" />
                           <div className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center font-bold">{item.quantity}</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                           <p className="text-xs font-bold leading-tight mb-1">{item.name}</p>
                           <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.size} | {item.color}</p>
                           <p className="text-xs font-bold mt-2">{item.price}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="space-y-4 pt-8 border-t border-gray-100">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                      <span className="font-bold">PKR {subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                      <span className="font-bold">{shipping === 0 ? 'FREE' : `PKR ${shipping}`}</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-lg font-serif">Total</span>
                      <span className="text-2xl font-bold">PKR {total.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default CheckoutPage;
