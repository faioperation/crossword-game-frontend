"use client";

import { Home, Puzzle, FileText, Trophy, BarChart3, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Puzzle Management", url: "/admin/puzzle-management", icon: Puzzle },
  { title: "Entries", url: "/admin/entries", icon: FileText },
  { title: "Winner Management", url: "/admin/winners", icon: Trophy },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Puzzle className="h-6 w-6" />
          </div>
          <span className="font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">Admin Panel</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} className="py-7">
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5 text-xl" />
                      <span className="text-xl font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-5">
              <Link href="/" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-5 w-5" />
                <span className="text-base font-medium">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
