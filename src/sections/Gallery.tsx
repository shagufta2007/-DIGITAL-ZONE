import { motion } from "motion/react";
import { Image as ImageIcon, ExternalLink } from "lucide-react";

const galleryImages = [
  { id: 1, title: "Physical Shop", category: "Location", image: "/img1.jpg" },
  { id: 2, title: "Customer Support", category: "Service", image: "/img2.jpg" },
  { id: 3, title: "Digital Seva", category: "CSC", image: "/img3.jpeg" },
  { id: 4, title: "Printing Lab", category: "Service", image: "/PrintingLab.jpg" },
  { id: 5, title: "Banking Point", category: "Service", image: "/BankingPoint.jpg" },
  { id: 6, title: "Work Showcase", category: "Design", image: "/img6.jpg" },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6"
          >
            <ImageIcon size={16} />
            <span>Our Work Showcase</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Visual <span className="text-sky-400">Gallery</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Take a look at our workspace and some of the services we've provided to our valued customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                <h4 className="text-white text-2xl font-bold mb-4">{item.title}</h4>
                <button className="w-12 h-12 rounded-xl bg-white text-slate-950 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                  <ExternalLink size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
