"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    fabric: string;
    image: string;
    hoverImage: string;
    slug: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
          
          {product.oldPrice && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest z-10">
              Sale
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 z-20">
            <button className="w-full bg-white/90 backdrop-blur-sm text-primary py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">
              Add to Bag
            </button>
          </div>
        </div>
      </Link>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{product.fabric}</p>
        <h3 className="text-sm font-medium mb-1 group-hover:text-secondary transition-colors">{product.name}</h3>
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-bold">{product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-xs">{product.oldPrice}</span>
          )}
        </div>
        
        {/* Color Dots */}
        <div className="flex space-x-1.5 mt-3">
          <div className="w-2.5 h-2.5 rounded-full bg-charcoal border border-gray-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-rose border border-gray-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-forest border border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
