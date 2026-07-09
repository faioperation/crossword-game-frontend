"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/apiClient";
import { Loader2, Gamepad2, ArrowRight, Gift, CheckCircle2 } from "lucide-react";
import { WinnersList } from "@/components/public/WinnersList";
import { ParticipationForm } from "@/components/public/ParticipationForm";
import { Rules } from "@/components/public/Rules";
import type { Winner } from "@/types";
import { CrosswordGame } from "@/components/game/CrosswordGame";
import { mockPuzzle } from "@/lib/puzzle-data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/AdSlot";
import { PublicLayout } from "@/components/public/PublicLayout";
import { getImageUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [activePuzzle, setActivePuzzle] = useState<any>(null);
  const [recentWinners, setRecentWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prizeInfo, setPrizeInfo] = useState({
    name: "Daily Mystery Prize",
    description: "Solve today's mini crossword and submit your entry for a chance to win. A new winner is chosen daily!",
    image: null as string | null
  });
  const [isSubmittedToday, setIsSubmittedToday] = useState(false);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const res = await apiGet<any>('/users/home/active-puzzle');
        if (res.success && res.data?.puzzle) {
          const apiPuzzle = res.data.puzzle;
          setPrizeInfo({
            name: apiPuzzle.dailyPrize || "Daily Mystery Prize",
            description: apiPuzzle.description || "Solve today's mini crossword and submit your entry for a chance to win. A new winner is chosen daily!",
            image: apiPuzzle.image || null
          });
          
          // Map to frontend Puzzle type
          const mappedGrid = apiPuzzle.cells.map((row: any[], r: number) => 
            row.map((cell: any, c: number) => ({
              row: r,
              col: c,
              value: "",
              answer: cell.letter || "",
              isBlack: cell.isBlack,
              number: cell.clueNum || undefined
            }))
          );
          
          const mappedClues = apiPuzzle.clues.map((clue: any) => {
            // Find row and col from grid
            let r = 0;
            let c = 0;
            for (let i = 0; i < apiPuzzle.cells.length; i++) {
              for (let j = 0; j < apiPuzzle.cells[i].length; j++) {
                if (apiPuzzle.cells[i][j].clueNum === clue.number) {
                  r = i;
                  c = j;
                }
              }
            }
            return {
              number: clue.number,
              direction: clue.direction.toLowerCase(),
              text: clue.text,
              answer: "", 
              row: r,
              col: c
            };
          });

          setActivePuzzle({
            id: apiPuzzle.id,
            title: apiPuzzle.title,
            date: new Date().toISOString().split('T')[0],
            grid: mappedGrid,
            clues: mappedClues
          });
        }
      } catch (err) {
        console.error("Failed to fetch active puzzle", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRecentWinners = async () => {
      try {
        const res = await apiGet<any>('/users/home/recent-winners');
        if (res.success && res.data) {
          const mappedWinners = res.data.map((w: any) => ({
            id: w.id,
            name: w.winnerName,
            prizeName: w.prize,
            winningDate: w.date
          }));
          setRecentWinners(mappedWinners);
        }
      } catch (err) {
        console.error("Failed to fetch recent winners", err);
      }
    };
    
    // Check if submitted today
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const savedDate = localStorage.getItem("cw_submitted_today");
    if (savedDate) {
      if (savedDate === today) {
        setIsSubmittedToday(true);
      } else {
        localStorage.removeItem("cw_submitted_today");
      }
    }
    
    // Listen for new submissions
    const handleSubmission = () => setIsSubmittedToday(true);
    window.addEventListener("puzzle-submitted", handleSubmission);

    fetchPuzzle();
    fetchRecentWinners();
    
    return () => {
      window.removeEventListener("puzzle-submitted", handleSubmission);
    };
  }, []);

  return (
    <PublicLayout>

        {/* Top Ad Banner */}
        {/* <AdSlot position="top" /> */}

        {/* Today's Prize Banner */}
        <section className="w-full">
          {isLoading ? (
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 w-full">
                <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-slate-800 shrink-0" />
                <div className="flex flex-col items-center md:items-start w-full space-y-4">
                  <Skeleton className="h-6 w-40 rounded-full bg-slate-800" />
                  <Skeleton className="h-10 sm:h-12 w-3/4 max-w-md bg-slate-800" />
                  <div className="space-y-2 w-full max-w-lg flex flex-col items-center md:items-start">
                    <Skeleton className="h-4 w-full bg-slate-800" />
                    <Skeleton className="h-4 w-5/6 bg-slate-800" />
                  </div>
                </div>
              </div>
              <div className="shrink-0 mt-4 md:mt-0">
                <Skeleton className="w-[140px] h-[120px] rounded-xl bg-slate-800" />
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-2xl border border-slate-700/50 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-green-400 opacity-10 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                {prizeInfo.image && (
                  <div className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={getImageUrl(prizeInfo.image)} 
                      alt={prizeInfo.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl border border-[#D4AF37]/40 shadow-xl bg-slate-900"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center md:items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950/50 rounded-full text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 border border-slate-700/50">
                    <Gift className="w-4 h-4 text-[#D4AF37]" />
                    Today's Featured Prize
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
                    {prizeInfo.name}
                  </h2>
                  <p className="text-slate-300 font-medium max-w-lg text-sm sm:text-base leading-relaxed">
                    {prizeInfo.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex-shrink-0 mt-4 md:mt-0">
                <div className="bg-gradient-to-b from-[#FFE87C] to-[#D4AF37] p-1 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition duration-300">
                  <div className="bg-slate-900 rounded-xl px-6 py-5 flex flex-col items-center justify-center border border-[#D4AF37]/30 text-center min-w-[140px]">
                    <span className="text-[#D4AF37] font-bold tracking-widest text-[10px] uppercase mb-1">Guaranteed</span>
                    <span className="text-3xl font-black text-white">1 Winner</span>
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Every Day</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Main Content Section */}
        {isSubmittedToday ? (
          <section className="w-full">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">You're All Set for Today!</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                You have already submitted your entry for today's prize draw. Come back tomorrow for a new puzzle and another chance to win!
              </p>
            </div>
          </section>
        ) : (
          <section className="w-full">
            <div className="space-y-16">
              {/* Game Engine Section */}
              <div className="w-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37] mb-4" />
                    <p className="text-slate-500 font-medium">Loading today's puzzle...</p>
                  </div>
                ) : activePuzzle ? (
                  <CrosswordGame puzzle={activePuzzle} />
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Puzzle</h3>
                    <p className="text-slate-500">There is no active puzzle for today. Check back later!</p>
                  </div>
                )}
              </div>
  
              {/* Info Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <WinnersList winners={recentWinners} />
                <ParticipationForm />
              </div>
            </div>
          </section>
        )}
    </PublicLayout>
  );
}
