import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What are the working hours of Sultan Digital Zone?",
    answer: "We are open from Monday to Saturday, 9:00 AM to 8:00 PM. On Sundays, we are open from 10:00 AM to 2:00 PM.",
  },
  {
    question: "Do I need to bring original documents for services?",
    answer: "Yes, for most government services like Aadhar, PAN, or certificates, original documents are required for verification and scanning.",
  },
  {
    question: "Can I apply for services online through your website?",
    answer: "Yes, you can fill out our contact form or message us on WhatsApp with your requirements, and we will guide you through the online application process.",
  },
  {
    question: "How long does it take to get a PAN card?",
    answer: "An e-PAN is usually generated within 2-4 hours, while the physical PAN card is delivered to your address within 10-15 working days.",
  },
  {
    question: "Do you provide doorstep services?",
    answer: "Yes, for certain services and elderly citizens, we provide doorstep assistance within a 5km radius of our main branch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold mb-6">
              <HelpCircle size={16} />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Got Questions? <br />
              <span className="text-orange-500">We Have Answers</span>
            </h2>

            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Find answers to common questions about our services, processes, and support. If you can't find what you're looking for, feel free to contact us.
            </p>

            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-center gap-6 group hover:border-sky-500/50 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                <HelpCircle size={32} />
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-1">Still need help?</h4>
                <p className="text-slate-500 text-sm mb-4">Our support team is available 24/7 to assist you.</p>
                <button className="text-sky-400 font-bold text-sm hover:text-white transition-colors flex items-center gap-2">
                  Contact Support
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ${
                  openIndex === idx ? "bg-slate-900 border-orange-500/50 shadow-xl shadow-orange-500/10" : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-bold transition-colors ${openIndex === idx ? "text-orange-500" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openIndex === idx ? "bg-orange-500 text-white rotate-180" : "bg-slate-800 text-slate-400"}`}>
                    {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
