import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Play | Heritage Stackers",
  description: "Learn how to play the Heritage Stackers daily mini crossword puzzle and enter to win authentic silver coins.",
};

export default function HowToPlayPage() {
  return (
    <PublicLayout>
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
              How To Play
            </h1>
            <p className="text-slate-300 font-medium text-lg leading-relaxed mb-4">
              Welcome to the Heritage Stackers Daily Mini Crossword.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              Each day, we post a new mini crossword puzzle. Complete the puzzle, submit your entry, and you'll be entered for a chance to win the daily prize.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* How It Works */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-slate-600 ml-2">
              <li><span className="font-medium text-slate-800">Visit</span> HeritageStackers.com.</li>
              <li><span className="font-medium text-slate-800">Play</span> the daily mini crossword.</li>
              <li><span className="font-medium text-slate-800">Use</span> the clues to fill in the crossword grid with the correct answers.</li>
              <li><span className="font-medium text-slate-800">Complete</span> the puzzle.</li>
              <li><span className="font-medium text-slate-800">Submit</span> your giveaway entry form.</li>
              <li><span className="font-medium text-slate-800">Check back</span> daily for a new puzzle and a new chance to enter.</li>
            </ol>
          </section>

          {/* Choosing a Clue */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">2</span>
              Choosing a Clue
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>On tablet or desktop, tap a clue from the clue list.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>On mobile, use the <strong>&lt;</strong> and <strong>&gt;</strong> buttons to move between clues.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span>You can also tap any square in the grid to highlight its clue.</span>
              </li>
            </ul>
          </section>

          {/* Entering Answers */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">3</span>
              Entering Answers
            </h2>
            <ul className="space-y-3 text-slate-600 mb-6">
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <span>Type your answer into the grid.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <span>To erase a letter, tap the delete button. Keep tapping delete to remove more letters.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <span>To change a letter, tap the square you want to fix and type the new letter.</span>
              </li>
            </ul>
            <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100 text-slate-700 text-sm">
              <span className="font-bold text-amber-700 mr-2">Tip:</span> At any time, you can tap the Check button to see which letters are incorrect.
            </div>
          </section>

          {/* Completing the Puzzle */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">4</span>
              Completing the Puzzle
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span>Once the crossword is completed correctly, the giveaway entry form will appear.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span>Fill out the required information and submit your entry.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span>A new puzzle may be posted each day, so check back regularly.</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 italic">
                No purchase is necessary to enter or win. See <Link href="/giveaway-rules" className="text-blue-600 hover:underline">Giveaway Rules</Link> for complete details.
              </p>
            </div>
          </section>

        </div>
        
        {/* Call to action */}
        <div className="mt-14 mb-8 text-center">
          <Link href="/">
            <Button size="lg" className="gap-2 rounded-full font-bold shadow-xl shadow-[#D4AF37]/20 bg-[#D4AF37] hover:bg-[#b08d29] text-white px-10 py-6 text-lg transition-all hover:scale-105 hover:-translate-y-1">
              Play Today's Puzzle
            </Button>
          </Link>
        </div>
    </PublicLayout>
  );
}
