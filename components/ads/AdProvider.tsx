"use client";

import Script from "next/script";
import { adConfig } from "@/config/ads";

export function AdProvider() {
  if (adConfig.provider === "adsense" && adConfig.adsenseClient) {
    return (
      <Script
        id="adsense-init"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.adsenseClient}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    );
  }

  // Add Playwire or other provider scripts here in the future
  return null;
}
