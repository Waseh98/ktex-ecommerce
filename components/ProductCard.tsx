"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  salePrice?: string;
  oldPrice?: string;
  fabric: string;
  image: string;
  hoverImage: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  badge?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem, openCart } = useCartStore();
  const sizes = product.sizes || ["S", "M", "L", "XL", "XXL"];
  const colors = product.colors || [];
  const hasDiscount = product.oldPrice || product.salePrice;
  const displayPrice = product.price;
  const originalPrice = product.oldPrice || product.salePrice || "";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: `Rs. ${displayPrice}`,
      image: product.image,
      quantity: 1,
      size: selectedSize || sizes[1] || sizes[0],
      color: colors[0]?.name || "Default",
    });
    openCart();
  };

  return (
    <div className="group">
      <Link href={`/product/${product.slug || product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3 product-card-image">
          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover primary-img transition-opacity duration-500"
            loading="lazy"
          />
          {/* Hover Image */}
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover hover-img transition-opacity duration-500"
              loading="lazy"
            />
          )}

          {/* Sale Badge */}
          {product.badge && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider z-10">
              {product.badge}
            </div>
          )}

          {/* Quick View + Add to Cart overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* Quick View icon */}
          <button
            className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <Eye size={14} className="text-primary" />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div>
        <Link href={`/product/${product.slug || product.id}`}>
          <h3 className="text-[13px] font-medium text-primary mb-1 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[13px] font-bold text-primary">Rs. {displayPrice}</span>
          {hasDiscount && (
            <span className="text-[12px] text-gray-400 line-through">Rs. {originalPrice}</span>
          )}
        </div>

        {/* Size Chips */}
        <div className="flex flex-wrap gap-1 mb-2">
          {sizes.slice(0, 5).map((size) => (
            <button
              key={size}
              onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
              className={`px-2 py-0.5 text-[10px] font-medium border transition-colors ${
                selectedSize === size
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="flex gap-1.5">
            {colors.map((color) => (
              <div
                key={color.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
