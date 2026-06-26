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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Users, Trophy, Clock, Search, Filter, Dices, RefreshCw, CheckCircle, Hand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Mock Data
const eligibleEntries = [
  { id: "ENT-1045", name: "John Doe", email: "john@example.com", type: "Puzzle", time: "02:15" },
  { id: "ENT-1042", name: "Emily Chen", email: "emily.c@example.com", type: "Puzzle", time: "03:10" },
  { id: "ENT-1041", name: "David Wilson", email: "david.w@example.com", type: "Alternate", time: "-" },
  { id: "ENT-1040", name: "Jessica Taylor", email: "jessica.t@example.com", type: "Puzzle", time: "04:20" },
  { id: "ENT-1038", name: "Robert Fox", email: "robert.f@example.com", type: "Alternate", time: "-" },
  { id: "ENT-1037", name: "Wade Warren", email: "wade.w@example.com", type: "Puzzle", time: "01:30" },
];

export default function DrawWinnerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState<typeof eligibleEntries[0] | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectionMethod, setSelectionMethod] = useState<"Random" | "Manual">("Random");

  const filteredEligible = eligibleEntries.filter((entry) => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statCards = [
    { title: "Today's Entries", value: "290", icon: CalendarDays, bg: "bg-blue-100", color: "text-blue-600" },
    { title: "Eligible Entries", value: "245", icon: Users, bg: "bg-emerald-100", color: "text-emerald-600" },
    { title: "Current Winner", value: "Pending", icon: Trophy, bg: "bg-amber-100", color: "text-amber-600" },
    { title: "Last Draw Date", value: "Yesterday", icon: Clock, bg: "bg-purple-100", color: "text-purple-600" },
  ];

  // Lottery Animation Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDrawing) {
      interval = setInterval(() => {
        setCurrentNameIndex((prev) => (prev + 1) % eligibleEntries.length);
      }, 100);

      // Stop after 2.5 seconds
      setTimeout(() => {
        clearInterval(interval);
        setIsDrawing(false);
        const randomIndex = Math.floor(Math.random() * eligibleEntries.length);
        setSelectedWinner(eligibleEntries[randomIndex]);
        setSelectionMethod("Random");
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isDrawing]);

  const handleDrawWinner = () => {
    setSelectedWinner(null);
    setIsDrawing(true);
  };

  const handleManualSelect = (entry: typeof eligibleEntries[0]) => {
    setSelectedWinner(entry);
    setSelectionMethod("Manual");
  };

  const confirmWinner = () => {
    setShowConfirmModal(false);
    // In a real app, API call to confirm winner goes here
    toast.success(`Winner Confirmed: ${selectedWinner?.name}!`);
    setSelectedWinner(null);
  };

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Draw Winner</h2>
        <p className="text-slate-500 font-medium text-base mt-1">Select today's lucky winner from eligible entries.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Card key={i} className="border-slate-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">{card.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                  <p className="text-slate-300">The system will randomly select from 245 eligible entries.</p>
                </div>
                <Button 
                  onClick={handleDrawWinner} 
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
                    {eligibleEntries[currentNameIndex].name.toUpperCase()}
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
                      {selectedWinner.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{selectedWinner.name}</h4>
                      <p className="text-slate-300">{selectedWinner.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400 block mb-1">Entry Type</span>
                      <Badge variant="outline" className="text-emerald-300 border-emerald-400/30">{selectedWinner.type}</Badge>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Solve Time</span>
                      <span className="font-mono">{selectedWinner.time}</span>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 h-11">
            <Filter className="h-5 w-5 mr-2" />
            Filter Status
          </Button>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
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
                {filteredEligible.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900 py-4">{entry.id}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{entry.name}</span>
                        <span className="text-sm text-slate-500">{entry.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={entry.type === 'Puzzle' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'}>
                        {entry.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 font-mono py-4">{entry.time}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-slate-500 text-sm">
            <div>Showing {filteredEligible.length} eligible entries</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="bg-white">Previous</Button>
              <Button variant="outline" size="sm" className="bg-white">Next</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirm Winner</DialogTitle>
            <DialogDescription>
              You are about to declare this participant as the official winner. This action will notify the user and move the record to history.
            </DialogDescription>
          </DialogHeader>
          
          {selectedWinner && (
            <div className="my-4 p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-slate-500">Name:</span>
                <span className="col-span-2 font-semibold text-slate-900">{selectedWinner.name}</span>
                
                <span className="text-slate-500">Email:</span>
                <span className="col-span-2 font-semibold text-slate-900">{selectedWinner.email}</span>
                
                <span className="text-slate-500">Entry Type:</span>
                <span className="col-span-2 font-semibold text-slate-900">{selectedWinner.type}</span>
                
                <span className="text-slate-500">Selection:</span>
                <span className="col-span-2 font-semibold text-emerald-600 flex items-center">
                  {selectionMethod === "Random" ? <Dices className="h-4 w-4 mr-1"/> : <Hand className="h-4 w-4 mr-1"/>}
                  {selectionMethod}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between flex-row">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmWinner} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Trophy className="mr-2 h-4 w-4" /> Confirm Winner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
