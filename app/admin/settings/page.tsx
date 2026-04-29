"use client";

import React, { useState, useEffect } from "react";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, Save, Plus, X, Video, Image as ImageIcon, Megaphone } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const AdminSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [settings, setSettings] = useState({
    announcement: "",
    videoUrl: "",
    heroSlides: [] as { image: string, title: string, subtitle: string, link: string }[],
    featuredCategories: [] as string[],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/homepage");
      const data = await res.json();
      if (data && data.type === "homepage") {
        setSettings({
          announcement: data.announcement || "",
          videoUrl: data.videoUrl || "",
          heroSlides: data.heroSlides || [],
          featuredCategories: data.featuredCategories || [],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Settings saved successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        callback(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar (Reuse your sidebar logic) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white z-[120] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-8 flex justify-between items-center">
           <div>
             <Logo className="h-8" invert />
             <p className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Admin Panel</p>
           </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-8">
           <Link href="/admin/orders" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">Dashboard</span>
           </Link>
           <Link href="/admin/orders" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Orders</span>
           </Link>
           <Link href="/admin/inventory" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <Package size={18} />
              <span className="text-sm font-medium">Inventory</span>
           </Link>
           <Link href="/admin/settings" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors bg-secondary text-white">
              <Settings size={18} />
              <span className="text-sm font-medium">Store Settings</span>
           </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 p-8 flex justify-between items-center shrink-0">
           <h2 className="text-2xl font-serif text-primary">Store Settings</h2>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="bg-secondary text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-primary transition-colors disabled:opacity-50"
           >
             <Save size={18} />
             <span>{saving ? "Saving..." : "Save All Changes"}</span>
           </button>
        </header>

        <div className="p-8 flex-1 overflow-y-auto space-y-8 pb-20">
           {/* Announcement Section */}
           <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                 <Megaphone className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Announcement Bar</h3>
              </div>
              <input 
                type="text" 
                value={settings.announcement}
                onChange={e => setSettings({...settings, announcement: e.target.value})}
                placeholder="Free shipping on orders above Rs. 5,000..." 
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-all"
              />
           </section>

           {/* Watch & Buy Video Section */}
           <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                 <Video className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Watch & Buy Video</h3>
              </div>
              <div className="space-y-4">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Video URL (YouTube or Direct MP4 Link)</label>
                 <input 
                   type="text" 
                   value={settings.videoUrl}
                   onChange={e => setSettings({...settings, videoUrl: e.target.value})}
                   placeholder="https://www.youtube.com/watch?v=..." 
                   className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-all"
                 />
                 <div className="p-4 bg-zinc-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Video Preview</p>
                    {settings.videoUrl ? (
                       <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-sm">
                          {settings.videoUrl.includes('youtube.com') || settings.videoUrl.includes('youtu.be') ? (
                             <iframe 
                               src={`https://www.youtube.com/embed/${settings.videoUrl.split('v=')[1] || settings.videoUrl.split('/').pop()}`}
                               className="w-full h-full"
                               allowFullScreen
                             />
                          ) : (
                             <video src={settings.videoUrl} controls className="w-full h-full" />
                          )}
                       </div>
                    ) : (
                       <p className="text-sm text-gray-300 italic">No video URL provided</p>
                    )}
                 </div>
              </div>
           </section>

           {/* Hero Slider Management */}
           <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center space-x-3">
                    <ImageIcon className="text-secondary" size={20} />
                    <h3 className="font-serif text-xl">Hero Slider</h3>
                 </div>
                 <button 
                   onClick={() => setSettings({...settings, heroSlides: [...settings.heroSlides, { image: "", title: "", subtitle: "", link: "" }]})}
                   className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center space-x-1"
                 >
                    <Plus size={14} />
                    <span>Add Slide</span>
                 </button>
              </div>
              
              <div className="space-y-6">
                 {settings.heroSlides.map((slide, idx) => (
                    <div key={idx} className="group relative p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-6">
                       <button 
                         onClick={() => {
                           const newSlides = [...settings.heroSlides];
                           newSlides.splice(idx, 1);
                           setSettings({...settings, heroSlides: newSlides});
                         }}
                         className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                          <X size={14} />
                       </button>
                       
                       <div className="w-48 aspect-[16/9] bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative shrink-0">
                          {slide.image ? (
                             <img src={slide.image} className="w-full h-full object-cover" />
                          ) : (
                             <div className="text-center p-4">
                                <ImageIcon size={24} className="text-gray-300 mx-auto mb-2" />
                                <input 
                                  type="file" 
                                  className="absolute inset-0 opacity-0 cursor-pointer" 
                                  onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], (url) => {
                                     const newSlides = [...settings.heroSlides];
                                     newSlides[idx].image = url;
                                     setSettings({...settings, heroSlides: newSlides});
                                  })}
                                />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Upload</span>
                             </div>
                          )}
                       </div>
                       
                       <div className="flex-1 grid grid-cols-2 gap-4">
                          <input 
                            placeholder="Slide Title" 
                            value={slide.title}
                            onChange={e => {
                               const newSlides = [...settings.heroSlides];
                               newSlides[idx].title = e.target.value;
                               setSettings({...settings, heroSlides: newSlides});
                            }}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                          />
                          <input 
                            placeholder="Subtitle" 
                            value={slide.subtitle}
                            onChange={e => {
                               const newSlides = [...settings.heroSlides];
                               newSlides[idx].subtitle = e.target.value;
                               setSettings({...settings, heroSlides: newSlides});
                            }}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                          />
                          <input 
                            placeholder="Link URL" 
                            value={slide.link}
                            onChange={e => {
                               const newSlides = [...settings.heroSlides];
                               newSlides[idx].link = e.target.value;
                               setSettings({...settings, heroSlides: newSlides});
                            }}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm col-span-2"
                          />
                       </div>
                    </div>
                 ))}
                 {settings.heroSlides.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                       <p className="text-gray-400 italic">No slides added yet. Add slides to populate the homepage banner.</p>
                    </div>
                 )}
              </div>
           </section>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
