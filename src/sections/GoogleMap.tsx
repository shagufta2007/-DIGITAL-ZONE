import { motion } from "motion/react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function GoogleMap() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Map Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
              <MapPin size={16} />
              <span>Visit Our Shop</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Find Us in the <br />
              <span className="text-sky-400">Pathalgada, Chatra, Jharkhand, India</span>
            </h2>

            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              We are conveniently located in the main market area, making it easy for you to visit us for any digital service or assistance.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { icon: MapPin, title: "Our Location", value: "Main Market, City, State, India", color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { icon: Navigation, title: "Get Directions", value: "Click the button below to get directions on Google Maps.", color: "text-sky-400", bg: "bg-sky-400/10" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={28} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{item.title}</p>
                    <p className="text-white text-xl font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20">
              Open in Google Maps
              <ExternalLink size={20} />
            </button>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden border-4 border-slate-900 shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456789012!2d77.12345678901234!3d28.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA3JzM0LjQiTiA3N8KwMDcnMzQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
