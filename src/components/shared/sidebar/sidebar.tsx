"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    dataSidebarRoutes
} from "@/components/shared/sidebarRoutes/sidebarRoutes.data";
import { signOut } from "next-auth/react";

export function AppSidebar() {
    const handleLogout = async () => {
        await signOut({ redirect: false}); // Redirige a la página principal después de cerrar sesión
    };
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup />
                    <SidebarGroupLabel>Boutique Univalle</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dataSidebarRoutes.map((route) => (
                                <SidebarMenuItem key={route.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={route.url}>
                                            <route.icon />
                                            <span>{route.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <button onClick={handleLogout} className="logout-button">
                                Cerrar Sesión
                            </button>
                        </SidebarMenu>
                    </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
        </Sidebar>
    )
}