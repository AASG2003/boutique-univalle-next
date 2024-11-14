// app/login/page.tsx
import {LoginForm} from "@/components/shared/loginForm";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <section className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-12 lg:px-12">
        <LoginForm/>
      </section>
      <section className="hidden lg:block w-1/2 ">
        <div
          className="relative flex flex-col h-screen w-full items-center justify-center overflow-hidden border bg-background p-20 md:shadow-xl">

          <p
            className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-black dark:text-white">
            Boutique Univalle

          </p>

          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
            )}
          />
        </div>
      </section>
    </div>

  )
}
