"use client";
import React from "react";
import Link from "next/link";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";

const AccountPage = () => {
  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">My Account</span>
      </nav>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-56 space-y-1">
          <button className="w-full flex items-center gap-3 px-5 py-3 bg-gray-50 border-l-2 border-secondary text-primary font-bold uppercase tracking-wider text-[11px]"><User size={16} /><span>Profile</span></button>
          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-gray-500 uppercase tracking-wider text-[11px] text-left"><Package size={16} /><span>My Orders</span></button>
          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-gray-500 uppercase tracking-wider text-[11px] text-left"><Heart size={16} /><span>Wishlist</span></button>
          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-gray-500 uppercase tracking-wider text-[11px] text-left"><Settings size={16} /><span>Settings</span></button>
          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-500 uppercase tracking-wider text-[11px] text-left"><LogOut size={16} /><span>Logout</span></button>
        </aside>
        <div className="flex-1 space-y-6">
          <div className="bg-gray-50 p-8">
            <h2 className="text-lg font-bold text-primary mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">First Name</p><p className="text-[13px] font-medium border-b border-gray-200 pb-2">Arshman</p></div>
              <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Last Name</p><p className="text-[13px] font-medium border-b border-gray-200 pb-2">Ahmed</p></div>
              <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</p><p className="text-[13px] font-medium border-b border-gray-200 pb-2">arshman@example.com</p></div>
              <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Phone</p><p className="text-[13px] font-medium border-b border-gray-200 pb-2">+92 300 1234567</p></div>
            </div>
            <button className="mt-8 px-6 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors">Update Profile</button>
          </div>
          <div className="bg-gray-50 p-8">
            <h2 className="text-lg font-bold text-primary mb-4">Shipping Address</h2>
            <p className="text-[13px] text-gray-600 mb-4">House #123, Block 4, Gulshan-e-Iqbal, Karachi, Pakistan.</p>
            <button className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">Edit Address</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
