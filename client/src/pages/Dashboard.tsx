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
  Activity,
  Star,
  Flame,
  Lightbulb,
  Rocket,
  Eye,
  BookOpen,
  Briefcase,
  Gauge,
  Wind
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
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
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
    <div className="w-64 bg-white border-r border-red-100 h-screen fixed left-0 top-0 flex flex-col z-50 shadow-sm">
      <div className="p-8 flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 border-b border-red-600">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight text-white uppercase">JSSIS STEM</p>
          <p className="text-[10px] text-red-100 font-semibold uppercase tracking-wider">Club Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] mb-4">Navigation</p>
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

      <div className="p-6 border-t border-red-100 space-y-3 bg-red-50">
        <Button 
          variant="outline" 
          className="w-full text-red-600 border-red-300 hover:bg-red-100 font-semibold"
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
    { value: "24", label: "Active Students", icon: Users, color: "text-green-600 bg-green-50", border: "border-l-4 border-l-green-500", trend: "+3" },
    { value: "42", label: "Tasks Completed", icon: CheckCircle2, color: "text-red-600 bg-red-50", border: "border-l-4 border-l-red-500", trend: "+8" },
    { value: "8", label: "Active Projects", icon: Briefcase, color: "text-blue-600 bg-blue-50", border: "border-l-4 border-l-blue-500", trend: "+2" },
    { value: "96%", label: "Avg. Score", icon: Zap, color: "text-orange-600 bg-orange-50", border: "border-l-4 border-l-orange-500", trend: "+2%" },
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

  const radarData = [
    { category: 'Engineering', value: 85 },
    { category: 'Design', value: 90 },
    { category: 'Teamwork', value: 88 },
    { category: 'Innovation', value: 92 },
    { category: 'Communication', value: 87 },
    { category: 'Leadership', value: 84 },
  ];

  const activityData = [
    { x: 10, y: 20 },
    { x: 15, y: 35 },
    { x: 20, y: 45 },
    { x: 25, y: 38 },
    { x: 30, y: 55 },
    { x: 35, y: 48 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className={`bg-white overflow-hidden transition-all hover:shadow-xl hover:scale-105 cursor-pointer ${stat.border}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Performance Trends</CardTitle>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">6-month analysis</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600">
              <Download className="w-4 h-4" />
            </Button>
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
                <Line type="monotone" dataKey="performance" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 4 }} />
                <Line type="monotone" dataKey="engagement" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Skills Radar */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Team Skills</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Overall capacity</p>
          </CardHeader>
          <CardContent className="p-6 h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis hide />
                <Radar name="Skills" dataKey="value" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Competition Distribution */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Competition Types</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Distribution</p>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={competitionData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                  {competitionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fef2f2' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Activity Levels</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Weekly trends</p>
          </CardHeader>
          <CardContent className="p-6 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { day: 'Mon', value: 45 },
                { day: 'Tue', value: 52 },
                { day: 'Wed', value: 48 },
                { day: 'Thu', value: 61 },
                { day: 'Fri', value: 55 },
                { day: 'Sat', value: 38 },
                { day: 'Sun', value: 42 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fef2f2' }} />
                <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Score */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Engagement Score</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Overall metric</p>
          </CardHeader>
          <CardContent className="p-6 h-[250px] flex flex-col items-center justify-center space-y-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center border-8 border-red-200">
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">87</p>
                  <p className="text-xs font-bold text-gray-500 uppercase">Score</p>
                </div>
              </div>
            </div>
            <div className="w-full space-y-2">
              <p className="text-xs font-bold text-gray-600">Status: Excellent</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Recent Tasks</CardTitle>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">In progress & completed</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-red-600 hover:bg-red-50">View All →</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-3 max-h-[450px] overflow-y-auto">
            {[
              { title: "Complete CAD Training Module 3", status: "completed", priority: "high", date: "Due: Jan 15", user: "Alex J.", progress: 100 },
              { title: "Design Car Prototype v2.0", status: "completed", priority: "high", date: "Due: Jan 10", user: "Sarah M.", progress: 100 },
              { title: "Prepare Marketing Presentation", status: "in-progress", priority: "medium", date: "Due: Jan 20", user: "Elena R.", progress: 75 },
              { title: "Test RC Car Suspension", status: "overdue", priority: "high", date: "Due: Jan 5", user: "David C.", progress: 40 },
              { title: "Telemetry Data Analysis", status: "in-progress", priority: "medium", date: "Due: Jan 25", user: "Michael W.", progress: 60 },
              { title: "Aerodynamics Simulation Report", status: "pending", priority: "low", date: "Due: Feb 1", user: "James T.", progress: 20 },
              { title: "Budget Proposal Review", status: "pending", priority: "high", date: "Due: Jan 28", user: "Lisa K.", progress: 10 },
              { title: "Sponsor Pitch Deck", status: "in-progress", priority: "medium", date: "Due: Feb 3", user: "Ryan P.", progress: 50 },
            ].map((task, i) => {
              const statusColor = task.status === 'completed' ? 'bg-green-50 border-l-green-500' :
                                  task.status === 'in-progress' ? 'bg-blue-50 border-l-blue-500' :
                                  task.status === 'pending' ? 'bg-orange-50 border-l-orange-500' : 'bg-red-50 border-l-red-500';
              const statusIcon = task.status === 'completed' ? CheckCircle2 :
                                 task.status === 'in-progress' ? Clock :
                                 task.status === 'pending' ? AlertCircle : AlertCircle;
              const Icon = statusIcon;
              
              return (
                <div key={i} className={`p-4 rounded-lg border-l-4 ${statusColor} hover:shadow-md transition-all`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
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
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${
                      task.status === 'completed' ? 'bg-green-500 w-full' :
                      task.status === 'in-progress' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{task.progress}% complete</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Upcoming Events</CardTitle>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Next 30 days</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-red-600 hover:bg-red-50">View All →</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-3 max-h-[450px] overflow-y-auto">
            {[
              { title: "Team Meeting - AEOLIAN", date: "Jan 15, 3:00 PM", location: "Lab A", attendees: 12, priority: "high", icon: Trophy },
              { title: "CAD Workshop", date: "Jan 18, 2:00 PM", location: "Lab B", attendees: 24, priority: "medium", icon: Zap },
              { title: "Track Testing Day", date: "Jan 22, 10:00 AM", location: "Testing Ground", attendees: 18, priority: "high", icon: Rocket },
              { title: "Regional Competition", date: "Feb 10, 9:00 AM", location: "Convention Center", attendees: 150, priority: "high", icon: Trophy },
              { title: "Sponsorship Presentation", date: "Feb 5, 4:00 PM", location: "Conference Room", attendees: 8, priority: "medium", icon: MessageSquare },
              { title: "Weekly Team Standup", date: "Jan 20, 11:00 AM", location: "Virtual", attendees: 15, priority: "low", icon: Clock },
              { title: "Design Review Session", date: "Jan 25, 3:30 PM", location: "Lab A", attendees: 10, priority: "medium", icon: Lightbulb },
              { title: "Budget Planning Meeting", date: "Feb 1, 2:00 PM", location: "Office", attendees: 6, priority: "high", icon: BarChart3 },
            ].map((event, i) => (
              <div key={i} className={`p-4 rounded-lg border-l-4 ${
                event.priority === 'high' ? 'border-l-red-500 bg-red-50' :
                event.priority === 'medium' ? 'border-l-orange-500 bg-orange-50' : 'border-l-blue-500 bg-blue-50'
              } hover:shadow-md transition-all`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-white rounded-lg flex-shrink-0">
                      <event.icon className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <span className="text-xs text-gray-400 block mt-1">👥 {event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Widgets */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Top Performers</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">This month</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { name: "Alex Johnson", score: 95, role: "Aerodynamics Lead", badge: "🏆" },
              { name: "Sarah Miller", score: 92, role: "Telemetry Expert", badge: "⭐" },
              { name: "David Chen", score: 88, role: "Chassis Design", badge: "⭐" },
              { name: "Elena Rodriguez", score: 85, role: "Marketing Lead", badge: "" },
              { name: "Michael Wu", score: 82, role: "Systems Engineer", badge: "" },
            ].map((performer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-100 hover:shadow-md transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{performer.name}</p>
                    <span className="text-lg">{performer.badge}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{performer.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600">{performer.score}</span>
                  <p className="text-xs text-gray-400">score</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Key Metrics</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Performance data</p>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {[
              { label: "Tasks Completed", value: "42", icon: CheckCircle2, color: "text-green-600 bg-green-50" },
              { label: "Active Projects", value: "8", icon: Briefcase, color: "text-blue-600 bg-blue-50" },
              { label: "Team Members", value: "24", icon: Users, color: "text-purple-600 bg-purple-50" },
              { label: "Competitions Won", value: "12", icon: Trophy, color: "text-red-600 bg-red-50" },
              { label: "Avg Response Time", value: "2.3h", icon: Clock, color: "text-orange-600 bg-orange-50" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{stat.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Recent Activity</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Last 24 hours</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { action: "Alex completed task", time: "2 hours ago", icon: CheckCircle2, color: "text-green-600 bg-green-50" },
              { action: "Sarah joined competition", time: "4 hours ago", icon: Trophy, color: "text-red-600 bg-red-50" },
              { action: "Event scheduled for Jan 22", time: "6 hours ago", icon: Calendar, color: "text-blue-600 bg-blue-50" },
              { action: "New project created", time: "8 hours ago", icon: Briefcase, color: "text-purple-600 bg-purple-50" },
              { action: "Team meeting updated", time: "1 day ago", icon: MessageSquare, color: "text-orange-600 bg-orange-50" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Announcements Banner */}
      <Card className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5" />
                <h3 className="text-lg font-bold">Important Announcements</h3>
              </div>
              <ul className="space-y-2 mt-4">
                <li className="text-sm flex items-start gap-2">
                  <span className="text-red-200 mt-1">→</span>
                  <span>Regional Competition Registration opens on Jan 25th! Don't miss the deadline.</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-red-200 mt-1">→</span>
                  <span>New sponsorship opportunity confirmed with Premium Partners Inc.</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-red-200 mt-1">→</span>
                  <span>CAD Workshop scheduled for January 18th - Limited spots available!</span>
                </li>
              </ul>
            </div>
            <Button className="bg-white text-red-600 hover:bg-red-50 font-bold">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>
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

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <Sidebar role={role} onLogout={() => logoutMutation.mutate()} />
      
      <div className="ml-64 p-8 lg:p-10">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome Back, {user.firstName || user.username}! 👋</h1>
              <p className="text-gray-600 mt-2">Here's what's happening with your team today.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-700 uppercase tracking-widest">System Online</span>
              </div>
              <button className="relative w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm">
                <Bell className="w-5 h-5 text-red-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-red-200">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-900">{user.username}</p>
                  <p className="text-[10px] text-gray-600 font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg">
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
