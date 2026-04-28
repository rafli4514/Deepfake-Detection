import { Link, useLocation } from "react-router-dom"
import { 
  FileVideo, 
  Settings, 
  LogOut, 
  Shield,
  ScanEye,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Deteksi Baru",
    url: "/dashboard",
    icon: ScanEye,
  },
  {
    title: "Riwayat Deteksi",
    url: "/dashboard/history",
    icon: FileVideo,
  },
  {
    title: "Pengaturan",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-background/80 backdrop-blur-md">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
             <Shield size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white leading-none">Scanner</span>
            <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mt-1">Deepfake AI</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      className={`h-12 px-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-semibold' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon size={20} className={isActive ? 'text-blue-600 dark:text-blue-400' : ''} />
                          <span>{item.title}</span>
                        </div>
                        {isActive && <ChevronRight size={14} className="animate-in slide-in-from-left-2 duration-300" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className="h-12 px-4 rounded-xl text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <Link to="/" className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="font-medium">Keluar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}