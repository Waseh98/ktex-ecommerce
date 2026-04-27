"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-20 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Contact Info */}
                <div>
                   <p className="text-secondary font-bold uppercase tracking-[0.3em] mb-6">Get in Touch</p>
                   <h1 className="text-5xl font-serif mb-12">Contact Us</h1>
                   <p className="text-gray-500 mb-12 leading-relaxed">
                      Have a question about our collections or need assistance with an order? Our team is here to help you experience the luxury of K-TEX.
                   </p>

                   <div className="space-y-8">
                      <div className="flex items-start space-x-6">
                         <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-secondary">
                            <Mail size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Email Support</p>
                            <p className="text-sm font-medium">support@k-tex.com</p>
                         </div>
                      </div>
                      <div className="flex items-start space-x-6">
                         <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-secondary">
                            <Phone size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Call Us</p>
                            <p className="text-sm font-medium">+92 21 3456789</p>
                         </div>
                      </div>
                      <div className="flex items-start space-x-6">
                         <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center text-secondary">
                            <MapPin size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Head Office</p>
                            <p className="text-sm font-medium">Plot 45-C, Phase 6, DHA, Karachi, Pakistan</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-10 shadow-xl">
                   <h3 className="text-2xl font-serif mb-8">Send a Message</h3>
                   <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                         <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border-b border-gray-100 focus:border-secondary focus:outline-none transition-colors text-sm" />
                         <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border-b border-gray-100 focus:border-secondary focus:outline-none transition-colors text-sm" />
                      </div>
                      <input type="text" placeholder="Subject" className="w-full px-4 py-3 border-b border-gray-100 focus:border-secondary focus:outline-none transition-colors text-sm" />
                      <textarea placeholder="How can we help?" rows={5} className="w-full px-4 py-3 border-b border-gray-100 focus:border-secondary focus:outline-none transition-colors text-sm resize-none" />
                      <button className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all">
                         Send Message
                      </button>
                   </form>
                </div>
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ContactPage;
