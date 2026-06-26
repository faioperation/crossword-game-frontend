"use client";

import { useState } from "react";
import { exportTableToCSV } from "@/lib/export";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, CalendarDays, Puzzle, Layers, CheckCircle2 } from "lucide-react";

// Mock Data for the table
const mockEntries = [
  { id: "ENT-1045", name: "John Doe", email: "john@example.com", type: "Puzzle", date: "2026-06-26", time: "02:15", status: "Eligible" },
  { id: "ENT-1044", name: "Sarah Smith", email: "sarah@example.com", type: "Alternate", date: "2026-06-26", time: "-", status: "Disqualified" },
  { id: "ENT-1043", name: "Michael Johnson", email: "michael.j@example.com", type: "Puzzle", date: "2026-06-26", time: "01:45", status: "Winner" },
  { id: "ENT-1042", name: "Emily Chen", email: "emily.c@example.com", type: "Puzzle", date: "2026-06-25", time: "03:10", status: "Eligible" },
  { id: "ENT-1041", name: "David Wilson", email: "david.w@example.com", type: "Alternate", date: "2026-06-25", time: "-", status: "Eligible" },
  { id: "ENT-1040", name: "Jessica Taylor", email: "jessica.t@example.com", type: "Puzzle", date: "2026-06-24", time: "04:20", status: "Eligible" },
  { id: "ENT-1039", name: "James Anderson", email: "james.a@example.com", type: "Puzzle", date: "2026-06-23", time: "01:55", status: "Winner" },
];

export default function EntriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = mockEntries.filter((entry) => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    exportTableToCSV(filteredEntries, "all-entries");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Winner": return <Badge className="bg-amber-500 hover:bg-amber-600 text-sm px-3 py-1">Winner</Badge>;
      case "Eligible": return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-sm px-3 py-1">Eligible</Badge>;
      case "Disqualified": return <Badge variant="destructive" className="text-sm px-3 py-1">Disqualified</Badge>;
      default: return <Badge variant="outline" className="text-sm px-3 py-1">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Puzzle": return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-sm px-3 py-1">Puzzle</Badge>;
      case "Alternate": return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 text-sm px-3 py-1">Alternate</Badge>;
      default: return <Badge variant="outline" className="text-sm px-3 py-1">{type}</Badge>;
    }
  };

  const statCards = [
    { title: "Today's Entries", value: "290", icon: CalendarDays, gradient: "from-blue-500 to-indigo-600" },
    { title: "Puzzle Entries", value: "6,500", icon: Puzzle, gradient: "from-emerald-400 to-teal-600" },
    { title: "Alternate Entries", value: "1,734", icon: Layers, gradient: "from-purple-500 to-fuchsia-600" },
    { title: "Eligible Entries", value: "7,800", icon: CheckCircle2, gradient: "from-amber-400 to-orange-500" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Entries</h2>
        <p className="text-slate-500 font-medium text-base mt-1">Manage and review all puzzle submissions.</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="absolute right-0 top-0 opacity-10 blur-xl transform translate-x-1/3 -translate-y-1/3">
              <card.icon className="h-24 w-24 text-white" />
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                  {card.title}
                </span>
                <card.icon className="h-5 w-5 text-white/90" />
              </div>
              <div className="text-4xl font-black text-white">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar: Search, Filters, Export */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search entries by name or email..." 
            className="pl-10 h-11 text-base bg-slate-50 border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 h-11 text-base">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
          <Button onClick={handleExport} className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white h-11 text-base">
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[120px] font-semibold text-slate-600 text-base py-4">ID</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Participant</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Type</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Date</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Solve Time</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-900 text-base py-4">{entry.id}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-base">{entry.name}</span>
                      <span className="text-sm text-slate-500">{entry.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">{getTypeBadge(entry.type)}</TableCell>
                  <TableCell className="text-slate-600 text-base py-4">{entry.date}</TableCell>
                  <TableCell className="text-slate-600 font-mono text-base py-4">{entry.time}</TableCell>
                  <TableCell className="py-4">{getStatusBadge(entry.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-4">
          <div>Showing {filteredEntries.length} entries</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="bg-white h-9 px-4 text-base">Previous</Button>
            <Button variant="outline" size="sm" className="bg-white h-9 w-9 text-base">1</Button>
            <Button variant="outline" size="sm" className="bg-white h-9 w-9 text-base">2</Button>
            <Button variant="outline" size="sm" className="bg-white h-9 w-9 text-base">3</Button>
            <span className="px-2 text-base">...</span>
            <Button variant="outline" size="sm" className="bg-white h-9 px-4 text-base">Next</Button>
          </div>
        </div>
      </Card>

    </div>
  );
}
