"use client"
import { SessionProvider } from "next-auth/react"
import './globals.css' // Asegúrate de tener tus estilos globales

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
