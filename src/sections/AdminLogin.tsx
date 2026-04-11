import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import { useAuth } from "@/src/components/AuthProvider";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { role, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // AuthProvider will handle role fetching
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Redirect if already admin
  if (!loading && role === "admin") {
    navigate("/admin/dashboard");
  }

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-10 md:p-12 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center font-bold text-white text-4xl mx-auto mb-6 shadow-xl shadow-orange-500/20">
            S
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Login</h2>
          <p className="text-slate-500 text-sm">Welcome back, Technical Sultan!</p>
        </div>

        <div className="space-y-6">
          <p className="text-slate-400 text-center text-sm">
            Please sign in with your registered Google account to access the admin dashboard.
          </p>
          
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full bg-white text-slate-950 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:bg-slate-100 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebase/anonymous-scan.png" alt="Google" className="w-6 h-6 hidden" />
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-500 text-sm">
          <ShieldCheck size={18} className="text-emerald-500" />
          <span>Secure Admin Access</span>
        </div>
      </motion.div>
    </section>
  );
}
