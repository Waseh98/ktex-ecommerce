"use client";
import React from "react";
import Link from "next/link";

export default function WholesalePage() {
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Wholesale</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">Wholesale Inquiries</h1>
      <p className="text-[13px] text-gray-600 mb-8 leading-relaxed">Interested in becoming a wholesale partner? We offer competitive rates for bulk orders. Fill out the form below and our team will get back to you within 48 hours.</p>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-[11px] font-bold uppercase tracking-wider mb-2">Business Name</label><input className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-[11px] font-bold uppercase tracking-wider mb-2">Contact Person</label><input className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-[11px] font-bold uppercase tracking-wider mb-2">Email</label><input type="email" className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-[11px] font-bold uppercase tracking-wider mb-2">Phone</label><input className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
        </div>
        <div><label className="block text-[11px] font-bold uppercase tracking-wider mb-2">Message</label><textarea rows={4} className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" /></div>
        <button className="bg-primary text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-colors">Submit Inquiry</button>
      </form>
    </div>
  );
}
