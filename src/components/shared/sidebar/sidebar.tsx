"use client";

import {
  Sidebar,
  SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react";
import {Logo} from "@/components/shared/logo/logo";
import React from "react";
import {SidebarRoutes} from "@/components/shared/sidebarRoutes";
import {LogOutIcon} from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const handleLogout = async () => {
    await signOut({ redirect: false}); // Redirige a la página principal después de cerrar sesión
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarRoutes />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton onClick={handleLogout} className="hover:bg-red-500 hover:text-white" tooltip="Salir">
            <LogOutIcon />
            Salir
          </SidebarMenuButton>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar>
  )
}