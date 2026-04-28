"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

interface Review { id: number; name: string; rating: number; text: string; product: string; date: string; }

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetch("/api/admin/reviews").then(r => r.json()).then(data => { if (Array.isArray(data)) setReviews(data.filter((r: any) => r.visible !== false)); }).catch(() => {});
  }, []);

  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Reviews</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Customer Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-50 p-6 rounded-sm">
            <div className="flex gap-0.5 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= review.rating ? "fill-secondary text-secondary" : "text-gray-200"} />)}
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-[12px] font-bold text-primary">{review.name}</p>
              {review.product && <p className="text-[11px] text-gray-400 mt-0.5">{review.product}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
