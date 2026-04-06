import { motion } from "motion/react";
import { Mail, Send, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-8"
            >
              <Sparkles size={16} />
              <span>Newsletter Subscription</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Get the Latest <span className="text-sky-400">Job Alerts</span> <br />
              Directly in Your Inbox
            </h2>
            
            <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
              Subscribe to our newsletter and never miss an update about government jobs, new schemes, and digital service alerts.
            </p>

            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto p-2 rounded-2xl bg-slate-950/50 border border-slate-800 backdrop-blur-xl">
              <div className="flex-1 flex items-center gap-4 px-4 py-3">
                <Mail size={24} className="text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-none text-white focus:outline-none placeholder:text-slate-600"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
              >
                Subscribe Now
                <Send size={20} />
              </button>
            </form>

            <p className="mt-8 text-slate-500 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
