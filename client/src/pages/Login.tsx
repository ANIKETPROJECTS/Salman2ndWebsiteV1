import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Trophy, User, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import loginBg from "@assets/generated_images/dynamic-f1-racing-car-on-track-at-night-background.png";

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
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center justify-center relative z-10">
        {/* Left Panel - Welcome Card */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-md rounded-[2rem] w-[400px] text-center space-y-6 shadow-xl border border-white/50">
          <div className="p-4 bg-[#ef4444] rounded-2xl shadow-lg shadow-[#ef4444]/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            Sign in to your member account to access premium resources and collaborate with peers.
          </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full max-w-md space-y-4">
          {/* Role Switcher */}
          <div className="flex bg-white/90 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/50">
            {(['student', 'parent', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2
                  ${role === r ? 'bg-[#ef4444] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}
                `}
              >
                {r === 'admin' && <ShieldCheck className="w-4 h-4" />}
                <span className="capitalize">{r}</span>
              </button>
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/50 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-xl font-bold capitalize">{role} Login</h3>
              </div>
              <p className="text-gray-500 text-sm font-medium">Enter {role} credentials to access the portal</p>
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
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#ef4444]/20 focus:border-[#ef4444] transition-all outline-none"
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
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#ef4444]/20 focus:border-[#ef4444] transition-all outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs font-semibold text-gray-400 hover:text-[#ef4444] transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#ef4444] text-white rounded-lg font-bold text-sm hover:bg-[#dc2626] active:scale-[0.98] transition-all disabled:opacity-70 mt-2 shadow-lg shadow-[#ef4444]/20"
              >
                {isSubmitting ? "Signing In..." : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
              </button>
            </form>

            <div className="text-center pt-2">
              <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-[#ef4444] transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
