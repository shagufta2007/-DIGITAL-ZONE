import { motion } from "motion/react";
import { Users, Briefcase, Star, Clock } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "100+", label: "Services Provided", color: "text-orange-500" },
  { icon: Users, value: "1000+", label: "Happy Customers", color: "text-sky-400" },
  { icon: Star, value: "4.9/5", label: "Customer Rating", color: "text-yellow-400" },
  { icon: Clock, value: "24/7", label: "Support Available", color: "text-emerald-400" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-slate-900/30 border-y border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
