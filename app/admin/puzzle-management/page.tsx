"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Edit, Eye, Archive, Download, CalendarDays } from "lucide-react";

export default function PuzzleManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const dummyPuzzles = [
    { id: "PZ-001", title: "Daily Mini Crossword", date: "2026-06-26", status: "Published", difficulty: "Easy", cluesCount: 12 },
    { id: "PZ-002", title: "Weekend Special", date: "2026-06-27", status: "Draft", difficulty: "Medium", cluesCount: 15 },
    { id: "PZ-003", title: "Flash Puzzle", date: "2026-06-28", status: "Draft", difficulty: "Hard", cluesCount: 18 },
    { id: "PZ-004", title: "Archive Puzzle 1", date: "2026-06-01", status: "Archived", difficulty: "Easy", cluesCount: 10 },
  ];

  const filteredPuzzles = dummyPuzzles.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published": return <Badge className="bg-emerald-500 hover:bg-emerald-600">Published</Badge>;
      case "Draft": return <Badge className="bg-amber-500 hover:bg-amber-600">Draft</Badge>;
      case "Archived": return <Badge className="bg-slate-500 hover:bg-slate-600">Archived</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Crossword Puzzles</h2>
          <p className="text-slate-500 font-medium text-base mt-1">Manage and publish all your crossword grids.</p>
        </div>
        <Button onClick={() => router.push("/admin/puzzle-management/create")} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-6">
          <Plus className="w-5 h-5" />
          Create New Puzzle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm bg-indigo-50/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Total Puzzles</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{dummyPuzzles.length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-emerald-50/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Published</p>
            <p className="text-3xl font-bold text-emerald-700 mt-2">{dummyPuzzles.filter(p => p.status === "Published").length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-amber-50/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Drafts</p>
            <p className="text-3xl font-bold text-amber-700 mt-2">{dummyPuzzles.filter(p => p.status === "Draft").length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-slate-100">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Archived</p>
            <p className="text-3xl font-bold text-slate-700 mt-2">{dummyPuzzles.filter(p => p.status === "Archived").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search puzzles by title..." 
            className="pl-10 h-11 text-base bg-slate-50 border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            className="h-11 px-4 rounded-md border border-slate-200 bg-slate-50 text-slate-700 flex-1 sm:flex-none font-medium"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Drafts</option>
            <option value="Archived">Archived</option>
          </select>
          <Button variant="outline" className="border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 h-11">
            <CalendarDays className="h-4 w-4 mr-2" /> Date
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600 py-4">Puzzle Title</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Difficulty</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Total Clues</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Publish Date</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPuzzles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No puzzles found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPuzzles.map((puzzle) => (
                  <TableRow key={puzzle.id} className="hover:bg-slate-50">
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-base">{puzzle.title}</span>
                        <span className="text-xs text-slate-500 font-mono mt-0.5">{puzzle.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-medium text-slate-700">{puzzle.difficulty}</TableCell>
                    <TableCell className="py-4 text-slate-600">{puzzle.cluesCount}</TableCell>
                    <TableCell className="py-4 text-slate-600">{puzzle.date}</TableCell>
                    <TableCell className="py-4">{getStatusBadge(puzzle.status)}</TableCell>
                    <TableCell className="text-right py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50" title="Preview">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50" title="Edit" onClick={() => router.push("/admin/puzzle-management/create")}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-amber-600 hover:bg-amber-50" title="Archive">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-4">
          <div>Showing {filteredPuzzles.length} puzzles</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="bg-white h-9 px-4 text-base">Previous</Button>
            <Button variant="outline" size="sm" className="bg-white h-9 px-4 text-base">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
