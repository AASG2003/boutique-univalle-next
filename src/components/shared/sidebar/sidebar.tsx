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

export function AppSidebar() {
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
        </Sidebar>
    )
}