"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HeaderAuth() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const token = Cookies.get("accessToken");
    const userCookie = Cookies.get("user");
    
    if (token && userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch (e) {
        console.error("Failed to parse user cookie", e);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (!isMounted) {
    // Show a small placeholder to prevent layout shift while checking cookies
    return <div className="w-24 h-10 flex-shrink-0"></div>;
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 rounded-full border-slate-200 shadow-sm h-10 px-4 transition-all hover:bg-slate-50">
            <User className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-700 hidden sm:inline">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 text-sm font-semibold text-slate-900 border-b mb-1 sm:hidden">
            {user.name}
          </div>
          {user.role === "SYSTEM_OWNER" && (
            <DropdownMenuItem onClick={() => router.push("/admin/dashboard")} className="cursor-pointer font-medium">
              Dashboard
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 font-medium focus:text-red-600 focus:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-3 text-base text-slate-600 font-medium flex-shrink-0">
      <span className="hidden lg:inline text-sm">Have an account?</span>
      <Link href="/login">
        <Button size="sm" className="bg-gradient-to-r from-[#D4AF37] to-[#e5c04b] hover:from-[#c5a030] hover:to-[#d4af37] text-white rounded-full px-5 h-8 sm:h-10 text-xs sm:text-sm font-bold shadow-md border border-yellow-400/50 transition-all hover:scale-105">
          Log In
        </Button>
      </Link>
    </div>
  );
}
