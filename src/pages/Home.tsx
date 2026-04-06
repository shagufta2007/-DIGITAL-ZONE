import Hero from "@/src/sections/Hero";
import About from "@/src/sections/About";
import Services from "@/src/sections/Services";
import Contact from "@/src/sections/Contact";
import Stats from "@/src/sections/Stats";
import WhyChooseUs from "@/src/sections/WhyChooseUs";
import Testimonials from "@/src/sections/Testimonials";
import Gallery from "@/src/sections/Gallery";
import Updates from "@/src/sections/Updates";
import FAQ from "@/src/sections/FAQ";
import Newsletter from "@/src/sections/Newsletter";
import SocialMedia from "@/src/sections/SocialMedia";
import GoogleMap from "@/src/sections/GoogleMap";
import { motion } from "motion/react";
import { MessageSquare, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <Hero />
      <Stats />
      <About />
      <WhyChooseUs />
      <Services />
      <Updates />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Contact />
      <GoogleMap />
      <SocialMedia />
      <Newsletter />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:bg-green-600 transition-all md:bottom-6 md:right-6"
      >
        <MessageSquare size={28} />
      </motion.a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center border border-slate-800 shadow-xl hover:bg-slate-800 transition-all md:bottom-24 md:right-6"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </main>
  );
}
