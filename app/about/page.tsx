import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gamepad2, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Heritage Stackers",
  description: "Learn more about Heritage Stackers, our mission, and why we created the ultimate daily mini crossword puzzle with guaranteed daily winners.",
  openGraph: {
    title: "About Us | Heritage Stackers",
    description: "Discover the story behind Heritage Stackers.",
  },
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            About Heritage Stackers
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Our mission is to bring joy, mental exercise, and real-world rewards to crossword enthusiasts every single day.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Daily Challenges</h3>
          <p className="text-slate-600">A fresh, hand-crafted mini crossword puzzle delivered every day to keep your mind sharp and entertained.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-amber-100 text-[#D4AF37] rounded-full flex items-center justify-center mb-6">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Real Rewards</h3>
          <p className="text-slate-600">Solve the puzzle and enter our daily giveaway for a chance to win authentic silver coins and other exciting prizes.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Community</h3>
          <p className="text-slate-600">Join a growing community of puzzle lovers and collectors who share a passion for words and precious metals.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Story</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Heritage Stackers was born out of a simple idea: what if the traditional daily crossword puzzle came with real, tangible rewards? We wanted to combine the classic daily ritual of solving a crossword with the thrill of a modern giveaway, offering authentic silver pieces as a reward for mental agility.
        </p>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We believe that keeping your brain active shouldn't just be its own reward. By participating in our daily puzzles, you're not only challenging yourself but also getting a completely free chance to win incredible prizes, every single day.
        </p>

        <div className="flex justify-center mt-8 pt-8 border-t border-slate-100">
          <Link href="/">
            <Button size="lg" className="gap-2 rounded-full font-bold shadow-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white px-8">
              Play Today's Puzzle
            </Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
