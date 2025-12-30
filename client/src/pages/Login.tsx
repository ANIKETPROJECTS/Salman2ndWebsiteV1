import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Trophy, User, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/use-auth";

export default function Login() {
  const [role, setRole] = useState<'student' | 'parent' | 'admin'>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  // Using the real auth integration
  const { user, isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
     setLocation("/dashboard");
     return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Redirect to backend auth endpoint
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-4 relative z-10">
             <Trophy className="w-8 h-8" />
             <span className="font-display font-bold text-3xl tracking-tighter uppercase">JSSIS F1</span>
          </Link>
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider relative z-10">Member Portal</h2>
          <p className="text-white/80 mt-2 font-medium relative z-10">Secure Access for Students & Parents</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-[0.2em] text-center">Select Access Role</label>
              <div className="grid grid-cols-3 gap-3">
                {['student', 'parent', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`
                      py-4 px-1 text-[10px] font-bold rounded-2xl capitalize transition-all border-2 flex flex-col items-center gap-2
                      ${role === r 
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' 
                        : 'bg-white text-gray-400 border-gray-50 hover:border-primary/20 hover:bg-gray-50'}
                    `}
                  >
                    <span className="uppercase tracking-widest">{r}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-white rounded-2xl font-display font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? "Processing..." : "Secure Login"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                By logging in, you agree to the club code of conduct
              </p>
            </div>
          </form>

          <div className="mt-10 text-center border-t border-gray-50 pt-8">
            <Link href="/" className="text-gray-400 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              Exit to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
