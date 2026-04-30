"use client";

import React, { useState, useEffect } from "react";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, Save, Plus, X, Video, Image as ImageIcon, Megaphone, LogOut, Trash2, Upload, MessageSquare } from "lucide-react";
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
    heroSlides: [] as { image: string, mobileImage?: string, title: string, subtitle: string, link: string }[],
    brandStatement: "",
    categoryTiles: [] as { label: string, slug: string, image: string }[],
    shopTheLook: {
      image: "",
      title: "",
      label: "",
      subtitle: "",
      products: [
        { name: "", price: "", image: "", link: "" },
        { name: "", price: "", image: "", link: "" }
      ]
    },
    featuredCategories: [] as string[],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/homepage", { cache: 'no-store' });
      const data = await res.json();
      if (data && data.type === "homepage") {
        setSettings({
          announcement: data.announcement || "",
          videoUrl: data.videoUrl || "",
          heroSlides: data.heroSlides || [],
          brandStatement: data.brandStatement || "Rooted in heritage, designed for the future. Every stitch at K-TEX tells a story of artisanal excellence and modern luxury.",
          categoryTiles: data.categoryTiles || [],
          shopTheLook: data.shopTheLook || {
            image: "",
            title: "",
            label: "",
            subtitle: "",
            products: [
              { name: "", price: "", image: "", link: "" },
              { name: "", price: "", image: "", link: "" }
            ]
          },
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

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress quality to 0.7 to keep payload small
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    if (file.type.startsWith('video/') && file.size > 15 * 1024 * 1024) {
      alert("Video file is too large! Please keep it under 15MB.");
      return;
    }

    setUploading(true);
    try {
      // If it's an image, compress it on client side first
      if (file.type.startsWith('image/')) {
        const compressedUrl = await compressImage(file);
        callback(compressedUrl);
        setUploading(false);
        return;
      }

      // For videos or other files, use the upload API
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        callback(url);
      } else {
        alert("Upload failed. The file might be too large.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[110] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white z-[120] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-8 flex justify-between items-center">
           <div>
             <Logo className="h-8" invert />
             <p className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Admin Panel</p>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
             <X size={20} />
           </button>
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

        <div className="p-8 border-t border-white/10 space-y-4">
           <button 
             onClick={() => {
               document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
               window.location.href = "/admin/login";
             }}
             className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors w-full"
           >
              <LogOut size={16} />
              <span>Sign Out</span>
           </button>
           <Link href="/" className="block text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">View Storefront</Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <header className="bg-white border-b border-gray-100 p-4 md:p-8 flex flex-col sm:flex-row justify-between items-center shrink-0 gap-4">
           <div className="flex items-center space-x-4">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="lg:hidden p-2 bg-gray-50 rounded-lg text-primary"
             >
               <LayoutDashboard size={20} />
             </button>
             <h2 className="text-xl md:text-2xl font-serif text-primary">Store Settings</h2>
           </div>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="w-full sm:w-auto bg-secondary text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary transition-colors disabled:opacity-50"
           >
             <Save size={18} />
             <span>{saving ? "Saving..." : "Save All Changes"}</span>
           </button>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-y-auto space-y-8 pb-20">
           {/* Announcement Section */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                 <Megaphone className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Announcement Bar</h3>
              </div>
              <input 
                type="text" 
                value={settings.announcement}
                onChange={e => setSettings({...settings, announcement: e.target.value})}
                placeholder="Free shipping on orders above Rs. 5,000..." 
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-all text-sm"
              />
           </section>

           {/* Brand Statement */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                 <Settings className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Brand Statement</h3>
              </div>
              <textarea 
                value={settings.brandStatement}
                onChange={e => setSettings({...settings, brandStatement: e.target.value})}
                placeholder="Your brand mission statement..." 
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-all text-sm min-h-[100px]"
              />
           </section>

           {/* Watch & Buy Video Section */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                 <Video className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Watch & Buy Video</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    <div className="flex-1">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Video URL (YouTube or Direct Link)</label>
                       <input 
                         type="text" 
                         value={settings.videoUrl}
                         onChange={e => setSettings({...settings, videoUrl: e.target.value})}
                         placeholder="https://www.youtube.com/watch?v=..." 
                         className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-all text-sm"
                       />
                    </div>
                    <div className="relative">
                       <input 
                         type="file" 
                         accept="video/*"
                         className="absolute inset-0 opacity-0 cursor-pointer"
                         onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => setSettings({...settings, videoUrl: url}))}
                         disabled={uploading}
                       />
                       <button className={`px-6 py-3.5 border-2 border-dashed rounded-xl flex items-center space-x-2 transition-colors ${uploading ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-secondary/5 border-secondary/30 text-secondary hover:bg-secondary/10'}`}>
                          <Upload size={18} />
                          <span className="text-sm font-bold">{uploading ? "Uploading..." : "Upload Video"}</span>
                       </button>
                    </div>
                 </div>
                 {settings.videoUrl && (
                   <div className="p-4 bg-zinc-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Video Preview</p>
                      <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-sm relative">
                         {settings.videoUrl.includes('youtube.com') || settings.videoUrl.includes('youtu.be') ? (
                            <iframe 
                              src={`https://www.youtube.com/embed/${settings.videoUrl.split('v=')[1]?.split('&')[0] || settings.videoUrl.split('/').pop()}`}
                              className="w-full h-full"
                              allowFullScreen
                            />
                         ) : (
                            <video src={settings.videoUrl} controls className="w-full h-full" />
                         )}
                         <button 
                           onClick={() => setSettings({...settings, videoUrl: ""})}
                           className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                         >
                           <X size={14} />
                         </button>
                      </div>
                   </div>
                 )}
              </div>
           </section>

           {/* Hero Slider Management */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center space-x-3">
                    <ImageIcon className="text-secondary" size={20} />
                    <h3 className="font-serif text-xl">Hero Slider</h3>
                 </div>
                 <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => {
                        if (confirm("Are you sure you want to remove all slides?")) {
                          setSettings({...settings, heroSlides: []});
                        }
                      }}
                      className="text-xs font-bold uppercase tracking-widest text-red-400 flex items-center space-x-1"
                    >
                       <Trash2 size={14} />
                       <span>Delete All</span>
                    </button>
                    <button 
                      onClick={() => setSettings({...settings, heroSlides: [...settings.heroSlides, { image: "", title: "", subtitle: "", link: "" }]})}
                      className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center space-x-1"
                    >
                       <Plus size={14} />
                       <span>Add Slide</span>
                    </button>
                 </div>
              </div>
              
              <div className="space-y-6">
                 {settings.heroSlides.map((slide, idx) => (
                    <div key={idx} className="group relative p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6">
                       <button 
                         onClick={() => {
                           const newSlides = [...settings.heroSlides];
                           newSlides.splice(idx, 1);
                           setSettings({...settings, heroSlides: newSlides});
                         }}
                         className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                       >
                          <X size={14} />
                       </button>
                       
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                           {/* Desktop Image */}
                           <div className="w-full md:w-48 aspect-[16/9] bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative group/img">
                              {slide.image ? (
                                 <>
                                    <img src={slide.image} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                       <div className="relative">
                                          <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                               const newSlides = [...settings.heroSlides];
                                               newSlides[idx].image = url;
                                               setSettings({...settings, heroSlides: newSlides});
                                          })}
                                          />
                                          <button className="bg-white text-primary p-2 rounded-full shadow-lg">
                                             <Upload size={16} />
                                          </button>
                                       </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">Desktop</div>
                                 </>
                              ) : (
                                 <div className="text-center p-4">
                                    <ImageIcon size={24} className="text-gray-300 mx-auto mb-2" />
                                    <input 
                                      type="file" 
                                      className="absolute inset-0 opacity-0 cursor-pointer" 
                                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                         const newSlides = [...settings.heroSlides];
                                         newSlides[idx].image = url;
                                         setSettings({...settings, heroSlides: newSlides});
                                      })}
                                    />
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Upload Desktop</span>
                                 </div>
                              )}
                           </div>

                           {/* Mobile Image */}
                           <div className="w-full sm:w-24 aspect-[9/16] bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative group/img">
                              {slide.mobileImage ? (
                                 <>
                                    <img src={slide.mobileImage} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                       <div className="relative">
                                          <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                               const newSlides = [...settings.heroSlides];
                                               newSlides[idx].mobileImage = url;
                                               setSettings({...settings, heroSlides: newSlides});
                                          })}
                                          />
                                          <button className="bg-white text-primary p-2 rounded-full shadow-lg">
                                             <Upload size={16} />
                                          </button>
                                       </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">Mobile</div>
                                 </>
                              ) : (
                                 <div className="text-center p-4">
                                    <ImageIcon size={20} className="text-gray-300 mx-auto mb-2" />
                                    <input 
                                      type="file" 
                                      className="absolute inset-0 opacity-0 cursor-pointer" 
                                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                         const newSlides = [...settings.heroSlides];
                                         newSlides[idx].mobileImage = url;
                                         setSettings({...settings, heroSlides: newSlides});
                                      })}
                                    />
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Upload Mobile</span>
                                 </div>
                              )}
                           </div>
                        </div>

                       
                       <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="col-span-1">
                             <label className="text-[9px] font-bold uppercase text-gray-400 block mb-1">Slide Title</label>
                             <input 
                                placeholder="Main Headline" 
                                value={slide.title}
                                onChange={e => {
                                   const newSlides = [...settings.heroSlides];
                                   newSlides[idx].title = e.target.value;
                                   setSettings({...settings, heroSlides: newSlides});
                                }}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                             />
                          </div>
                          <div className="col-span-1">
                             <label className="text-[9px] font-bold uppercase text-gray-400 block mb-1">Subtitle</label>
                             <input 
                                placeholder="Subtext" 
                                value={slide.subtitle}
                                onChange={e => {
                                   const newSlides = [...settings.heroSlides];
                                   newSlides[idx].subtitle = e.target.value;
                                   setSettings({...settings, heroSlides: newSlides});
                                }}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                             />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                             <label className="text-[9px] font-bold uppercase text-gray-400 block mb-1">Link URL</label>
                             <input 
                                placeholder="/collection/new-arrivals" 
                                value={slide.link}
                                onChange={e => {
                                   const newSlides = [...settings.heroSlides];
                                   newSlides[idx].link = e.target.value;
                                   setSettings({...settings, heroSlides: newSlides});
                                }}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                             />
                          </div>
                       </div>
                    </div>
                 ))}
                 {settings.heroSlides.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                       <p className="text-gray-400 italic">No slides added yet. Website will show a welcome placeholder.</p>
                    </div>
                 )}
              </div>
           </section>

           {/* Category Tiles Management */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center space-x-3">
                    <LayoutDashboard className="text-secondary" size={20} />
                    <h3 className="font-serif text-xl">Category Tiles</h3>
                 </div>
                 <button 
                   onClick={() => setSettings({...settings, categoryTiles: [...settings.categoryTiles, { label: "", slug: "", image: "" }]})}
                   className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center space-x-1"
                 >
                    <Plus size={14} />
                    <span>Add Category</span>
                 </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {settings.categoryTiles.map((cat, idx) => (
                    <div key={idx} className="group relative p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <button 
                         onClick={() => {
                           const newCats = [...settings.categoryTiles];
                           newCats.splice(idx, 1);
                           setSettings({...settings, categoryTiles: newCats});
                         }}
                         className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                       >
                          <X size={14} />
                       </button>
                       
                       <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative mb-4">
                          {cat.image ? (
                             <>
                                <img src={cat.image} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                   <div className="relative">
                                      <input 
                                        type="file" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                           const newCats = [...settings.categoryTiles];
                                           newCats[idx].image = url;
                                           setSettings({...settings, categoryTiles: newCats});
                                        })}
                                      />
                                      <button className="bg-white text-primary p-2 rounded-full shadow-lg">
                                         <Upload size={16} />
                                      </button>
                                   </div>
                                </div>
                             </>
                          ) : (
                             <div className="text-center p-4">
                                <ImageIcon size={24} className="text-gray-300 mx-auto mb-2" />
                                <input 
                                  type="file" 
                                  className="absolute inset-0 opacity-0 cursor-pointer" 
                                  onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                     const newCats = [...settings.categoryTiles];
                                     newCats[idx].image = url;
                                     setSettings({...settings, categoryTiles: newCats});
                                  })}
                                />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Upload Image</span>
                             </div>
                          )}
                       </div>
                       
                       <div className="space-y-3">
                          <div>
                             <label className="text-[9px] font-bold uppercase text-gray-400 block mb-1">Label</label>
                             <input 
                                placeholder="Shirts" 
                                value={cat.label}
                                onChange={e => {
                                   const newCats = [...settings.categoryTiles];
                                   newCats[idx].label = e.target.value;
                                   setSettings({...settings, categoryTiles: newCats});
                                }}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                             />
                          </div>
                          <div>
                             <label className="text-[9px] font-bold uppercase text-gray-400 block mb-1">Collection Slug</label>
                             <input 
                                placeholder="mens-shirts" 
                                value={cat.slug}
                                onChange={e => {
                                   const newCats = [...settings.categoryTiles];
                                   newCats[idx].slug = e.target.value;
                                   setSettings({...settings, categoryTiles: newCats});
                                }}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                             />
                          </div>
                       </div>
                    </div>
                 ))}
                 {settings.categoryTiles.length === 0 && (
                    <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                       <p className="text-gray-400 italic">No category tiles added. Section will be hidden.</p>
                    </div>
                 )}
              </div>
           </section>

           {/* Shop the Look Management */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                 <ShoppingCart className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Shop The Look</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div className="aspect-[4/5] bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                       {settings.shopTheLook?.image ? (
                          <>
                             <img src={settings.shopTheLook.image} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="relative">
                                   <input 
                                     type="file" 
                                     className="absolute inset-0 opacity-0 cursor-pointer" 
                                     onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                        setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), image: url}});
                                     })}
                                   />
                                   <button className="bg-white text-primary p-2 rounded-full shadow-lg">
                                      <Upload size={16} />
                                   </button>
                                </div>
                             </div>
                          </>
                       ) : (
                          <div className="text-center p-8">
                             <ImageIcon size={32} className="text-gray-300 mx-auto mb-4" />
                             <input 
                               type="file" 
                               className="absolute inset-0 opacity-0 cursor-pointer" 
                               onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                  setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), image: url}});
                               })}
                             />
                             <span className="text-xs text-gray-400 font-bold uppercase">Upload Lifestyle Image</span>
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="col-span-full">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Section Title</label>
                          <input 
                            placeholder="Shop the Look" 
                            value={settings.shopTheLook?.title || ""}
                            onChange={e => setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), title: e.target.value}})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Tag/Label</label>
                          <input 
                            placeholder="Curated Style" 
                            value={settings.shopTheLook?.label || ""}
                            onChange={e => setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), label: e.target.value}})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Subtitle</label>
                          <input 
                            placeholder="Summer Essentials" 
                            value={settings.shopTheLook?.subtitle || ""}
                            onChange={e => setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), subtitle: e.target.value}})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                          />
                       </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Featured Products (Max 2)</p>
                       <div className="space-y-4">
                          {[0, 1].map((pIdx) => (
                             <div key={pIdx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-16 h-16 bg-white rounded border border-gray-200 flex items-center justify-center relative shrink-0 overflow-hidden">
                                      {settings.shopTheLook?.products?.[pIdx]?.image ? (
                                         <img src={settings.shopTheLook.products[pIdx].image} className="w-full h-full object-cover" />
                                      ) : (
                                         <ImageIcon size={16} className="text-gray-300" />
                                      )}
                                      <input 
                                         type="file" 
                                         className="absolute inset-0 opacity-0 cursor-pointer" 
                                         onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                            const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                            products[pIdx].image = url;
                                            setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                         })}
                                      />
                                   </div>
                                   <div className="flex-1 space-y-2">
                                      <input 
                                         placeholder="Product Name" 
                                         value={settings.shopTheLook?.products?.[pIdx]?.name || ""}
                                         onChange={e => {
                                            const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                            products[pIdx].name = e.target.value;
                                            setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                         }}
                                         className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs"
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                         <input 
                                            placeholder="Price (e.g. Rs. 5,000)" 
                                            value={settings.shopTheLook?.products?.[pIdx]?.price || ""}
                                            onChange={e => {
                                               const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                               products[pIdx].price = e.target.value;
                                               setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                            }}
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs"
                                         />
                                         <input 
                                            placeholder="Link (/product/slug)" 
                                            value={settings.shopTheLook?.products?.[pIdx]?.link || ""}
                                            onChange={e => {
                                               const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                               products[pIdx].link = e.target.value;
                                               setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                            }}
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs"
                                         />
                                      </div>
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </section>
           {/* Shop the Look Management */}
           <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mt-8">
              <div className="flex items-center space-x-3 mb-8">
                 <ShoppingCart className="text-secondary" size={20} />
                 <h3 className="font-serif text-xl">Shop The Look</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div className="aspect-[4/5] bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                       {settings.shopTheLook?.image ? (
                          <>
                             <img src={settings.shopTheLook.image} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="relative">
                                   <input 
                                     type="file" 
                                     className="absolute inset-0 opacity-0 cursor-pointer" 
                                     onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                        setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), image: url}});
                                     })}
                                   />
                                   <button className="bg-white text-primary p-2 rounded-full shadow-lg">
                                      <Upload size={16} />
                                   </button>
                                </div>
                             </div>
                          </>
                       ) : (
                          <div className="text-center p-8">
                             <ImageIcon size={32} className="text-gray-300 mx-auto mb-4" />
                             <input 
                               type="file" 
                               className="absolute inset-0 opacity-0 cursor-pointer" 
                               onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                  setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), image: url}});
                               })}
                             />
                             <span className="text-xs text-gray-400 font-bold uppercase">Upload Lifestyle Image</span>
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="col-span-full">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Section Title</label>
                          <input 
                            placeholder="Shop the Look" 
                            value={settings.shopTheLook?.title || ""}
                            onChange={e => setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), title: e.target.value}})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Tag/Label</label>
                          <input 
                            placeholder="Curated Style" 
                            value={settings.shopTheLook?.label || ""}
                            onChange={e => setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), label: e.target.value}})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Subtitle</label>
                          <input 
                            placeholder="Summer Essentials" 
                            value={settings.shopTheLook?.subtitle || ""}
                            onChange={e => setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), subtitle: e.target.value}})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                          />
                       </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Featured Products (Max 2)</p>
                       <div className="space-y-4">
                          {[0, 1].map((pIdx) => (
                             <div key={pIdx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-16 h-16 bg-white rounded border border-gray-200 flex items-center justify-center relative shrink-0 overflow-hidden">
                                      {settings.shopTheLook?.products?.[pIdx]?.image ? (
                                         <img src={settings.shopTheLook.products[pIdx].image} className="w-full h-full object-cover" />
                                      ) : (
                                         <ImageIcon size={16} className="text-gray-300" />
                                      )}
                                      <input 
                                         type="file" 
                                         className="absolute inset-0 opacity-0 cursor-pointer" 
                                         onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], (url) => {
                                            const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                            products[pIdx].image = url;
                                            setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                         })}
                                      />
                                   </div>
                                   <div className="flex-1 space-y-2">
                                      <input 
                                         placeholder="Product Name" 
                                         value={settings.shopTheLook?.products?.[pIdx]?.name || ""}
                                         onChange={e => {
                                            const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                            products[pIdx].name = e.target.value;
                                            setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                         }}
                                         className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs"
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                         <input 
                                            placeholder="Price (e.g. Rs. 5,000)" 
                                            value={settings.shopTheLook?.products?.[pIdx]?.price || ""}
                                            onChange={e => {
                                               const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                               products[pIdx].price = e.target.value;
                                               setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                            }}
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs"
                                         />
                                         <input 
                                            placeholder="Link (/product/slug)" 
                                            value={settings.shopTheLook?.products?.[pIdx]?.link || ""}
                                            onChange={e => {
                                               const products = [...(settings.shopTheLook?.products || [{name:"", price:"", image:"", link:""}, {name:"", price:"", image:"", link:""}])];
                                               products[pIdx].link = e.target.value;
                                               setSettings({...settings, shopTheLook: {...(settings.shopTheLook || {}), products}});
                                            }}
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs"
                                         />
                                      </div>
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </main>

    </div>
  );
};

export default AdminSettings;
