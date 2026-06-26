"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle, Users, Trophy, Activity, TrendingUp, Calendar, CheckCircle, Clock } from "lucide-react";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dailyEntriesData = [
  { day: "Mon", entries: 120 },
  { day: "Tue", entries: 150 },
  { day: "Wed", entries: 180 },
  { day: "Thu", entries: 170 },
  { day: "Fri", entries: 210 },
  { day: "Sat", entries: 250 },
  { day: "Sun", entries: 290 },
];

const completionData = [
  { puzzle: "Mon", success: 85, failed: 15 },
  { puzzle: "Tue", success: 72, failed: 28 },
  { puzzle: "Wed", success: 90, failed: 10 },
  { puzzle: "Thu", success: 65, failed: 35 },
  { puzzle: "Fri", success: 78, failed: 22 },
  { puzzle: "Sat", success: 88, failed: 12 },
  { puzzle: "Sun", success: 60, failed: 40 },
];

export default function DashboardPage() {
  const stats = [
    {
      title: "Today's Puzzle",
      value: "PZ-012",
      description: "Mini Crossword",
      icon: Calendar,
      gradient: "from-blue-500 to-indigo-600",
      shadow: "shadow-indigo-500/20",
    },
    {
      title: "Entries Today",
      value: "290",
      description: "+40 from yesterday",
      icon: Users,
      gradient: "from-emerald-400 to-teal-600",
      shadow: "shadow-teal-500/20",
    },
    {
      title: "Winners",
      value: "45",
      description: "Declared today",
      icon: Trophy,
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-500/20",
    },
    {
      title: "Active Puzzle",
      value: "PZ-012",
      description: "Currently running",
      icon: Activity,
      gradient: "from-rose-400 to-red-600",
      shadow: "shadow-red-500/20",
    },
    {
      title: "Total Entries",
      value: "8,234",
      description: "All time entries",
      icon: Puzzle,
      gradient: "from-cyan-400 to-blue-600",
      shadow: "shadow-cyan-500/20",
    },
    {
      title: "Completion",
      value: "78%",
      description: "Average success rate",
      icon: CheckCircle,
      gradient: "from-violet-400 to-purple-600",
      shadow: "shadow-purple-500/20",
    },
  ];

  const recentActivity = [
    { text: "Puzzle Published: PZ-012 Mini Crossword", time: "10 mins ago", color: "text-blue-500" },
    { text: "Winner Selected: Alex M.", time: "1 hour ago", color: "text-orange-500" },
    { text: "New Entry: PZ-012 solved in 2:15", time: "2 hours ago", color: "text-teal-500" },
    { text: "Alternate Entry: PZ-011 late submission", time: "4 hours ago", color: "text-slate-500" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500 font-medium">
          Welcome back! Here's the latest data for your crossword platform.
        </p>
      </div>

      {/* Gradient Stat Cards (3x2 Grid) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 shadow-xl ${stat.shadow} transition-transform hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="absolute right-0 top-0 opacity-10 blur-2xl transform translate-x-1/3 -translate-y-1/3">
              <stat.icon className="h-32 w-32 text-white" />
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                  {stat.title}
                </span>
                <stat.icon className="h-5 w-5 text-white/90" />
              </div>
              <div>
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="mt-1 flex items-center text-xs font-medium text-white/80">
                  {stat.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Entries Line Chart */}
        <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Daily Entries (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyEntriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="entries"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#8b5cf6" }}
                    name="Daily Entries"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate Bar Chart */}
        <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Activity className="h-5 w-5 text-emerald-500" />
              Puzzle Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="puzzle" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Bar dataKey="success" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} name="Success (%)" />
                  <Bar dataKey="failed" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Clock className="h-5 w-5 text-slate-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-slate-100">
            {recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center justify-between p-4 sm:px-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full bg-current ${activity.color}`}></div>
                  <span className="text-sm font-medium text-slate-700">{activity.text}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">{activity.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
