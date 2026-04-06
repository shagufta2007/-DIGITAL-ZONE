import { motion } from "motion/react";
import { Facebook, Instagram, Twitter, Linkedin, MessageSquare, Send } from "lucide-react";

const socialLinks = [
  { icon: Facebook, name: "Facebook", path: "#", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Instagram, name: "Instagram", path: "#", color: "text-pink-500", bg: "bg-pink-500/10" },
  { icon: Twitter, name: "Twitter", path: "#", color: "text-sky-400", bg: "bg-sky-400/10" },
  { icon: Linkedin, name: "LinkedIn", path: "#", color: "text-blue-700", bg: "bg-blue-700/10" },
  { icon: MessageSquare, name: "WhatsApp", path: "#", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: Send, name: "Telegram", path: "#", color: "text-sky-500", bg: "bg-sky-500/10" },
];

export default function SocialMedia() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold mb-6"
          >
            <MessageSquare size={16} />
            <span>Connect with Us</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Follow Us on <span className="text-orange-500">Social Media</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Stay connected with us for the latest updates, news, and digital service alerts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col items-center gap-4 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${social.bg} ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <social.icon size={32} />
              </div>
              <span className="text-white font-bold text-lg">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
