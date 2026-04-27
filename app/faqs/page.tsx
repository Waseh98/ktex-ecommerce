"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return policy for all unworn garments with original tags attached. Please note that custom-tailored items are non-returnable unless defective."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email. You can also track your order directly on our 'Track Order' page."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location and will be calculated at checkout."
  },
  {
    question: "How should I care for my K-TEX garments?",
    answer: "Most of our ethnic wear requires dry cleaning. Please refer to our 'Cloth Care' page for detailed instructions for different fabrics like silk, velvet, and lawn."
  }
];

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-32 bg-ivory">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
           <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-6 text-center">Support</p>
           <h1 className="text-4xl md:text-5xl font-serif mb-16 text-center">Frequently Asked Questions</h1>
           
           <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white shadow-sm border border-gray-50">
                   <button 
                     onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                     className="w-full p-6 flex justify-between items-center text-left hover:bg-zinc-50 transition-colors"
                   >
                      <span className="text-sm font-bold uppercase tracking-widest text-primary">{faq.question}</span>
                      {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                   </button>
                   <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">
                         {faq.answer}
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-20 text-center">
              <p className="text-gray-400 text-sm mb-6 font-serif italic">Still have questions?</p>
              <button className="px-8 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all">
                 Contact Support
              </button>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default FAQsPage;
