import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, CheckCircle2, MessageSquare, Phone, 
  ShieldCheck, Zap, Sparkles, GraduationCap, 
  CreditCard, FileText, Landmark, Banknote, 
  Scale, Monitor, Globe, Palette, Printer, 
  Train, HardHat, ShoppingCart, Signal 
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const serviceData: Record<string, any> = {
  jobs: {
    title: "Jobs & Career Support",
    icon: GraduationCap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    desc: "We provide comprehensive support for all your job application needs. From finding the right job to filling out the form, we're here to help.",
    features: [
      "Latest Govt Job Alerts",
      "Online Form Filling",
      "Admit Card Downloads",
      "Result Checking",
      "Career Counseling",
      "Resume Building",
    ],
  },
  identity: {
    title: "Identity Services",
    icon: CreditCard,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    desc: "Get your essential identity documents processed quickly and securely. We handle all major government ID services.",
    features: [
      "Aadhar Card Update",
      "New PAN Card Application",
      "Voter ID Registration",
      "Passport Assistance",
      "Driving License Support",
      "Ration Card Services",
    ],
  },
  // Add more services as needed
};

export default function ServiceDetails() {
  const { id } = useParams();
  const service = serviceData[id || "jobs"] || serviceData.jobs;

  return (
    <section className="py-24 bg-slate-950 min-h-screen pt-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8", service.bg, service.color)}>
              <service.icon size={40} />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {service.title}
            </h1>

            <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
              {service.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {service.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 transition-all group">
                  <CheckCircle2 size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 transition-all">
                Apply Now
                <Sparkles size={20} />
              </button>
              <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <MessageSquare size={20} />
                WhatsApp Us
              </button>
            </div>
          </motion.div>

          {/* Right Content - Visuals/Trust */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Why Choose Us for {service.title}?</h3>
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Instant Processing", desc: "We prioritize speed and efficiency in all our services." },
                  { icon: ShieldCheck, title: "Verified & Secure", desc: "Your documents and data are handled with utmost care." },
                  { icon: Phone, title: "24/7 Support", desc: "Get assistance anytime through our dedicated support channels." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-sky-500 to-sky-600 shadow-2xl shadow-sky-500/20 text-white">
              <h4 className="text-2xl font-bold mb-4">Need Personalized Help?</h4>
              <p className="text-sky-100 mb-8 leading-relaxed">
                Our experts are ready to assist you with any questions or special requirements you may have.
              </p>
              <button className="w-full py-4 bg-white text-sky-600 rounded-2xl font-bold text-lg hover:bg-sky-50 transition-all shadow-lg">
                Call Md Shahjad Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
