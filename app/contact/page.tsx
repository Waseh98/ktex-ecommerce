"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Mail, Phone, MapPin, MessageCircle, Send,
  Clock, CheckCircle2, User, Loader2, ChevronRight
} from "lucide-react";
import { BRAND } from "@/lib/constants";

const subjects = [
  "General Inquiry",
  "Order Support",
  "Returns & Exchange",
  "Wholesale / Corporate",
  "Feedback",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "General Inquiry", message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your Name, Email, and Message.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white blur-3xl" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-secondary">Contact Us</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-serif mb-5 tracking-tight">Get In Touch</h1>
          <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
            Questions about your order or our collections? Our team is ready to help.
          </p>
        </div>
      </section>

      <div className="container-wide -mt-12 relative z-10 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Contact Details</p>
                <h2 className="text-2xl font-bold text-primary">We'd love to hear from you</h2>
              </div>

              <div className="space-y-5">
                <a href={`mailto:${BRAND.email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors">{BRAND.email}</p>
                  </div>
                </a>

                <a href={`tel:${BRAND.phone}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                    <p className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors">{BRAND.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Address</p>
                    <p className="text-sm font-semibold text-primary leading-relaxed">{BRAND.address}</p>
                  </div>
                </div>

                <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">WhatsApp</p>
                    <p className="text-sm font-semibold text-green-600">{BRAND.whatsapp}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Click to chat instantly</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-primary text-white rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Support Hours</p>
                  <p className="text-sm font-bold">When we're available</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Monday – Friday</span>
                  <span className="font-semibold">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Saturday</span>
                  <span className="font-semibold">10:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sunday</span>
                  <span className="font-semibold text-secondary">Closed</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl p-5 transition-all shadow-lg shadow-green-200 font-bold text-sm"
            >
              <MessageCircle size={22} />
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 size={44} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-8 py-3 bg-primary text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-secondary transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Contact Form</p>
                    <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
                    <p className="text-gray-400 text-sm mt-1">Fill in the details below and we'll respond promptly.</p>
                  </div>

                  <div className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name *</label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Abdul Wasay"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm border-2 border-transparent focus:border-secondary focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address *</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm border-2 border-transparent focus:border-secondary focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="03xxxxxxxxx"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm border-2 border-transparent focus:border-secondary focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-gray-50 rounded-2xl text-sm border-2 border-transparent focus:border-secondary focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="w-full px-4 py-3.5 bg-gray-50 rounded-2xl text-sm border-2 border-transparent focus:border-secondary focus:bg-white focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-2">
                        <span>⚠️</span> {error}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-primary text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <><Loader2 size={18} className="animate-spin" /><span>Sending...</span></>
                      ) : (
                        <><Send size={16} /><span>Send Message</span></>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Map Embed */}
            <div className="mt-6 bg-white rounded-3xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.2!2d73.2!3d33.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQyJzAwLjAiTiA3M8KwMTInMDAuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KHM Group Location"
              />
              <div className="px-6 py-4 flex items-center gap-3">
                <MapPin size={16} className="text-secondary flex-shrink-0" />
                <p className="text-[11px] text-gray-500">{BRAND.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
