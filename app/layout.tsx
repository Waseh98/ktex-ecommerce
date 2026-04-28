import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K-TEX | Premium Pakistani Menswear",
  description: "Experience the elegance of culturally rooted, modern South Asian luxury with K-TEX. Premium shirts, polos, trousers, and more.",
};

import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import LayoutShell from "@/components/LayoutShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-primary antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
