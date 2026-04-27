"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { X, Mail, Lock, User } from "lucide-react";
import gsap from "gsap";

const AuthModal = () => {
  const { isModalOpen, closeModal, view, setView } = useAuthStore();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
        onClick={closeModal}
      />
      
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white shadow-2xl rounded-sm overflow-hidden"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setView("login")}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest relative transition-colors ${
                view === "login" ? "text-primary" : "text-gray-400 hover:text-primary"
              }`}
            >
              Sign In
              {view === "login" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-[slideIn_0.3s_ease]" />
              )}
            </button>
            <button
              onClick={() => setView("register")}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest relative transition-colors ${
                view === "register" ? "text-primary" : "text-gray-400 hover:text-primary"
              }`}
            >
              Sign Up
              {view === "register" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-[slideIn_0.3s_ease]" />
              )}
            </button>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-serif text-center mb-2">
              {view === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 text-[10px] text-center uppercase tracking-widest mb-8">
              Experience Premium Luxury with K-TEX
            </p>

            <form className="space-y-6">
              {view === "register" && (
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-8 pr-4 py-3 text-sm border-b border-gray-200 focus:border-secondary focus:outline-none transition-colors bg-transparent peer placeholder:transparent"
                  />
                  <label className="absolute left-8 top-0 text-[10px] uppercase tracking-widest text-gray-400 -translate-y-full peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-full peer-focus:text-[10px] transition-all">Full Name</label>
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-8 pr-4 py-3 text-sm border-b border-gray-200 focus:border-secondary focus:outline-none transition-colors bg-transparent peer placeholder-shown:pt-3"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-8 pr-4 py-3 text-sm border-b border-gray-200 focus:border-secondary focus:outline-none transition-colors bg-transparent"
                />
              </div>

              {view === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setView("forgot-password")}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-secondary transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button className="w-full bg-secondary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 transform active:scale-[0.98]">
                {view === "login" ? "Sign In" : "Register"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="px-4 bg-white text-gray-400">Or Continue With</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-3 py-3 border border-gray-200 hover:border-primary transition-colors text-[10px] font-bold uppercase tracking-widest">
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center space-x-3 py-3 border border-gray-200 hover:border-primary transition-colors text-[10px] font-bold uppercase tracking-widest">
                <span>Github</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
