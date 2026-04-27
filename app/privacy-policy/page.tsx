"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <div className="pt-40 pb-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
           <h1 className="text-4xl font-serif mb-12">Privacy Policy</h1>
           <div className="prose prose-zinc max-w-none space-y-8 text-sm text-gray-600 leading-relaxed">
              <section>
                 <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">1. Information We Collect</h3>
                 <p>We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, and shipping address.</p>
              </section>
              <section>
                 <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">2. How We Use Your Information</h3>
                 <p>Your information is used to process orders, provide customer support, and send promotional offers if you have opted in. We do not sell your personal data to third parties.</p>
              </section>
              <section>
                 <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-4">3. Security</h3>
                 <p>We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.</p>
              </section>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PrivacyPage;
