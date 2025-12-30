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
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-4">
             <Trophy className="w-6 h-6" />
             <span className="font-display font-bold text-2xl">JSSIS F1</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-primary-100 mt-2">Sign in to access your dashboard</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                {['student', 'parent', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`
                      py-2 px-1 text-sm font-medium rounded-xl capitalize transition-all
                      ${role === r 
                        ? 'bg-gray-900 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
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
              className="w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Redirecting..." : "Sign In with Replit"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
