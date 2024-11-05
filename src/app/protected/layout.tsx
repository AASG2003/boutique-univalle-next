import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
// import { Navbar } from '@/components/Navbar';
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
        return notFound()
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            {/*<div className="flex flex-col min-h-screen">*/}

                {/*<Navbar/>*/}
                <main className="flex-grow">
                    <SidebarTrigger />
                    {children}
                </main>
            {/*</div>*/}
        </SidebarProvider>

    )
}