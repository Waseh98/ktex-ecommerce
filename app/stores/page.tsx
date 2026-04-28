"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function StoresPage() {
  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Our Stores</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Our Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-8">
          <h3 className="text-lg font-bold text-primary mb-4">Main Store — Karachi</h3>
          <div className="space-y-3 text-[13px] text-gray-600">
            <p className="flex items-start gap-3"><MapPin size={16} className="text-secondary mt-0.5 flex-shrink-0" />{BRAND.address}</p>
            <p className="flex items-center gap-3"><Phone size={16} className="text-secondary flex-shrink-0" />{BRAND.phone}</p>
            <p className="flex items-center gap-3"><Mail size={16} className="text-secondary flex-shrink-0" />{BRAND.email}</p>
          </div>
          <p className="text-[12px] text-gray-400 mt-4">Mon-Sat: 10:00 AM - 9:00 PM | Sun: 2:00 PM - 9:00 PM</p>
        </div>
        <div className="bg-gray-100 flex items-center justify-center min-h-[300px]">
          <p className="text-[13px] text-gray-400">Google Map embed placeholder</p>
        </div>
      </div>
    </div>
  );
}
