import { WinnersList } from "@/components/public/WinnersList";
import { Rules } from "@/components/public/Rules";
import type { Winner } from "@/types";
import { Gamepad2, ArrowRight, Gift } from "lucide-react";
import { CrosswordGame } from "@/components/game/CrosswordGame";
import { mockPuzzle } from "@/lib/puzzle-data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock Data
const mockWinners: Winner[] = [
  { id: "w-1", name: "Jane Smith", prizeName: "1oz Silver Eagle Coin", winningDate: "2026-06-24T00:00:00Z" },
  { id: "w-2", name: "Bob Johnson", prizeName: "Morgan Silver Dollar", winningDate: "2026-06-23T00:00:00Z" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto max-w-7xl px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="relative group cursor-pointer flex-shrink-0">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md border border-slate-200 w-10 h-10 sm:w-24 sm:h-24 flex items-center justify-center bg-white group-hover:shadow-lg transition-shadow duration-300">
                <Image src="/assets/logo.jpeg" alt="Heritage Stackers Logo" width={96} height={96} className="object-contain w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[14px] sm:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 truncate">
                <span className="sm:hidden">Heritage Stackers</span>
                <span className="hidden sm:inline">Heritage Stackers Daily Mini Crossword</span>
              </h1>
              <p className="text-[15px] font-bold text-slate-400 tracking-widest uppercase hidden sm:block mt-[-2px]">
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} Edition
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-base text-slate-600 font-medium flex-shrink-0">
            <span className="hidden lg:inline text-sm">Have an account?</span>
            <Link href="/login">
              <Button size="sm" className="bg-gradient-to-r from-[#D4AF37] to-[#e5c04b] hover:from-[#c5a030] hover:to-[#d4af37] text-white rounded-full px-5 h-8 sm:h-10 text-xs sm:text-sm font-bold shadow-md border border-yellow-400/50 transition-all hover:scale-105">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 space-y-16">

        {/* Today's Prize Banner */}
        <section className="w-full">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-2xl border border-slate-700/50 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-green-400 opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950/50 rounded-full text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 border border-slate-700/50">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                Today's Featured Prize
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
                1oz Silver Eagle Coin
              </h2>
              <p className="text-slate-300 font-medium max-w-lg text-sm sm:text-base">
                Solve today's mini crossword and submit your entry for a chance to win this beautiful, authentic silver coin. A new winner is chosen daily!
              </p>
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
        </section>

        {/* Game Engine Section */}
        <section className="w-full">
          <CrosswordGame puzzle={mockPuzzle} />
        </section>

        {/* Info Sections */}
        <section className="w-full">
          <WinnersList winners={mockWinners} />
        </section>
      </main>

      {/* Short Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-6 text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 mt-4">
            <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-lg">
              <Image src="/assets/logo.jpeg" alt="Heritage Stackers Logo" width={96} height={96} className="object-contain w-full h-full" />
            </div>
            <span className="font-bold text-slate-200 text-xl sm:text-2xl">Heritage Stackers</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Heritage Stackers. All rights reserved. Play daily, win big!
          </p>
        </div>
      </footer>
    </div>
  );
}
