"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Mail, MapPin, Package, Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch } from "@/lib/apiClient";

// Workflow order
const STATUS_FLOW = [
  "EMAIL_SENT",
  "ADDRESS_RECEIVED",
  "PRIZE_SHIPPED"
];

const formatStatus = (status: string) => {
  return status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
};

export default function PrizeManagementPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["prize-management", currentPage, searchTerm, filterStatus, filterDate],
    queryFn: () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });
      if (searchTerm) params.append("search", searchTerm);
      if (filterDate) params.append("date", filterDate);
      if (filterStatus !== "ALL") params.append("status", filterStatus);

      return apiGet<any>(`/system-owner/prize-management?${params.toString()}`);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: string, newStatus: string }) => {
      return apiPatch<any>(`/system-owner/prize-management/${id}/status`, {
        prizeStatus: newStatus
      });
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || `Status updated to ${formatStatus(variables.newStatus)}`);
      queryClient.invalidateQueries({ queryKey: ["prize-management"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  });

  const updateStatus = (winnerId: string, newStatus: string) => {
    updateStatusMutation.mutate({ id: winnerId, newStatus });
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "EMAIL_SENT":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Mail className="w-3 h-3 mr-1"/> {formatStatus(status)}</Badge>;
      case "ADDRESS_RECEIVED":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><MapPin className="w-3 h-3 mr-1"/> {formatStatus(status)}</Badge>;
      case "PRIZE_SHIPPED":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Package className="w-3 h-3 mr-1"/> {formatStatus(status)}</Badge>;
      default:
        return <Badge variant="outline">{status ? formatStatus(status) : "-"}</Badge>;
    }
  };

  const prizes = responseData?.data || [];
  const meta = responseData?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Gift className="w-8 h-8 text-indigo-600" />
            Prize Management
          </h2>
          <p className="text-slate-500 font-medium text-base mt-1">Track prize fulfillment workflow for confirmed winners.</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-[350px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search by name, email or prize..." 
            className="pl-10 h-10 text-sm bg-slate-50 border-slate-200"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Input 
            type="date"
            value={filterDate}
            onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
            className="h-10 text-sm bg-slate-50 border-slate-200"
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrentPage(1); }}>
            <SelectTrigger className="h-10 text-sm bg-slate-50 border-slate-200">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {STATUS_FLOW.map(s => (
                <SelectItem key={s} value={s}>{formatStatus(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Winners Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600 py-4">Winner Name</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Prize</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Date Won</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Current Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 py-4">Workflow Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prizes.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    No prizes found matching the criteria.
                  </TableCell>
                </TableRow>
              ) : (
                prizes.map((winner: any) => {
                  return (
                    <TableRow key={winner.id} className="hover:bg-slate-50">
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 text-base">{winner.winnerName}</span>
                          <span className="text-sm text-slate-500">{winner.winnerEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-semibold text-indigo-600">{winner.prize || "No Prize"}</span>
                      </TableCell>
                      <TableCell className="py-4 text-slate-600 text-base font-mono">{winner.dateWon}</TableCell>
                      <TableCell className="py-4">
                        {getStatusDisplay(winner.currentStatus)}
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <Select 
                          value={winner.currentStatus} 
                          onValueChange={(val) => updateStatus(winner.id, val)}
                          disabled={updateStatusMutation.isPending && updateStatusMutation.variables?.id === winner.id}
                        >
                          <SelectTrigger className="w-[180px] ml-auto h-9 text-sm">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_FLOW.map(s => (
                              <SelectItem key={s} value={s}>{formatStatus(s)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-4">
          <div>Showing {prizes.length} entries (Total: {meta.total})</div>
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
