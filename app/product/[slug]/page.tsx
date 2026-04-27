"use client";

import React, { useState } from "react";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import Bestsellers from "@/components/Bestsellers";
import { Heart, Share2, Ruler, ShieldCheck, Truck, RefreshCcw, Plus, Minus } from "lucide-react";
import Image from "next/image";

const product = {
  id: 1,
  name: "Charcoal Gold Zari Velvet Suit",
  price: "PKR 18,500",
  oldPrice: "PKR 24,000",
  sku: "KT-VZ-001",
  fabric: "Embroidered Velvet",
  description: "A timeless masterpiece featuring deep charcoal velvet adorned with intricate gold zari work. This three-piece ensemble includes a heavily embroidered shirt, trousers, and a luxury silk dupatta.",
  images: [
    "/images/bestseller-1.png",
    "/images/bestseller-2.png",
    "/images/bestseller-3.png",
    "/images/bestseller-4.png",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Charcoal", hex: "#1a1a1a" },
    { name: "Emerald", hex: "#1b4332" },
    { name: "Rose", hex: "#f4dada" }
  ]
};

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  return (
    <main className="min-h-screen">
      <Header />


      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Image Gallery */}
            <div className="lg:w-3/5 flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-28 flex-shrink-0 border-2 transition-all ${selectedImage === idx ? "border-secondary" : "border-transparent"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="order-1 md:order-2 flex-1 relative aspect-[3/4] overflow-hidden group cursor-zoom-in">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-150"
                />
                <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-sm">
                   <Heart size={20} className="text-primary hover:text-red-500 transition-colors" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-2/5 flex flex-col">
              <div className="mb-8">
                <p className="text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-3">{product.fabric}</p>
                <h1 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">{product.name}</h1>
                <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest">SKU: {product.sku}</p>
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-gray-400 line-through text-lg">{product.oldPrice}</span>
                  <span className="bg-red-50 text-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">40% OFF</span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4">Select Color: Charcoal</p>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className="w-10 h-10 rounded-full border-2 border-transparent hover:border-secondary p-0.5 transition-all"
                      style={{ borderColor: color.name === 'Charcoal' ? '#c9a84c' : 'transparent' }}
                    >
                      <div className="w-full h-full rounded-full border border-gray-100" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                   <p className="text-[10px] font-bold uppercase tracking-widest">Select Size</p>
                   <button className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                      <Ruler size={14} />
                      <span>Size Guide</span>
                   </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-bold transition-all border ${
                        selectedSize === size 
                          ? "bg-primary text-white border-primary" 
                          : "bg-white text-primary border-gray-200 hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and CTA */}
              <div className="flex flex-col space-y-4 mb-12">
                 <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-gray-200 h-14">
                       <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 hover:text-secondary"><Minus size={16} /></button>
                       <span className="w-10 text-center font-bold">{quantity}</span>
                       <button onClick={() => setQuantity(q => q + 1)} className="px-5 hover:text-secondary"><Plus size={16} /></button>
                    </div>
                    <button className="flex-1 h-14 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary transition-all duration-300">
                       Add to Bag
                    </button>
                 </div>
                 <button className="h-14 border border-primary text-primary text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300">
                    Buy It Now
                 </button>
              </div>

              {/* Info Accordions */}
              <div className="border-t border-gray-100">
                 {["Description", "Fabric & Care", "Shipping & Returns"].map((title) => (
                   <div key={title} className="border-b border-gray-100">
                      <button className="w-full py-5 flex justify-between items-center group">
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-secondary transition-colors">{title}</span>
                         <Plus size={14} />
                      </button>
                      {title === "Description" && (
                        <div className="pb-6 text-sm text-gray-600 leading-relaxed">
                          {product.description}
                        </div>
                      )}
                   </div>
                 ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                 <div className="flex flex-col items-center text-center">
                    <Truck size={24} className="text-secondary mb-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Worldwide Shipping</span>
                 </div>
                 <div className="flex flex-col items-center text-center">
                    <RefreshCcw size={24} className="text-secondary mb-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Easy Returns</span>
                 </div>
                 <div className="flex flex-col items-center text-center">
                    <ShieldCheck size={24} className="text-secondary mb-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">100% Authentic</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Bag */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] animate-[slideUp_0.5s_ease-out]">
         <div className="flex items-center space-x-4">
            <div className="flex-1">
               <p className="text-xs font-bold leading-tight truncate">{product.name}</p>
               <p className="text-[10px] text-gray-500">{product.price}</p>
            </div>
            <button className="flex-1 h-12 bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
               Add to Bag
            </button>
         </div>
      </div>

      {/* Recommendations */}
      <Bestsellers />

      <Footer />
      
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

