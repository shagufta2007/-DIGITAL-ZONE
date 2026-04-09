"use client";

import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

// ✅ Schema
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

  // ✅ Submit Function (WhatsApp + Firebase)
  const onSubmit = async (data: ContactFormData) => {
    try {
      // 🔥 WhatsApp Message
      const message = `Hello, I want to contact you:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Service: ${data.service}

Message: ${data.message}`;

      const whatsappURL = `https://wa.me/917277565445?text=${encodeURIComponent(
        message
      )}`;

      // ✅ Open WhatsApp
      window.open(whatsappURL, "_blank");

      // ✅ Save to Firebase
      await addDoc(collection(db, "contacts"), {
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

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Start Your <br />
              <span className="text-sky-400">Digital Journey?</span>
            </h2>

            <p className="text-slate-400 text-lg mb-12">
              Have a question or need a service? Reach out to us or fill the form.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { icon: Phone, title: "Call Us", value: "+917277565445 / 916299080346" },
                { icon: Mail, title: "Email Us", value: "sultandigitalzone@gmail.com" },
                { icon: MapPin, title: "Visit Us", value: "Pathalgada Chatra Jharkhand India" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{item.title}</p>
                    <p className="text-white font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-white mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-lg text-slate-400 hover:text-orange-500"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-2xl text-white mb-6">Send Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              <input
                {...register("phone")}
                placeholder="Phone"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

              <input
                {...register("email")}
                placeholder="Email"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              <select
                {...register("service")}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white"
              >
                <option value="">Select Service</option>
                <option value="jobs">Jobs</option>
                <option value="banking">Banking</option>
                <option value="govt">Govt Scheme</option>
              </select>

              <textarea
                {...register("message")}
                placeholder="Message"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
              {errors.message && <p className="text-red-500">{errors.message.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}