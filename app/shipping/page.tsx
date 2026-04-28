"use client";
import React from "react";
import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Shipping Information</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Shipping Information</h1>
      <div className="prose prose-sm text-gray-600 space-y-6">
        <div><h3 className="text-lg font-bold text-primary mb-2">Delivery Timeline</h3><p>Standard delivery within Pakistan takes 3-5 business days. For major cities (Karachi, Lahore, Islamabad), delivery is typically within 2-3 business days.</p></div>
        <div><h3 className="text-lg font-bold text-primary mb-2">Shipping Charges</h3><p>Free shipping on all orders above Rs. 5,000. A flat shipping fee of Rs. 250 applies to orders below Rs. 5,000.</p></div>
        <div><h3 className="text-lg font-bold text-primary mb-2">Order Processing</h3><p>Orders are processed within 24 hours (excluding weekends and public holidays). You will receive a tracking number via email once your order is dispatched.</p></div>
        <div><h3 className="text-lg font-bold text-primary mb-2">International Shipping</h3><p>International shipping is available on request. Please contact us for rates and delivery timelines.</p></div>
      </div>
    </div>
  );
}
