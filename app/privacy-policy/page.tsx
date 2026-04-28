"use client";
import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Privacy Policy</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-[13px] text-gray-600 leading-relaxed">
        <section><h3 className="text-base font-bold text-primary mb-2">1. Information We Collect</h3><p>We collect information you provide when you create an account, make a purchase, or contact us. This includes your name, email, phone number, and shipping address.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">2. How We Use Your Information</h3><p>Your information is used to process orders, provide customer support, and send promotional offers. We do not sell your personal data.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">3. Security</h3><p>We implement industry-standard security measures to protect your information. All transactions are encrypted using SSL.</p></section>
        <section><h3 className="text-base font-bold text-primary mb-2">4. Cookies</h3><p>We use cookies to enhance your browsing experience and analyze website traffic. You can manage cookie preferences through your browser.</p></section>
      </div>
    </div>
  );
}
