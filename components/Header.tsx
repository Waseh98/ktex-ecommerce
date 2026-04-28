"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { megaMenuData, type NavItem } from "@/lib/megaMenuData";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const { items, openCart } = useCartStore();
  const { openModal } = useAuthStore();
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleMenuEnter = (label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container-wide h-16 flex items-center justify-between relative">
          {/* Left: Logo + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:text-secondary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <Link href="/" className="flex-shrink-0">
              <Logo className={`transition-all duration-300 ${isScrolled ? "h-7" : "h-9"}`} />
            </Link>
          </div>

          {/* Center: Desktop Mega Menu Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
            {megaMenuData.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.type === "mega" || item.type === "dropdown") ? handleMenuEnter(item.label) : undefined}
                onMouseLeave={handleMenuLeave}
              >
                {item.type === "link" ? (
                  <Link
                    href={`/collection/${item.slug}`}
                    className="px-4 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-red-600 hover:text-red-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center gap-1 ${
                      activeMenu === item.label ? "text-secondary" : "text-primary hover:text-secondary"
                    }`}
                  >
                    {item.label}
                    {item.type === "dropdown" && <ChevronDown size={12} />}
                  </button>
                )}

                {/* Mega Menu Dropdown */}
                {item.type === "mega" && activeMenu === item.label && item.categories && (() => {
                  // Separate special links from category groups
                  const specialLinks = item.categories.filter(
                    (c) => !c.subcategories && ["New Arrivals", "Shop All", "SALE"].includes(c.label)
                  );
                  const categoryGroups = item.categories.filter(
                    (c) => c.subcategories && c.subcategories.length > 0
                  );
                  const standaloneLinks = item.categories.filter(
                    (c) => !c.subcategories && !["New Arrivals", "Shop All", "SALE"].includes(c.label)
                  );

                  return (
                    <div
                      className="fixed left-0 w-screen bg-white border-t border-gray-100 shadow-lg z-50 animate-fadeDown"
                      style={{ top: "64px" }}
                      onMouseEnter={() => handleMenuEnter(item.label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="max-w-[1200px] mx-auto px-6 py-4 max-h-[70vh] overflow-y-auto">
                        {/* Top row: quick links */}
                        {specialLinks.length > 0 && (
                          <div className="flex items-center gap-5 mb-4 pb-3 border-b border-gray-100">
                            {specialLinks.map((sl) => (
                              <Link
                                key={sl.slug}
                                href={`/collection/${sl.slug}`}
                                className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                                  sl.label === "SALE"
                                    ? "text-red-600 hover:text-red-700"
                                    : "text-secondary hover:text-primary"
                                }`}
                                onClick={() => setActiveMenu(null)}
                              >
                                {sl.label}
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Category grid — Responsive multi-column layout */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-6 gap-y-8">
                          {categoryGroups.map((cat) => {
                            const subs = cat.subcategories!;

                            return (
                              <div key={cat.slug} className="min-w-0">
                                <Link
                                  href={`/collection/${cat.slug}`}
                                  className="block text-[11px] font-bold uppercase tracking-[0.1em] text-primary hover:text-secondary mb-3 transition-colors"
                                  onClick={() => setActiveMenu(null)}
                                >
                                  {cat.label}
                                </Link>
                                <ul className="space-y-1">
                                  {subs.map((sub) => (
                                    <li key={sub.slug}>
                                      <Link
                                        href={`/collection/${sub.slug}`}
                                        className="block text-[12px] text-gray-500 hover:text-secondary transition-colors py-[2px]"
                                        onClick={() => setActiveMenu(null)}
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                  <li className="mt-2">
                                    <Link
                                      href={`/collection/${cat.slug}`}
                                      className="block text-[11px] text-secondary font-bold hover:text-primary transition-colors"
                                      onClick={() => setActiveMenu(null)}
                                    >
                                      View All →
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            );
                          })}

                          {/* Standalone links grouped under "More" or in their own columns */}
                          {standaloneLinks.length > 0 && (
                            <div className="min-w-0">
                              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-3">
                                More Essentials
                              </span>
                              <ul className="space-y-1">
                                {standaloneLinks.map((sl) => (
                                  <li key={sl.slug}>
                                    <Link
                                      href={`/collection/${sl.slug}`}
                                      className="block text-[12px] text-gray-500 hover:text-secondary transition-colors py-[2px]"
                                      onClick={() => setActiveMenu(null)}
                                    >
                                      {sl.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Simple Dropdown for MORE */}
                {item.type === "dropdown" && activeMenu === item.label && item.links && (
                  <div
                    className="absolute top-full right-0 w-52 bg-white border border-gray-100 shadow-lg z-50 animate-fadeDown"
                    onMouseEnter={() => handleMenuEnter(item.label)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="py-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-5 py-2.5 text-[12px] font-medium text-gray-600 hover:text-secondary hover:bg-gray-50 transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:text-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => openModal("login")}
              className="p-2.5 hover:text-secondary transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className="p-2.5 hover:text-secondary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute top-1 right-0.5 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md z-40 animate-fadeDown">
            <div className="container-wide py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-8 pr-10 py-3 text-sm border-b-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors bg-transparent"
                  autoFocus
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-primary"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white transition-transform duration-300 ease-out overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6">
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <Logo className="h-7" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={22} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {megaMenuData.map((item) => (
                <div key={item.label}>
                  {item.type === "link" ? (
                    <Link
                      href={`/collection/${item.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-sm font-bold uppercase tracking-wider text-red-600"
                    >
                      {item.label}
                    </Link>
                  ) : item.type === "dropdown" ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wider text-primary"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileExpanded === item.label && item.links && (
                        <div className="pl-4 pb-3 space-y-1">
                          {item.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 text-sm text-gray-500 hover:text-secondary"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wider text-primary"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileExpanded === item.label && item.categories && (
                        <div className="pl-4 pb-3 space-y-1">
                          {item.categories.map((cat) => (
                            <div key={cat.slug}>
                              {cat.subcategories ? (
                                <div>
                                  <button
                                    onClick={() => setMobileSubExpanded(mobileSubExpanded === cat.slug ? null : cat.slug)}
                                    className="w-full flex items-center justify-between py-2 text-sm text-gray-700 font-medium"
                                  >
                                    {cat.label}
                                    <ChevronRight size={14} className={`transition-transform ${mobileSubExpanded === cat.slug ? "rotate-90" : ""}`} />
                                  </button>
                                  {mobileSubExpanded === cat.slug && (
                                    <div className="pl-4 pb-2 space-y-1">
                                      <Link
                                        href={`/collection/${cat.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-1.5 text-[13px] text-secondary font-medium"
                                      >
                                        View All {cat.label}
                                      </Link>
                                      {cat.subcategories.map((sub) => (
                                        <Link
                                          key={sub.slug}
                                          href={`/collection/${sub.slug}`}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="block py-1.5 text-[13px] text-gray-500 hover:text-secondary"
                                        >
                                          {sub.label}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Link
                                  href={`/collection/${cat.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block py-2 text-sm ${
                                    cat.label === "SALE" ? "text-red-600 font-bold" : "text-gray-500 hover:text-secondary"
                                  }`}
                                >
                                  {cat.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
              <button
                onClick={() => { openModal("login"); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 py-2 text-sm text-gray-600"
              >
                <User size={18} />
                <span>Account</span>
              </button>
              <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-600">
                <span>📦</span>
                <span>Track Order</span>
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-sm text-secondary font-medium">
                <span>💬</span>
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
