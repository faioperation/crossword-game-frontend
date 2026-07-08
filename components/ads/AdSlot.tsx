"use client";

import { adConfig } from "@/config/ads";
import { AdsenseAd } from "./AdsenseAd";
import { PlaywireAd } from "./PlaywireAd";
import { EmptyAd } from "./EmptyAd";

type AdPosition = "top" | "mid" | "sidebar-left" | "sidebar-right" | "footer" | "mobile";

export function AdSlot({ position }: { position: AdPosition }) {
  const { provider, slots } = adConfig;
  const slotId = slots[position];

  // Map position to responsive classes
  const getContainerClasses = () => {
    const base = "flex justify-center items-center overflow-hidden";
    switch (position) {
      case "top":
        return `${base} mt-0 mb-4 w-full min-h-[90px]`;
      case "mid":
        return `${base} mt-4 mb-0 w-full min-h-[90px]`;
      case "footer":
        return `${base} my-4 w-full min-h-[90px]`;
      case "sidebar-left":
      case "sidebar-right":
        // Desktop only
        return "hidden xl:flex w-[160px] h-[600px] flex-shrink-0";
      case "mobile":
        // Mobile only sticky
        return "flex sm:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-t shadow-lg min-h-[50px] p-2";
      default:
        return base;
    }
  };

  const renderAd = () => {
    switch (provider) {
      case "adsense":
        return <AdsenseAd slotId={slotId} />;
      case "playwire":
        return <PlaywireAd slotId={slotId} />;
      default:
        return <EmptyAd />;
    }
  };

  return <div className={getContainerClasses()}>{renderAd()}</div>;
}
