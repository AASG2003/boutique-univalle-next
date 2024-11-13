import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"

import React from "react";
import {
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";
import { AppSidebar
} from "@/components/shared/sidebar";


export default async function MeLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser()
    console.log(session)
    if (!session) {
        redirect("/login")
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            {/*<div className="flex flex-col min-h-screen">*/}

                {/*<Navbar/>*/}
                <main className="flex-grow">
                    <SidebarTrigger className="pl-4"/>
                    <Toaster />
                    {children}
                </main>
            {/*</div>*/}
        </SidebarProvider>

    )
}