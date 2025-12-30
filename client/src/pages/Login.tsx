import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Trophy, User, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [role, setRole] = useState<'student' | 'parent' | 'admin'>('student');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth() as any;
  const { toast } = useToast();
  
  if (isAuthenticated) {
     setLocation("/dashboard");
     return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ username, password });
      toast({
        title: "Login Successful",
        description: "Welcome to the JSSIS F1 Dashboard.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Left Panel - Welcome Card */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-[#edf2f7] rounded-[2rem] w-[400px] text-center space-y-6">
          <div className="p-4 bg-[#00966b] rounded-2xl shadow-lg shadow-[#00966b]/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-[#1a202c]">Welcome Back</h2>
          <p className="text-[#4a5568] leading-relaxed">
            Sign in to your member account to access premium resources and collaborate with peers.
          </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full max-w-md space-y-4">
          {/* Role Switcher */}
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
            {(['student', 'parent', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2
                  ${role === r ? 'bg-[#00966b] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}
                `}
              >
                {r === 'admin' && <ShieldCheck className="w-4 h-4" />}
                <span className="capitalize">{r}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#00966b]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-xl font-bold capitalize">{role} Login</h3>
              </div>
              <p className="text-gray-500 text-sm">Enter {role} credentials to access the portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  {role.charAt(0).toUpperCase() + role.slice(1)} Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={`Enter ${role} username`}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00966b]/20 focus:border-[#00966b] transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00966b]/20 focus:border-[#00966b] transition-all outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs text-gray-400 hover:text-[#00966b] transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#00966b] text-white rounded-lg font-bold text-sm hover:bg-[#00805b] active:scale-[0.98] transition-all disabled:opacity-70 mt-2 shadow-lg shadow-[#00966b]/20"
              >
                {isSubmitting ? "Signing In..." : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
              </button>
            </form>

            <div className="text-center pt-2">
              <Link href="/" className="text-sm text-gray-500 hover:text-[#00966b] transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
