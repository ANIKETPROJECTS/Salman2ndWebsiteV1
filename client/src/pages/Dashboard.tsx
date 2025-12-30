import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useLocation, Link } from "wouter";
import { 
  LayoutDashboard, CheckSquare, Trophy, Calendar, LogOut, Bell, Clock, Users, TrendingUp, UserCheck,
  CheckCircle2, AlertCircle, Search, Filter, Plus, MoreVertical, ArrowUpRight, ArrowDownRight,
  Target, Settings, ShieldCheck, Download, CheckCircle, BarChart3, FileText, MapPin, MessageSquare,
  Zap, Activity, Star, Flame, Lightbulb, Rocket, Eye, BookOpen, Briefcase, Gauge, Wind, Mail,
  Phone, Globe, Github, Linkedin, Mail as MailIcon, Send, Share2, Heart
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Task, type User, type Event, type Competition, type Attendance } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Legend, Scatter, ScatterChart, ZAxis
} from "recharts";

import f1Img from "@assets/generated_images/f1_in_schools_race_car.png";
import driftImg from "@assets/generated_images/drift_racing_car_action_shot.png";
import rcImg from "@assets/generated_images/4x4_rc_off-road_car.png";

function Sidebar({ role, onLogout }: { role?: string; onLogout: () => void }) {
  const [location] = useLocation();
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "student", "parent"] },
    { href: "/dashboard/analytics", label: "Analytics", icon: TrendingUp, roles: ["admin"] },
    { href: "/dashboard/students", label: "Students", icon: Users, roles: ["admin"] },
    { href: "/dashboard/competitions", label: "Competitions", icon: Trophy, roles: ["admin", "student", "parent"] },
    { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare, roles: ["admin", "student"] },
    { href: "/dashboard/attendance", label: "Attendance", icon: UserCheck, roles: ["admin", "parent"] },
  ].filter(link => link.roles.includes(role || "student"));

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

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    if (location.includes("/analytics")) return "analytics";
    if (location.includes("/students")) return "students";
    if (location.includes("/competitions")) return "competitions";
    if (location.includes("/tasks")) return "tasks";
    if (location.includes("/attendance")) return "attendance";
    return "overview";
  });

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  // Update activeTab when location changes
  useEffect(() => {
    if (location.includes("/analytics")) setActiveTab("analytics");
    else if (location.includes("/students")) setActiveTab("students");
    else if (location.includes("/competitions")) setActiveTab("competitions");
    else if (location.includes("/tasks")) setActiveTab("tasks");
    else if (location.includes("/attendance")) setActiveTab("attendance");
    else if (location === "/dashboard") setActiveTab("overview");
  }, [location]);

  if (!user) {
    setLocation("/login");
    return null;
  }

  const role = user.role || 'student';

  const stats = [
    { value: "24", label: "Active Students", icon: Users, color: "text-green-600 bg-green-50", border: "border-l-4 border-l-green-500", trend: "+3" },
    { value: "42", label: "Tasks Completed", icon: CheckCircle2, color: "text-red-600 bg-red-50", border: "border-l-4 border-l-red-500", trend: "+8" },
    { value: "8", label: "Active Projects", icon: Briefcase, color: "text-blue-600 bg-blue-50", border: "border-l-4 border-l-blue-500", trend: "+2" },
    { value: "96%", label: "Avg. Score", icon: Zap, color: "text-orange-600 bg-orange-50", border: "border-l-4 border-l-orange-500", trend: "+2%" },
  ];

  const teamMembers = [
    { id: 1, name: "Alex Johnson", role: "Team Lead", avatar: "AJ", email: "alex@jssis.edu", phone: "+1-555-0101", status: "active", score: 95 },
    { id: 2, name: "Sarah Miller", role: "Telemetry Expert", avatar: "SM", email: "sarah@jssis.edu", phone: "+1-555-0102", status: "active", score: 92 },
    { id: 3, name: "David Chen", role: "Chassis Designer", avatar: "DC", email: "david@jssis.edu", phone: "+1-555-0103", status: "active", score: 88 },
    { id: 4, name: "Elena Rodriguez", role: "Marketing Lead", avatar: "ER", email: "elena@jssis.edu", phone: "+1-555-0104", status: "away", score: 85 },
    { id: 5, name: "Michael Wu", role: "Systems Engineer", avatar: "MW", email: "michael@jssis.edu", phone: "+1-555-0105", status: "active", score: 82 },
    { id: 6, name: "Lisa Khan", role: "Finance Manager", avatar: "LK", email: "lisa@jssis.edu", phone: "+1-555-0106", status: "active", score: 90 },
  ];

  const messages = [
    { id: 1, from: "Alex Johnson", message: "Great progress on the aerodynamics module!", time: "2 mins ago", avatar: "AJ", unread: true },
    { id: 2, from: "Sarah Miller", message: "Can we discuss the telemetry data tomorrow?", time: "15 mins ago", avatar: "SM", unread: true },
    { id: 3, from: "David Chen", message: "CAD files updated in the shared drive", time: "1 hour ago", avatar: "DC", unread: false },
    { id: 4, from: "Elena Rodriguez", message: "Marketing presentation is ready for review", time: "3 hours ago", avatar: "ER", unread: false },
    { id: 5, from: "Michael Wu", message: "System integration test completed", time: "5 hours ago", avatar: "MW", unread: false },
  ];

  const resources = [
    { id: 1, title: "F1 Aerodynamics Guide", type: "PDF", size: "4.2 MB", downloads: 342, date: "Jan 10, 2025" },
    { id: 2, title: "CAD Design Standards", type: "DOCX", size: "2.1 MB", downloads: 256, date: "Jan 8, 2025" },
    { id: 3, title: "Telemetry Data Sheet", type: "XLSX", size: "1.8 MB", downloads: 189, date: "Jan 5, 2025" },
    { id: 4, title: "Team Guidelines 2025", type: "PDF", size: "3.5 MB", downloads: 412, date: "Dec 28, 2024" },
    { id: 5, title: "Budget Template", type: "XLSX", size: "0.8 MB", downloads: 67, date: "Dec 25, 2024" },
    { id: 6, title: "Sponsorship Pitch", type: "PPT", size: "5.6 MB", downloads: 298, date: "Dec 20, 2024" },
  ];

  const allTasks = [
    { id: 1, title: "Complete CAD Training", status: "completed", priority: "high", date: "Jan 15", assignee: "Alex", progress: 100, description: "Module 3 completion" },
    { id: 2, title: "Design Prototype v2", status: "completed", priority: "high", date: "Jan 10", assignee: "Sarah", progress: 100, description: "Engineering phase" },
    { id: 3, title: "Marketing Presentation", status: "in-progress", priority: "medium", date: "Jan 20", assignee: "Elena", progress: 75, description: "Q1 campaign planning" },
    { id: 4, title: "Test Suspension", status: "overdue", priority: "high", date: "Jan 5", assignee: "David", progress: 40, description: "RC car testing" },
    { id: 5, title: "Telemetry Analysis", status: "in-progress", priority: "medium", date: "Jan 25", assignee: "Michael", progress: 60, description: "Data compilation" },
    { id: 6, title: "Aerodynamics Report", status: "pending", priority: "low", date: "Feb 1", assignee: "James", progress: 20, description: "CFD simulations" },
    { id: 7, title: "Budget Proposal", status: "pending", priority: "high", date: "Jan 28", assignee: "Lisa", progress: 10, description: "2025 budget" },
    { id: 8, title: "Sponsor Pitch Deck", status: "in-progress", priority: "medium", date: "Feb 3", assignee: "Ryan", progress: 50, description: "Partnership proposal" },
  ];

  const allEvents = [
    { id: 1, title: "Team Meeting - AEOLIAN", date: "Jan 15", time: "3:00 PM", location: "Lab A", attendees: 12, type: "meeting" },
    { id: 2, title: "CAD Workshop", date: "Jan 18", time: "2:00 PM", location: "Lab B", attendees: 24, type: "workshop" },
    { id: 3, title: "Track Testing Day", date: "Jan 22", time: "10:00 AM", location: "Testing Ground", attendees: 18, type: "testing" },
    { id: 4, title: "Regional Competition", date: "Feb 10", time: "9:00 AM", location: "Convention Center", attendees: 150, type: "competition" },
    { id: 5, title: "Sponsorship Presentation", date: "Feb 5", time: "4:00 PM", location: "Conference Room", attendees: 8, type: "presentation" },
    { id: 6, title: "Design Review", date: "Jan 25", time: "3:30 PM", location: "Lab A", attendees: 10, type: "review" },
    { id: 7, title: "Budget Planning", date: "Feb 1", time: "2:00 PM", location: "Office", attendees: 6, type: "meeting" },
    { id: 8, title: "Team Standup", date: "Jan 20", time: "11:00 AM", location: "Virtual", attendees: 15, type: "standup" },
  ];

  const performanceData = [
    { month: 'Jan', performance: 65, engagement: 52, completion: 45, quality: 48 },
    { month: 'Feb', performance: 75, engagement: 62, completion: 55, quality: 58 },
    { month: 'Mar', performance: 82, engagement: 75, completion: 68, quality: 72 },
    { month: 'Apr', performance: 88, engagement: 85, completion: 78, quality: 82 },
    { month: 'May', performance: 92, engagement: 88, completion: 82, quality: 88 },
    { month: 'Jun', performance: 95, engagement: 92, completion: 88, quality: 92 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <Sidebar role={role} onLogout={() => logoutMutation.mutate()} />
      
      <div className="ml-64 p-8 lg:p-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome back, {user.firstName || user.username}! 👋</h1>
              <p className="text-gray-600 mt-2 font-medium">Here's your team's performance overview.</p>
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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {role === "admin" ? (
              <>
                {/* Admin Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <Card key={i} className={`bg-white overflow-hidden transition-all hover:shadow-xl hover:scale-105 ${stat.border}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">↑ {stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-2">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Charts Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-sm">
                    <CardHeader className="p-6 border-b border-red-50">
                      <CardTitle className="text-lg font-bold text-gray-900">Performance Trends</CardTitle>
                      <p className="text-xs text-gray-500 mt-1">6-month analysis</p>
                    </CardHeader>
                    <CardContent className="p-6 h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} />
                          <YAxis hide />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="performance" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 3 }} name="Performance" />
                          <Line type="monotone" dataKey="engagement" stroke="#f97316" strokeWidth={2} name="Engagement" />
                          <Area type="monotone" dataKey="completion" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} name="Completion" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="p-6 border-b border-red-50">
                      <CardTitle className="text-lg font-bold text-gray-900">Team Engagement</CardTitle>
                      <p className="text-xs text-gray-500 mt-1">Weekly activity breakdown</p>
                    </CardHeader>
                    <CardContent className="p-6 h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { day: 'Mon', value: 85 }, { day: 'Tue', value: 92 }, { day: 'Wed', value: 78 },
                          { day: 'Thu', value: 95 }, { day: 'Fri', value: 88 }, { day: 'Sat', value: 60 }, { day: 'Sun', value: 65 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 600 }} />
                          <YAxis hide />
                          <Tooltip />
                          <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : role === "student" ? (
              <>
                {/* Student Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-red-50 text-red-600">
                          <Target className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-green-600">On Track</span>
                      </div>
                      <h3 className="text-2xl font-bold">85%</h3>
                      <p className="text-xs font-semibold text-gray-500 uppercase mt-2">Personal Progress</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-blue-600">12 Pending</span>
                      </div>
                      <h3 className="text-2xl font-bold">24</h3>
                      <p className="text-xs font-semibold text-gray-500 uppercase mt-2">Tasks Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-l-4 border-l-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                          <Trophy className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-yellow-600">Elite Rank</span>
                      </div>
                      <h3 className="text-2xl font-bold">1st</h3>
                      <p className="text-xs font-semibold text-gray-500 uppercase mt-2">Competition Standing</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-bold">My Learning Path</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {[
                          { title: "Aerodynamics Basics", progress: 100, status: "Completed" },
                          { title: "CAD Advanced Design", progress: 65, status: "In Progress" },
                          { title: "RC Suspension Tuning", progress: 20, status: "Just Started" },
                        ].map((item, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold">
                              <span>{item.title}</span>
                              <span className="text-red-600">{item.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-600" style={{ width: `${item.progress}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <Button className="w-full justify-start gap-2 border-red-100 text-gray-700 hover:bg-red-50" variant="outline">
                        <Plus className="w-4 h-4 text-red-600" /> Submit Task
                      </Button>
                      <Button className="w-full justify-start gap-2 border-red-100 text-gray-700 hover:bg-red-50" variant="outline">
                        <MessageSquare className="w-4 h-4 text-red-600" /> Ask Mentor
                      </Button>
                      <Button className="w-full justify-start gap-2 border-red-100 text-gray-700 hover:bg-red-50" variant="outline">
                        <Download className="w-4 h-4 text-red-600" /> Download Resources
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <>
                {/* Parent Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white border-l-4 border-l-red-500">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Child's Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-red-600">96%</div>
                        <div className="flex-1">
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600" style={{ width: '96%' }} />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">24/25 sessions attended this term</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Skill Development</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-blue-600">A+</div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Engineering Merit Badge</p>
                          <p className="text-xs text-gray-500 mt-1">Excellent progress in CAD design</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="bg-white">
                    <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg font-bold">Pending Approvals</CardTitle>
                      <Badge variant="outline" className="border-red-200 text-red-600">2 New</Badge>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Competition Consent Form</p>
                          <p className="text-xs text-gray-500">F1 Regional Finals - June 15</p>
                        </div>
                        <Button size="sm" className="bg-red-600 text-white">Review</Button>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Lab Material Fee</p>
                          <p className="text-xs text-gray-500">Advanced Robotics Kit</p>
                        </div>
                        <Button size="sm" className="bg-red-600 text-white">Pay Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-bold">Mentor Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                            AJ
                          </div>
                          <div className="bg-red-50 p-4 rounded-lg flex-1">
                            <p className="text-sm font-bold text-gray-900">Alex Johnson (Head Mentor)</p>
                            <p className="text-sm text-gray-700 mt-1">"Your child is showing great leadership in the team. Their CAD designs were the highlight of last week's session."</p>
                            <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Yesterday, 4:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Common Tasks/Events Previews */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-6 border-b border-red-50 flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-bold">Recent Tasks</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">Quick overview</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("tasks")} className="text-red-600">View All →</Button>
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  {allTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-gray-900 truncate">{task.title}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{task.priority}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${task.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader className="p-6 border-b border-red-50 flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-bold">Upcoming Events</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">Next 30 days</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("events")} className="text-red-600">View All →</Button>
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  {allEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-all border-l-4 border-l-red-500">
                      <p className="text-sm font-bold text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.date} • {event.time}</p>
                      <p className="text-xs text-gray-400">📍 {event.location}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Overall Efficiency</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">88%</p>
                    <span className="text-xs font-bold text-green-600 mb-1">↑ 12%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Participation</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">94%</p>
                    <span className="text-xs font-bold text-green-600 mb-1">↑ 5%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Success Rate</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <p className="text-3xl font-bold text-gray-900">92%</p>
                    <span className="text-xs font-bold text-green-600 mb-1">↑ 8%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-sm">
              <CardHeader className="p-6 border-b border-red-50">
                <CardTitle className="text-lg font-bold">Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="performance" stroke="#dc2626" fillOpacity={1} fill="url(#colorPerf)" />
                    <Area type="monotone" dataKey="quality" stroke="#3b82f6" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-6 border-b border-red-50 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-bold">Student Directory</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Manage club members and their performance</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Student Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Active Projects</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Alex Johnson", grade: "10th", parent: "Robert Johnson", projects: "F1, Robotics", attendance: "98%", score: 95 },
                      { name: "Sarah Miller", grade: "9th", parent: "Jane Miller", projects: "4x4 Challenge", attendance: "95%", score: 92 },
                      { name: "David Chen", grade: "11th", parent: "Li Chen", projects: "Drift Racing", attendance: "92%", score: 88 },
                      { name: "Elena Rodriguez", grade: "10th", parent: "Carlos Rodriguez", projects: "F1", attendance: "100%", score: 98 },
                    ].map((student, i) => (
                      <TableRow key={i}>
                        <TableCell className="pl-6 font-semibold">{student.name}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.parent}</TableCell>
                        <TableCell>{student.projects}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{student.attendance}</span>
                        </TableCell>
                        <TableCell className="font-bold text-red-600">{student.score}</TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* COMPETITIONS TAB */}
        {activeTab === "competitions" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {role === "admin" ? "Club Competitions" : "My Competitions"}
                </h2>
                <p className="text-gray-500 mt-1">
                  {role === "admin" ? "Highlighted events and ongoing challenges" : "Competitions you are currently participating in"}
                </p>
              </div>
              {role === "admin" && (
                <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                  <Plus className="w-4 h-4" /> Create Competition
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "F1 in Schools", type: "Elite", status: "Active", participants: 24, date: "June 2025", desc: "Global multi-disciplinary STEM competition.", image: f1Img, roles: ["admin", "student", "parent"] },
                { title: "Drift Racing", type: "Technical", status: "Ongoing", participants: 18, date: "April 2025", desc: "Precision drifting and mechanical tuning.", image: driftImg, roles: ["admin", "student"] },
                { title: "4x4 RC Car Challenge", type: "Design", status: "Upcoming", participants: 42, date: "May 2025", desc: "Off-road vehicle design and navigation.", image: rcImg, roles: ["admin", "student", "parent"] },
              ].filter(c => c.roles.includes(role || "student")).map((comp, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-2xl transition-all border-t-4 border-t-red-600">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img src={comp.image} alt={comp.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-red-600 shadow-sm border border-red-100">
                        {comp.status}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <h3 className="text-xl font-bold text-white">{comp.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">{comp.desc}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Participants</p>
                          <p className="text-lg font-bold text-red-700">{comp.participants}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Event Date</p>
                          <p className="text-lg font-bold text-blue-700">{comp.date}</p>
                        </div>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        {role === "admin" ? "Manage Competition" : "View My Progress"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-6 border-b border-red-50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {role === "admin" ? "Daily Attendance" : role === "parent" ? "Child Attendance Record" : "My Attendance History"}
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    {role === "admin" ? `Mark student attendance for ${new Date().toLocaleDateString()}` : "Track attendance across all STEM sessions"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {role === "admin" ? (
                    <>
                      <Button variant="outline" className="border-red-200 text-red-600">View History</Button>
                      <Button className="bg-red-600 text-white">Save Attendance</Button>
                    </>
                  ) : (
                    <Button variant="outline" className="border-red-200 text-red-600">Download Report</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">{role === "admin" ? "Student" : "Date"}</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>{role === "admin" ? "Arrival Time" : "Session"}</TableHead>
                      <TableHead>Notes</TableHead>
                      {role === "admin" && <TableHead className="text-right pr-6">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {role === "admin" ? (
                      [
                        { name: "Alex Johnson", status: "present", time: "08:00 AM" },
                        { name: "Sarah Miller", status: "late", time: "08:15 AM" },
                        { name: "David Chen", status: "absent", time: "-" },
                        { name: "Elena Rodriguez", status: "present", time: "07:55 AM" },
                      ].map((att, i) => (
                        <TableRow key={i}>
                          <TableCell className="pl-6 font-semibold">{att.name}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant={att.status === 'present' ? 'default' : 'outline'} size="sm" className={att.status === 'present' ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-600'}>Present</Button>
                              <Button variant={att.status === 'late' ? 'default' : 'outline'} size="sm" className={att.status === 'late' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-yellow-200 text-yellow-600'}>Late</Button>
                              <Button variant={att.status === 'absent' ? 'default' : 'outline'} size="sm" className={att.status === 'absent' ? 'bg-red-600 hover:bg-red-700' : 'border-red-200 text-red-600'}>Absent</Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm font-medium text-gray-600">{att.time}</TableCell>
                          <TableCell><input type="text" placeholder="Add note..." className="bg-transparent border-b border-gray-100 focus:border-red-500 outline-none text-sm w-full py-1" /></TableCell>
                          <TableCell className="text-right pr-6">
                            <Button variant="ghost" size="icon"><Clock className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      [
                        { date: "Dec 28, 2025", status: "Present", session: "F1 CAD Workshop", notes: "Completed wing design" },
                        { date: "Dec 25, 2025", status: "Late", session: "Team Standup", notes: "Bus delay" },
                        { date: "Dec 22, 2025", status: "Present", session: "Track Testing", notes: "-" },
                        { date: "Dec 18, 2025", status: "Absent", session: "Robotics Intro", notes: "Medical leave" },
                      ].map((att, i) => (
                        <TableRow key={i}>
                          <TableCell className="pl-6 font-semibold">{att.date}</TableCell>
                          <TableCell>
                            <Badge className={
                              att.status === 'Present' ? 'bg-green-100 text-green-700' :
                              att.status === 'Late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }>
                              {att.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm font-medium text-gray-600">{att.session}</TableCell>
                          <TableCell className="text-sm text-gray-500">{att.notes}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === "tasks" && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="p-6 border-b border-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {role === "admin" ? "All Tasks" : "My Active Tasks"}
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    {role === "admin" ? `${allTasks.length} total tasks` : `You have ${allTasks.filter(t => t.status !== 'completed').length} pending tasks`}
                  </p>
                </div>
                {role === "admin" && (
                  <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> New Task
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      {role === "admin" && <TableHead>Assignee</TableHead>}
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allTasks.filter(t => role === "admin" || t.assignee === "Alex").map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-semibold text-gray-900">
                          {task.title}
                          <p className="text-[10px] text-gray-400 font-normal">{task.description}</p>
                        </TableCell>
                        {role === "admin" && <TableCell>{task.assignee}</TableCell>}
                        <TableCell>
                          <Badge className={
                            task.status === 'completed' ? 'bg-green-100 text-green-700' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            task.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                          }>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${task.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-600 border border-gray-100'}`}>
                            {task.priority}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">{task.date}</TableCell>
                        <TableCell className="w-[150px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-600" style={{ width: `${task.progress}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500">{task.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {role === "student" && task.status !== "completed" ? (
                            <Button size="sm" className="bg-red-600 text-white">Submit Work</Button>
                          ) : (
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-6 border-b border-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">All Events</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">{allEvents.length} upcoming events</p>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> Schedule Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allEvents.map((event) => (
                    <div key={event.id} className="p-6 border border-red-100 rounded-lg hover:shadow-lg transition-all bg-gradient-to-br from-white to-red-50">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          event.type === 'competition' ? 'bg-red-100 text-red-700' :
                          event.type === 'workshop' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-600" /> {event.date} at {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600" /> {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-red-600" /> {event.attendees} attendees
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full border border-red-200 text-red-600 hover:bg-red-50">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="p-6 border-b border-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">Messages</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">{messages.filter(m => m.unread).length} unread messages</p>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                    <Send className="w-4 h-4" /> New Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-lg transition-all ${msg.unread ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {msg.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-gray-900">{msg.from}</p>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{msg.message}</p>
                      </div>
                      {msg.unread && <div className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0 mt-2"></div>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === "resources" && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="p-6 border-b border-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Resources & Documents</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">{resources.length} documents available</p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                  <Plus className="w-4 h-4" /> Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-sm text-gray-900">Document</th>
                      <th className="text-left py-4 px-4 font-bold text-sm text-gray-900">Type</th>
                      <th className="text-left py-4 px-4 font-bold text-sm text-gray-900">Size</th>
                      <th className="text-left py-4 px-4 font-bold text-sm text-gray-900">Downloads</th>
                      <th className="text-left py-4 px-4 font-bold text-sm text-gray-900">Uploaded</th>
                      <th className="text-left py-4 px-4 font-bold text-sm text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((resource) => (
                      <tr key={resource.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-red-600" /> {resource.title}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{resource.type}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{resource.size}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{resource.downloads}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{resource.date}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="text-red-600 gap-1">
                            <Download className="w-4 h-4" /> Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
