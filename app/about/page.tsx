import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="py-12">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
              About Heritage Stackers
            </h1>
            <p className="text-slate-300 font-medium max-w-2xl text-lg">
              Built around a love for collectible assets, coins, silver, gold, and legacy stacking.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="max-w-none text-slate-700 text-lg leading-relaxed">
            
            <p className="mb-6">
              We believe collecting should be exciting, approachable, and community-driven. Whether you are stacking silver, collecting classic coins, or just learning about the hobby, Heritage Stackers is here to make the experience more fun.
            </p>

            <p className="mb-6">
              The Heritage Stackers Daily Mini Crossword was created as a free daily game for our community. Each day, visitors can solve a quick puzzle, learn something new, and enter for a chance to win the daily prize.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Our goal is simple:</h2>
            <p className="mb-8 font-medium text-slate-800 text-xl">
              Create a fun daily habit for collectors, stackers, and puzzle lovers.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">We are focused on:</h2>
            <ul className="list-disc list-inside space-y-3 ml-4 mb-8 text-slate-600">
              <li>Collectible coins</li>
              <li>Silver and bullion culture</li>
              <li>Community giveaways</li>
              <li>Daily games</li>
              <li>Education and entertainment</li>
              <li>Building a long-term collector community</li>
            </ul>

            <div className="mt-12 p-6 bg-amber-50/50 rounded-2xl border border-amber-100 text-center">
              <p className="font-medium text-slate-800 text-xl mb-2">
                Thank you for being part of Heritage Stackers.
              </p>
              <p className="font-bold text-[#D4AF37] text-2xl">
                Play daily, stack often, and build your legacy.
              </p>
            </div>

            <div className="flex justify-center mt-12 pt-8 border-t border-slate-100">
              <Link href="/">
                <Button size="lg" className="gap-2 rounded-full font-bold shadow-xl shadow-[#D4AF37]/20 bg-[#D4AF37] hover:bg-[#b08d29] text-white px-10 py-6 text-lg transition-transform hover:scale-105">
                  Play Today's Puzzle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
