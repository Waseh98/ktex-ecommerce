"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartDrawer = () => {
  const { isOpen, closeCart, items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCart} />
      
      <div className={`absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag size={24} />
              <h2 className="text-xl font-serif">Your Bag ({items.length})</h2>
            </div>
            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag size={64} className="text-gray-200 mb-6" />
                <p className="text-lg text-gray-500 font-serif mb-8">Your bag is empty</p>
                <button onClick={closeCart} className="bg-secondary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold leading-tight">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Size: {item.size} | Color: {item.color}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 hover:text-secondary"><Minus size={12} /></button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:text-secondary"><Plus size={12} /></button>
                      </div>
                      <span className="text-sm font-bold">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-zinc-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="text-xl font-bold">PKR {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center mb-6 italic">Shipping and taxes calculated at checkout</p>
              <Link href="/checkout" onClick={closeCart}>
                <button className="w-full bg-secondary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
