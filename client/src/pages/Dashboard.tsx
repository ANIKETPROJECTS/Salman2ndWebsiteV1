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
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/tasks", label: "My Tasks", icon: CheckSquare },
    { href: "/dashboard/competitions", label: "Competitions", icon: Trophy },
    { href: "/dashboard/schedule", label: "Schedule", icon: Calendar },
  ];

  const adminLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/students", label: "Student Management", icon: Users },
    { href: "/dashboard/competitions", label: "Competitions", icon: Trophy },
    { href: "/dashboard/attendance", label: "Attendance", icon: UserCheck },
    { href: "/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  ];

  const parentLinks = [
    { href: "/dashboard", label: "Child Overview", icon: LayoutDashboard },
    { href: "/dashboard/child-tasks", label: "Child Tasks", icon: CheckSquare },
    { href: "/dashboard/child-attendance", label: "Attendance", icon: UserCheck },
    { href: "/dashboard/gallery", label: "Activity Gallery", icon: FileText },
  ];

  const links = role === 'admin' ? adminLinks : role === 'parent' ? parentLinks : studentLinks;

  return (
    <div className="w-64 bg-white border-r border-emerald-50 min-h-screen fixed left-0 top-0 p-6 hidden md:flex flex-col">
      <div className="flex items-center gap-2 mb-10 text-emerald-900">
        <Trophy className="w-6 h-6 text-emerald-600" />
        <span className="font-display font-bold text-xl uppercase tracking-tighter">STEM<span className="text-emerald-600"> CLUB</span></span>
      </div>

      <div className="space-y-1 flex-1">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all
              ${location === link.href
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                : "text-emerald-800/60 hover:bg-emerald-50 hover:text-emerald-900"}
            `}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </div>

      <div className="pt-6 border-t border-emerald-50">
        <div className="px-4 py-2 mb-4 bg-emerald-50 rounded-xl">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Signed in as</p>
          <p className="text-xs font-bold text-emerald-900 capitalize">{role || 'Student'}</p>
        </div>
        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors"
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
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <TaskList />
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
          <h3 className="text-lg font-bold mb-6 text-emerald-900 uppercase tracking-tight">Recent Performance</h3>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[65, 80, 45, 90, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-emerald-100 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="bg-emerald-600 rounded-t-lg transition-all"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200 sticky top-8">
          <h3 className="font-bold text-lg mb-4 uppercase tracking-tight">Upcoming Event</h3>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm mb-4 border border-white/10">
             <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-widest">Workshop</p>
             <p className="font-bold text-xl uppercase tracking-tighter">Aerodynamics 101</p>
             <p className="text-sm mt-2 font-medium opacity-90">Friday, 2:00 PM • Lab 3</p>
          </div>
          <button className="w-full py-4 bg-white text-emerald-600 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-emerald-50 transition-all hover:shadow-lg">
            View Full Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskList() {
  const { data: tasks, isLoading } = useTasks();
  const updateTask = useUpdateTask();

  if (isLoading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-emerald-50/50 rounded-xl"/>)}</div>;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
      <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-emerald-900 uppercase tracking-tight">
        Active Targets
        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">{tasks?.length || 0}</span>
      </h3>
      
      <div className="space-y-3">
        {tasks?.map((task) => (
          <div key={task.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-50/50 transition-colors border border-emerald-50/20">
            <button 
              onClick={() => updateTask.mutate({ id: task.id, status: task.status === 'completed' ? 'pending' : 'completed' })}
              className={`mt-1 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all
                ${task.status === 'completed' 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                  : 'border-emerald-200 hover:border-emerald-600 bg-white'}
              `}
            >
              {task.status === 'completed' && <CheckSquare className="w-3 h-3" />}
            </button>
            <div className="flex-1">
              <p className={`font-bold text-sm uppercase tracking-tight ${task.status === 'completed' ? 'text-emerald-900/30 line-through' : 'text-emerald-900'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest
                  ${task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}
                `}>
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className="text-[10px] font-bold text-emerald-800/30 flex items-center gap-1 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {(!tasks || tasks.length === 0) && (
          <p className="text-emerald-800/30 text-center py-8 font-bold uppercase text-xs tracking-widest">No tasks assigned yet.</p>
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
      
      <div className="md:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-emerald-50">
          <div>
            <h1 className="text-3xl font-display font-bold text-emerald-900 uppercase tracking-tighter">
              Pilot Dashboard
            </h1>
            <p className="text-emerald-800/50 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Welcome back, {user.firstName || user.email?.split('@')[0] || "Member"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 hover:bg-emerald-100 transition-colors">
              <Bell className="w-5 h-5 text-emerald-600" />
            </button>
            <div className="flex items-center gap-3 px-3 py-2 bg-emerald-900 rounded-2xl text-white">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-xs">
                {(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}
              </div>
              <div className="hidden lg:block pr-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status</p>
                <p className="text-[11px] font-bold uppercase tracking-wider leading-none">Online</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Competitions", value: "2", icon: Trophy, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Target Completion", value: "84%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Attendance Rate", value: "98%", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold text-emerald-900 tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <StudentOverview />
      </div>
    </div>
  );
}
