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
import { Search, Filter, Download, Eye, Dices, Hand, CalendarDays } from "lucide-react";

// Mock Data
const historyEntries = [
  { id: "W-104", name: "Alice Cooper", email: "alice@example.com", phone: "+1 234 567 890", prize: "$50 Amazon Card", type: "Puzzle", winnerDate: "2026-06-25", submissionDate: "2026-06-25", method: "Random", status: "Claimed" },
  { id: "W-103", name: "Bob Martin", email: "bob@example.com", phone: "+1 987 654 321", prize: "Free Month Sub", type: "Alternate", winnerDate: "2026-06-24", submissionDate: "2026-06-23", method: "Manual", status: "Pending" },
  { id: "W-102", name: "Charlie Brown", email: "charlie@example.com", phone: "+1 555 123 456", prize: "Coffee Mug", type: "Puzzle", winnerDate: "2026-06-23", submissionDate: "2026-06-23", method: "Random", status: "Claimed" },
  { id: "W-101", name: "Diana Prince", email: "diana@example.com", phone: "+1 444 789 123", prize: "$20 Steam Key", type: "Puzzle", winnerDate: "2026-06-22", submissionDate: "2026-06-22", method: "Random", status: "Claimed" },
];

export default function WinnerHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWinner, setSelectedWinner] = useState<typeof historyEntries[0] | null>(null);

  const filteredHistory = historyEntries.filter((winner) => 
    winner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    winner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    exportTableToCSV(filteredHistory, "winner-history");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Claimed": return <Badge className="bg-blue-500 hover:bg-blue-600">Claimed</Badge>;
      case "Pending": return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    return (
      <span className="flex items-center gap-1 text-sm font-medium text-slate-700">
        {method === "Random" ? <Dices className="h-4 w-4 text-emerald-500" /> : <Hand className="h-4 w-4 text-purple-500" />}
        {method}
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search by name, email or prize..." 
            className="pl-10 h-11 text-base bg-slate-50 border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 h-11 text-base">
            <CalendarDays className="h-5 w-5 mr-2" />
            Filter by Date
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 h-11 text-base">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* History Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600 py-4">Winner Name</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Type</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Winner Date</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Selection</TableHead>
                <TableHead className="font-semibold text-slate-600 py-4">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 py-4">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((winner) => (
                <TableRow key={winner.id} className="hover:bg-slate-50">
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-base">{winner.name}</span>
                      <span className="text-sm text-slate-500">{winner.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={winner.type === 'Puzzle' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'}>
                      {winner.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 text-base py-4">{winner.winnerDate}</TableCell>
                  <TableCell className="py-4">{getMethodBadge(winner.method)}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-4">
          <div>Showing {filteredHistory.length} winners</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="bg-white h-9 px-4 text-base">Previous</Button>
            <Button variant="outline" size="sm" className="bg-white h-9 px-4 text-base">Next</Button>
          </div>
        </div>
      </Card>

      {/* Winner Details Modal */}
      <Dialog open={!!selectedWinner} onOpenChange={(open) => !open && setSelectedWinner(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Winner Details</DialogTitle>
            <DialogDescription>
              Complete information for the selected winner.
            </DialogDescription>
          </DialogHeader>
          
          {selectedWinner && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</span>
                <p className="text-lg font-bold text-slate-900">{selectedWinner.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.phone}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prize Won</span>
                <p className="text-base font-bold text-indigo-600">{selectedWinner.prize}</p>
              </div>
              
              <div className="col-span-1 md:col-span-2 h-px bg-slate-200 my-2"></div>
              
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Entry Type</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.type}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Selection Method</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.method}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Submission Date</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.submissionDate}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Winner Date</span>
                <p className="text-base font-medium text-slate-700">{selectedWinner.winnerDate}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
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
