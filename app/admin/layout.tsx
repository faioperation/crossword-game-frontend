import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { TopNavbar } from "@/components/admin/top-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col bg-slate-50">
        <TopNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
