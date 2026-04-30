"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, MessageSquare, ThumbsUp, CheckCircle2, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Review { 
  id: number; 
  name: string; 
  rating: number; 
  text: string; 
  product: string; 
  date: string;
  image?: string;
  location?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then(r => r.json())
      .then(data => { 
        if (Array.isArray(data)) {
          setReviews(data.filter((r: any) => r.visible !== false));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "4.9";

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Math.round(r.rating) === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => Math.round(r.rating) === star).length / reviews.length) * 100 
      : (star === 5 ? 85 : star === 4 ? 10 : 5)
  }));

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-white">Customer Reviews</span>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Voices of Excellence</h1>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl font-light leading-relaxed mb-8">
              Discover why thousands of customers trust K-TEX for their premium fashion needs. 
              Authentic stories of quality, craft, and style.
            </p>
            
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold">{averageRating}</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={16} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                    Average Customer Rating
                  </div>
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden bg-gray-200">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center text-[10px] font-bold">
                    +2k
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                  Verified Global Buyers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Summary Stats */}
      <section className="py-12 border-b border-gray-100 bg-gray-50/50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Rating Distribution</h3>
              {ratingCounts.map(item => (
                <div key={item.star} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-xs font-bold">{item.star}</span>
                    <Star size={12} className="fill-gray-300 text-gray-300" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary transition-all duration-1000" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-[10px] font-bold text-gray-400">{Math.round(item.percentage)}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-2 hidden lg:flex justify-center">
               <div className="w-px h-48 bg-gray-200"></div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest">Share Your Experience</h4>
                    <p className="text-[11px] text-gray-400 mt-1">Your feedback helps us grow and improve.</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-lg">
                  Write A Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-serif mb-2">Customer Feedback</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Showing {reviews.length || 24} verified reviews</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search reviews..." 
                  className="pl-10 pr-6 py-3 border border-gray-100 bg-gray-50 rounded-full text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-secondary transition-all w-full md:w-64"
                />
              </div>
              <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
                <Filter size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-50 h-64 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.length > 0 ? reviews.map((review, idx) => (
                <div 
                  key={review.id || idx} 
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group animate-[fadeIn_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i <= review.rating ? "fill-secondary text-secondary" : "text-gray-200"} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{review.date || 'April 2024'}</span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-8 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary font-bold text-lg overflow-hidden uppercase">
                      {review.image ? <img src={review.image} className="w-full h-full object-cover" /> : review.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider">{review.name}</p>
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-[8px] font-bold uppercase text-green-500 tracking-tighter">Verified Buyer</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">{review.product || "Premium Collection"}</p>
                    </div>
                    <button className="text-gray-300 hover:text-secondary transition-colors">
                      <ThumbsUp size={14} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-24 text-center">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                      <MessageSquare size={32} />
                   </div>
                   <h3 className="text-lg font-serif mb-2">No reviews yet</h3>
                   <p className="text-gray-400 text-xs">Be the first to share your experience!</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-20 text-center">
            <button className="px-12 py-5 border border-primary text-primary text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-xl">
              Load More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Happy Customers", val: "10,000+" },
              { label: "Quality Checks", val: "100%" },
              { label: "Store Locations", val: "15+" },
              { label: "Years of Craft", val: "25+" }
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-serif mb-2 text-secondary">{stat.val}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
