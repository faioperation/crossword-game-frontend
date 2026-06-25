import { WinnersList } from "@/components/public/WinnersList";
import { Rules } from "@/components/public/Rules";
import { AlternateEntryForm } from "@/components/public/AlternateEntryForm";
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
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent rounded-lg text-primary shadow-sm">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Crossword - {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <span>Have an account?</span>
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
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <WinnersList winners={mockWinners} />
          </div>
          <div className="space-y-8">
            <AlternateEntryForm />
          </div>
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
