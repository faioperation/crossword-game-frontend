"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdSlot } from "@/components/ads/AdSlot";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto max-w-7xl px-4 pt-4 pb-8 space-y-16">
        {children}
      </main>

      <AdSlot position="footer" />
      <Footer />
      <AdSlot position="mobile" />
    </div>
  );
}
