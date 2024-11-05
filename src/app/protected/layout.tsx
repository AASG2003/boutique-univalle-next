import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
import { Navbar } from '@/components/Navbar';

export default async function MeLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser()
    console.log(session)
    if (!session) {
        return notFound()
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
        </div>
    )
}