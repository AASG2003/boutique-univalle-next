import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function MeLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser()
    console.log(session)
    if (!session) {
        return notFound()
    }
    return (
        <>
            <div>
            {children}
            </div>
        </>
    )
}