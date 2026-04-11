import Services from "@/src/sections/Services";
import { motion } from "motion/react";
import { Sparkles, Search, Filter } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="bg-slate-950 min-h-screen pt-32">
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-8"
          >
            <Sparkles size={16} />
            <span>Explore Our Full Range</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Our <span className="text-sky-400">Digital Services</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
            We offer a comprehensive suite of digital solutions to help you navigate the modern world. From essential government documentation to advanced technology support.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto p-2 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl">
            <div className="flex-1 flex items-center gap-4 px-4 py-3">
              <Search size={24} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search for a service..."
                className="w-full bg-transparent border-none text-white focus:outline-none placeholder:text-slate-600"
              />
            </div>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <Filter size={20} />
              Filter
            </button>
          </div>
        </div>
      </div>

      <Services />
    </main>
  );
}
