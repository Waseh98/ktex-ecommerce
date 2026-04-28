"use client";
import React from "react";
import Link from "next/link";

export default function NowHappeningPage() {
  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Now Happening</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Now Happening</h1>
      <p className="text-[13px] text-gray-500">Check out our <Link href="/blogs" className="text-secondary hover:underline">Blog</Link> for the latest updates and articles.</p>
    </div>
  );
}
