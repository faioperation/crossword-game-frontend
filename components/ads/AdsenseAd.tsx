"use client";

import { useEffect, useRef } from "react";
import { adConfig } from "@/config/ads";

type AdsenseAdProps = {
  slotId: string;
};

export function AdsenseAd({ slotId }: AdsenseAdProps) {
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only push once per component instance
    if (!isLoaded.current && slotId && adConfig.adsenseClient) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (e) {
        console.error("Adsense error", e);
      }
    }
  }, [slotId]);

  if (!slotId || !adConfig.adsenseClient) {
    return null; // Don't render if config is missing
  }

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client={adConfig.adsenseClient}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
