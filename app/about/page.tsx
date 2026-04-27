"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-20 bg-ivory">
        <div className="container mx-auto px-4 md:px-8">
           <div className="max-w-4xl mx-auto text-center">
              <p className="text-secondary font-bold uppercase tracking-[0.4em] mb-8">Our Heritage</p>
              <h1 className="text-5xl md:text-7xl font-serif mb-12">The Story of K-TEX</h1>
              <div className="w-20 h-0.5 bg-secondary mx-auto mb-16" />
              
              <div className="space-y-12 text-lg text-gray-600 leading-relaxed text-justify">
                 <p>
                    K-TEX was born out of a desire to bridge the gap between traditional craftsmanship and contemporary luxury. Rooted in the rich cultural tapestry of Pakistan, we believe that every thread tells a story of heritage, passion, and artisanal excellence.
                 </p>
                 <p>
                    Our journey began in the heart of the textile industry, where we witnessed the incredible skill of local weavers and embroiderers. We set out to create a brand that would not only showcase this talent but elevate it to the global stage.
                 </p>
                 <p>
                    Today, K-TEX is synonymous with premium ethnic wear. From our signature unstitched collections to our sophisticated ready-to-wear lines, every piece is a celebration of the modern South Asian woman—confident, elegant, and deeply connected to her roots.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               <div>
                  <h3 className="text-2xl font-serif mb-4">Artisanal Quality</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Every garment is meticulously crafted using time-honored techniques passed down through generations.</p>
               </div>
               <div>
                  <h3 className="text-2xl font-serif mb-4">Sustainable Luxury</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">We are committed to ethical production and sourcing the finest natural fibers for our collections.</p>
               </div>
               <div>
                  <h3 className="text-2xl font-serif mb-4">Global Heritage</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">While deeply rooted in Pakistan, our designs speak a universal language of elegance and sophistication.</p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
