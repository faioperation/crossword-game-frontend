import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
        
        <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 relative">
          <FileQuestion className="h-12 w-12 text-slate-400" />
          <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md transform rotate-12">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or you might have mistyped the URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button 
            asChild
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
