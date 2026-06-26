import { WinnersList } from "@/components/public/WinnersList";
import { Rules } from "@/components/public/Rules";
import type { Winner } from "@/types";
import { Gamepad2, ArrowRight } from "lucide-react";
import { CrosswordGame } from "@/components/game/CrosswordGame";
import { mockPuzzle } from "@/lib/puzzle-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock Data
const mockWinners: Winner[] = [
  { id: "w-1", name: "Jane Smith", prizeName: "Nintendo Switch", winningDate: "2026-06-24T00:00:00Z" },
  { id: "w-2", name: "Bob Johnson", prizeName: "$50 Steam Wallet", winningDate: "2026-06-23T00:00:00Z" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-[#D4AF37] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative p-2.5 bg-gradient-to-br from-[#22C55E] to-[#16a34a] rounded-xl shadow-lg border border-green-400/30 flex items-center justify-center">
              <Gamepad2 className="h-6 w-6 text-[#FFE87C] drop-shadow-sm" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Heritage Stackers Daily Mini Crossword
            </h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase hidden sm:block mt-[-2px]">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} Edition
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <span className="hidden sm:inline">Have an account?</span>
          <Link href="/login" className="font-bold text-[#D4AF37] hover:underline">
            Log In
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 space-y-16">
        
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
          <div className="flex justify-center items-center gap-2 mb-4">
            <Gamepad2 className="h-5 w-5 text-accent" />
            <span className="font-bold text-slate-200">Daily Crossword Giveaway</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Daily Crossword Giveaway. All rights reserved. Play daily, win big!
          </p>
        </div>
      </footer>
    </div>
  );
}
