"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
           <h1 className="text-4xl font-serif mb-12">Terms & Conditions</h1>
           <div className="prose prose-zinc max-w-none space-y-8 text-sm text-gray-600 leading-relaxed">
              <section>
                 <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">1. Acceptance of Terms</h3>
                 <p>By accessing or using the K-TEX website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site.</p>
              </section>
              <section>
                 <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">2. Product Availability</h3>
                 <p>All products are subject to availability. We reserve the right to limit the quantity of any product we supply or to refuse any order.</p>
              </section>
              <section>
                 <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">3. Pricing and Payments</h3>
                 <p>Prices are subject to change without notice. We accept various payment methods including credit cards and Cash on Delivery (COD) within Pakistan.</p>
              </section>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TermsPage;
