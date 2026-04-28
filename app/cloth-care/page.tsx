"use client";
import React from "react";
import Link from "next/link";

export default function ClothCarePage() {
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Cloth Care Guide</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Cloth Care Guide</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-8">
          <h3 className="text-lg font-bold text-primary mb-4">Cotton & Linen</h3>
          <ul className="space-y-3 text-[13px] text-gray-500 list-disc pl-5">
            <li>Gentle machine wash in cold water</li><li>Use mild detergent</li><li>Air dry in shade</li><li>Iron on medium heat</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-8">
          <h3 className="text-lg font-bold text-primary mb-4">Pique & Knit</h3>
          <ul className="space-y-3 text-[13px] text-gray-500 list-disc pl-5">
            <li>Hand wash recommended</li><li>Do not wring or twist</li><li>Lay flat to dry</li><li>Steam iron if needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
