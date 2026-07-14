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
import { Search, Download, CalendarDays, Puzzle, Layers, CheckCircle2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/apiClient";

export default function EntriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["entries", currentPage, searchTerm, filterDate],
    queryFn: () => {
      // Build query params
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });
      if (searchTerm) params.append("search", searchTerm);
      if (filterDate) params.append("date", filterDate);

      return apiGet<any>(`/system-owner/entries?${params.toString()}`);
    }
  });

  const entries = responseData?.data || [];

  const stats = responseData?.stats || { todayEntries: 0, puzzleEntries: 0, alternateEntries: 0, eligibleEntries:0 };
  const meta = responseData?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };

  const handleExport = () => {
    // Basic export for the current page data
    const exportData = entries.map((entry: any) => ({
      id: entry.id,
      name: entry.participant?.name,
      email: entry.participant?.email,
      type: entry.type,
      date: entry.date,
      solveTime: entry.solveTime,
    }));
    exportTableToCSV(exportData, "entries");
  };

  const formatId = (id: string) => {
    if (!id) return "-";
    return `ENT-${id.substring(0, 5).toUpperCase()}`;
  };

  const getTypeBadge = (type: string) => {
    const t = type?.toUpperCase() || "";
    switch (t) {
      case "PUZZLE": return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-sm px-3 py-1">Puzzle</Badge>;
      case "ALTERNATE": return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 text-sm px-3 py-1">Alternate</Badge>;
      default: return <Badge variant="outline" className="text-sm px-3 py-1 capitalize">{type?.toLowerCase()}</Badge>;
    }
  };

  const statCards = [
    { title: "Today's Entries", value: stats.todayEntries, icon: CalendarDays, gradient: "from-blue-500 to-indigo-600" },
    { title: "Puzzle Entries", value: stats.puzzleEntries, icon: Puzzle, gradient: "from-emerald-400 to-teal-600" },
    { title: "Alternate Entries", value: stats.alternateEntries, icon: Layers, gradient: "from-purple-500 to-fuchsia-600" },
    { title: "Eligible Entries", value: stats.todayEntries, icon: CheckCircle2, gradient: "from-amber-400 to-orange-500" }, // Update if backend adds eligible count
  ];

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Entries</h2>
        <p className="text-slate-500 font-medium text-base mt-1">Manage and review all puzzle submissions.</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="text-4xl font-black text-white">{isLoading ? "-" : card.value}</div>
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
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
            className="h-11 text-base bg-slate-50 border-slate-200 w-full sm:w-[160px]"
          />
          <Button onClick={handleExport} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white h-11 text-base">
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        )}

        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[120px] font-semibold text-slate-600 text-base py-4">ID</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Participant</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Type</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Date</TableHead>
                <TableHead className="font-semibold text-slate-600 text-base py-4">Solve Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">No entries found.</TableCell>
                </TableRow>
              ) : (
                entries.map((entry: any) => (
                  <TableRow key={entry.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900 text-base py-4">{formatId(entry.id)}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-base">{entry.participant?.name || "Unknown"}</span>
                        <span className="text-sm text-slate-500">{entry.participant?.email || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{getTypeBadge(entry.type)}</TableCell>
                    <TableCell className="text-slate-600 text-base py-4">{entry.date}</TableCell>
                    <TableCell className="text-slate-600 font-mono text-base py-4">{entry.solveTime}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {entries.length === 0 && !isLoading ? (
            <div className="text-center py-10 text-slate-500">No entries found.</div>
          ) : (
            entries.map((entry: any) => (
              <div key={entry.id} className="flex flex-col gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-800 text-base block">{entry.participant?.name || "Unknown"}</span>
                    <span className="text-xs text-slate-500 block">{entry.participant?.email || "-"}</span>
                    <span className="text-xs text-slate-400 font-mono mt-0.5 block">{formatId(entry.id)}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getTypeBadge(entry.type)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-1 pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-xs font-medium">Date</span>
                    <span className="font-semibold text-slate-700">{entry.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs font-medium">Solve Time</span>
                    <span className="text-slate-700 font-mono">{entry.solveTime}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-4">
          <div>Showing {entries.length} entries (Total: {meta.total})</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={meta.page <= 1}
              className="bg-white h-9 px-4 text-base"
            >
              Previous
            </Button>

            <span className="px-3 font-medium text-slate-700">
              Page {meta.page} of {Math.max(1, meta.totalPage)}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(meta.totalPage, p + 1))}
              disabled={meta.page >= meta.totalPage}
              className="bg-white h-9 px-4 text-base"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

    </div>
  );
}
