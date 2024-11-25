import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar";

  const titles: { [key: string]: string } = {
    "/": "Inicio",
    "/protected/departments": "Departamentos",
    "/protected/products": "Productos",
  };

  const getPageTitle = (pathname: string): string => {
    return titles[pathname] || "Página Desconocida";
  };

export default async function MeLayout({children, params,}: {
  children: React.ReactNode;
  params: { pathname: string };
}) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login");
  }

  const pathname = params.pathname || "";
  const pageTitle = getPageTitle(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-grow">
          <Toaster />
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">
                      CMS
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Productos</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
