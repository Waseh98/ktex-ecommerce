"use client";

import React, { useState, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import gsap from "gsap";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const buttonRef = useRef(null);
  const checkRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      
      // Animation
      const tl = gsap.timeline();
      tl.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
      })
      .to(buttonRef.current, {
        backgroundColor: "#1b4332", // Forest green
        width: "50px",
        borderRadius: "50%",
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      })
      .fromTo(checkRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
        "-=0.2"
      );
    }, 1500);
  };

  return (
    <div className="w-full">
      <h4 className="font-serif text-xl mb-6">Newsletter</h4>
      <p className="text-gray-400 text-sm mb-6">
        Subscribe to receive updates, access to exclusive deals, and more.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="relative group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status !== "idle"}
            className="w-full bg-transparent border-b border-gray-700 px-0 py-3 text-sm focus:outline-none focus:border-secondary transition-colors disabled:opacity-50"
          />
          <div className="absolute bottom-0 left-0 h-0.5 bg-secondary w-0 group-focus-within:w-full transition-all duration-500" />
        </div>

        <div className="flex justify-start pt-2">
          <button
            ref={buttonRef}
            type="submit"
            disabled={status !== "idle"}
            className={`h-12 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
              status === "success" 
                ? "bg-forest w-[50px] rounded-full" 
                : "bg-secondary text-white px-8 w-full hover:bg-white hover:text-primary"
            }`}
          >
            {status === "idle" && (
              <span className="text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2">
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </span>
            )}
            
            {status === "loading" && (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}

            <div ref={checkRef} className={`absolute inset-0 flex items-center justify-center ${status === 'success' ? 'opacity-100' : 'opacity-0'}`}>
              <Check size={24} className="text-white" />
            </div>
          </button>
        </div>
      </form>
      
      {status === "success" && (
        <p className="text-[10px] text-forest font-bold uppercase tracking-widest mt-4 animate-[fadeIn_0.5s_ease-out]">
          Welcome to the world of K-TEX!
        </p>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
