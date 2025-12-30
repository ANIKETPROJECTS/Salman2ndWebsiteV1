import { useAuth } from "../hooks/use-auth";
import { useLocation, Link } from "wouter";
import { 
  LayoutDashboard, CheckSquare, Trophy, Calendar, LogOut, Bell, Clock, Users, TrendingUp, UserCheck,
  CheckCircle2, AlertCircle, Search, Filter, Plus, MoreVertical, ArrowUpRight, ArrowDownRight,
  Target, Settings, ShieldCheck, Download, CheckCircle, BarChart3, FileText, MapPin, MessageSquare,
  Zap, Activity, Star, Flame, Lightbulb, Rocket, Eye, BookOpen, Briefcase, Gauge, Wind
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Task, type User, type Event, type Competition, type Attendance } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Legend
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
    <div className="w-64 bg-white border-r border-red-100 h-screen fixed left-0 top-0 flex flex-col z-50 shadow-lg">
      <div className="p-8 flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-red-400 border-b border-red-600">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold transition-all duration-200 group ${
              location === link.href 
                ? "bg-red-600 text-white shadow-md shadow-red-200" 
                : "text-gray-600 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <link.icon className={`w-4 h-4 ${location === link.href ? "text-white" : "text-red-400 group-hover:text-red-600"}`} />
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

function StatCard({ value, label, icon: Icon, color, border, trend, trendUp }: any) {
  return (
    <Card className={`bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group ${border}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-2">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardOverview() {
  const stats = [
    { value: "24", label: "Active Students", icon: Users, color: "text-green-600 bg-green-50", border: "border-l-4 border-l-green-500", trend: "+3", trendUp: true },
    { value: "42", label: "Tasks Completed", icon: CheckCircle2, color: "text-red-600 bg-red-50", border: "border-l-4 border-l-red-500", trend: "+8", trendUp: true },
    { value: "8", label: "Active Projects", icon: Briefcase, color: "text-blue-600 bg-blue-50", border: "border-l-4 border-l-blue-500", trend: "+2", trendUp: true },
    { value: "96%", label: "Avg. Score", icon: Zap, color: "text-orange-600 bg-orange-50", border: "border-l-4 border-l-orange-500", trend: "+2%", trendUp: true },
  ];

  const performanceData = [
    { month: 'Jan', performance: 65, engagement: 52, completion: 45, quality: 48 },
    { month: 'Feb', performance: 75, engagement: 62, completion: 55, quality: 58 },
    { month: 'Mar', performance: 82, engagement: 75, completion: 68, quality: 72 },
    { month: 'Apr', performance: 88, engagement: 85, completion: 78, quality: 82 },
    { month: 'May', performance: 92, engagement: 88, completion: 82, quality: 88 },
    { month: 'Jun', performance: 95, engagement: 92, completion: 88, quality: 92 },
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

  const projectData = [
    { name: 'F1 Prototype', status: 'In Progress', progress: 78, members: 8, dueDate: 'Feb 15' },
    { name: 'Aerodynamics Study', status: 'In Progress', progress: 65, members: 5, dueDate: 'Jan 28' },
    { name: 'Drift System Design', status: 'In Review', progress: 92, members: 6, dueDate: 'Jan 20' },
    { name: 'Marketing Campaign', status: 'Planning', progress: 35, members: 4, dueDate: 'Feb 28' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Performance Trends - Large */}
        <Card className="lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Performance Trends</CardTitle>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">6-month analysis</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600"><Download className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent className="p-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fef2f2' }} />
                <Legend />
                <Line type="monotone" dataKey="performance" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 3 }} name="Performance" />
                <Line type="monotone" dataKey="engagement" stroke="#f97316" strokeWidth={2} name="Engagement" />
                <Area type="monotone" dataKey="completion" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} name="Completion" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Skills Radar */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Team Skills</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Assessment</p>
          </CardHeader>
          <CardContent className="p-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 9, fill: '#64748b' }} />
                <PolarRadiusAxis hide />
                <Radar name="Skills" dataKey="value" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competition Mix */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Competition Mix</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Distribution</p>
          </CardHeader>
          <CardContent className="p-6 h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={competitionData} cx="50%" cy="50%" innerRadius={35} outerRadius={65} dataKey="value">
                  {competitionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Engagement */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Team Engagement</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Weekly activity</p>
          </CardHeader>
          <CardContent className="p-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { day: 'Mon', value: 85 },
                { day: 'Tue', value: 92 },
                { day: 'Wed', value: 78 },
                { day: 'Thu', value: 95 },
                { day: 'Fri', value: 88 },
                { day: 'Sat', value: 60 },
                { day: 'Sun', value: 65 },
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
      </div>

      {/* Projects Board & Tasks */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects */}
        <Card className="lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Active Projects</CardTitle>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Status overview</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50"><Plus className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {projectData.map((project, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{project.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{project.members} members • Due {project.dueDate}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'In Review' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: `${project.progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{project.progress}% Complete</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Engagement Score */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Performance Gauge</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Overall metric</p>
          </CardHeader>
          <CardContent className="p-6 h-[280px] flex flex-col items-center justify-center space-y-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50 rounded-full border-8 border-red-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">87</p>
                  <p className="text-xs font-bold text-gray-600 uppercase">Score</p>
                </div>
              </div>
            </div>
            <div className="w-full space-y-2">
              <p className="text-xs font-bold text-gray-700">Status: Excellent</p>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: '87%' }}></div>
              </div>
              <div className="text-xs text-gray-500 text-center">87/100 Points</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks & Events Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50 flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Task Pipeline</CardTitle>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Current workload</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">View All →</Button>
          </CardHeader>
          <CardContent className="p-6 space-y-3 max-h-[500px] overflow-y-auto">
            {[
              { title: "Complete CAD Training", status: "completed", priority: "high", date: "Jan 15", assignee: "Alex", progress: 100 },
              { title: "Design Prototype v2", status: "completed", priority: "high", date: "Jan 10", assignee: "Sarah", progress: 100 },
              { title: "Marketing Presentation", status: "in-progress", priority: "medium", date: "Jan 20", assignee: "Elena", progress: 75 },
              { title: "Test Suspension", status: "overdue", priority: "high", date: "Jan 5", assignee: "David", progress: 40 },
              { title: "Telemetry Analysis", status: "in-progress", priority: "medium", date: "Jan 25", assignee: "Michael", progress: 60 },
              { title: "Aerodynamics Report", status: "pending", priority: "low", date: "Feb 1", assignee: "James", progress: 20 },
              { title: "Budget Proposal", status: "pending", priority: "high", date: "Jan 28", assignee: "Lisa", progress: 10 },
              { title: "Sponsor Pitch Deck", status: "in-progress", priority: "medium", date: "Feb 3", assignee: "Ryan", progress: 50 },
            ].map((task, i) => {
              const statusBg = task.status === 'completed' ? 'bg-green-50 border-l-green-500' :
                              task.status === 'in-progress' ? 'bg-blue-50 border-l-blue-500' :
                              task.status === 'pending' ? 'bg-orange-50 border-l-orange-500' : 'bg-red-50 border-l-red-500';
              const Icon = task.status === 'completed' ? CheckCircle2 : task.status === 'in-progress' ? Clock : AlertCircle;
              
              return (
                <div key={i} className={`p-3 rounded-lg border-l-4 ${statusBg} hover:shadow-md transition-all group`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{task.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{task.assignee} • {task.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${
                      task.status === 'completed' ? 'bg-green-500 w-full' :
                      task.status === 'in-progress' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} style={{ width: `${task.progress}%` }}></div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50 flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Upcoming Events</CardTitle>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Next 30 days</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">View All →</Button>
          </CardHeader>
          <CardContent className="p-6 space-y-3 max-h-[500px] overflow-y-auto">
            {[
              { title: "Team Meeting - AEOLIAN", date: "Jan 15, 3:00 PM", location: "Lab A", attendees: 12, priority: "high", icon: Trophy },
              { title: "CAD Workshop", date: "Jan 18, 2:00 PM", location: "Lab B", attendees: 24, priority: "medium", icon: Zap },
              { title: "Track Testing Day", date: "Jan 22, 10:00 AM", location: "Testing Ground", attendees: 18, priority: "high", icon: Rocket },
              { title: "Regional Competition", date: "Feb 10, 9:00 AM", location: "Convention Center", attendees: 150, priority: "high", icon: Trophy },
              { title: "Sponsorship Presentation", date: "Feb 5, 4:00 PM", location: "Conference Room", attendees: 8, priority: "medium", icon: MessageSquare },
              { title: "Team Standup", date: "Jan 20, 11:00 AM", location: "Virtual", attendees: 15, priority: "low", icon: Clock },
              { title: "Design Review", date: "Jan 25, 3:30 PM", location: "Lab A", attendees: 10, priority: "medium", icon: Lightbulb },
              { title: "Budget Planning", date: "Feb 1, 2:00 PM", location: "Office", attendees: 6, priority: "high", icon: BarChart3 },
            ].map((event, i) => (
              <div key={i} className={`p-3 rounded-lg border-l-4 ${
                event.priority === 'high' ? 'border-l-red-500 bg-red-50' :
                event.priority === 'medium' ? 'border-l-orange-500 bg-orange-50' : 'border-l-blue-500 bg-blue-50'
              } hover:shadow-md transition-all group`}>
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-white rounded flex-shrink-0">
                    <event.icon className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    <span className="text-xs text-gray-500 block mt-1">👥 {event.attendees}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Widgets */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Leaderboard</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Top performers</p>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {[
              { name: "Alex Johnson", score: 95, role: "Aerodynamics", badge: "🏆" },
              { name: "Sarah Miller", score: 92, role: "Telemetry", badge: "⭐" },
              { name: "David Chen", score: 88, role: "Chassis", badge: "⭐" },
              { name: "Elena Rodriguez", score: 85, role: "Marketing", badge: "" },
              { name: "Michael Wu", score: 82, role: "Systems", badge: "" },
            ].map((performer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-100 hover:shadow-md transition-all group">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{i + 1}.</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-500">{performer.role}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600">{performer.score}</span>
                  <p className="text-xs text-gray-400">pts</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Access */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Quick Stats</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Key metrics</p>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {[
              { label: "Tasks Completed", value: "42", icon: CheckCircle2, color: "text-green-600 bg-green-50", trend: "+12" },
              { label: "Projects Active", value: "8", icon: Briefcase, color: "text-blue-600 bg-blue-50", trend: "+2" },
              { label: "Team Members", value: "24", icon: Users, color: "text-purple-600 bg-purple-50", trend: "+4" },
              { label: "Competitions", value: "12", icon: Trophy, color: "text-red-600 bg-red-50", trend: "+1" },
              { label: "Avg Response", value: "2.3h", icon: Clock, color: "text-orange-600 bg-orange-50", trend: "-0.5h" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{stat.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                  <p className="text-xs text-gray-400">{stat.trend}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardHeader className="p-6 border-b border-red-50">
            <CardTitle className="text-lg font-bold text-gray-900">Activity Feed</CardTitle>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Last 24 hours</p>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {[
              { action: "Alex completed task", time: "2h ago", icon: CheckCircle2, color: "bg-green-50" },
              { action: "Sarah joined competition", time: "4h ago", icon: Trophy, color: "bg-red-50" },
              { action: "Event scheduled", time: "6h ago", icon: Calendar, color: "bg-blue-50" },
              { action: "New project created", time: "8h ago", icon: Briefcase, color: "bg-purple-50" },
              { action: "Meeting updated", time: "1d ago", icon: MessageSquare, color: "bg-orange-50" },
            ].map((activity, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 ${activity.color} rounded-lg hover:shadow-md transition-all`}>
                <activity.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Announcement Banner */}
      <Card className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-white shadow-xl hover:shadow-2xl transition-all">
        <CardContent className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-6 h-6" />
                <h3 className="text-xl font-bold">Important Announcements</h3>
              </div>
              <ul className="space-y-2 mt-4">
                <li className="text-sm flex items-start gap-2">
                  <span className="text-red-200 mt-1 font-bold">→</span>
                  <span>Regional Competition Registration opens Jan 25th! Limited spots available.</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-red-200 mt-1 font-bold">→</span>
                  <span>New sponsorship confirmed with Premium Partners Inc. - discuss terms next meeting.</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-red-200 mt-1 font-bold">→</span>
                  <span>CAD Workshop scheduled for January 18th at 2:00 PM in Lab B.</span>
                </li>
              </ul>
            </div>
            <Button className="bg-white text-red-600 hover:bg-red-50 font-bold whitespace-nowrap">
              View All →
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
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome back, {user.firstName || user.username}! 👋</h1>
              <p className="text-gray-600 mt-2 font-medium">Here's your team's performance overview for today.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Online</span>
              </div>
              <button className="relative w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm hover:shadow-md">
                <Bell className="w-5 h-5 text-red-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-red-200">
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-900">{user.username}</p>
                  <p className="text-[10px] text-gray-600 font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg hover:shadow-xl transition-all">
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
