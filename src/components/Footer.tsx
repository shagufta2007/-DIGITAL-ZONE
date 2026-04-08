import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

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

const socialLinks = [
  { icon: Facebook, path: "https://www.facebook.com/share/17jbyG1Sxx", color: "hover:text-blue-500" },
  { icon: Instagram, path: "https://www.instagram.com/sultandigitalzone", color: "hover:text-pink-500" },
  { icon: Twitter, path: "https://www.threads.com/@sultandigitalzone", color: "hover:text-sky-400" },
  { icon: Linkedin, path: "https://linkedin.com/in/md-shahjad-9b6a88379", color: "hover:text-blue-700" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white text-2xl">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl leading-tight tracking-tight">SULTAN</span>
                <span className="text-sky-400 text-xs font-medium tracking-widest">DIGITAL ZONE</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              Digital ka smart solution, ek hi jagah! We provide comprehensive digital services for all your personal and business needs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.path}
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
                     
                      className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-2 group "
                   
                    >
                      
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-orange-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-slate-900 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-orange-500">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Call Us</p>
              <p className="text-white font-semibold">+91 7277565445</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-sky-400">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Email Us</p>
              <p className="text-white font-semibold">sultandigitalzone@gmail.com </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-orange-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Visit Us</p>
              <p className="text-white font-semibold">Pathalgada chatra Jharkhand India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Sultan Digital Zone. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed by <span className="text-orange-500 font-medium">PSR Developer</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
