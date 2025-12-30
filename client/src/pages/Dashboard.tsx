import { useAuth } from "../hooks/use-auth";
import { useLocation } from "wouter";
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
  UserCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Task, Competition, Attendance, User, Event } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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
    <div className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-50 flex items-center gap-3">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">Admin</p>
          <p className="text-[10px] text-gray-400 font-medium">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              location === link.href ? "bg-red-50 text-red-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, colorClass, statusLabel }: { label: string; value: string; icon: any; colorClass: string; statusLabel: string }) {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{statusLabel}</p>
        </div>
      </CardContent>
      <div className={`h-1 w-full ${colorClass.split(' ')[0].replace('text-', 'bg-')}`} />
    </Card>
  );
}

function StudentOverview({ user }: { user: User }) {
  const { data: tasks } = useQuery<Task[]>({ queryKey: [`/api/tasks/user/${user.id}`] });
  const { data: events } = useQuery<Event[]>({ queryKey: ["/api/events"] });

  const stats = [
    { label: "Completed", value: tasks?.filter(t => t.status === 'completed').length.toString() || "0", icon: CheckCircle2, colorClass: "text-green-500 border-green-500", statusLabel: "Completed" },
    { label: "In Progress", value: tasks?.filter(t => t.status === 'in_progress').length.toString() || "0", icon: Clock, colorClass: "text-blue-500 border-blue-500", statusLabel: "In Progress" },
    { label: "Pending", value: tasks?.filter(t => t.status === 'pending').length.toString() || "0", icon: Clock, colorClass: "text-yellow-500 border-yellow-500", statusLabel: "Pending" },
    { label: "Overdue", value: tasks?.filter(t => t.status === 'overdue').length.toString() || "0", icon: AlertCircle, colorClass: "text-red-500 border-red-500", statusLabel: "Overdue" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-8 py-6">
            <CardTitle className="text-lg font-bold">Recent Tasks</CardTitle>
            <Button variant="link" className="text-xs font-bold text-gray-400 uppercase tracking-widest">View All &gt;</Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {tasks?.slice(0, 4).map(task => (
                <div key={task.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{task.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-8 py-6">
            <CardTitle className="text-lg font-bold">Upcoming Events</CardTitle>
            <Button variant="link" className="text-xs font-bold text-gray-400 uppercase tracking-widest">View All &gt;</Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {events?.slice(0, 4).map(event => (
                <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{event.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  
  if (!user) {
    setLocation("/login");
    return null;
  }

  const role = user.role || 'student';

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900">
      <Sidebar role={role} onLogout={() => logout()} />
      
      <div className="ml-64 p-12">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              Welcome back! <span className="text-3xl">👋</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Here's what's happening with your STEM activities</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm">
              {(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}
            </div>
          </div>
        </header>

        <StudentOverview user={user as any} />
      </div>
    </div>
  );
}
