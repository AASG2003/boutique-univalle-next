"use client"
import { SessionProvider } from "next-auth/react"
import { Poppins } from "next/font/google";
import './globals.css'
import React from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "400", "500", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
    </html>
  )
}
