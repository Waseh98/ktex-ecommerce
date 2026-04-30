"use client";

import React, { useState, useEffect } from "react";
import { Package, Search, Calendar, CreditCard, ChevronRight, LayoutDashboard, ShoppingCart, Users, Settings, Trash2, X, LogOut } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const AdminDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("API returned non-array data:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders
    .filter(order => order && typeof order === 'object')
    .filter(order => 
      (order.orderId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.shippingInfo?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "text-green-600 bg-green-50 border-green-200";
      case "PENDING_PAYMENT": return "text-amber-600 bg-amber-50 border-amber-200";
      case "FAILED": return "text-red-600 bg-red-50 border-red-200";
      case "PROCESSING": return "text-blue-600 bg-blue-50 border-blue-200";
      case "SHIPPED": return "text-purple-600 bg-purple-50 border-purple-200";
      case "DELIVERED": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "CANCELLED": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const exportToCSV = () => {
    const headers = ["Order ID", "Date", "Customer Email", "Address", "Total", "Status"];
    const rows = filteredOrders.map(o => [
      o.orderId,
      new Date(o.createdAt).toLocaleDateString(),
      o.shippingInfo.email,
      o.shippingInfo.address,
      o.total,
      o.status
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ktex_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadInvoice = (order: any) => {
    // Basic printable invoice window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const html = `
      <html>
        <head>
          <title>Invoice - ${order.orderId}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1a1a1a; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #f4f4f4; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; }
            .invoice-title { font-size: 40px; font-family: 'Playfair Display', serif; }
            .section { margin-top: 40px; display: grid; grid-template-cols: 1fr 1fr; gap: 40px; }
            .label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 40px; }
            th { text-align: left; border-bottom: 1px solid #eee; padding: 15px 0; font-size: 10px; text-transform: uppercase; }
            td { padding: 15px 0; border-bottom: 1px solid #f9f9f9; font-size: 14px; }
            .total-section { margin-top: 40px; text-align: right; }
            .total-box { display: inline-block; background: #fdfcf8; padding: 20px 40px; border: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">K-TEX</div>
              <p style="font-size: 12px; color: #666;">Premium Pakistani Ethnic Wear</p>
            </div>
            <div class="invoice-title">INVOICE</div>
          </div>
          <div class="section">
            <div>
              <div class="label">Bill To</div>
              <p><strong>${order.shippingInfo.email}</strong></p>
              <p>${order.shippingInfo.address}</p>
            </div>
            <div style="text-align: right;">
              <div class="label">Order Details</div>
              <p><strong>ID: ${order.orderId}</strong></p>
              <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: <span style="color: #c9a84c;">${order.status}</span></p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => `
                <tr>
                  <td>${item.name} (${item.fabric || 'Premium Fabric'})</td>
                  <td>${item.size}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total-section">
            <div class="total-box">
              <div class="label">Total Amount</div>
              <div style="font-size: 24px; font-weight: bold;">PKR ${order.total}</div>
            </div>
          </div>
          <p style="margin-top: 60px; font-size: 10px; color: #999; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
            Thank you for choosing K-TEX. This is a computer generated invoice.
          </p>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const updateOrder = async (orderId: string, updates: { notes?: string, status?: string, courier?: string, trackingNumber?: string }) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, ...updates }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/orders?orderId=${orderId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchOrders();
      } else {
        alert("Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting order");
    }
  };
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
           <Link href="/admin/orders" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors bg-secondary text-white">
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Orders</span>
           </Link>
           <Link href="/admin/inventory" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
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
      <main className="flex-1 overflow-y-auto w-full">
        <header className="bg-white border-b border-gray-100 p-4 md:p-8 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-10 gap-4">
           <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-gray-50 rounded-lg text-primary"
                >
                  <LayoutDashboard size={20} />
                </button>
                <h2 className="text-xl md:text-2xl font-serif">Orders</h2>
              </div>
              <button onClick={fetchOrders} className="sm:hidden p-2 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
                 <Calendar size={18} className="text-gray-600" />
              </button>
           </div>
           <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 border border-gray-100 rounded-lg text-sm w-full sm:w-48 md:w-64 focus:outline-none focus:border-secondary transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <button 
                onClick={exportToCSV}
                className="hidden md:flex items-center space-x-2 px-4 py-2 border border-gray-100 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors"
              >
                <span>Export</span>
              </button>
              <button onClick={fetchOrders} className="hidden sm:block p-2 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
                 <Calendar size={18} className="text-gray-600" />
              </button>
           </div>
        </header>

        <div className="p-4 md:p-8">
           {/* Stats Overview */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Total Orders</p>
                 <p className="text-3xl font-bold">{orders.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Total Revenue</p>
                 <p className="text-3xl font-bold">PKR {orders.reduce((acc, o) => acc + parseInt(o.total.replace(/[^\d]/g, "")), 0).toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Successful Payments</p>
                 <p className="text-3xl font-bold text-green-600">{orders.filter(o => o.status === 'PAID').length}</p>
              </div>
           </div>

           {/* Orders Table */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                 <thead className="bg-zinc-50 border-b border-gray-100">
                    <tr>
                       <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                       <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer & Notes</th>
                       <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</th>
                       <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                       <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Invoice</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan={6} className="px-8 py-12 text-center text-gray-400">Loading orders...</td></tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr><td colSpan={6} className="px-8 py-12 text-center text-gray-400">No orders found.</td></tr>
                    ) : filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-zinc-50 transition-colors group">
                         <td className="px-8 py-6">
                            <p className="font-mono text-xs font-bold text-primary">{order.orderId}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                         </td>
                         <td className="px-8 py-6 max-w-md">
                            <p className="text-xs font-bold mb-1">{order.shippingInfo.email}</p>
                            <input 
                               type="text" 
                               placeholder="Add a customer note..." 
                               defaultValue={order.notes}
                               onBlur={(e) => updateOrder(order.orderId, { notes: e.target.value })}
                               className="w-full bg-transparent border-b border-transparent hover:border-gray-200 focus:border-secondary focus:outline-none text-[10px] py-1 transition-all"
                            />
                         </td>
                         <td className="px-8 py-6 text-xs font-bold text-primary">PKR {order.total}</td>
                         <td className="px-8 py-6">
                            <select 
                               value={order.status}
                               onChange={(e) => updateOrder(order.orderId, { status: e.target.value })}
                               className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border focus:outline-none transition-all cursor-pointer ${getStatusColor(order.status)}`}
                            >
                               <option value="PENDING_PAYMENT">Pending Payment</option>
                               <option value="PAID">Paid</option>
                               <option value="PROCESSING">Processing</option>
                               <option value="SHIPPED">Shipped</option>
                               <option value="DELIVERED">Delivered</option>
                               <option value="CANCELLED">Cancelled</option>
                               <option value="FAILED">Failed</option>
                            </select>

                            {order.status === "SHIPPED" && (
                              <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                                <div className="flex flex-col gap-1">
                                  <p className="text-[8px] font-bold uppercase text-gray-400">Courier</p>
                                  <input 
                                    type="text" 
                                    placeholder="e.g. Trax, Leopards"
                                    defaultValue={order.courier}
                                    onBlur={(e) => updateOrder(order.orderId, { courier: e.target.value })}
                                    className="text-[9px] px-2 py-1 bg-zinc-100 border-none rounded focus:ring-1 focus:ring-secondary/30 outline-none"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-[8px] font-bold uppercase text-gray-400">Tracking #</p>
                                  <input 
                                    type="text" 
                                    placeholder="Tracking ID"
                                    defaultValue={order.trackingNumber}
                                    onBlur={(e) => updateOrder(order.orderId, { trackingNumber: e.target.value })}
                                    className="text-[9px] px-2 py-1 bg-zinc-100 border-none rounded focus:ring-1 focus:ring-secondary/30 outline-none"
                                  />
                                </div>
                              </div>
                            )}
                         </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex items-center justify-end space-x-2">
                                <button 
                                   onClick={() => downloadInvoice(order)}
                                   className="px-4 py-2 bg-zinc-50 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center space-x-2"
                                >
                                   <Package size={12} />
                                   <span>Invoice</span>
                                </button>
                                <button 
                                   onClick={() => handleDeleteOrder(order.orderId)}
                                   className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                   title="Delete Order"
                                >
                                   <Trash2 size={14} />
                                </button>
                             </div>
                          </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </main>
    </div>
  );
};


export default AdminDashboard;
