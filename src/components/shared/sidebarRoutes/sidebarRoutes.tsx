import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";

import { dataSidebarRoutes } from "@/components/shared/sidebarRoutes/sidebarRoutes.data";

export function SidebarRoutes() {
  return(
    <SidebarGroup>
      <SidebarGroupLabel>Administración</SidebarGroupLabel>
      <SidebarMenu>
        {dataSidebarRoutes.map((route) => (
          <SidebarMenuItem key={route.title}>
            <SidebarMenuButton tooltip={route.title}>
              {route.icon && <route.icon />}
              <span>
                <a href={route.url}>
                  {route.title}
                </a>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}