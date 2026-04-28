import { Outlet, Link } from "react-router-dom";
import { AppSidebar } from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

export default function DashboardLayout() {

  return (
    <SidebarProvider>
      <div className="flex">
        
      <AppSidebar />
      </div>
      <main className="flex-1 min-h-screen bg-gray-50/50 dark:bg-gray-950/50">
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6 sticky top-0 z-10">
          <SidebarTrigger />
          <div className="ml-auto">
            <ModeToggle />
        </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
      
    </SidebarProvider>
  );
}