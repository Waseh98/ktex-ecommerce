"use client";
import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Terms & Conditions</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Terms & Conditions</h1>
      <div className="space-y-6 text-[13px] text-gray-600 leading-relaxed">
        <section><h3 className="text-base font-bold text-primary mb-2">1. Acceptance of Terms</h3><p>By accessing or using the K-TEX website, you agree to be bound by these Terms and Conditions.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">2. Product Availability</h3><p>All products are subject to availability. We reserve the right to limit the quantity of any product we supply.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">3. Pricing and Payments</h3><p>Prices are in PKR and subject to change. We accept Cash on Delivery, Bank Transfer, JazzCash, and EasyPaisa.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">4. Shipping</h3><p>Standard delivery within Pakistan takes 3-5 business days. Free shipping on orders above Rs. 5,000.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">5. Returns & Exchanges</h3><p>We offer a 7-day exchange/return policy. Items must be in original condition with tags attached.</p></section>
      </div>
    </div>
  );
}
