import { useAuth } from "../hooks/use-auth";
import { useLocation, Link } from "wouter";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Trophy, 
  Calendar, 
  LogOut, 
  Bell,
  Clock,
  Users,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Task, type User, type Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Sidebar({ role, onLogout }: { role?: string; onLogout: () => void }) {
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/analytics", label: "Analytics", icon: TrendingUp },
    { href: "/dashboard/students", label: "Students", icon: Users },
    { href: "/dashboard/competitions", label: "Competitions", icon: Trophy },
    { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/dashboard/attendance", label: "Attendance", icon: UserCheck },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 flex flex-col z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
      <div className="p-6 border-b border-gray-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-black text-sm leading-tight text-gray-900 tracking-tight text-left">Admin</p>
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase text-left">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 p-4 mt-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold tracking-tight transition-all duration-300 group ${
              location === link.href 
                ? "bg-red-50 text-red-600 shadow-sm shadow-red-100/50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <link.icon className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${location === link.href ? "text-red-600" : "text-gray-400"}`} />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-2xl text-[13px] font-bold tracking-tight transition-all duration-300 group"
        >
          <LogOut className="w-4.5 h-4.5 text-gray-400 group-hover:text-red-600 transition-colors" />
          Logout
        </button>
      </div>
    </div>
  );
}

function StatCard({ value, icon: Icon, colorClass, statusLabel }: { value: string; icon: any; colorClass: string; statusLabel: string }) {
  return (
    <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-1">
      <CardContent className="p-7 flex items-center gap-6">
        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border-2 shrink-0 transition-transform duration-500 hover:rotate-6 ${colorClass}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-gray-900 tracking-tighter">{value}</span>
          </div>
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.15em] mt-0.5 text-left">{statusLabel}</p>
        </div>
      </CardContent>
      <div className={`h-1.5 w-full opacity-20 ${colorClass.split(' ')[0].replace('text-', 'bg-')}`} />
    </Card>
  );
}

function PageContent({ title, user }: { title: string; user: User }) {
  const { data: tasks } = useQuery<Task[]>({ queryKey: [`/api/tasks/user/${user.id}`] });
  const { data: events } = useQuery<Event[]>({ queryKey: ["/api/events"] });

  if (title === "Dashboard") {
    const stats = [
      { value: "1", icon: CheckCircle2, colorClass: "text-green-500 border-green-500/20 bg-green-50/30", statusLabel: "Completed" },
      { value: "0", icon: Clock, colorClass: "text-blue-500 border-blue-500/20 bg-blue-50/30", statusLabel: "In Progress" },
      { value: "1", icon: Clock, colorClass: "text-yellow-500 border-yellow-500/20 bg-yellow-50/30", statusLabel: "Pending" },
      { value: "0", icon: AlertCircle, colorClass: "text-red-500 border-red-500/20 bg-red-50/30", statusLabel: "Overdue" },
    ];

    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="border-none shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] rounded-[24px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-10 py-7">
              <CardTitle className="text-xl font-black text-gray-900 tracking-tight">Recent Tasks</CardTitle>
              <Button variant="ghost" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 no-underline transition-colors h-auto p-0">View All &gt;</Button>
            </CardHeader>
            <CardContent className="p-10">
              <div className="space-y-5">
                {[
                  { id: 1, title: "Aerodynamics Draft", dueDate: "1/20/2025", color: "bg-blue-500" },
                  { id: 2, title: "Telemetry Setup", dueDate: "1/10/2025", color: "bg-green-500" }
                ].map(task => (
                  <div key={task.id} className="flex items-center gap-5 p-6 bg-gray-50/40 rounded-[20px] transition-all duration-300 hover:bg-gray-50 hover:translate-x-1 border border-transparent hover:border-gray-100">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${task.color}`} />
                    <div className="flex-1">
                      <p className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight text-left">{task.title}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1.5 opacity-80 text-left">Due: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] rounded-[24px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-10 py-7">
              <CardTitle className="text-xl font-black text-gray-900 tracking-tight">Upcoming Events</CardTitle>
              <Button variant="ghost" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 no-underline transition-colors h-auto p-0">View All &gt;</Button>
            </CardHeader>
            <CardContent className="p-10">
              <div className="space-y-5">
                {[
                  { id: 1, title: "Club Orientation", date: "9/1/2025", time: "05:30 AM" }
                ].map(event => (
                  <div key={event.id} className="flex items-center gap-5 p-6 bg-gray-50/40 rounded-[20px] transition-all duration-300 hover:bg-gray-50 hover:translate-x-1 border border-transparent hover:border-gray-100">
                    <div className="w-12 h-12 bg-red-50 rounded-[18px] flex items-center justify-center shrink-0 shadow-sm shadow-red-100/50">
                      <Calendar className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight text-left">{event.title}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1.5 opacity-80 text-left">
                        {event.date} • {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 animate-in fade-in duration-700">
      <div className="w-20 h-20 bg-gray-100 rounded-[24px] flex items-center justify-center mb-4">
        <Clock className="w-10 h-10 text-gray-300" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title} Section</h2>
      <p className="text-gray-400 font-bold text-sm tracking-wide">This module is currently being optimized for your team.</p>
    </div>
  );
}

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();
  
  if (!user) {
    setLocation("/login");
    return null;
  }

  const role = user.role || 'student';
  const pageTitle = location === "/dashboard" ? "Dashboard" : 
                    location.split("/").pop()?.charAt(0).toUpperCase() + (location.split("/").pop()?.slice(1) || "");

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900 selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
      <Sidebar role={role} onLogout={() => logoutMutation.mutate()} />
      
      <div className="ml-64 p-12 lg:p-20 max-w-7xl mx-auto">
        <header className="mb-16 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-3">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 uppercase italic leading-[0.9] flex items-center gap-4 text-left">
              Welcome back! <span className="not-italic inline-block animate-bounce-slow text-4xl">👋</span>
            </h1>
            <p className="text-gray-400 font-bold tracking-widest text-xs uppercase opacity-80 text-left">Here's what's happening with your STEM activities</p>
          </div>
          
          <div className="flex items-center gap-8">
            <button className="relative group">
              <div className="absolute -inset-2 bg-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Bell className="w-7 h-7 text-gray-400 group-hover:text-red-600 transition-colors relative z-10" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-[3px] border-white relative z-20" />
            </button>
            <div className="flex items-center gap-5 pl-8 border-l-2 border-gray-50">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-gray-900 leading-none">{user.username}</p>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mt-1.5 opacity-90">{role}</p>
              </div>
              <div className="w-14 h-14 rounded-[22px] bg-white border-2 border-gray-50 shadow-sm flex items-center justify-center font-black text-gray-400 text-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:border-red-100">
                {(user.username?.[0] || "U").toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <PageContent title={pageTitle} user={user as any} />
      </div>
    </div>
  );
}
