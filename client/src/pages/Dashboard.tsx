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
  CheckCircle,
  BarChart3,
  FileText,
  MapPin,
  MessageSquare,
  Zap,
  Activity
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
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
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
    <div className="w-64 bg-white border-r border-red-100 h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3 bg-gradient-to-r from-red-50 to-white border-b border-red-100">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight text-red-900 uppercase">JSSIS STEM</p>
          <p className="text-[10px] text-red-500 font-semibold uppercase tracking-wider">Club Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
              location === link.href 
                ? "bg-red-600 text-white shadow-md shadow-red-200" 
                : "text-gray-600 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <link.icon className={`w-4 h-4 ${location === link.href ? "text-white" : "text-red-400"}`} />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-red-100 space-y-3">
        <Button 
          variant="outline" 
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { value: "24", label: "Active Students", icon: Users, color: "text-green-600 bg-green-50", border: "border-l-4 border-l-green-500" },
    { value: "12", label: "Pending Tasks", icon: Clock, color: "text-orange-600 bg-orange-50", border: "border-l-4 border-l-orange-500" },
    { value: "8", label: "Competitions", icon: Trophy, color: "text-red-600 bg-red-50", border: "border-l-4 border-l-red-500" },
    { value: "94%", label: "Attendance Rate", icon: UserCheck, color: "text-blue-600 bg-blue-50", border: "border-l-4 border-l-blue-500" },
  ];

  const performanceData = [
    { month: 'Jan', performance: 65, engagement: 52, completion: 45 },
    { month: 'Feb', performance: 75, engagement: 62, completion: 55 },
    { month: 'Mar', performance: 82, engagement: 75, completion: 68 },
    { month: 'Apr', performance: 88, engagement: 85, completion: 78 },
    { month: 'May', performance: 92, engagement: 88, completion: 82 },
    { month: 'Jun', performance: 95, engagement: 92, completion: 88 },
  ];

  const competitionData = [
    { name: 'F1 Schools', value: 35, fill: '#dc2626' },
    { name: 'Drift Racing', value: 25, fill: '#f97316' },
    { name: '4x4 RC', value: 24, fill: '#3b82f6' },
    { name: 'Robotics', value: 16, fill: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className={`bg-white overflow-hidden transition-all hover:shadow-lg ${stat.border}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Performance Overview</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">6-month trend analysis</p>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fef2f2' }} />
                <Line type="monotone" dataKey="performance" stroke="#dc2626" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="engagement" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competition Distribution */}
        <Card className="bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Competition Mix</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">By category</p>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={competitionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {competitionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks & Upcoming Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Recent Tasks</CardTitle>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Current activities</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-red-600 hover:bg-red-50">View All →</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {[
              { title: "Complete CAD Training Module 3", status: "completed", priority: "high", date: "Due: Jan 15", user: "Alex J." },
              { title: "Design Car Prototype v2.0", status: "completed", priority: "high", date: "Due: Jan 10", user: "Sarah M." },
              { title: "Prepare Marketing Presentation", status: "pending", priority: "medium", date: "Due: Jan 20", user: "Elena R." },
              { title: "Test RC Car Suspension", status: "overdue", priority: "high", date: "Due: Jan 5", user: "David C." },
              { title: "Telemetry Data Analysis", status: "in-progress", priority: "medium", date: "Due: Jan 25", user: "Michael W." },
              { title: "Aerodynamics Simulation Report", status: "pending", priority: "low", date: "Due: Feb 1", user: "James T." },
            ].map((task, i) => {
              const statusColor = task.status === 'completed' ? 'bg-green-50 border-l-green-500' :
                                  task.status === 'in-progress' ? 'bg-blue-50 border-l-blue-500' :
                                  task.status === 'pending' ? 'bg-orange-50 border-l-orange-500' : 'bg-red-50 border-l-red-500';
              const statusIcon = task.status === 'completed' ? CheckCircle2 :
                                 task.status === 'in-progress' ? Clock :
                                 task.status === 'pending' ? AlertCircle : AlertCircle;
              const Icon = statusIcon;
              
              return (
                <div key={i} className={`p-4 rounded-lg border-l-4 ${statusColor}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="w-4 h-4 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{task.user}</span>
                          <span>•</span>
                          <span>{task.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Upcoming Events</CardTitle>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Scheduled activities</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-red-600 hover:bg-red-50">View All →</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {[
              { title: "Team Meeting - AEOLIAN", date: "Jan 15, 3:00 PM", location: "Lab A", attendees: 12, type: "meeting" },
              { title: "CAD Workshop", date: "Jan 18, 2:00 PM", location: "Lab B", attendees: 24, type: "workshop" },
              { title: "Track Testing Day", date: "Jan 22, 10:00 AM", location: "Testing Ground", attendees: 18, type: "testing" },
              { title: "Regional Competition", date: "Feb 10, 9:00 AM", location: "Convention Center", attendees: 150, type: "competition" },
              { title: "Sponsorship Presentation", date: "Feb 5, 4:00 PM", location: "Conference Room", attendees: 8, type: "presentation" },
              { title: "Weekly Team Standup", date: "Jan 20, 11:00 AM", location: "Virtual", attendees: 15, type: "meeting" },
            ].map((event, i) => (
              <div key={i} className="p-4 rounded-lg border border-red-100 bg-white hover:bg-red-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                      <Calendar className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{event.date}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1 block">{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card className="bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { name: "Alex Johnson", score: 95, role: "Aerodynamics Lead" },
              { name: "Sarah Miller", score: 92, role: "Telemetry Expert" },
              { name: "David Chen", score: 88, role: "Chassis Design" },
              { name: "Elena Rodriguez", score: 85, role: "Marketing Lead" },
              { name: "Michael Wu", score: 82, role: "Systems Engineer" },
            ].map((performer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{performer.name}</p>
                  <p className="text-xs text-gray-500">{performer.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600">{performer.score}</span>
                  <p className="text-xs text-gray-400">pts</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { label: "Tasks Completed", value: "42", color: "text-green-600 bg-green-50" },
              { label: "Active Projects", value: "8", color: "text-blue-600 bg-blue-50" },
              { label: "Team Members", value: "24", color: "text-purple-600 bg-purple-50" },
              { label: "Competitions Won", value: "12", color: "text-red-600 bg-red-50" },
              { label: "Avg. Response Time", value: "2.3h", color: "text-orange-600 bg-orange-50" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <span className={`text-lg font-bold ${stat.color} px-2 py-1 rounded`}>{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="bg-white">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Announcements</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { title: "New Competition Announced", date: "2 hours ago", badge: "alert" },
              { title: "Lab Equipment Maintenance", date: "5 hours ago", badge: "info" },
              { title: "Sponsorship Confirmed", date: "1 day ago", badge: "success" },
              { title: "Team Registration Open", date: "2 days ago", badge: "alert" },
              { title: "New Training Module Available", date: "3 days ago", badge: "info" },
            ].map((announce, i) => (
              <div key={i} className={`p-3 rounded-lg border-l-4 ${
                announce.badge === 'alert' ? 'border-l-red-500 bg-red-50' :
                announce.badge === 'success' ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500 bg-blue-50'
              }`}>
                <p className="text-sm font-semibold text-gray-900">{announce.title}</p>
                <p className="text-xs text-gray-500 mt-1">{announce.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
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
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 selection:bg-red-200 selection:text-gray-900">
      <Sidebar role={role} onLogout={() => logoutMutation.mutate()} />
      
      <div className="ml-64 p-8 lg:p-12 max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-red-500 uppercase tracking-[0.2em]">Dashboard /</span>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">{pageTitle}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 uppercase">Welcome Back!</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-700 uppercase tracking-widest">System Online</span>
              </div>
              <button className="relative w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors">
                <Bell className="w-5 h-5 text-red-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-red-200">
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-900">{user.username}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                </div>
                <div className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <DashboardOverview />
      </div>
    </div>
  );
}
