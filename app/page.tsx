"use client";

import React from "react";
import HeroSlider from "@/components/HeroSlider";
import CategoryTiles from "@/components/CategoryTiles";
import NewArrivals from "@/components/NewArrivals";
import ShopTheLook from "@/components/ShopTheLook";
import CustomerReviews from "@/components/CustomerReviews";
import WatchAndBuy from "@/components/WatchAndBuy";

export default function Home() {
  return (
    <>
      {/* Section 1: Hero Slider */}
      <HeroSlider />

      {/* Section 2: Category Tiles */}
      <CategoryTiles />

      {/* Section 3: New Arrivals Product Grid */}
      <NewArrivals />

      {/* Section 4: Shop the Look */}
      <ShopTheLook />

      {/* Section 5: Customer Reviews */}
      <CustomerReviews />

      {/* Section 6: Watch & Buy */}
      <WatchAndBuy />
    </>
  );
}
