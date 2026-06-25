"use client";

import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      
      {/* Subtle dotted background for the entire screen */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl h-auto min-h-[600px] md:h-[650px] bg-white md:bg-transparent rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-border/60 overflow-hidden flex flex-col md:block">
        
        {/* Form Side - Animated Position */}
        <div 
          className={cn(
            "w-full md:w-1/2 h-full p-6 sm:p-12 z-10 bg-white flex flex-col justify-center relative md:absolute left-0 top-0 overflow-y-auto transition-transform duration-700 ease-in-out",
            isLogin ? "translate-x-0" : "md:translate-x-full translate-x-0"
          )}
        >
          {/* Mobile Logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center p-4 bg-accent/10 border border-accent/20 rounded-2xl mb-4 shadow-sm">
              <Gamepad2 className="h-10 w-10 text-accent" />
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight text-primary">Crossword Giveaway</h1>
          </div>

          <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Branding Overlay Side - Animated Position */}
        <div 
          className={cn(
            "hidden md:flex absolute top-0 left-0 w-1/2 h-full flex-col bg-[#1F2937] text-white p-10 lg:p-16 justify-between overflow-hidden z-20 transition-transform duration-700 ease-in-out pointer-events-none",
            isLogin ? "translate-x-full" : "translate-x-0"
          )}
        >
          {/* Base Dark Color */}
          <div className="absolute inset-0 bg-[#1F2937]"></div>
          
          {/* Beautiful Gold/Accent Glowing Orbs */}
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-accent/30 blur-[120px] mix-blend-screen"></div>
          <div className="absolute top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-accent/20 blur-[130px] mix-blend-screen"></div>
          
          {/* Subtle patterned overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          {/* Custom 3D Crossword Puzzle Overlay */}
          <div className="absolute inset-0 opacity-[0.4] bg-[url('/crossword-bg.png')] bg-cover bg-center mix-blend-luminosity"></div>
          
          {/* Black Shadow Overlay */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
          
          {/* Bottom Gradient for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#1F2937]/90 to-transparent"></div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center pointer-events-auto">
            <Link href="/" className="inline-flex items-center gap-3 font-bold text-2xl group transition-all">
              <div className="p-2 bg-accent rounded-lg text-primary shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <span className="text-white drop-shadow-md">Crossword Giveaway</span>
            </Link>
          </div>
          
          {/* Hero Text */}
          <div className="relative z-10 space-y-6 max-w-xl pb-10 pointer-events-auto">
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent backdrop-blur-sm">
              🎉 Play Daily & Win Prizes
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.1]">
              Solve, Play, and <span className="text-accent">Win Big.</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed font-medium drop-shadow-md">
              Join thousands of players every day to solve exclusive crossword puzzles and earn a chance to win incredible daily prizes.
            </p>
          </div>

          {/* Footer */}
          <div className="relative z-10 pointer-events-auto">
            <p className="text-sm text-primary-foreground/60 font-medium">
              &copy; {new Date().getFullYear()} Daily Crossword Giveaway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
