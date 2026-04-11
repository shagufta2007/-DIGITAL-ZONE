import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Updates", path: "/updates" },

   { name: "Blog", path: "/blog" },
  { name: "Typing Test", path: "/typing-test" },

  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center font-bold text-white text-xl">
           <img src="/logo1.png" alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight">SULTAN</span>
            <span className="text-sky-400 text-xs font-medium tracking-wider">DIGITAL ZONE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-500",
                location.pathname === link.path ? "text-orange-500" : "text-slate-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/917277565445"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all"
          >
            <MessageSquare size={16} />
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium py-2 border-b border-slate-800 last:border-0",
                  location.pathname === link.path ? "text-orange-500" : "text-slate-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-2">
              <a
                href="tel:+917277565445"
                className="flex-1 bg-slate-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
              >
                <Phone size={18} />
                Call
              </a>
              <a
                href="https://wa.me/917277565445"
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
              >
                <MessageSquare size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
