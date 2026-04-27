"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/inventory");
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-white">
          <div className="p-12">
            {/* Branding */}
            <div className="flex flex-col items-center mb-12">
              <Logo className="h-10 mb-4" />
              <div className="flex items-center space-x-2">
                <div className="h-px w-8 bg-gray-100" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Admin Control</span>
                <div className="h-px w-8 bg-gray-100" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl text-center border border-red-100 animate-shake">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3 ml-1">Username</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-secondary transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/10 group"
              >
                <span>{loading ? "Verifying..." : "Login to Console"}</span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
             <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
               Authorized Personnel Only
             </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-gray-400 text-xs">
          Forgot credentials? Contact system administrator.
        </p>
      </div>
    </main>
  );
}
