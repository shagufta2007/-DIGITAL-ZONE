import Contact from "@/src/sections/Contact";
import GoogleMap from "@/src/sections/GoogleMap";
import SocialMedia from "@/src/sections/SocialMedia";
import { motion } from "motion/react";
import { MessageSquare, Search, Filter } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-slate-950 min-h-screen pt-32">
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-8"
          >
            <MessageSquare size={16} />
            <span>Get in Touch</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Ready to <span className="text-sky-400">Start Your Journey?</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
            Have a question or need a service? Reach out to us through any of the channels below or fill out the form. We're here to help!
          </p>
        </div>
      </div>

      <Contact />
      <GoogleMap />
      <SocialMedia />
    </main>
  );
}
