"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Blog { id: number; title: string; slug: string; content: string; image: string; author: string; date: string; }

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blogs").then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        const found = data.find((b: any) => b.slug === slug);
        if (found) setBlog(found);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container-wide py-20 text-center"><div className="animate-pulse"><div className="h-8 bg-gray-200 w-1/2 mx-auto mb-4" /><div className="h-64 bg-gray-200" /></div></div>;
  if (!blog) return <div className="container-wide py-20 text-center"><h1 className="text-2xl font-bold">Post Not Found</h1><Link href="/blogs" className="text-secondary underline mt-4 block">Back to Blog</Link></div>;

  return (
    <article className="container-wide py-12 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-secondary">Home</Link><span>/</span>
        <Link href="/blogs" className="hover:text-secondary">Blog</Link><span>/</span>
        <span className="text-primary truncate">{blog.title}</span>
      </nav>
      <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-3">{blog.author} • {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
      <h1 className="text-2xl md:text-4xl font-bold text-primary mb-8">{blog.title}</h1>
      <div className="aspect-[16/9] overflow-hidden bg-gray-100 mb-10">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>
      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
        {blog.content.split("\n\n").map((para, i) => {
          if (para.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-primary mt-8 mb-4">{para.replace("## ", "")}</h2>;
          if (para.startsWith("1. ") || para.startsWith("- ")) return <div key={i} className="space-y-1 my-4">{para.split("\n").map((line, j) => <p key={j} className="text-[14px]">{line}</p>)}</div>;
          return <p key={i} className="mb-4 text-[14px] leading-[1.8]">{para}</p>;
        })}
      </div>
    </article>
  );
}
