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
  UserCheck,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Task, Competition, Attendance, User } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

function Sidebar({ role, onLogout }: { role?: string; onLogout: () => void }) {
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
  ];

  const parentLinks = [
    { href: "/dashboard", label: "Child Progress", icon: LayoutDashboard },
    { href: "/dashboard/gallery", label: "Media Feed", icon: FileText },
  ];

  const links = role === 'admin' ? adminLinks : role === 'parent' ? parentLinks : studentLinks;

  return (
    <div className="w-72 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 p-8 hidden md:flex flex-col">
      <div className="flex items-center gap-3 mb-12 text-gray-900">
        <div className="w-10 h-10 bg-[#ef4444] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ef4444]/20">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-bold text-2xl uppercase tracking-tighter">STEM<span className="text-[#ef4444]"> CLUB</span></span>
      </div>

      <div className="space-y-2 flex-1">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`
              flex items-center gap-4 px-5 py-4 rounded-2xl font-display font-bold uppercase text-[11px] tracking-widest transition-all
              ${location === link.href
                ? "bg-[#ef4444] text-white shadow-xl shadow-[#ef4444]/20 scale-105 z-10"
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
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50 rounded-2xl font-display font-bold uppercase text-[11px] tracking-widest transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: Task }) {
  const updateMutation = useMutation({
    mutationFn: async (status: string) => {
      await apiRequest('PATCH', `/api/tasks/${task.id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/tasks/user/${task.assignedTo}`] });
    }
  });

  return (
    <div className="flex items-start gap-5 p-5 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
      <button 
        onClick={() => updateMutation.mutate(task.status === 'completed' ? 'pending' : 'completed')}
        className={`mt-1 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all
          ${task.status === 'completed' 
            ? 'bg-[#ef4444] border-[#ef4444] text-white shadow-lg shadow-[#ef4444]/30 scale-110' 
            : 'border-gray-200 hover:border-[#ef4444] bg-white group-hover:scale-105'}
        `}
      >
        {task.status === 'completed' && <CheckSquare className="w-4 h-4" />}
      </button>
      <div className="flex-1">
        <p className={`font-display font-bold text-base uppercase tracking-tight ${task.status === 'completed' ? 'text-gray-300 line-through' : 'text-gray-900'}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="uppercase tracking-widest text-[9px]">
            {task.priority}
          </Badge>
          {task.dueDate && (
            <span className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function StudentView({ user }: { user: User }) {
  const { data: tasks } = useQuery<Task[]>({ queryKey: [`/api/tasks/user/${user.id}`] });
  const { data: competitions } = useQuery<Competition[]>({ queryKey: ["/api/competitions"] });

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-display font-bold mb-8 flex items-center justify-between text-gray-900 uppercase tracking-tight">
            Active Objectives
            <span className="bg-[#ef4444] text-white px-4 py-1.5 rounded-full text-[11px] font-display font-bold tracking-widest">{tasks?.length || 0}</span>
          </h3>
          <div className="space-y-4">
            {tasks?.map(task => <TaskItem key={task.id} task={task} />)}
            {(!tasks || tasks.length === 0) && <p className="text-center text-gray-400 py-8">No objectives assigned.</p>}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-display font-bold mb-8 text-gray-900 uppercase tracking-tight">Telemetry Data</h3>
          <div className="h-56 flex items-end justify-between gap-3 px-4">
            {[65, 80, 45, 90, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-2xl relative overflow-hidden">
                <div style={{ height: `${h}%` }} className="bg-[#ef4444]/20 absolute bottom-0 left-0 right-0" />
                <div style={{ height: `${h * 0.7}%` }} className="bg-[#ef4444] absolute bottom-0 left-0 right-0 shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-tight">Active Series</h3>
          {competitions?.filter(c => c.status === 'active').map(comp => (
            <div key={comp.id} className="bg-white/5 p-5 rounded-3xl backdrop-blur-sm mb-4 border border-white/10">
               <p className="text-[10px] font-bold text-[#ef4444] mb-2 uppercase tracking-[0.3em]">{comp.type}</p>
               <p className="font-display font-bold text-xl uppercase tracking-tight">{comp.title}</p>
               <div className="mt-4">
                  <div className="flex justify-between text-[10px] mb-1 uppercase font-bold text-white/40">
                    <span>Build Progress</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-1.5 bg-white/10" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParentView({ user }: { user: User }) {
  const { data: child } = useQuery<User>({ queryKey: [`/api/users/${user.childId}`], enabled: !!user.childId });
  const { data: attendance } = useQuery<Attendance[]>({ queryKey: [`/api/attendance/user/${user.childId}`], enabled: !!user.childId });
  const { data: tasks } = useQuery<Task[]>({ queryKey: [`/api/tasks/user/${user.childId}`], enabled: !!user.childId });

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="rounded-[2rem] border-none shadow-sm bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-widest text-gray-400">Entry Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold mb-4">98%</div>
            <div className="space-y-3">
              {attendance?.slice(0, 3).map(a => (
                <div key={a.id} className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span>{new Date(a.date).toLocaleDateString()}</span>
                  <Badge variant="outline" className="text-[9px] border-[#ef4444] text-[#ef4444]">{a.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 rounded-[2rem] border-none shadow-sm bg-white border border-gray-100">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-widest text-gray-400">Development Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks?.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                {task.status === 'completed' ? <CheckCircle2 className="text-green-500 w-5 h-5" /> : <Clock className="text-yellow-500 w-5 h-5" />}
                <div className="flex-1">
                  <p className="text-sm font-bold uppercase tracking-tight">{task.title}</p>
                  <Progress value={task.status === 'completed' ? 100 : 35} className="h-1 mt-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="relative h-64 rounded-[2.5rem] overflow-hidden group">
            <img src="/attached_assets/generated_images/dynamic_f1_racing_car_on_track_at_night_background.png" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
               <Badge className="w-fit mb-2 bg-[#ef4444]">PREMIUM SERIES</Badge>
               <h3 className="text-white font-display font-bold text-2xl uppercase italic">F1 in Schools</h3>
               <p className="text-white/60 text-xs uppercase tracking-widest mt-1">World Finals Prep</p>
            </div>
         </div>
         <div className="relative h-64 rounded-[2.5rem] overflow-hidden group">
            <img src="/attached_assets/generated_images/drift_racing_at_night.png" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
               <Badge className="w-fit mb-2 bg-[#ef4444]">NIGHT DRIFT</Badge>
               <h3 className="text-white font-display font-bold text-2xl uppercase italic">Drift Masters</h3>
               <p className="text-white/60 text-xs uppercase tracking-widest mt-1">RC Precision League</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function AdminView() {
  const { data: students } = useQuery<User[]>({ queryKey: ["/api/students"] });
  const { data: tasks } = useQuery<Task[]>({ queryKey: ["/api/tasks"] });

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-2xl mb-8">
          <TabsTrigger value="students" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] font-bold tracking-widest px-8">Unit Roster</TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] font-bold tracking-widest px-8">Objectives</TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm uppercase text-[10px] font-bold tracking-widest px-8">Paddock Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <div className="grid gap-4 md:grid-cols-3">
            {students?.map(s => (
              <div key={s.id} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-[#ef4444]/20 transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-display font-bold text-[#ef4444] shadow-sm mb-4">
                  {(s.firstName?.[0] || s.email?.[0] || "U").toUpperCase()}
                </div>
                <p className="font-display font-bold uppercase tracking-tight text-gray-900">{s.firstName || s.email}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Grade {s.grade}</p>
                <Button variant="ghost" className="w-full mt-4 rounded-xl text-[10px] uppercase tracking-widest font-bold">Manage Unit</Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks">
           <div className="space-y-4">
              {tasks?.map(t => (
                <div key={t.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl">
                  <div>
                    <p className="font-display font-bold uppercase tracking-tight">{t.title}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target: {t.assignedTo}</p>
                  </div>
                  <Badge variant={t.status === 'completed' ? 'default' : 'secondary'} className="uppercase tracking-widest text-[9px]">{t.status}</Badge>
                </div>
              ))}
              <Button className="w-full py-6 rounded-2xl bg-[#ef4444] hover:bg-[#dc2626] font-display font-bold uppercase tracking-widest text-xs">Deploy New Objective</Button>
           </div>
        </TabsContent>
        
        <TabsContent value="attendance">
           <div className="text-center py-20">
              <UserCheck className="w-16 h-16 text-gray-100 mx-auto mb-4" />
              <p className="text-gray-300 font-display font-bold uppercase tracking-[0.2em]">Ready for Scrutineering</p>
              <Button variant="outline" className="mt-6 rounded-2xl uppercase tracking-widest font-bold text-[10px]">Open Scanner</Button>
           </div>
        </TabsContent>
      </Tabs>
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
    <div className="bg-[#fcfcfc] min-h-screen font-sans">
      <Sidebar role={role} onLogout={() => logout()} />
      
      <div className="md:ml-72 p-6 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-display font-bold text-gray-900 tracking-tighter uppercase italic">
              Control <span className="text-[#ef4444]">Panel</span>
            </h1>
            <div className="flex items-center gap-3 mt-4">
               <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em]">System Active: {user.firstName || user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-display font-bold text-gray-900 uppercase tracking-widest">{user.role}</p>
                <p className="text-[9px] font-bold text-[#ef4444] uppercase tracking-[0.3em] mt-1 italic">Verified Unit</p>
             </div>
             <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm flex items-center justify-center font-display font-bold text-2xl text-gray-900">
                {(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}
             </div>
          </div>
        </header>

        {role === 'admin' ? <AdminView /> : role === 'parent' ? <ParentView user={user as any} /> : <StudentView user={user as any} />}
      </div>
    </div>
  );
}
