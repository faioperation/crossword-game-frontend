"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in a real app
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
        
        <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Oops! Something went wrong
        </h1>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          We encountered an unexpected error while trying to process your request. 
          Don't worry, our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button 
            onClick={() => reset()} 
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
        
        {/* Optional: Show error message in development mode */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-red-50 rounded-xl text-left w-full overflow-auto">
            <p className="text-sm font-mono text-red-800 text-xs">
              {error.message || "Unknown Error"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
