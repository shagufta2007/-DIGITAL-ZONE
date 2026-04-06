import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  GraduationCap, CreditCard, FileText, Landmark, 
  Banknote, Scale, Monitor, Globe, Palette, 
  Printer, Train, HardHat, ShoppingCart, Signal, 
  ArrowRight, Sparkles, Zap, ShieldCheck, Users,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

const iconMap: { [key: string]: any } = {
  GraduationCap, CreditCard, FileText, Landmark, 
  Banknote, Scale, Monitor, Globe, Palette, 
  Printer, Train, HardHat, ShoppingCart, Signal
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "services");
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredServices = services.filter((service) => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold mb-6"
          >
            <Sparkles size={16} />
            <span>Our Premium Services</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Comprehensive <span className="text-orange-500">Digital Solutions</span>
          </h2>
          
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Loading services...</p>
            </div>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => {
              const Icon = iconMap[service.icon] || FileText;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={20} className="text-orange-500" />
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {service.description}
                  </p>

                  <Link
                    to={`/service/${service.id}`}
                    className="text-sky-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Explore More
                    <ArrowRight size={14} />
                  </Link>

                  {/* Background Glow */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
              <Zap size={48} className="text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No services found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Why Choose Us Highlight */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold text-white mb-6">Why Choose <br /> <span className="text-sky-400">Sultan Digital Zone?</span></h3>
            <p className="text-slate-400 mb-8">We combine speed, trust, and professional expertise to deliver the best digital experience in the region.</p>
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all">
              Learn More About Us
            </button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: "Super Fast Processing", desc: "We value your time. Most services are processed within minutes." },
              { icon: ShieldCheck, title: "100% Secure & Trusted", desc: "Your data privacy and security are our top priorities." },
              { icon: Users, title: "Expert Assistance", desc: "Get help from professionals who know the digital landscape." },
              { icon: Sparkles, title: "Premium Quality", desc: "High-quality prints and professional design services." },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-orange-500">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
