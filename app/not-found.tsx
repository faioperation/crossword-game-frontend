import { PublicLayout } from "@/components/public/PublicLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home, Gamepad2 } from "lucide-react";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8">
          <SearchX className="w-12 h-12 text-slate-400" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-4">
          Page not found
        </h2>
        
        <p className="text-slate-500 max-w-md mb-10 text-lg">
          We couldn't find the page you're looking for. It might have been moved, or the link might be broken.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full font-bold shadow-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white">
              <Gamepad2 className="w-5 h-5" />
              Play Today's Puzzle
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full font-bold text-slate-700">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
