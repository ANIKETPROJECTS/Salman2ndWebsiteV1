import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Trophy, User, Lock } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import loginBg from "@assets/generated_images/futuristic-f1-racing-night-scene-background.png";

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
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="max-w-md w-full relative z-10">
        {/* Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 group">
             <div className="p-3 bg-primary rounded-2xl shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
               <Trophy className="w-10 h-10 text-white" />
             </div>
             <span className="font-display font-bold text-5xl tracking-tighter uppercase text-white mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">JSSIS<span className="text-primary"> F1</span></span>
          </Link>
          <p className="text-white/60 font-bold uppercase text-[10px] tracking-[0.4em] mt-3 drop-shadow-md">Grand Prix Member Portal</p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
          {/* Role Switcher */}
          <div className="flex border-b border-gray-100">
            {(['student', 'parent', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative
                  ${role === r ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}
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
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Identity Tag</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Member ID"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/20 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-white rounded-2xl font-display font-bold uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? "Syncing..." : "Enter Command Center"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/" className="text-gray-400 hover:text-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                Abort and Exit to Surface
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest drop-shadow-sm">
            Engineering Excellence • JSSIS STEM 2025
          </p>
        </div>
      </div>
    </div>
  );
}
