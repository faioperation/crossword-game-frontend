"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

export function TopNavbar() {
  const pathname = usePathname();
  
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
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
          <div className="flex flex-col items-end">
            <span className="text-xs font-medium leading-none">Admin User</span>
            <span className="text-[10px] text-slate-500 mt-0.5">admin@example.com</span>
          </div>
          <UserCircle className="h-8 w-8 text-slate-600" />
        </div>
      </div>
    </header>
  );
}
