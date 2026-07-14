"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Users, Trophy, Clock, Search, Filter, Dices, RefreshCw, CheckCircle, Hand, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/apiClient";

export default function DrawWinnerPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState<any | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectionMethod, setSelectionMethod] = useState<"Random" | "Manual">("Random");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["eligible-entries", currentPage, searchTerm, filterType],
    queryFn: () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });
      // Frontend filtering requested, removing filter params from API call
      // if (searchTerm) params.append("search", searchTerm);
      // if (filterType !== "All") params.append("type", filterType);

      return apiGet<any>(`/system-owner/draw-winner/eligible-entries?${params.toString()}`);
    }
  });

  let entries = responseData?.data || [];

  // Frontend Filtering
  if (searchTerm) {
    entries = entries.filter((entry: any) => 
      entry.participant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.participant?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (filterType !== "All") {
    entries = entries.filter((entry: any) => 
      entry.type?.toLowerCase() === filterType.toLowerCase()
    );
  }
  const stats = responseData?.stats || { todayEntries: 0, eligibleEntries: 0, currentWinner: "Pending", lastDrawDate: "N/A" };
  const meta = responseData?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };
  const winnerDetails = responseData?.winnerDetails;

  const statCards = [
    { title: "Today's Entries", value: stats.todayEntries, icon: CalendarDays, gradient: "from-blue-500 to-indigo-600" },
    { title: "Eligible Entries", value: stats.eligibleEntries, icon: Users, gradient: "from-emerald-400 to-teal-600" },
    { title: "Current Winner", value: stats.currentWinner, icon: Trophy, gradient: "from-amber-400 to-orange-500" },
    { title: "Last Draw Date", value: stats.lastDrawDate, icon: Clock, gradient: "from-purple-500 to-fuchsia-600" },
  ];

  // Lottery Animation Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDrawing && entries.length > 0) {
      interval = setInterval(() => {
        setCurrentNameIndex((prev) => (prev + 1) % entries.length);
      }, 100);

      // Stop after 2.5 seconds
      setTimeout(() => {
        clearInterval(interval);
        setIsDrawing(false);
        const randomIndex = Math.floor(Math.random() * entries.length);
        setSelectedWinner(entries[randomIndex]);
        setSelectionMethod("Random");
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isDrawing, entries]);

  const handleDrawWinner = () => {
    if (entries.length === 0) {
      toast.error("No eligible entries to draw from.");
      return;
    }
    setSelectedWinner(null);
    setIsDrawing(true);
  };

  const handleManualSelect = (entry: any) => {
    setSelectedWinner(entry);
    setSelectionMethod("Manual");
  };

  const confirmWinnerMutation = useMutation({
    mutationFn: () => {
      return apiPost<any>("/system-owner/draw-winner/draw-random", {
        attemptId: selectedWinner?.id
      });
    },
    onSuccess: (data) => {
      toast.success(data.message || `Winner Confirmed: ${selectedWinner?.participant?.name || "Unknown"}!`);
      setShowConfirmModal(false);
      setSelectedWinner(null);
      // Refresh the eligible entries list and stats after picking a winner
      queryClient.invalidateQueries({ queryKey: ["eligible-entries"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to confirm winner");
    }
  });

  const confirmWinner = () => {
    if (!selectedWinner) return;
    confirmWinnerMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Draw Winner</h2>
        <p className="text-slate-500 font-medium text-base mt-1">Select today's lucky winner from eligible entries.</p>
      </div>

      {/* Overview Cards */}
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
              <div className="text-3xl font-black text-white">{isLoading ? "-" : card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {winnerDetails ? (
        <Card className="border-emerald-200 shadow-xl overflow-hidden bg-gradient-to-br from-emerald-900 to-slate-900 text-white relative mt-4">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Trophy className="h-64 w-64 text-emerald-400" />
          </div>
          <CardContent className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px] relative z-10 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center gap-6 w-full max-w-2xl"
            >
              <div className="bg-emerald-500/20 p-4 rounded-full mb-2">
                <Trophy className="h-16 w-16 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-emerald-400 uppercase tracking-widest drop-shadow-lg">Today's Winner</h2>
              
              <div className="bg-white/10 backdrop-blur-md border border-emerald-500/30 p-6 sm:p-8 rounded-3xl w-full text-left flex flex-col gap-6 shadow-2xl mt-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-white/10 pb-6 text-center sm:text-left">
                  <div className="h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center text-4xl font-black shadow-inner shadow-emerald-700 shrink-0">
                    {winnerDetails.name?.charAt(0) || "W"}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">{winnerDetails.name || "Unknown"}</h4>
                    <p className="text-emerald-200 text-lg sm:text-xl font-medium mt-1">{winnerDetails.email || "No Email"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 text-lg bg-black/20 p-4 sm:p-6 rounded-2xl">
                  <div>
                    <span className="text-emerald-300/70 block mb-1 font-semibold uppercase tracking-wider text-xs sm:text-sm">Winner ID</span>
                    <span className="font-mono text-emerald-100 text-base sm:text-lg">{winnerDetails.id ? winnerDetails.id.substring(0, 8) : "-"}</span>
                  </div>
                  <div>
                    <span className="text-emerald-300/70 block mb-1 font-semibold uppercase tracking-wider text-xs sm:text-sm">Selection</span>
                    <Badge variant="outline" className="text-emerald-200 border-emerald-400/50 bg-emerald-900/30 capitalize text-sm sm:text-base px-3 py-1 mt-1">
                      {winnerDetails.selectionType?.toLowerCase() || "Random"}
                    </Badge>
                  </div>
                  <div className="col-span-2 border-t border-white/10 pt-4 mt-2">
                    <span className="text-emerald-300/70 block mb-1 font-semibold uppercase tracking-wider text-xs sm:text-sm">Announced At</span>
                    <span className="text-emerald-100 text-xl sm:text-2xl font-medium">
                      {winnerDetails.announcedAt ? new Date(winnerDetails.announcedAt).toLocaleString() : "-"}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-emerald-200 mt-6 text-base sm:text-lg font-medium bg-black/40 px-6 py-4 rounded-xl sm:rounded-full border border-emerald-500/20 w-full text-center">
                The winner for today has already been confirmed. Please check back tomorrow for the next draw!
              </p>
            </motion.div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Main Action Section: Lottery Engine */}
          <Card className="border-slate-200 shadow-sm overflow-hidden bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Trophy className="h-64 w-64" />
            </div>
            <CardContent className="p-10 flex flex-col items-center justify-center min-h-[300px] relative z-10 text-center">
              
              <AnimatePresence mode="wait">
                {!isDrawing && !selectedWinner && (
                  <motion.div 
                    key="start"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold">Ready to pick a winner?</h3>
                      <p className="text-slate-300">The system will randomly select from {stats.eligibleEntries} eligible entries.</p>
                    </div>
                    <Button 
                      onClick={handleDrawWinner} 
                      disabled={isLoading || entries.length === 0}
                      size="lg" 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105"
                    >
                      <Dices className="mr-2 h-6 w-6" /> Pick Random Winner
                    </Button>
                  </motion.div>
                )}

                {isDrawing && (
                  <motion.div 
                    key="drawing"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <h3 className="text-xl font-medium text-slate-300">Selecting Winner...</h3>
                    <div className="h-24 flex items-center justify-center overflow-hidden bg-white/10 px-12 py-4 rounded-2xl border border-white/20 backdrop-blur-sm w-full max-w-md">
                      <motion.div
                        key={currentNameIndex}
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-3xl font-black tracking-wider text-emerald-400"
                      >
                        {entries[currentNameIndex]?.participant?.name?.toUpperCase() || "UNKNOWN"}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {selectedWinner && !isDrawing && (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6 w-full max-w-lg"
                  >
                    <h3 className="text-emerald-400 font-bold text-xl uppercase tracking-widest">Winner Selected!</h3>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full text-left flex flex-col gap-4">
                      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center text-xl font-bold">
                          {selectedWinner.participant?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold">{selectedWinner.participant?.name || "Unknown"}</h4>
                          <p className="text-slate-300">{selectedWinner.participant?.email || "No Email"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400 block mb-1">Entry Type</span>
                          <Badge variant="outline" className="text-emerald-300 border-emerald-400/30 capitalize">{selectedWinner.type?.toLowerCase()}</Badge>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-1">Solve Time</span>
                          <span className="font-mono">{selectedWinner.solveTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                      <Button onClick={() => setShowConfirmModal(true)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12">
                        <CheckCircle className="mr-2 h-5 w-5" /> Confirm Winner
                      </Button>
                      <Button onClick={handleDrawWinner} variant="outline" className="flex-1 border-white/20 text-white bg-transparent hover:bg-white/10 h-12">
                        <RefreshCw className="mr-2 h-5 w-5" /> Pick Again
                      </Button>
                      <Button onClick={() => setSelectedWinner(null)} variant="outline" className="sm:flex-none border-white/20 text-slate-300 bg-transparent hover:bg-white/10 h-12 px-3">
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </CardContent>
          </Card>

          {/* Eligible Entries Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Eligible Entries</h3>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search eligible entries..." 
                  className="pl-10 h-11 text-base bg-slate-50 border-slate-200"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <Select value={filterType} onValueChange={(val) => { setFilterType(val); setCurrentPage(1); }}>
                <SelectTrigger className="h-11 text-base bg-slate-50 border-slate-200 w-full sm:w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Puzzle">Puzzle</SelectItem>
                  <SelectItem value="Alternate">Alternate</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                      <TableHead className="font-semibold text-slate-600 py-4">ID</TableHead>
                      <TableHead className="font-semibold text-slate-600 py-4">Participant</TableHead>
                      <TableHead className="font-semibold text-slate-600 py-4">Type</TableHead>
                      <TableHead className="font-semibold text-slate-600 py-4">Solve Time</TableHead>
                      <TableHead className="text-right font-semibold text-slate-600 py-4">Manual Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.length === 0 && !isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-slate-500">No eligible entries found.</TableCell>
                      </TableRow>
                    ) : (
                      entries.map((entry: any) => (
                        <TableRow key={entry.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-slate-900 py-4">{entry.displayId}</TableCell>
                          <TableCell className="py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-800">{entry.participant?.name || "Unknown"}</span>
                              <span className="text-sm text-slate-500">{entry.participant?.email || "-"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge variant="outline" className={entry.type?.toUpperCase() === 'PUZZLE' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'}>
                              <span className="capitalize">{entry.type?.toLowerCase()}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600 font-mono py-4">{entry.solveTime}</TableCell>
                          <TableCell className="text-right py-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                              onClick={() => handleManualSelect(entry)}
                              disabled={selectedWinner !== null || isDrawing}
                            >
                              <Hand className="h-4 w-4 mr-2" /> Select
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
                {entries.length === 0 && !isLoading ? (
                  <div className="text-center py-10 text-slate-500">No eligible entries found.</div>
                ) : (
                  entries.map((entry: any) => (
                    <div key={entry.id} className="flex flex-col gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-semibold text-slate-800 text-base block">{entry.participant?.name || "Unknown"}</span>
                          <span className="text-xs text-slate-500 block">{entry.participant?.email || "-"}</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-slate-400 font-mono mt-0.5 block">{entry.displayId}</span>
                          <Badge variant="outline" className={entry.type?.toUpperCase() === 'PUZZLE' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'}>
                            <span className="capitalize">{entry.type?.toLowerCase()}</span>
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-1 pt-3 border-t border-slate-200">
                        <div>
                          <span className="text-slate-500 block text-xs font-medium">Solve Time</span>
                          <span className="font-mono text-slate-700">{entry.solveTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end pt-3 border-t border-slate-200 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 w-full"
                          onClick={() => handleManualSelect(entry)}
                          disabled={selectedWinner !== null || isDrawing}
                        >
                          <Hand className="h-4 w-4 mr-2" /> Manual Select
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
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

          {/* Confirmation Modal */}
          <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-slate-900">Confirm Winner</DialogTitle>
                <DialogDescription className="text-lg mt-2 text-slate-600">
                  You are about to declare this participant as the official winner. This action will notify the user and move the record to history.
                </DialogDescription>
              </DialogHeader>
              
              {selectedWinner && (
                <div className="my-6 p-6 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-4 text-lg">
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-slate-500 font-medium pt-0.5">Name:</span>
                    <span className="col-span-2 font-bold text-slate-900 text-2xl">{selectedWinner.participant?.name || "Unknown"}</span>
                    
                    <span className="text-slate-500 font-medium pt-0.5">Email:</span>
                    <span className="col-span-2 font-semibold text-slate-800 text-xl">{selectedWinner.participant?.email || "-"}</span>
                    
                    <span className="text-slate-500 font-medium pt-0.5">Entry Type:</span>
                    <span className="col-span-2 font-semibold text-slate-800 capitalize text-xl">{selectedWinner.type?.toLowerCase()}</span>
                    
                    <span className="text-slate-500 font-medium pt-0.5">Selection:</span>
                    <span className="col-span-2 font-bold text-emerald-600 flex items-center text-xl">
                      {selectionMethod === "Random" ? <Dices className="h-5 w-5 mr-2"/> : <Hand className="h-5 w-5 mr-2"/>}
                      {selectionMethod}
                    </span>
                  </div>
                </div>
              )}

              <DialogFooter className="sm:justify-between flex-row mt-4">
                <Button variant="outline" onClick={() => setShowConfirmModal(false)} disabled={confirmWinnerMutation.isPending} className="text-lg py-6 px-6">
                  Cancel
                </Button>
                <Button onClick={confirmWinner} disabled={confirmWinnerMutation.isPending} className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-6 px-8">
                  {confirmWinnerMutation.isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Trophy className="mr-2 h-5 w-5" />
                  )}
                  Confirm Winner
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
