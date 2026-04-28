"use client";
import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function SizeGuidePage() {
  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link>
        <span>/</span>
        <span className="text-primary">Size Guide</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Size Guide</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border border-gray-200 px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Size</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Chest (in)</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Waist (in)</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Length (in)</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Shoulder (in)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "S", chest: "36-38", waist: "30-32", length: "27", shoulder: "17" },
              { size: "M", chest: "38-40", waist: "32-34", length: "28", shoulder: "17.5" },
              { size: "L", chest: "40-42", waist: "34-36", length: "29", shoulder: "18" },
              { size: "XL", chest: "42-44", waist: "36-38", length: "30", shoulder: "18.5" },
              { size: "XXL", chest: "44-46", waist: "38-40", length: "31", shoulder: "19" },
            ].map((row) => (
              <tr key={row.size} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 font-bold">{row.size}</td>
                <td className="border border-gray-200 px-4 py-3">{row.chest}</td>
                <td className="border border-gray-200 px-4 py-3">{row.waist}</td>
                <td className="border border-gray-200 px-4 py-3">{row.length}</td>
                <td className="border border-gray-200 px-4 py-3">{row.shoulder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[13px] text-gray-500 mt-6">All measurements are approximate. For the best fit, we recommend measuring yourself and comparing with the chart above.</p>
    </div>
  );
}
