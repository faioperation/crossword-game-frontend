import Link from 'next/link';
import { SiInstagram, SiEbay } from '@icons-pack/react-simple-icons';

const WhatnotIcon = ({ className }: { className?: string }) => (
  <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <title>Whatnot</title>
    <path d="M4.646 22L.031 3.25h4.636l2.395 12.83 2.91-12.83h4.083l2.91 12.83L19.333 3.25h4.636L19.354 22h-4.63l-2.736-12.195L9.277 22H4.646z" />
  </svg>
);

export function TopBar() {
  return (
    <div className="bg-[#b38d1d] text-white text-[10px] sm:text-[11px] font-bold py-1.5 px-4 w-full">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-2 lg:gap-4">
        {/* Left Side */}
        <div className="tracking-wide uppercase text-center lg:text-left">
          Play and Get Prize Everyday
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 uppercase tracking-wide">
          {/* Social Icons */}
          <div className="flex items-center gap-4 lg:border-r border-white/30 lg:pr-5">
            <Link href="https://www.instagram.com/heritagestackers?utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors" aria-label="Instagram">
              <SiInstagram className="w-5 h-5" />
            </Link>
            <Link href="https://www.whatnot.com/user/heritagestackers?sender_id=24069006&sharing_channel=copyLink" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors" aria-label="Whatnot">
              <WhatnotIcon className="w-5 h-5" />
            </Link>
            <Link href="https://ebay.io/m/BfoSpy" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors" aria-label="eBay">
              <SiEbay className="w-8 h-8" />
            </Link>
          </div>

          <Link href="/privacy-policy" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/80 transition-colors">Terms of Service</Link>
          <Link href="/giveaway-rules" className="hover:text-white/80 transition-colors">Giveaway Rules</Link>
        </div>
      </div>
    </div>
  );
}
