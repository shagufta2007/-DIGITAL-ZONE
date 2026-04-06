import { motion } from "motion/react";
import { Zap, ShieldCheck, Users, Sparkles, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Super Fast Processing",
    desc: "We value your time. Most services are processed within minutes.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure & Trusted",
    desc: "Your data privacy and security are our top priorities.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: Users,
    title: "Expert Assistance",
    desc: "Get help from professionals who know the digital landscape.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "High-quality prints and professional design services.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Award,
    title: "Certified Digital Expert",
    desc: "Professional expertise in CSC, banking, and government portals.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Clock,
    title: "24/7 Support Available",
    desc: "Our support team is available 24/7 to assist you.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-6"
          >
            <Sparkles size={16} />
            <span>Why Choose Us?</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The Sultan <span className="text-sky-400">Digital Advantage</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We combine speed, trust, and professional expertise to deliver the best digital experience in the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={32} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
