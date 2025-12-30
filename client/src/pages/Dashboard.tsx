import { useAuth } from "../hooks/use-auth";
import { Link, useLocation } from "wouter";
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
  FileText,
  UserCheck
} from "lucide-react";
import { useTasks, useUpdateTask } from "../hooks/use-dashboard-data";
import { useState } from "react";
import { motion } from "framer-motion";

function Sidebar({ role }: { role?: string }) {
  const { logout } = useAuth();
  const [location] = useLocation();

  const studentLinks = [
    { href: "/dashboard", label: "Race Center", icon: LayoutDashboard },
    { href: "/dashboard/tasks", label: "Engineering Tasks", icon: CheckSquare },
    { href: "/dashboard/competitions", label: "Grand Prix", icon: Trophy },
    { href: "/dashboard/schedule", label: "Race Calendar", icon: Calendar },
  ];

  const adminLinks = [
    { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
    { href: "/dashboard/students", label: "Team Management", icon: Users },
    { href: "/dashboard/competitions", label: "Race Series", icon: Trophy },
    { href: "/dashboard/attendance", label: "Paddock Entry", icon: UserCheck },
    { href: "/dashboard/analytics", label: "Telemetry", icon: TrendingUp },
  ];

  const parentLinks = [
    { href: "/dashboard", label: "Child Progress", icon: LayoutDashboard },
    { href: "/dashboard/child-tasks", label: "Target Status", icon: CheckSquare },
    { href: "/dashboard/child-attendance", label: "Entry Records", icon: UserCheck },
    { href: "/dashboard/gallery", label: "Media Feed", icon: FileText },
  ];

  const links = role === 'admin' ? adminLinks : role === 'parent' ? parentLinks : studentLinks;

  return (
    <div className="w-72 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 p-8 hidden md:flex flex-col">
      <div className="flex items-center gap-3 mb-12 text-gray-900">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-bold text-2xl uppercase tracking-tighter">JSSIS<span className="text-primary"> F1</span></span>
      </div>

      <div className="space-y-2 flex-1">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`
              flex items-center gap-4 px-5 py-4 rounded-2xl font-display font-bold uppercase text-[11px] tracking-widest transition-all
              ${location === link.href
                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"}
            `}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-50 mt-auto">
        <div className="px-5 py-4 mb-6 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Access Level</p>
          <p className="text-xs font-display font-bold text-gray-900 uppercase tracking-widest">{role || 'Student'}</p>
        </div>
        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50 rounded-2xl font-display font-bold uppercase text-[11px] tracking-widest transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function StudentOverview() {
  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <TaskList />
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-display font-bold mb-8 text-gray-900 uppercase tracking-tight">Performance Telemetry</h3>
          <div className="h-56 flex items-end justify-between gap-3 px-4">
            {[65, 80, 45, 90, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-2xl relative group overflow-hidden">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="bg-primary/20 absolute bottom-0 left-0 right-0 transition-all"
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 0.7}%` }}
                  className="bg-primary absolute bottom-0 left-0 right-0 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] px-4">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group sticky top-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-colors"></div>
          <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-tight relative z-10">Race Briefing</h3>
          <div className="bg-white/5 p-5 rounded-3xl backdrop-blur-sm mb-6 border border-white/10 relative z-10">
             <p className="text-[10px] font-bold text-primary mb-2 uppercase tracking-[0.3em]">Next Session</p>
             <p className="font-display font-bold text-2xl uppercase tracking-tight">Aerodynamics Lab</p>
             <p className="text-sm mt-3 font-medium text-white/60">Friday, 14:00 • Lab 3</p>
          </div>
          <button className="w-full py-5 bg-primary text-white rounded-2xl font-display font-bold uppercase text-xs tracking-widest hover:bg-primary/90 transition-all hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)] hover:-translate-y-1 relative z-10">
            Open Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskList() {
  const { data: tasks, isLoading } = useTasks();
  const updateTask = useUpdateTask();

  if (isLoading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-3xl"/>)}</div>;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-display font-bold mb-8 flex items-center justify-between text-gray-900 uppercase tracking-tight">
        Active Objectives
        <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[11px] font-display font-bold tracking-widest">{tasks?.length || 0}</span>
      </h3>
      
      <div className="space-y-4">
        {tasks?.map((task) => (
          <div key={task.id} className="flex items-start gap-5 p-5 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
            <button 
              onClick={() => updateTask.mutate({ id: task.id, status: task.status === 'completed' ? 'pending' : 'completed' })}
              className={`mt-1 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all
                ${task.status === 'completed' 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110' 
                  : 'border-gray-200 hover:border-primary bg-white group-hover:scale-105'}
              `}
            >
              {task.status === 'completed' && <CheckSquare className="w-4 h-4" />}
            </button>
            <div className="flex-1">
              <p className={`font-display font-bold text-base uppercase tracking-tight ${task.status === 'completed' ? 'text-gray-300 line-through' : 'text-gray-900'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest
                  ${task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}
                `}>
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {(!tasks || tasks.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-300 font-display font-bold uppercase text-sm tracking-widest mb-2">Paddock Clear</p>
            <p className="text-gray-400 text-xs">No active targets assigned to your unit.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  
  if (authLoading) return null;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const role = (user as any).role || 'student';

  return (
    <div className="bg-white min-h-screen">
      <Sidebar role={role} />
      
      <div className="md:ml-72 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 pb-8 border-b border-gray-50">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900 uppercase tracking-tighter">
              Pilot Dashboard
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.4em] mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Member Registry: {user.firstName || user.email?.split('@')[0] || "Active Member"}
            </p>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition-all hover:scale-105">
              <Bell className="w-6 h-6 text-gray-400" />
            </button>
            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-display font-bold text-gray-900 uppercase tracking-widest">{user.firstName || "Member"}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] leading-none mt-1">Status: Active</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary shadow-xl shadow-primary/20 flex items-center justify-center font-display font-bold text-xl text-white">
                {(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Active Series", value: "02", icon: Trophy, color: "text-primary", bg: "bg-red-50" },
            { label: "Completion Velocity", value: "84%", icon: TrendingUp, color: "text-gray-900", bg: "bg-gray-50" },
            { label: "Track Attendance", value: "98%", icon: UserCheck, color: "text-primary", bg: "bg-red-50" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-3xl mb-8 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
              <h3 className="text-4xl font-display font-bold text-gray-900 tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <StudentOverview />
      </div>
    </div>
  );
}
