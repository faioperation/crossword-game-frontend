import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gamepad2, CheckSquare, Gift, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Play | Heritage Stackers",
  description: "Learn how to play the Heritage Stackers daily mini crossword puzzle and enter to win authentic silver coins.",
};

export default function HowToPlayPage() {
  const steps = [
    {
      icon: <Gamepad2 className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-100",
      title: "1. Solve the Puzzle",
      desc: "Every day, a new mini crossword is published. Use the clues to fill in the grid. It's designed to be quick, fun, and a great mental exercise.",
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-green-600" />,
      bg: "bg-green-100",
      title: "2. Submit Your Answers",
      desc: "Once the grid is correctly filled, you'll be prompted to submit your entry. Only correctly completed puzzles are eligible for the giveaway.",
    },
    {
      icon: <Gift className="w-8 h-8 text-amber-600" />,
      bg: "bg-amber-100",
      title: "3. Enter the Giveaway",
      desc: "Provide your name and email to officially enter the daily draw. Your information is kept secure and only used to contact you if you win.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#D4AF37]" />,
      bg: "bg-[#D4AF37]/20",
      title: "4. Check the Winners",
      desc: "One lucky winner is drawn at random every day! Check the 'Previous Winners' page or keep an eye on your email inbox.",
    },
  ];

  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            How to Play
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Four simple steps stand between you and a chance to win today's authentic silver coin prize.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${step.bg}`}>
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to start your streak?</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-8">
          The puzzle resets every night at midnight. Make it part of your daily routine and increase your chances of winning over time!
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2 rounded-full font-bold shadow-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white px-8">
            Play Today's Puzzle
          </Button>
        </Link>
      </div>
    </PublicLayout>
  );
}
