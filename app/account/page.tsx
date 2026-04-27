"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";

const AccountPage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-20 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 space-y-2">
               <button className="w-full flex items-center space-x-4 px-6 py-4 bg-white shadow-sm border-l-4 border-secondary text-primary font-bold uppercase tracking-widest text-xs">
                  <User size={18} />
                  <span>Profile Info</span>
               </button>
               <button className="w-full flex items-center space-x-4 px-6 py-4 bg-white hover:bg-zinc-100 transition-colors text-gray-500 font-bold uppercase tracking-widest text-xs text-left">
                  <Package size={18} />
                  <span>My Orders</span>
               </button>
               <button className="w-full flex items-center space-x-4 px-6 py-4 bg-white hover:bg-zinc-100 transition-colors text-gray-500 font-bold uppercase tracking-widest text-xs text-left">
                  <Heart size={18} />
                  <span>Wishlist</span>
               </button>
               <button className="w-full flex items-center space-x-4 px-6 py-4 bg-white hover:bg-zinc-100 transition-colors text-gray-500 font-bold uppercase tracking-widest text-xs text-left">
                  <Settings size={18} />
                  <span>Account Settings</span>
               </button>
               <button className="w-full flex items-center space-x-4 px-6 py-4 bg-white hover:bg-red-50 text-red-500 transition-colors font-bold uppercase tracking-widest text-xs text-left">
                  <LogOut size={18} />
                  <span>Logout</span>
               </button>
            </aside>

            {/* Content Area */}
            <div className="flex-1 space-y-8">
               <div className="bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-serif mb-8 text-primary">Personal Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">First Name</p>
                        <p className="text-sm font-medium border-b border-gray-100 pb-2">Arshman</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Last Name</p>
                        <p className="text-sm font-medium border-b border-gray-100 pb-2">Ahmed</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Email Address</p>
                        <p className="text-sm font-medium border-b border-gray-100 pb-2">arshman@example.com</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Phone Number</p>
                        <p className="text-sm font-medium border-b border-gray-100 pb-2">+92 300 1234567</p>
                     </div>
                  </div>
                  <button className="mt-12 px-8 py-3 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all">
                     Update Profile
                  </button>
               </div>

               <div className="bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-serif mb-8 text-primary">Shipping Address</h2>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-sm mb-6">
                     House #123, Block 4, Gulshan-e-Iqbal, Karachi, Pakistan.
                  </p>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                     Edit Address
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default AccountPage;
