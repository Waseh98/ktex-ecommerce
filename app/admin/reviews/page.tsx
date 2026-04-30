import React, { useState, useEffect } from "react";
import { Star, Trash2, Eye, EyeOff, Plus, Search, CheckCircle2, LayoutDashboard, ShoppingCart, Package, Settings, LogOut, X, MessageSquare } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

interface Review {
  _id?: string;
  id: number;
  name: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  visible: boolean;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    text: "",
    product: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (review: Review) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, visible: !review.visible }),
      });
      if (res.ok) fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = async () => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewReview({ name: "", rating: 5, text: "", product: "" });
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.text.toLowerCase().includes(search.toLowerCase()) ||
    r.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
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
           <Link href="/admin/reviews" className="flex items-center space-x-3 p-4 rounded-xl bg-secondary text-white transition-colors">
              <MessageSquare size={18} />
              <span className="text-sm font-medium">Manage Reviews</span>
           </Link>
           <Link href="/admin/settings" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <Settings size={18} />
              <span className="text-sm font-medium">Store Settings</span>
           </Link>
        </nav>
        <div className="p-8 border-t border-white/10">
           <Link href="/" className="block text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">View Storefront</Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
              <p className="text-gray-500 mt-1">Control which customer stories are featured on your website.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary transition-all shadow-lg"
            >
              <Plus size={18} />
              Add Manual Review
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by customer, product, or content..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Review</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading reviews...</td></tr>
                  ) : filteredReviews.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No reviews found.</td></tr>
                  ) : filteredReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm uppercase">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{review.name}</p>
                            <p className="text-[10px] text-gray-400">{review.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} size={12} className={i <= review.rating ? "fill-secondary text-secondary" : "text-gray-200"} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{review.text}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {review.product || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleToggleVisibility(review)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                            review.visible 
                              ? "bg-green-100 text-green-600" 
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {review.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                          {review.visible ? "Published" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Add Manual Review</h2>
              <p className="text-gray-500 text-sm mt-1">Create a featured review for your storefront.</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer Name</label>
                  <input 
                    type="text" 
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all border-none"
                    placeholder="e.g. Ahmad Ali"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Rating</label>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all border-none"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Product Name</label>
                <input 
                  type="text" 
                  value={newReview.product}
                  onChange={(e) => setNewReview({...newReview, product: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all border-none"
                  placeholder="e.g. Classic White Polo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Review Content</label>
                <textarea 
                  rows={4}
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 transition-all border-none resize-none"
                  placeholder="Share the customer's experience..."
                />
              </div>
            </div>
            <div className="p-8 bg-gray-50 flex gap-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddReview}
                className="flex-1 bg-primary text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-lg"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
