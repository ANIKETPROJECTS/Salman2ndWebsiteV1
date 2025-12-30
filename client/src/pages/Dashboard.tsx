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
  AlertCircle,
  Search,
  Filter,
  Plus,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Settings,
  ShieldCheck,
  Download,
  CheckCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Task, type User, type Event, type Competition, type Attendance } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";

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
    <div className="w-64 bg-white border-r border-slate-100 h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight text-slate-900 uppercase">JSSIS STEM</p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
              location === link.href 
                ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <link.icon className={`w-4 h-4 ${location === link.href ? "text-white" : "text-slate-400"}`} />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-semibold transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
          Logout
        </button>
      </div>
    </div>
  );
}

function CRMTable({ headers, rows }: { headers: string[], rows: any[] }) {
  return (
    <div className="rounded-xl border border-slate-100 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            {headers.map(h => (
              <TableHead key={h} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 py-4 px-6">{h}</TableHead>
            ))}
            <TableHead className="text-right py-4 px-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className="hover:bg-slate-50/30 transition-colors border-b border-slate-50 last:border-0">
              {Object.values(row).map((val: any, j) => (
                <TableCell key={j} className="py-4 px-6 text-xs font-medium text-slate-600">
                  {val === "Active" || val === "Completed" || val === "Present" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 uppercase tracking-wider border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {val}
                    </span>
                  ) : val === "Leave" || val === "Pending" || val === "Late" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-600 uppercase tracking-wider border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {val}
                    </span>
                  ) : val === "Overdue" || val === "Absent" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 uppercase tracking-wider border border-red-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {val}
                    </span>
                  ) : val}
                </TableCell>
              ))}
              <TableCell className="text-right py-4 px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { value: "1", label: "Completed", icon: CheckCircle2, color: "text-green-600 bg-green-50", trend: "+1", up: true, borderColor: "border-l-4 border-l-green-500" },
    { value: "2", label: "In Progress", icon: Clock, color: "text-blue-600 bg-blue-50", trend: "+2", up: true, borderColor: "border-l-4 border-l-blue-500" },
    { value: "2", label: "Pending", icon: AlertCircle, color: "text-orange-600 bg-orange-50", trend: "0", up: true, borderColor: "border-l-4 border-l-orange-500" },
    { value: "1", label: "Overdue", icon: AlertCircle, color: "text-red-600 bg-red-50", trend: "+1", up: false, borderColor: "border-l-4 border-l-red-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className={`border border-slate-100 shadow-sm bg-white overflow-hidden transition-all hover:shadow-md ${stat.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardHeader className="p-6 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">Recent Tasks</CardTitle>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Current activities</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-500 hover:text-slate-900">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { title: "Complete CAD Training Module 3", date: "Due: 2024-01-15", color: "bg-green-50 border-l-green-500", icon: CheckCircle2 },
              { title: "Design Car Prototype v2.0", date: "Due: 2024-01-10", color: "bg-green-50 border-l-green-500", icon: CheckCircle2 },
              { title: "Prepare Marketing Presentation", date: "Due: 2024-01-20", color: "bg-orange-50 border-l-orange-500", icon: AlertCircle },
              { title: "Test RC Car Suspension", date: "Due: 2024-01-05", color: "bg-red-50 border-l-red-500", icon: AlertCircle },
            ].map((task, i) => (
              <div key={i} className={`p-4 rounded-lg border-l-4 ${task.color} bg-opacity-50`}>
                <div className="flex items-start gap-3">
                  <task.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{task.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardHeader className="p-6 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">Upcoming Events</CardTitle>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Scheduled activities</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-500 hover:text-slate-900">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { title: "Team Meeting - AEOLIAN", date: "2024-01-15 • 3:00 PM", icon: Trophy },
              { title: "CAD Workshop", date: "2024-01-18 • 2:00 PM", icon: Trophy },
              { title: "Track Testing Day", date: "2024-01-22 • 10:00 AM", icon: Trophy },
              { title: "Regional Competition", date: "2024-02-10 • 9:00 AM", icon: Trophy },
            ].map((event, i) => (
              <div key={i} className="p-4 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                    <event.icon className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-slate-100 shadow-sm bg-white">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">Performance Overview</CardTitle>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Club engagement levels over time</p>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
                { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 }
              ]}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-slate-100 shadow-sm bg-white">
          <CardHeader className="p-8 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-900">Recent Milestones</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {[
              { title: "National Qualifiers", date: "2 days ago", icon: Target, color: "text-blue-600 bg-blue-50" },
              { title: "Sponsorship Secured", date: "1 week ago", icon: ShieldCheck, color: "text-green-600 bg-green-50" },
              { title: "New Lab Equipment", date: "2 weeks ago", icon: Settings, color: "text-slate-600 bg-slate-50" }
            ].map((m, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${m.color}`}>
                  <m.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{m.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{m.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsModule() {
  const data = [
    { name: 'F1 Schools', value: 85, fill: '#0f172a' },
    { name: 'Drift Racing', value: 65, fill: '#2563eb' },
    { name: '4x4 RC', value: 45, fill: '#16a34a' },
    { name: 'Robotics', value: 35, fill: '#ea580c' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-slate-100 shadow-sm bg-white p-8">
          <CardTitle className="text-base font-bold text-slate-900 mb-6">Participation By Category</CardTitle>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" barSize={12}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} width={80} />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border border-slate-100 shadow-sm bg-white p-8">
          <CardTitle className="text-base font-bold text-slate-900 mb-6">Engagement Score</CardTitle>
          <div className="flex flex-col items-center justify-center h-[250px]">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 border-[12px] border-slate-50 rounded-full" />
              <div className="absolute inset-0 border-[12px] border-slate-900 rounded-full border-t-transparent border-r-transparent rotate-[45deg]" />
              <div className="text-center">
                <p className="text-4xl font-bold text-slate-900">82</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Excellent</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-100 shadow-sm bg-white p-8">
          <CardTitle className="text-base font-bold text-slate-900 mb-6">Milestone Progress</CardTitle>
          <div className="space-y-6">
            {[
              { label: "Season Prep", value: 85, color: "bg-blue-600" },
              { label: "Car Assembly", value: 62, color: "bg-green-600" },
              { label: "Sponsor Pitch", value: 40, color: "bg-orange-600" }
            ].map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-slate-600">{m.label}</span>
                  <span className="text-slate-900">{m.value}%</span>
                </div>
                <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                  <div style={{ width: `${m.value}%` }} className={`h-full ${m.color}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StudentModule() {
  const headers = ["Student Name", "Grade", "Specialization", "Joining Date", "Status"];
  const rows = [
    { name: "Alex Johnson", grade: "Grade 10", spec: "Aerodynamics", date: "Jan 12, 2024", status: "Active" },
    { name: "Sarah Miller", grade: "Grade 11", spec: "Telemetry", date: "Feb 05, 2024", status: "Active" },
    { name: "David Chen", grade: "Grade 10", spec: "Chassis Design", date: "Mar 20, 2024", status: "Leave" },
    { name: "Elena Rodriguez", grade: "Grade 9", spec: "Marketing", date: "Apr 15, 2024", status: "Active" },
    { name: "Michael Wu", grade: "Grade 12", spec: "Systems Eng", date: "May 10, 2024", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="w-full h-10 pl-10 pr-4 bg-slate-50 rounded-lg text-xs font-medium border-none outline-none focus:ring-1 focus:ring-slate-200" placeholder="Search students..." />
          </div>
          <Button variant="outline" className="h-10 text-xs font-bold uppercase tracking-widest px-6 border-slate-200">
            <Filter className="w-3.5 h-3.5 mr-2" /> Filter
          </Button>
        </div>
        <Button className="h-10 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-8 shadow-md hover:bg-slate-800">
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </Button>
      </div>
      <CRMTable headers={headers} rows={rows} />
    </div>
  );
}

function CompetitionModule() {
  const headers = ["Competition", "Type", "Status", "Team Count", "Next Deadline"];
  const rows = [
    { name: "F1 in Schools Regional", type: "F1", status: "Active", teams: "04", deadline: "Feb 20, 2024" },
    { name: "Drift Grand Prix", type: "Drift", status: "Pending", teams: "02", deadline: "Mar 15, 2024" },
    { name: "4x4 World Qualifiers", type: "4x4", status: "Completed", teams: "01", deadline: "Closed" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-slate-100 shadow-sm bg-white p-8">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-red-50 text-red-600 rounded-xl">
               <Trophy className="w-6 h-6" />
             </div>
             <div>
               <p className="text-2xl font-bold text-slate-900">12</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-left">Total Awards</p>
             </div>
          </div>
        </Card>
        <Card className="border border-slate-100 shadow-sm bg-white p-8">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
               <Users className="w-6 h-6" />
             </div>
             <div>
               <p className="text-2xl font-bold text-slate-900">08</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-left">Active Teams</p>
             </div>
          </div>
        </Card>
        <Card className="border border-slate-100 shadow-sm bg-white p-8">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-green-50 text-green-600 rounded-xl">
               <CheckCircle className="w-6 h-6" />
             </div>
             <div>
               <p className="text-2xl font-bold text-slate-900">03</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-left">Major Wins</p>
             </div>
          </div>
        </Card>
      </div>
      <CRMTable headers={headers} rows={rows} />
    </div>
  );
}

function TaskModule() {
  const headers = ["Task Title", "Assigned To", "Priority", "Due Date", "Status"];
  const rows = [
    { title: "Aerodynamics Simulation", user: "Alex J.", priority: "High", date: "Jan 25, 2024", status: "Pending" },
    { title: "Chassis Weight Reduction", user: "David C.", priority: "Medium", date: "Jan 28, 2024", status: "Active" },
    { title: "Marketing Strategy Prep", user: "Elena R.", priority: "Low", date: "Feb 05, 2024", status: "Active" },
    { title: "Telemetry Module Review", user: "Sarah M.", priority: "High", date: "Jan 22, 2024", status: "Completed" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex gap-4">
           <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest px-6 bg-slate-50 text-slate-900">All Tasks</Button>
           <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest px-6 text-slate-400 hover:bg-slate-50">Assigned</Button>
           <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest px-6 text-slate-400 hover:bg-slate-50">Personal</Button>
        </div>
        <Button className="h-10 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-8 shadow-md hover:bg-slate-800">
          <Plus className="w-4 h-4 mr-2" /> Create Task
        </Button>
      </div>
      <CRMTable headers={headers} rows={rows} />
    </div>
  );
}

function AttendanceModule() {
  const headers = ["Student Name", "Date", "Session Type", "Check-in", "Status"];
  const rows = [
    { name: "Alex Johnson", date: "Jan 18, 2024", type: "Lab Session", time: "03:15 PM", status: "Present" },
    { name: "Sarah Miller", date: "Jan 18, 2024", type: "Lab Session", time: "03:30 PM", status: "Late" },
    { name: "David Chen", date: "Jan 18, 2024", type: "Lab Session", time: "-", status: "Absent" },
    { name: "Michael Wu", date: "Jan 18, 2024", type: "Lab Session", time: "03:10 PM", status: "Present" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex gap-6">
        <Card className="flex-1 border border-slate-100 shadow-sm bg-white p-8">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Today's Attendance</p>
           <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-slate-900">94.2%</p>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Above Average</div>
           </div>
           <div className="h-1.5 bg-slate-50 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-green-500 w-[94.2%]" />
           </div>
        </Card>
        <Card className="flex-1 border border-slate-100 shadow-sm bg-white p-8">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Sessions</p>
           <p className="text-3xl font-bold text-slate-900">02</p>
           <p className="text-[10px] font-medium text-slate-400 mt-2 italic underline">Club Lab, CAD Workshop</p>
        </Card>
      </div>
      <CRMTable headers={headers} rows={rows} />
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
  const currentPath = location.split("/").pop();
  const pageTitle = currentPath === "dashboard" ? "Overview" : 
                    currentPath?.charAt(0).toUpperCase() + (currentPath?.slice(1) || "");

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-900">
      <Sidebar role={role} onLogout={() => logoutMutation.mutate()} />
      
      <div className="ml-64 p-12 lg:p-16 max-w-7xl mx-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">CRM Panel /</span>
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">{pageTitle}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase leading-none">Management Control Panel</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">System Online</span>
            </div>
            <button className="relative w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm group">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 leading-none">{user.username}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-90">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {(user.username?.[0] || "U").toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {currentPath === "dashboard" ? <DashboardOverview /> : 
         currentPath === "students" ? <StudentModule /> :
         currentPath === "analytics" ? <AnalyticsModule /> :
         currentPath === "competitions" ? <CompetitionModule /> :
         currentPath === "tasks" ? <TaskModule /> :
         currentPath === "attendance" ? <AttendanceModule /> :
         <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-3xl shadow-sm border border-slate-100 p-20 animate-in fade-in zoom-in-95 duration-700">
           <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mb-8 shadow-inner">
             <Clock className="w-10 h-10 text-slate-300" />
           </div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{pageTitle} Section</h2>
           <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-3 bg-slate-50 px-4 py-1.5 rounded-full">Section under optimization</p>
         </div>
        }
      </div>
    </div>
  );
}
