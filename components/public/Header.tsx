import Image from "next/image";
import { HeaderAuth } from "./HeaderAuth";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-4 min-w-0">
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
        </Link>
        <HeaderAuth />
      </div>
    </header>
  );
}
