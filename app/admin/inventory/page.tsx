"use client";

import React, { useState, useEffect } from "react";
import { Package, Search, LayoutDashboard, ShoppingCart, Users, Settings, Plus, Edit2, Trash2, X, AlertCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const InventoryPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    fabric: "",
    category: "",
    stock: 0,
    image: "",
    images: [] as string[],
    desc: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("API returned non-array data:", data);
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update
        await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            ...editingProduct, 
            ...formData,
            image: formData.images[0] || formData.image,
            hoverImage: formData.images[1] || "",
          }),
        });
      } else {
        // Create
        await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            image: formData.images[0] || formData.image, // Fallback for backward compatibility
            hoverImage: formData.images[1] || "",
            tags: [],
            badge: "",
          }),
        });
      }
      setIsModalOpen(false);
      fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", fabric: "", category: "", stock: 0, image: "", images: [], desc: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      fabric: product.fabric || "",
      category: product.category || "",
      stock: product.stock || 0,
      image: product.image || "",
      images: product.images || (product.image ? [product.image] : []),
      desc: product.desc || "",
    });
    setIsModalOpen(true);
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
          const MAX_WIDTH = 1200; 
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
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedBase64);
        };
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const filteredItems = items
    .filter(item => item && typeof item === 'object')
    .filter(item => 
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchTerm.toLowerCase())
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
           <Link href="/admin/inventory" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors bg-secondary text-white">
              <Package size={18} />
              <span className="text-sm font-medium">Inventory</span>
           </Link>
           <Link href="/admin/settings" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <Settings size={18} />
              <span className="text-sm font-medium">Store Settings</span>
           </Link>
           <Link href="/admin/orders" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <Users size={18} />
              <span className="text-sm font-medium">Customers</span>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <header className="bg-white border-b border-gray-100 p-4 md:p-8 flex flex-col sm:flex-row justify-between items-center shrink-0 gap-4">
           <div className="flex items-center justify-between w-full sm:w-auto space-x-4 md:space-x-8">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-gray-50 rounded-lg text-primary"
                >
                  <LayoutDashboard size={20} />
                </button>
                <h2 className="text-xl md:text-2xl font-serif text-primary">Inventory</h2>
              </div>
              <button 
                onClick={() => {
                  document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                  window.location.href = "/admin/login";
                }}
                className="flex items-center space-x-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors bg-red-50 px-2 md:px-3 py-1 md:py-1.5 rounded-lg"
              >
                <LogOut size={12} />
                <span className="hidden xs:inline">Logout</span>
              </button>
           </div>
           <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
               <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 border border-gray-100 rounded-lg text-sm w-full sm:w-48 md:w-64 focus:outline-none focus:border-secondary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <button onClick={openAddModal} className="bg-secondary text-white p-2 md:px-4 md:py-2 rounded-lg text-sm font-bold flex items-center space-x-2 hover:bg-primary transition-colors shrink-0">
                   <Plus size={16} />
                   <span className="hidden md:inline">Add Product</span>
               </button>
           </div>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {loading ? (
                <div className="col-span-full text-center py-20 text-gray-400">Loading inventory...</div>
              ) : filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 group hover:border-secondary transition-colors">
                   <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{item.category}</p>
                      <div className="flex space-x-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                         <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-md">
                            <Edit2 size={16} />
                         </button>
                         <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-md">
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </div>
                   
                   <div className="flex space-x-4 mb-6">
                      <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden relative shrink-0">
                         {item.image ? (
                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300"><Package size={24} /></div>
                         )}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h3 className="text-lg font-serif mb-1 truncate text-primary">{item.name}</h3>
                         <p className="text-xs text-gray-400 truncate">{item.fabric || "No fabric specified"}</p>
                         <p className="text-sm font-bold mt-2 text-primary">PKR {item.price}</p>
                      </div>
                   </div>
                   
                   <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Current Stock</p>
                         <div className="flex items-center space-x-2">
                            <span className={`font-bold text-lg ${item.stock < 10 ? 'text-red-500' : 'text-primary'}`}>{item.stock}</span>
                            {item.stock < 10 && <AlertCircle size={14} className="text-red-500" />}
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Status</p>
                         <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${item.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                         </span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
           <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: '90vh' }}>
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
                 <h2 className="text-xl font-serif text-primary">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-primary transition-colors"><X size={24} /></button>
              </div>
              
              {/* Form Body - Scrollable */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                       <div className="col-span-2">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Product Name</label>
                          <input required type="text" placeholder="Enter product name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Price (e.g. 15,000)</label>
                          <input required type="text" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Stock</label>
                          <input required type="number" placeholder="0" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Category</label>
                          <input type="text" placeholder="e.g. kurtas" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Fabric</label>
                          <input type="text" placeholder="e.g. Raw Silk" value={formData.fabric} onChange={e => setFormData({...formData, fabric: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm" />
                       </div>
                       <div className="col-span-2">
                           <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Product Images (Up to 4)</label>
                           
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {[0, 1, 2, 3].map((index) => (
                                 <div key={index} className="flex flex-col space-y-2">
                                    <div className="aspect-[3/4] bg-gray-50 border border-gray-200 rounded-xl overflow-hidden relative flex items-center justify-center">
                                       {formData.images[index] ? (
                                          <>
                                             <img src={formData.images[index]} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                             <button 
                                                type="button" 
                                                onClick={() => {
                                                   const newImages = [...formData.images];
                                                   newImages.splice(index, 1);
                                                   setFormData({...formData, images: newImages});
                                                }}
                                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                             >
                                                <X size={12} />
                                             </button>
                                          </>
                                       ) : (
                                          <div className="flex flex-col items-center justify-center text-gray-300">
                                             <Package size={24} />
                                             <span className="text-[8px] mt-1 uppercase font-bold">Slot {index + 1}</span>
                                          </div>
                                       )}
                                       {uploading && (
                                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                             <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                                          </div>
                                       )}
                                    </div>
                                    
                                    <div className="relative">
                                       <input 
                                          type="file" 
                                          accept="image/*"
                                          id={`file-upload-${index}`}
                                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                          disabled={uploading}
                                          onChange={async (e) => {
                                             const file = e.target.files?.[0];
                                             if (!file) return;
                                             
                                             setUploading(true);
                                             try {
                                                const compressedUrl = await compressImage(file);
                                                const newImages = [...formData.images];
                                                newImages[index] = compressedUrl;
                                                setFormData({...formData, images: newImages});
                                             } catch (err) {
                                                console.error("Upload error", err);
                                                alert("Image upload error");
                                             } finally {
                                                setUploading(false);
                                             }
                                          }}
                                       />
                                       <label htmlFor={`file-upload-${index}`} className={`inline-flex items-center justify-center py-2 border border-dashed rounded-lg w-full cursor-pointer transition-colors ${uploading ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-secondary/5 border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50'}`}>
                                          <span className="text-[10px] font-bold">{uploading ? "..." : "Upload"}</span>
                                       </label>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <p className="text-xs text-gray-400 mt-3 italic">First image will be the primary product image.</p>
                       </div>
                       <div className="col-span-2">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Description</label>
                          <textarea rows={4} placeholder="Product description..." value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"></textarea>
                       </div>
                    </div>
              </div>

              {/* Footer - Fixed */}
              <div className="px-8 py-6 border-t border-gray-100 flex justify-end items-center space-x-4 bg-white shrink-0">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-400 hover:text-primary transition-colors">Cancel</button>
                 <button type="submit" className="bg-secondary text-white px-10 py-3.5 rounded-xl font-bold hover:bg-primary transition-colors shadow-lg shadow-secondary/20">Save Product</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
