import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Home from "@/src/pages/Home";
import ServicesPage from "@/src/pages/ServicesPage";
import AboutPage from "@/src/pages/AboutPage";
import UpdatesPage from "@/src/pages/UpdatesPage";
import Blog from "./pages/Blog";
import TypingTest from "./pages/TypingTest";
import ContactPage from "@/src/pages/ContactPage";
import ServiceDetails from "@/src/sections/ServiceDetails";
import AdminLogin from "@/src/sections/AdminLogin";
import AdminDashboard from "@/src/sections/AdminDashboard";
import ChatBot from "@/src/components/ChatBot";
import { AnimatePresence } from "motion/react";
import { AuthProvider } from "@/src/components/AuthProvider";
import ErrorBoundary from "@/src/components/ErrorBoundary";
import ScrollToTop from "@/src/components/ScrollToTop";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-500 selection:text-white">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/updates" element={<UpdatesPage />} />
                  <Route path="/blog" element={<Blog />} />
                  
        <Route path="/typing-test" element={<TypingTest />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center pt-20">
                    <div className="text-center">
                      <h1 className="text-9xl font-bold text-slate-900">404</h1>
                      <p className="text-2xl text-slate-400 mt-4">Page not found</p>
                      <button 
                        onClick={() => window.history.back()}
                        className="mt-8 px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                } />
              </Routes>
            </AnimatePresence>
            <ChatBot />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
