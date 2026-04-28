"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { BRAND } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  information: [
    { label: "Stores", href: "/stores" },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Reviews", href: "/reviews" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Corporate Orders", href: "/corporate-orders" },
  ],
  customerCare: [
    { label: "Track Order", href: "/track-order" },
    { label: "Contact Us", href: "/contact" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping Information", href: "/shipping" },
    { label: "Exchange & Return Policy", href: "/exchange-return" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Blogs", href: "/blogs" },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ backgroundColor: "#1A1C2B", color: "#F8F8F6" }}>
      {/* Main Footer */}
      <div className="container-wide pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Column 1 — Information */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white">
              Information
            </h4>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Customer Care */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {footerLinks.customerCare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Payments */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white">
              Payments
            </h4>
            <ul className="space-y-3">
              <li className="text-[13px] text-gray-400">Bank Transfer</li>
              <li className="text-[13px] text-gray-400">Cash on Delivery</li>
              <li className="text-[13px] text-gray-400">JazzCash</li>
              <li className="text-[13px] text-gray-400">EasyPaisa</li>
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white">
              Newsletter
            </h4>
            <p className="text-[13px] text-gray-400 mb-5 leading-relaxed">
              Subscribe to receive exclusive access to new collections and special offers.
            </p>
            <div className="relative mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-secondary transition-colors rounded-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-secondary transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-secondary transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* YouTube */}
              <a href={BRAND.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-secondary transition-colors" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              {/* Pinterest */}
              <a href={BRAND.social.pinterest} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-secondary transition-colors" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 12a4 4 0 1 1 8 0c0 2.5-1 4.5-2.5 5.5"></path>
                  <path d="M9 17l1-5"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Brand Info */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <Logo className="h-7" invert />
              <div className="text-[11px] text-gray-500 space-y-1">
                <p>{BRAND.address}</p>
                <p>
                  Email: {BRAND.email} | Phone: {BRAND.phone} |{" "}
                  <a href={BRAND.whatsappLink} className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>

            {/* Right: Payment Logos */}
            <div className="flex items-center gap-5 opacity-50 hover:opacity-100 transition-opacity">
              <span className="text-xs font-black italic tracking-tighter text-white">VISA</span>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-4 h-4 rounded-full bg-orange-400 opacity-80 -ml-1.5"></div>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400">JAZZCASH</span>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400">EASYPAISA</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
