// app/login/page.tsx
import {LoginForm} from "@/components/shared/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <section className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-12 lg:px-12">
        <LoginForm/>
      </section>
      <section className="hidden lg:block w-1/2 bg-black">
        {/*<img*/}
        {/*  alt="Login"*/}
        {/*  className="h-full w-full object-cover"*/}
        {/*  height="1080"*/}
        {/*  src="image"*/}
        {/*  width="1920"*/}
        {/*/>*/}
      </section>
    </div>

  )
}
