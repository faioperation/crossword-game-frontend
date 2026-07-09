"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/utils";

export function TopNavbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; role: string; avatar?: string } | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(userCookie);
          if (typeof window !== 'undefined') {
            const localAvatar = localStorage.getItem("userAvatar");
            if (localAvatar) {
              parsedUser.avatar = localAvatar;
            }
          }
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse user cookie", e);
        }
      }
    };
    
    loadUser();
    window.addEventListener("profileUpdated", loadUser);
    return () => window.removeEventListener("profileUpdated", loadUser);
  }, []);
  const router = useRouter();
  
  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("user", { path: "/" });
    toast.success("Logged out successfully!");
    router.push("/");
    router.refresh();
  };
  
  // Basic title formatting based on the route
  const getTitle = () => {
    if (pathname === '/admin/dashboard') return 'Dashboard';
    if (pathname === '/admin/puzzle-management') return 'Puzzle Management';
    if (pathname === '/admin/entries') return 'Entries';
    if (pathname === '/admin/winners') return 'Winner Management';
    if (pathname === '/admin/analytics') return 'Analytics';
    if (pathname === '/admin/settings') return 'Settings';
    return 'Admin Panel';
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white sticky top-0 z-10 w-full justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <div className="w-px h-4 bg-slate-200 mx-2" />
        <h1 className="text-lg font-semibold text-slate-800">{getTitle()}</h1>
      </div>
      
      <div className="flex items-center gap-4 mr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full outline-none  focus-visible:ring-2 focus-visible:ring-slate-400 transition-transform hover:scale-105">
              <Avatar className="h-11 w-11 border-2 border-slate-300 ring-2 ring-slate-100 ring-offset-2 shadow-sm">
                <AvatarImage src={getImageUrl(user?.avatar) || ""} alt={user?.name || "Admin"} />
                <AvatarFallback className="bg-slate-100 text-slate-600 ">
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email || "Loading..."}</p>
                <p className="text-xs leading-none text-slate-500">{user?.name || "Administrator"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-white focus:bg-red-400 focus:text-red-700 cursor-pointer flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
