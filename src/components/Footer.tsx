import { Link } from "react-router-dom";

// ✅ lucide (UI icons only)
import { Phone, Mail, MapPin } from "lucide-react";

// ✅ real social icons
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Latest Updates", path: "/updates" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
  {
    title: "Popular Services",
    links: [
      { name: "Jobs & Career", path: "/services/jobs" },
      { name: "Identity Cards", path: "/services/identity" },
      { name: "Govt Schemes", path: "/services/govt" },
      { name: "Banking Services", path: "/services/banking" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "FAQ", path: "/faq" },
      { name: "Help Center", path: "/help" },
    ],
  },
];

// ✅ FIXED social icons
const socialLinks = [
  { icon: FaFacebook, path: "https://www.facebook.com/share/17jbyG1Sxx", color: "hover:text-blue-500" },
  { icon: FaInstagram, path: "https://www.instagram.com/sultandigitalzone", color: "hover:text-pink-500" },
  { icon: SiThreads, path: "https://www.threads.com/@sultandigitalzone", color: "hover:text-gray-300" },
  { icon: FaLinkedin, path: "https://linkedin.com/in/md-shahjad-9b6a88379", color: "hover:text-blue-700" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white text-2xl">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl">SULTAN</span>
                <span className="text-sky-400 text-xs">DIGITAL ZONE</span>
              </div>
            </Link>

            <p className="text-slate-400 mb-8 max-w-sm">
              Digital ka smart solution, ek hi jagah! We provide comprehensive digital services.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} hover:bg-slate-800`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold mb-6 text-lg">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-orange-500 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-orange-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-slate-900 mb-10">

          <div className="flex items-center gap-4">
            <div className="icon">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Call Us</p>
              <p className="text-white font-semibold">+91 7277565445</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="icon">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Email Us</p>
              <p className="text-white font-semibold">sultandigitalzone@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="icon">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Visit Us</p>
              <p className="text-white font-semibold">Jharkhand, India</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Sultan Digital Zone. All rights reserved.</p>
          <p>
            Designed by <span className="text-orange-500">PSR Developer</span>
          </p>
        </div>

      </div>
    </footer>
  );
}