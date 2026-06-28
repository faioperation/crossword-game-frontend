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
import { Search, Trophy, Mail, MapPin, Package, ArrowRight, Gift } from "lucide-react";
import { toast } from "sonner";

// Workflow order
const STATUS_FLOW = [
  "Email sent",
  "Address received",
  "Prize shipped"
];

const mockWinners = [
  { id: "W-105", name: "Eve Adams", email: "eve@example.com", prize: "Morgan Dollar", date: "2026-06-27", status: "Email sent" },
  { id: "W-104", name: "Alice Cooper", email: "alice@example.com", prize: "$50 Amazon Card", date: "2026-06-25", status: "Prize shipped" },
  { id: "W-103", name: "Bob Martin", email: "bob@example.com", prize: "Free Month Sub", date: "2026-06-24", status: "Email sent" },
  { id: "W-102", name: "Charlie Brown", email: "charlie@example.com", prize: "Coffee Mug", date: "2026-06-23", status: "Address received" },
];

export default function PrizeManagementPage() {
  const [winners, setWinners] = useState(mockWinners);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const filteredWinners = winners.filter((winner) => {
    const matchesSearch = winner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          winner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          winner.prize.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : winner.status === filterStatus;
    const matchesDate = filterDate ? winner.date === filterDate : true;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateStatus = (winnerId: string, newStatus: string) => {
    setWinners(prev => prev.map(w => 
      w.id === winnerId ? { ...w, status: newStatus } : w
    ));
    toast.success(`Status updated to: ${newStatus}`);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "Email sent":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Mail className="w-3 h-3 mr-1"/> Email sent</Badge>;
      case "Address received":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><MapPin className="w-3 h-3 mr-1"/> Address received</Badge>;
      case "Prize shipped":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Package className="w-3 h-3 mr-1"/> Prize shipped</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="h-10 text-sm bg-slate-50 border-slate-200"
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-10 text-sm bg-slate-50 border-slate-200">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {STATUS_FLOW.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Winners Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
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
              {filteredWinners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    No winners found matching the criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredWinners.map((winner) => {
                  return (
                    <TableRow key={winner.id} className="hover:bg-slate-50">
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 text-base">{winner.name}</span>
                          <span className="text-sm text-slate-500">{winner.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-semibold text-indigo-600">{winner.prize}</span>
                      </TableCell>
                      <TableCell className="py-4 text-slate-600 text-base">{winner.date}</TableCell>
                      <TableCell className="py-4">
                        {getStatusDisplay(winner.status)}
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <Select value={winner.status} onValueChange={(val) => updateStatus(winner.id, val)}>
                          <SelectTrigger className="w-[180px] ml-auto h-9 text-sm">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_FLOW.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
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
      </Card>

    </div>
  );
}
