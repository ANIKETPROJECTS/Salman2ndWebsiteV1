import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Trophy, User, Lock, ArrowRight, Mail } from "lucide-react";
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 text-gray-900 group">
             <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
               <Trophy className="w-8 h-8 text-white" />
             </div>
             <span className="font-display font-bold text-4xl tracking-tighter uppercase">JSSIS<span className="text-primary"> F1</span></span>
          </Link>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-4">Grand Prix Member Portal</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Role Switcher */}
          <div className="flex border-b border-gray-50">
            {(['student', 'parent', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative
                  ${role === r ? 'text-primary' : 'text-gray-300 hover:text-gray-500'}
                `}
              >
                {r}
                {role === r && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Identity Tag</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Member ID"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-white rounded-2xl font-display font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? "Syncing..." : "Enter Command Center"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/" className="text-gray-300 hover:text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                Abort and Exit to Surface
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
            Engineering Excellence • JSSIS STEM 2025
          </p>
        </div>
      </div>
    </div>
  );
}
