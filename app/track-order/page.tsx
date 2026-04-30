"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Package, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag, MapPin, Calendar } from "lucide-react";

interface OrderStatus {
  orderId: string;
  status: string;
  statusKey: string;
  total: number;
  createdAt: string;
  itemsCount: number;
  shippingInfo: {
    firstName: string;
    lastName: string;
    city: string;
  };
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Track button clicked! ID:", orderId, "Email:", email);
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/track?orderId=${orderId}&email=${email}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || "Could not find your order.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "PENDING_PAYMENT", label: "Pending Payment", icon: Clock },
    { key: "PAID", label: "Confirmed", icon: CheckCircle2 },
    { key: "PROCESSING", label: "Processing", icon: Package },
    { key: "SHIPPED", label: "Shipped", icon: Truck },
    { key: "DELIVERED", label: "Delivered", icon: MapPin },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order?.statusKey);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-wide relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-20">/</span>
            <span>Support</span>
            <span className="opacity-20">/</span>
            <span className="text-secondary">Track Order</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Track Your Journey</h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Enter your order details below to get real-time updates on your K-TEX luxury delivery.
          </p>
        </div>
      </section>

      <div className="container-wide -mt-12 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Tracking Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10">
            <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="md:col-span-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Order ID</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. KTX-12345"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>
              <div className="md:col-span-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Email Address</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="bg-primary text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Search size={16} />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 text-sm animate-[fadeIn_0.3s_ease-out]">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {order && (
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
              {/* Status Stepper */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b border-gray-50 pb-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1">Current Status</p>
                    <h2 className="text-3xl font-bold text-primary">{order.status}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Order Date</p>
                    <p className="text-sm text-primary font-medium">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block" />
                  <div 
                    className="absolute top-1/2 left-0 h-0.5 bg-secondary -translate-y-1/2 transition-all duration-1000 hidden md:block" 
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                  />

                  <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;

                      return (
                        <div key={step.key} className="flex md:flex-col items-center gap-4 md:gap-3 group">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isActive ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "bg-white border-2 border-gray-100 text-gray-300"
                          } ${isCurrent ? "scale-110 ring-4 ring-secondary/10" : ""}`}>
                            <Icon size={20} />
                          </div>
                          <div className="text-left md:text-center">
                            <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                              isActive ? "text-primary" : "text-gray-300"
                            }`}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-[8px] text-secondary font-bold uppercase tracking-tighter mt-0.5">Active</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary">
                    <ShoppingBag size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Items Ordered</p>
                    <p className="text-lg font-bold text-primary">{order.itemsCount} Items</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Delivery City</p>
                    <p className="text-lg font-bold text-primary">{order.shippingInfo.city}</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Total Amount</p>
                    <p className="text-lg font-bold text-primary">Rs. {order.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8">
                <p className="text-sm text-gray-400 mb-4">Need help with your order?</p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all underline underline-offset-8"
                >
                  Contact Support 💬
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
