import About from "@/src/sections/About";
import WhyChooseUs from "@/src/sections/WhyChooseUs";
import Stats from "@/src/sections/Stats";
import { motion } from "motion/react";
import { Sparkles, Award, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
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
            <span>About Sultan Digital Zone</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            The Vision of <span className="text-sky-400">Technical Sultan</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
            We are more than just a digital service provider. We are your partners in navigating the digital landscape, providing trusted and professional assistance for all your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: Award, title: "Our Mission", desc: "To provide accessible, high-quality digital solutions to everyone, bridging the digital divide in our community." },
              { icon: ShieldCheck, title: "Our Vision", desc: "To become the most trusted and reliable digital service brand in the region, known for our speed and professionalism." },
              { icon: Users, title: "Our Values", desc: "Trust, integrity, and customer-centricity are at the core of everything we do at Sultan Digital Zone." },
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 flex flex-col items-center text-center gap-6 group hover:border-orange-500/50 transition-all duration-300">
                <div className="w-20 h-20 rounded-3xl bg-slate-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <About />
      <Stats />
      <WhyChooseUs />
    </main>
  );
}
