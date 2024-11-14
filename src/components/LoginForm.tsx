"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSession, signIn, signOut, SignInResponse } from "next-auth/react"
import { useEffect, useState } from "react"

import { Card, CardHeader, CardTitle,CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"


const formSchema = z.object({
  email: z.string().email("Correo invalido").min(1, "Campo Requerido"),
  password: z.string().min(8, "La contraseña es de minimo 8 caracteres").min(1, "Campo requerido"),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
      const res: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      console.log("hola")
      if(res?.error){
        setIsAlertOpen(true);
        setAlertMessage(res.error);
        setTimeout(() =>{
        setIsAlertOpen(false);
        }, 3000)
      }
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
          Cerrar Session
        </button>) : (
          <>
            <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Inicio de Sesión</CardTitle>
            </CardHeader>
            {
              isAlertOpen && (
                <div style={{margin:"10px"}}>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {alertMessage}
                    </AlertDescription>
                  </Alert>
                </div>
              )
            }
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
                          <Input id="email" placeholder="juanPerez@univalle.edu" {...field} />
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
          </Card>
        </>
      )}
    </div>
  )
}

export default LoginForm;