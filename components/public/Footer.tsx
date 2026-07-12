import Image from "next/image";
import Link from "next/link";
import { SiEbay, SiInstagram } from "@icons-pack/react-simple-icons";

const WhatnotIcon = ({ className }: { className?: string }) => (
  <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <title>Whatnot</title>
    <path d="M4.646 22L.031 3.25h4.636l2.395 12.83 2.91-12.83h4.083l2.91 12.83L19.333 3.25h4.636L19.354 22h-4.63l-2.736-12.195L9.277 22H4.646z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg">
                <Image src="/assets/logo.jpeg" alt="Heritage Stackers Logo" width={56} height={56} className="object-contain w-full h-full" />
              </div>
              <span className="font-bold text-slate-200 text-xl">Heritage Stackers</span>
            </Link>
            <p className="text-sm mt-2 max-w-xs text-slate-400">
              Play our daily mini crossword puzzle for a chance to win exclusive silver coins. A new winner is chosen every day!
            </p>
            <div className="flex items-center gap-5 mt-2">
              <a href="https://www.instagram.com/heritagestackers?utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.whatnot.com/user/heritagestackers?sender_id=24069006&sharing_channel=copyLink" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Whatnot">
                <WhatnotIcon className="w-5 h-5" />
              </a>
              <a href="https://ebay.io/m/BfoSpy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="eBay">
                <SiEbay className="w-7 h-7" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider mb-2 text-sm">Game</h3>
            <Link href="/" className="text-sm hover:text-white transition-colors">Home</Link>
            <Link href="/how-to-play" className="text-sm hover:text-white transition-colors">How To Play</Link>
            <Link href="/giveaway-rules" className="text-sm hover:text-white transition-colors">Giveaway Rules</Link>
            <Link href="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider mb-2 text-sm">Company</h3>
            <Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-sm hover:text-white transition-colors">Cookie Policy</Link>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Heritage Stackers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
