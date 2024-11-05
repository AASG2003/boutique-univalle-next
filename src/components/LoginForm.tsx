"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email("Correo invalido"),
  password: z.string().min(8, "La contraseña es de minimo 8 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })
  const handleLogout = async () => {
    await signOut({ redirect: false}); // Redirige a la página principal después de cerrar sesión
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  useEffect(() => {
    if (session) {
      router.push("/protected/products");
    }
  }, [router, session])

  return (
    <div>
      {session ? (<button onClick={handleLogout} className="logout-button">
          Logout
        </button>) : (
          <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Inicio de Sesión</CardTitle>
            <CardDescription>Ingresa tu correo </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electronico</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="juanPerez@univalle.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" placeholder="Ingrese su contraseña" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Ingresar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>)}
    </div>
  )
}

export default LoginForm;