"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Blog { id: number; title: string; slug: string; excerpt: string; image: string; author: string; date: string; }

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    fetch("/api/admin/blogs").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setBlogs(data.filter((b: any) => b.published !== false));
    }).catch(() => {});
  }, []);

  return (
    <div className="container-wide py-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <span className="text-primary">Blog</span>
      </nav>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-10">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
            <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-4">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">{blog.author} • {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            <h2 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors mb-2">{blog.title}</h2>
            <p className="text-[13px] text-gray-500 line-clamp-2">{blog.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
