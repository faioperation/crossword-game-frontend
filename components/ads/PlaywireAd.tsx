"use client";

export function PlaywireAd({ slotId }: { slotId: string }) {
  return (
    <div className="w-full h-full min-h-[90px] flex items-center justify-center bg-blue-50/50 border border-blue-100 rounded-lg text-blue-400/50 text-xs">
      Playwire Placeholder ({slotId})
    </div>
  );
}
