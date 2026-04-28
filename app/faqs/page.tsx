"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { question: "What is your return policy?", answer: "We offer a 7-day easy exchange and return policy for all unworn garments with original tags attached. Please visit our Exchange & Return Policy page for details." },
  { question: "How do I track my order?", answer: "Once your order is shipped, you will receive a tracking number via email. You can also track your order on our 'Track Order' page." },
  { question: "Do you offer international shipping?", answer: "Yes, international shipping is available on request. Please contact us for rates and delivery timelines." },
  { question: "What sizes do you offer?", answer: "We offer sizes from S to XXL. Please check our Size Guide for detailed measurements to find your perfect fit." },
  { question: "What payment methods do you accept?", answer: "We accept Cash on Delivery, Bank Transfer, JazzCash, and EasyPaisa." },
  { question: "How should I care for my garments?", answer: "Most of our garments require gentle machine wash or dry cleaning. Please check the care label on each garment for specific instructions." },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="container-wide py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">FAQs</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-100">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full px-6 py-4 flex justify-between items-center text-left group">
              <span className="text-[13px] font-bold text-primary group-hover:text-secondary transition-colors">{faq.question}</span>
              {openIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-6 pb-4 text-[13px] text-gray-500 leading-relaxed">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-[13px] text-gray-400 mb-4">Still have questions?</p>
        <Link href="/contact" className="inline-block bg-primary text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-colors">Contact Support</Link>
      </div>
    </div>
  );
}
