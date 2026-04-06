import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageSquare, Send, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const path = "contacts";
      await addDoc(collection(db, path), {
        ...data,
        createdAt: serverTimestamp(),
      });
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "contacts");
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-6">
              <MessageSquare size={16} />
              <span>Get in Touch</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Ready to Start Your <br />
              <span className="text-sky-400">Digital Journey?</span>
            </h2>

            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Have a question or need a service? Reach out to us through any of the channels below or fill out the form. We're here to help!
            </p>

            <div className="space-y-8 mb-12">
              {[
                { icon: Phone, title: "Call Us", value: "+91 XXXXXXXXXX", color: "text-orange-500", bg: "bg-orange-500/10" },
                { icon: Mail, title: "Email Us", value: "contact@sultandigital.com", color: "text-sky-400", bg: "bg-sky-400/10" },
                { icon: MapPin, title: "Visit Us", value: "Main Market, City, State, India", color: "text-emerald-400", bg: "bg-emerald-400/10" },
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

            {/* Social Links */}
            <div>
              <p className="text-white font-bold mb-6 text-lg">Follow Us on Social Media</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-400 text-sm font-medium">Full Name</label>
                  <input
                    {...register("name")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-slate-400 text-sm font-medium">Phone Number</label>
                  <input
                    {...register("phone")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                    placeholder="+91 XXXXXXXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium">Select Service</label>
                <select
                  {...register("service")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all appearance-none"
                >
                  <option value="">Choose a service...</option>
                  <option value="jobs">Jobs & Career</option>
                  <option value="identity">Identity Services</option>
                  <option value="govt">Govt Schemes</option>
                  <option value="banking">Banking Services</option>
                  <option value="other">Other</option>
                </select>
                {errors.service && <p className="text-red-500 text-xs">{errors.service.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium">Your Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
