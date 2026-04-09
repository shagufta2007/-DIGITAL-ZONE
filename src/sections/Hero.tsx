"use client";

import { motion } from "motion/react";
import { ArrowRight, MessageSquare, ShieldCheck, Zap, Users } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Hero() {
const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(15,23,42,1)_100%)] opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sky-400 text-sm font-semibold mb-6"
            >
              <Zap size={16} className="fill-current" />
              <span>Digital ka smart solution, ek hi jagah!</span>
            </motion.div>

         <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
  Your Trusted <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
    One-Stop Hub
  </span>{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-300">
    for All Digital Services
  </span>
</h1>

<p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
  PAN Card, Aadhaar, Banking aur sabhi Digital Services – ab ek hi jagah, fast aur reliable service ke saath.
</p>

            {/* Buttons */}
          
              
              {/* Contact Button */}
          <div className="flex flex-col sm:flex-row gap-4">

  {/* Primary Button - WhatsApp */}
  <motion.button
    onClick={() =>
      window.open(
        "https://wa.me/917277565445?text=Hello%20I%20want%20to%20discuss%20a%20project",
        "_blank"
      )
    }
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 transition-all"
  >
    <MessageSquare size={20} />
    Contact Now
  </motion.button>

  {/* Secondary Button - View Services */}
  <motion.button
    onClick={() => navigate("/services")}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
  >
    View Services
    <ArrowRight size={20} />
  </motion.button>

</div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-slate-900">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">100+</span>
                <span className="text-slate-500 text-sm">Services</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">1000+</span>
                <span className="text-slate-500 text-sm">Customers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">4.9/5</span>
                <span className="text-slate-500 text-sm">Rating</span>
              </div>
            </div>

          </motion.div>

          {/* Right Side Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Trusted", color: "text-green-400", bg: "bg-green-400/10" },
                  { icon: Zap, title: "Fast", color: "text-orange-400", bg: "bg-orange-400/10" },
                  { icon: Users, title: "Professional", color: "text-sky-400", bg: "bg-sky-400/10" },
                  { icon: ShieldCheck, title: "Secure", color: "text-purple-400", bg: "bg-purple-400/10" },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center gap-4 group hover:border-orange-500/50 transition-all duration-300">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg, item.color)}>
                      <item.icon size={32} />
                    </div>
                    <span className="text-white font-bold text-lg">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full animate-pulse delay-700" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}