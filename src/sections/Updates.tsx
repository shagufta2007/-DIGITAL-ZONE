import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bell, Calendar, ArrowRight, ExternalLink, Search } from "lucide-react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

export default function Updates() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "updates"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setUpdates(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "updates");
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredUpdates = updates.filter((update) => 
    update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    update.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="updates" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-6"
            >
              <Bell size={16} className="animate-bounce" />
              <span>Latest News & Alerts</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Stay Updated with <br />
              <span className="text-sky-400">Digital Alerts</span>
            </h2>
            
            <div className="relative max-w-md mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-all"
              />
            </div>
          </div>

          <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold flex items-center gap-2 transition-all">
            View All Updates
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Loading updates...</p>
            </div>
          ) : filteredUpdates.length > 0 ? (
            filteredUpdates.map((update, idx) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 flex flex-col group"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-black uppercase tracking-widest border border-sky-500/20">
                    {update.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                    <Calendar size={14} />
                    {update.createdAt?.toDate ? update.createdAt.toDate().toLocaleDateString() : "N/A"}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors line-clamp-2">
                  {update.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {update.description}
                </p>

                <a
                  href={update.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm hover:text-orange-400 transition-colors"
                >
                  Read More
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
              <Bell size={48} className="text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No updates found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
