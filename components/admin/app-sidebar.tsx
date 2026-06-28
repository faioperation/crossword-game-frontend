"use client";

import { Home, Puzzle, FileText, Trophy, BarChart3, Settings, LogOut, Dices, History, Gift } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

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

const mainNavItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Puzzle Management", url: "/admin/puzzle-management", icon: Puzzle },
  { title: "Entries", url: "/admin/entries", icon: FileText },
];

const winnerNavItems = [
  { title: "Draw Winner", url: "/admin/winners/draw", icon: Dices },
  { title: "Winner History", url: "/admin/winners/history", icon: History },
  { title: "Prize Management", url: "/admin/prize-management", icon: Gift },
];

const systemNavItems = [
  // { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    toast.loading("Logging out securely...", { id: "logout" });
    setTimeout(() => {
      toast.dismiss("logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    }, 1200);
  };

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
          {/* <SidebarGroupLabel>Main</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url || pathname.startsWith(item.url + '/')} className="py-7">
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

        <SidebarGroup>
          {/* <SidebarGroupLabel>Winner Management</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {winnerNavItems.map((item) => (
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

        <SidebarGroup>
          {/* <SidebarGroupLabel>System</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {systemNavItems.map((item) => (
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
              <button onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full flex items-center justify-start text-left cursor-pointer">
                <LogOut className="h-5 w-5" />
                <span className="text-base font-medium">Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
