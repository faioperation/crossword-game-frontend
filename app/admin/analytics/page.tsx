"use client";

import { exportTableToCSV } from "@/lib/export";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, MousePointerClick, Clock, Target, TrendingUp, MonitorSmartphone } from "lucide-react";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
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
  { puzzle: "PZ-01", completion: 85 },
  { puzzle: "PZ-02", completion: 72 },
  { puzzle: "PZ-03", completion: 90 },
  { puzzle: "PZ-04", completion: 65 },
  { puzzle: "PZ-05", completion: 78 },
  { puzzle: "PZ-06", completion: 88 },
  { puzzle: "PZ-07", completion: 60 },
];

const entryTypeData = [
  { name: "Standard Entry", value: 6500 },
  { name: "Alternate Entry", value: 1734 },
];

const deviceData = [
  { name: "Mobile", value: 4500 },
  { name: "Desktop", value: 3200 },
  { name: "Tablet", value: 534 },
];

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function AnalyticsPage() {
  const handleExport = () => {
    exportTableToCSV(dailyEntriesData, "analytics-daily-entries");
  };

  const summaryCards = [
    { title: "Total Users", value: "12.5k", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Avg. Engagement", value: "8.2m", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Conversion", value: "3.4%", icon: Target, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Bounce Rate", value: "42%", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Clicks", value: "45.2k", icon: MousePointerClick, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Active Devices", value: "3.1k", icon: MonitorSmartphone, color: "text-cyan-500", bg: "bg-cyan-50" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Analytics</h2>
          <p className="text-slate-500 font-medium">
            Detailed performance metrics and user insights.
          </p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* 6 Summary Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {summaryCards.map((card, i) => (
          <Card key={i} className="border-slate-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-4 sm:p-5 flex flex-col gap-3">
              <div className={`p-2.5 w-fit rounded-lg ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts: Line & Bar */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Entries Line Chart */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 text-lg">Daily Entries (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyEntriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Line type="monotone" dataKey="entries" stroke="#3b82f6" strokeWidth={4} dot={{ fill: "#3b82f6", r: 4 }} activeDot={{ r: 6 }} name="Entries" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Puzzle Completion Rate Bar Chart */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 text-lg">Puzzle Completion Rate (%)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="puzzle" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Bar dataKey="completion" fill="#10b981" radius={[4, 4, 0, 0]} name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Entry Type Pie Chart */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 text-lg">Entry Type</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex justify-center items-center">
            <div className="h-[250px] w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={entryTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {entryTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Analytics Pie Chart */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 text-lg">Device Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex justify-center items-center">
            <div className="h-[250px] w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Summary Strip */}
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card className="bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center gap-2">
            <span className="text-indigo-200 font-semibold uppercase tracking-wider text-sm">Average Solve Time</span>
            <span className="text-4xl font-black">2m 45s</span>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center gap-2">
            <span className="text-emerald-100 font-semibold uppercase tracking-wider text-sm">Completion %</span>
            <span className="text-4xl font-black">78.4%</span>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 text-white border-transparent shadow-lg shadow-slate-900/20">
          <CardContent className="p-6 flex flex-col items-center text-center gap-2">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-sm">Total Entries</span>
            <span className="text-4xl font-black">8,234</span>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
