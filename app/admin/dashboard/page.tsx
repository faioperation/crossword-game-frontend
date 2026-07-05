"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle, Users, Trophy, Activity, TrendingUp, Calendar, CheckCircle, Loader2 } from "lucide-react";
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
import { apiGet } from "@/lib/apiClient";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await apiGet<any>("/system-owner/dashboard");
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading dashboard statistics...</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Today's Puzzle",
      value: data.todayPuzzle?.displayId || "-",
      description: data.todayPuzzle?.title || "No puzzle today",
      icon: Calendar,
      gradient: "from-blue-500 to-indigo-600",
      shadow: "shadow-indigo-500/20",
    },
    {
      title: "Entries Today",
      value: data.entriesToday?.count?.toString() || "0",
      description: data.entriesToday?.change || "No changes",
      icon: Users,
      gradient: "from-emerald-400 to-teal-600",
      shadow: "shadow-teal-500/20",
    },
    {
      title: "Winners",
      value: data.winners?.count?.toString() || "0",
      description: "Declared today",
      icon: Trophy,
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-500/20",
    },
    {
      title: "Active Puzzle",
      value: data.activePuzzle?.displayId || "-",
      description: data.activePuzzle?.status || "None active",
      icon: Activity,
      gradient: "from-rose-400 to-red-600",
      shadow: "shadow-red-500/20",
    },
    {
      title: "Total Entries",
      value: data.totalEntries?.count?.toString() || "0",
      description: "All time entries",
      icon: Puzzle,
      gradient: "from-cyan-400 to-blue-600",
      shadow: "shadow-cyan-500/20",
    },
    {
      title: "Completion",
      value: data.completion?.rate || "0%",
      description: "Average success rate",
      icon: CheckCircle,
      gradient: "from-violet-400 to-purple-600",
      shadow: "shadow-purple-500/20",
    },
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
                <LineChart data={data.dailyEntriesChart || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
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
                <BarChart data={data.puzzleCompletionRateChart || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Bar dataKey="completedRate" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} name="Success (%)" />
                  <Bar dataKey="failedRate" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
