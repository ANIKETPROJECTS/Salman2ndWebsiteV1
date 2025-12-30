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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 p-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-4">
             <Trophy className="w-6 h-6" />
             <span className="font-display font-bold text-2xl tracking-tighter uppercase">STEM CLUB</span>
          </Link>
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Portal Access</h2>
          <p className="text-emerald-50 mt-2 font-medium opacity-90">Secure login for members & parents</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-3 uppercase tracking-wider">Select Your Role</label>
              <div className="grid grid-cols-3 gap-3">
                {['student', 'parent', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`
                      py-3 px-1 text-xs font-bold rounded-xl capitalize transition-all border-2
                      ${role === r 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' 
                        : 'bg-white text-emerald-600 border-emerald-50 hover:border-emerald-200 hover:bg-emerald-50'}
                    `}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Authenticating..." : "Login with Replit"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-emerald-50 pt-8">
            <Link href="/" className="text-emerald-400 hover:text-emerald-600 text-sm font-bold uppercase tracking-wider transition-colors">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
