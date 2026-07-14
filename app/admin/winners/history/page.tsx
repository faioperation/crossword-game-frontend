"use client";

import { useState } from "react";
import { exportTableToCSV } from "@/lib/export";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Eye, Dices, Hand, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/apiClient";

export default function WinnerHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWinner, setSelectedWinner] = useState<any | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterSelection, setFilterSelection] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["winner-history", currentPage, searchTerm, filterDate, filterType, filterSelection, filterStatus],
    queryFn: () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });
      // Frontend filtering requested, removing filter params from API call
      // if (searchTerm) params.append("search", searchTerm);
      // if (filterDate) params.append("date", filterDate);
      // if (filterType !== "All") params.append("type", filterType);
      // if (filterSelection !== "All") params.append("selection", filterSelection);
      // if (filterStatus !== "All") params.append("status", filterStatus);

      return apiGet<any>(`/system-owner/winner-history?${params.toString()}`);
    }
  });

  let historyEntries = responseData?.data || [];

  // Frontend Filtering
  if (searchTerm) {
    historyEntries = historyEntries.filter((entry: any) => 
      entry.participant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.participant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.prize?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (filterDate) {
    historyEntries = historyEntries.filter((entry: any) => 
      entry.date === filterDate || entry.announcedAt?.startsWith(filterDate)
    );
  }
  if (filterType !== "All") {
    historyEntries = historyEntries.filter((entry: any) => 
      entry.type?.toLowerCase() === filterType.toLowerCase()
    );
  }
  if (filterSelection !== "All") {
    historyEntries = historyEntries.filter((entry: any) => 
      entry.selectionType?.toLowerCase() === filterSelection.toLowerCase()
    );
  }
  if (filterStatus !== "All") {
    historyEntries = historyEntries.filter((entry: any) => 
      entry.status?.toLowerCase() === filterStatus.toLowerCase()
    );
  }
  const meta = responseData?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };

  const handleExport = () => {
    exportTableToCSV(historyEntries, "winner-history");
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toUpperCase() || "";
    switch (s) {
      case "CLAIMED": return <Badge className="bg-blue-500 hover:bg-blue-600">Claimed</Badge>;
      case "PENDING": return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
      default: return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    const m = method?.toUpperCase() || "";
    return (
      <span className="flex items-center gap-1 text-sm font-medium text-slate-700 capitalize">
        {m === "RANDOM" ? <Dices className="h-4 w-4 text-emerald-500" /> : <Hand className="h-4 w-4 text-purple-500" />}
        {method?.toLowerCase()}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Winner History</h2>
          <p className="text-slate-500 font-medium text-base mt-1">Review all previously confirmed winners.</p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white">
          <Download className="h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search by name, email or prize..." 
            className="pl-10 h-11 text-base bg-slate-50 border-slate-200"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full">
          <Input 
            type="date"
            value={filterDate}
            onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
            className="h-11 text-base bg-slate-50 border-slate-200 w-full sm:flex-1 min-w-[150px]"
          />
          <Select value={filterType} onValueChange={(v) => { setFilterType(v); setCurrentPage(1); }}>
            <SelectTrigger className="h-11 text-base bg-slate-50 border-slate-200 w-full sm:flex-1 min-w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Puzzle">Puzzle</SelectItem>
              <SelectItem value="Alternate">Alternate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSelection} onValueChange={(v) => { setFilterSelection(v); setCurrentPage(1); }}>
            <SelectTrigger className="h-11 text-base bg-slate-50 border-slate-200 w-full sm:flex-1 min-w-[150px]">
              <SelectValue placeholder="Selection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Selections</SelectItem>
              <SelectItem value="Random">Random</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}>
            <SelectTrigger className="h-11 text-base bg-slate-50 border-slate-200 w-full sm:flex-1 min-w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Claimed">Claimed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* History Table */}
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
                <TableHead className="font-semibold text-slate-600 py-4">Winner Name</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Prize</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Type</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Winner Date</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Selection</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 py-4">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyEntries.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-500">No history found.</TableCell>
                </TableRow>
              ) : (
                historyEntries.map((winner: any) => (
                  <TableRow key={winner.id} className="hover:bg-slate-50">
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-base">{winner.winnerName}</span>
                        <span className="text-sm text-slate-500">{winner.winnerEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="font-semibold text-indigo-600">{winner.reward || "-"}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={winner.type?.toUpperCase() === 'PUZZLE' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'}>
                        <span className="capitalize">{winner.type?.toLowerCase() || "-"}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 text-base py-4 font-mono">{winner.winnerDate}</TableCell>
                    <TableCell className="py-4">{getMethodBadge(winner.selection)}</TableCell>
                    <TableCell className="py-4">{getStatusBadge(winner.status)}</TableCell>
                    <TableCell className="text-right py-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                        onClick={() => setSelectedWinner(winner)}
                      >
                        <Eye className="h-4 w-4 mr-2" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Mobile Cards View */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {historyEntries.length === 0 && !isLoading ? (
            <div className="text-center py-10 text-slate-500">No history found.</div>
          ) : (
            historyEntries.map((winner: any) => (
              <div key={winner.id} className="flex flex-col gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-800 text-base block">{winner.winnerName}</span>
                    <span className="text-xs text-slate-500 block">{winner.winnerEmail}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(winner.status)}
                    <Badge variant="outline" className={winner.type?.toUpperCase() === 'PUZZLE' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'}>
                      <span className="capitalize">{winner.type?.toLowerCase() || "-"}</span>
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-slate-500 block text-xs font-medium">Prize / Reward</span>
                  <span className="font-bold text-indigo-600">{winner.reward || "-"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2 pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-xs font-medium">Winner Date</span>
                    <span className="font-semibold text-slate-700 font-mono">{winner.winnerDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs font-medium">Selection</span>
                    <span className="text-slate-700">{getMethodBadge(winner.selection)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end pt-3 border-t border-slate-200 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 w-full"
                    onClick={() => setSelectedWinner(winner)}
                  >
                    <Eye className="h-4 w-4 mr-2" /> View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-4">
          <div>Showing {historyEntries.length} entries (Total: {meta.total})</div>
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

      {/* Winner Details Modal */}
      <Dialog open={!!selectedWinner} onOpenChange={(open) => !open && setSelectedWinner(null)}>
        <DialogContent className="sm:max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Winner Details</DialogTitle>
            <DialogDescription>
              Complete information for the selected winner.
            </DialogDescription>
          </DialogHeader>
          
          {selectedWinner && (
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-100">
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</span>
                <p className="text-lg font-bold text-slate-900">{selectedWinner.winnerName}</p>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.winnerEmail || "-"}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prize / Reward</span>
                <p className="text-base font-bold text-indigo-600">{selectedWinner.reward || "N/A"}</p>
              </div>
              
              <div className="col-span-1 md:col-span-2 h-px bg-slate-200 my-2"></div>
              
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Entry Type</span>
                <p className="text-base font-medium text-slate-700 capitalize">{selectedWinner.type?.toLowerCase()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Selection Method</span>
                <p className="text-base font-medium text-slate-700 capitalize">{selectedWinner.selection?.toLowerCase()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Winner Date</span>
                <p className="text-base font-medium text-slate-700 font-mono">{selectedWinner.winnerDate}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Current Status</span>
                {getStatusBadge(selectedWinner.status)}
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button onClick={() => setSelectedWinner(null)} className="w-full sm:w-auto">
              Close Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
