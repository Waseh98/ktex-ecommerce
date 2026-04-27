"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ClothCarePage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-32 bg-ivory">
        <div className="container mx-auto px-4 md:px-8">
           <div className="max-w-4xl mx-auto text-center">
              <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-8">Preserving Luxury</p>
              <h1 className="text-5xl font-serif mb-16">Cloth Care Guide</h1>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-white p-10 shadow-sm">
                 <h3 className="text-2xl font-serif mb-6 text-primary">Velvet & Silk</h3>
                 <ul className="space-y-4 text-sm text-gray-500 list-disc pl-5">
                    <li>Dry clean only to maintain the fabric's sheen and texture.</li>
                    <li>Always iron on the reverse side with a cool iron.</li>
                    <li>Store in a cool, dry place away from direct sunlight.</li>
                 </ul>
              </div>
              <div className="bg-white p-10 shadow-sm">
                 <h3 className="text-2xl font-serif mb-6 text-primary">Lawn & Cotton</h3>
                 <ul className="space-y-4 text-sm text-gray-500 list-disc pl-5">
                    <li>Gentle hand wash in cold water with mild detergent.</li>
                    <li>Do not bleach or use harsh chemicals.</li>
                    <li>Air dry in shade to prevent color fading.</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ClothCarePage;
