"use client";
import React from "react";
import Link from "next/link";

export default function ExchangeReturnPage() {
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Exchange & Return Policy</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Exchange & Return Policy</h1>
      <div className="space-y-6 text-[13px] text-gray-600 leading-relaxed">
        <div><h3 className="text-lg font-bold text-primary mb-2">Exchange Policy</h3><p>We offer a 7-day easy exchange policy from the date of delivery. Items must be in their original condition with tags attached.</p></div>
        <div><h3 className="text-lg font-bold text-primary mb-2">Return Policy</h3><p>Returns are accepted within 7 days of delivery. The item must be unworn, unwashed, and in original packaging with all tags intact.</p></div>
        <div><h3 className="text-lg font-bold text-primary mb-2">How to Initiate</h3><p>To initiate an exchange or return, please contact our customer service team via email or WhatsApp with your order ID and reason for exchange/return.</p></div>
        <div><h3 className="text-lg font-bold text-primary mb-2">Refund Process</h3><p>Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be issued to the original payment method.</p></div>
      </div>
    </div>
  );
}
