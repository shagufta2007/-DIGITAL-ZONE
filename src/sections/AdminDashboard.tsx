import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Users, Briefcase, Bell, Settings, LogOut, Plus, Search, Edit, Trash2, X, Save } from "lucide-react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, handleFirestoreError, OperationType } from "@/src/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/components/AuthProvider";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Briefcase, label: "Services", id: "services" },
  { icon: Bell, label: "Updates", id: "updates" },
  { icon: Users, label: "Contacts", id: "contacts" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({ services: 0, updates: 0, contacts: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  
  const navigate = useNavigate();
  const { role, loading } = useAuth();

  useEffect(() => {
    if (!loading && role !== "admin") {
      navigate("/admin");
    }
  }, [role, loading, navigate]);

  useEffect(() => {
    const unsubServices = onSnapshot(collection(db, "services"), (snap) => {
      setStats(prev => ({ ...prev, services: snap.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "services"));

    const unsubUpdates = onSnapshot(collection(db, "updates"), (snap) => {
      setStats(prev => ({ ...prev, updates: snap.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "updates"));

    const unsubContacts = onSnapshot(collection(db, "contacts"), (snap) => {
      setStats(prev => ({ ...prev, contacts: snap.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, "contacts"));

    return () => {
      unsubServices();
      unsubUpdates();
      unsubContacts();
    };
  }, []);

  useEffect(() => {
    if (activeTab === "overview" || activeTab === "settings") return;

    const q = query(collection(db, activeTab), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, activeTab));

    return () => unsub();
  }, [activeTab]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, activeTab, id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `${activeTab}/${id}`);
      }
    }
  };

  const handleOpenModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateDoc(doc(db, activeTab, editingItem.id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, activeTab), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
    } catch (err) {
      handleFirestoreError(err, editingItem ? OperationType.UPDATE : OperationType.CREATE, activeTab);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || role !== "admin") return null;

  return (
    <section className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">
            S
          </div>
          <span className="text-white font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === item.id ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1 uppercase tracking-tight">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-slate-500 text-sm">Manage your website content and services.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <Plus size={18} />
              Add New
            </button>
          </div>
        </header>

        {/* Overview Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Total Services", value: stats.services.toString(), color: "text-orange-500", bg: "bg-orange-500/10" },
              { label: "Total Updates", value: stats.updates.toString(), color: "text-sky-400", bg: "bg-sky-400/10" },
              { label: "Total Contacts", value: stats.contacts.toString(), color: "text-emerald-400", bg: "bg-emerald-400/10" },
            ].map((stat, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 flex flex-col gap-2">
                <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">{stat.label}</span>
                <span className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Table Content */}
        {activeTab !== "overview" && activeTab !== "settings" && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Title / Name</th>
                  <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Category / Email</th>
                  <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Date</th>
                  <th className="px-6 py-4 text-slate-400 font-bold uppercase tracking-widest text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{item.title || item.name}</td>
                    <td className="px-6 py-4 text-slate-400">{item.category || item.email}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-sky-400 hover:bg-sky-400/10 rounded-lg transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-2xl p-8 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white">
                  {editingItem ? "Edit" : "Add New"} {activeTab.slice(0, -1)}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                {activeTab === "services" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">Service Title</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-slate-400 text-sm font-medium">Category</label>
                        <input
                          type="text"
                          value={formData.category || ""}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-slate-400 text-sm font-medium">Icon (Lucide Name)</label>
                        <input
                          type="text"
                          value={formData.icon || ""}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                          placeholder="FileText, CreditCard, etc."
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">Description</label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all min-h-[100px]"
                        required
                      />
                    </div>
                  </>
                )}

                {activeTab === "updates" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">Update Title</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-slate-400 text-sm font-medium">Category</label>
                        <select
                          value={formData.category || ""}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Job Alert">Job Alert</option>
                          <option value="News">News</option>
                          <option value="Service Update">Service Update</option>
                          <option value="Offer">Offer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-slate-400 text-sm font-medium">External Link</label>
                        <input
                          type="url"
                          value={formData.link || ""}
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">Description</label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all min-h-[100px]"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 border border-slate-800 text-slate-400 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={20} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
