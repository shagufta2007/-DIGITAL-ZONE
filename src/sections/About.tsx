import { motion } from "motion/react";
import { User, Shield, Award, MapPin, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Owner Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-4 border-slate-900 shadow-2xl aspect-[4/5] max-w-md mx-auto">
              <img
                src="/MdShahjadTechnicalSultan.jpg"
                alt="Md Shahjad - Technical Sultan"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">Md Shahjad</h3>
                <p className="text-orange-500 font-semibold text-lg flex items-center gap-2">
                  Technical Sultan
                  <Award size={20} />
                </p>
              </div>
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 lg:right-10 z-20 w-32 h-32 bg-sky-500 rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-sky-500/30 border-4 border-slate-950"
            >
              <Shield size={32} className="mb-1" />
              <span className="text-xs font-bold uppercase tracking-tighter">Verified</span>
              <span className="text-xs font-bold uppercase tracking-tighter">Professional</span>
            </motion.div>
          </motion.div>

          {/* Business Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-6">
              <User size={16} />
              <span>About the Founder</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Meet the Visionary Behind <br />
              <span className="text-sky-400">Sultan Digital Zone</span>
            </h2>

            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              With years of experience in technical consultancy and digital services, Md Shahjad (Technical Sultan) founded Sultan Digital Zone to bridge the digital divide. Our mission is to provide high-quality, accessible digital solutions to everyone.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Shield, title: "Trusted by 1000+ Customers", desc: "A legacy of trust and reliability in the digital service industry." },
                { icon: MapPin, title: "Physical Shop Presence", desc: "Visit us at our main branch for personalized assistance and support." },
                { icon: Award, title: "Certified Digital Expert", desc: "Professional expertise in CSC, banking, and government portals." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20">
                View Work Showcase
                <ExternalLink size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
