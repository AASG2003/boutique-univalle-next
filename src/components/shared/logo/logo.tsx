import Link from "next/link";
import Image from "next/image";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



export function Logo() {

  return(

    <Link href="/">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div
              className="flex aspect-square size-8 items-center justify-center rounded-lg">
              {/*<HomeIcon className="size-4"/>*/}
              <div className="">
                <Image src="/UnivalleLogo.png" alt="Logo Univalle" width={50} height={50}/>
              </div>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Boutique Univalle
                </span>
              <span className="truncate text-xs">CMS</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Link>
  )
}