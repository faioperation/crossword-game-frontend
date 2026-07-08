export const adConfig = {
  provider: process.env.NEXT_PUBLIC_AD_PROVIDER || "empty",
  slots: {
    top: process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT || "",
    mid: process.env.NEXT_PUBLIC_ADSENSE_MID_SLOT || "",
    "sidebar-left": process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_LEFT_SLOT || "",
    "sidebar-right": process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_RIGHT_SLOT || "",
    footer: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || "",
    mobile: process.env.NEXT_PUBLIC_ADSENSE_MOBILE_SLOT || "",
  },
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
};
