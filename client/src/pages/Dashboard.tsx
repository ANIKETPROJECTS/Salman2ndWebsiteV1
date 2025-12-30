import { useAuth } from "../hooks/use-auth";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Trophy, 
  Calendar, 
  LogOut, 
  Bell,
  Clock
} from "lucide-react";
import { useTasks, useUpdateTask } from "../hooks/use-dashboard-data";
import { useState } from "react";
import { motion } from "framer-motion";

function Sidebar() {
  const { logout } = useAuth();
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/tasks", label: "My Tasks", icon: CheckSquare },
    { href: "/dashboard/competitions", label: "Competitions", icon: Trophy },
    { href: "/dashboard/schedule", label: "Schedule", icon: Calendar },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 p-6 hidden md:flex flex-col">
      <div className="flex items-center gap-2 mb-10 text-gray-900">
        <Trophy className="w-6 h-6 text-primary" />
        <span className="font-display font-bold text-xl">SEAL<span className="text-primary"> CLUB</span></span>
      </div>

      <div className="space-y-1 flex-1">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
              ${location === link.href
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
            `}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
      </div>

      <button 
        onClick={() => logout()}
        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
}

function TaskList() {
  const { data: tasks, isLoading } = useTasks();
  const updateTask = useUpdateTask();

  if (isLoading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl"/>)}</div>;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
        Pending Tasks
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">{tasks?.length || 0}</span>
      </h3>
      
      <div className="space-y-3">
        {tasks?.map((task) => (
          <div key={task.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            <button 
              onClick={() => updateTask.mutate({ id: task.id, status: task.status === 'completed' ? 'pending' : 'completed' })}
              className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                ${task.status === 'completed' 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-primary'}
              `}
            >
              {task.status === 'completed' && <CheckSquare className="w-3 h-3" />}
            </button>
            <div>
              <p className={`font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase
                  ${task.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
                `}>
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {(!tasks || tasks.length === 0) && (
          <p className="text-gray-400 text-center py-8">No tasks assigned yet.</p>
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />
      
      <div className="md:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.firstName || user.username}!
            </h1>
            <p className="text-gray-500">Here's what's happening with your team today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {(user.firstName?.[0] || user.username[0]).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Active Competitions", value: "2", color: "bg-blue-500" },
            { label: "Tasks Completed", value: "12", color: "bg-green-500" },
            { label: "Upcoming Events", value: "3", color: "bg-purple-500" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-2xl mb-4 opacity-10`} />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TaskList />
          </div>
          <div>
            <div className="bg-primary text-white p-6 rounded-3xl shadow-xl shadow-primary/20">
              <h3 className="font-bold text-lg mb-4">Next Event</h3>
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm mb-4">
                 <p className="text-sm opacity-80 mb-1">Workshop</p>
                 <p className="font-bold text-xl">Aerodynamics 101</p>
                 <p className="text-sm mt-2 opacity-80">Friday, 2:00 PM • Lab 3</p>
              </div>
              <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
