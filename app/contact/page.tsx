"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

const ContactPage = () => {
  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Contact Us</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-[13px] text-gray-500 mb-10 leading-relaxed">Have a question about our collections or need assistance with an order? Our team is here to help.</p>
          <div className="space-y-6">
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-secondary flex-shrink-0"><Mail size={18} /></div><div><p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Email</p><p className="text-[13px] font-medium">{BRAND.email}</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-secondary flex-shrink-0"><Phone size={18} /></div><div><p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Phone</p><p className="text-[13px] font-medium">{BRAND.phone}</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-secondary flex-shrink-0"><MapPin size={18} /></div><div><p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Address</p><p className="text-[13px] font-medium">{BRAND.address}</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0"><MessageCircle size={18} /></div><div><p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">WhatsApp</p><a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-green-600 hover:underline">{BRAND.whatsapp}</a></div></div>
          </div>
        </div>
        <div className="bg-gray-50 p-8">
          <h3 className="text-lg font-bold text-primary mb-6">Send a Message</h3>
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" />
            </div>
            <input type="text" placeholder="Phone" className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none" />
            <textarea placeholder="Your message..." rows={4} className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-secondary focus:outline-none resize-none" />
            <button className="w-full bg-primary text-white py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
