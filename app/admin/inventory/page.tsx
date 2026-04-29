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
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    fabric: "",
    category: "",
    stock: 0,
    image: "",
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
          body: JSON.stringify({ ...editingProduct, ...formData }),
        });
      } else {
        // Create
        await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
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
    setFormData({ name: "", price: "", fabric: "", category: "", stock: 0, image: "", desc: "" });
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
      desc: product.desc || "",
    });
    setIsModalOpen(true);
  };

  const filteredItems = items
    .filter(item => item && typeof item === 'object')
    .filter(item => 
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden lg:flex flex-col">
        <div className="p-8">
           <Logo className="h-8" invert />
           <p className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Admin Panel</p>
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
           <Link href="/admin/orders" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <Users size={18} />
              <span className="text-sm font-medium">Customers</span>
           </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 p-8 flex justify-between items-center shrink-0">
           <div className="flex items-center space-x-8">
              <h2 className="text-2xl font-serif text-primary">Inventory Management</h2>
              <button 
                onClick={() => {
                  document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                  window.location.href = "/admin/login";
                }}
                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
           </div>
           <div className="flex items-center space-x-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="pl-10 pr-4 py-2 border border-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:border-secondary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <button onClick={openAddModal} className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 hover:bg-primary transition-colors">
                   <Plus size={16} />
                   <span>Add Product</span>
               </button>
           </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-20 text-gray-400">Loading inventory...</div>
              ) : filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 group hover:border-secondary transition-colors">
                   <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{item.category}</p>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => openEditModal(item)} className="p-1.5 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-md">
                            <Edit2 size={14} />
                         </button>
                         <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-md">
                            <Trash2 size={14} />
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
              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                 <div className="grid grid-cols-2 gap-8">
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
                          <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">Product Image</label>
                          
                          <div className="flex items-center space-x-6">
                            <div className="w-24 h-32 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                               {formData.image ? (
                                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                               ) : (
                                  <Package className="text-gray-300" size={32} />
                               )}
                               {uploading && (
                                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                     <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                                  </div>
                               )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="relative">
                                 <input 
                                    type="file" 
                                    accept="image/*"
                                    id="file-upload"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={async (e) => {
                                       const file = e.target.files?.[0];
                                       if (!file) return;
                                       
                                       setUploading(true);
                                       try {
                                          const uploadData = new FormData();
                                          uploadData.append("file", file);
                                          
                                          const res = await fetch("/api/admin/upload", {
                                             method: "POST",
                                             body: uploadData,
                                          });
                                          
                                          if (res.ok) {
                                             const { url } = await res.json();
                                             setFormData({...formData, image: url});
                                          } else {
                                             alert("Image upload failed");
                                          }
                                       } catch (err) {
                                          console.error("Upload error", err);
                                          alert("Image upload error");
                                       } finally {
                                          setUploading(false);
                                       }
                                    }}
                                 />
                                 <label htmlFor="file-upload" className={`inline-flex items-center justify-center px-6 py-4 border-2 border-dashed rounded-xl w-full cursor-pointer transition-colors ${uploading ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-secondary/5 border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50'}`}>
                                    <span className="text-sm font-bold">{uploading ? "Uploading Image..." : "Click here to Upload Image"}</span>
                                 </label>
                              </div>
                              <p className="text-xs text-gray-400 mt-3 italic">Select a high-quality image. It will upload automatically.</p>
                              <input type="text" readOnly required value={formData.image} placeholder="Image URL will appear here" className="mt-2 w-full text-[10px] text-gray-400 bg-transparent border-none outline-none" />
                            </div>
                          </div>
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
