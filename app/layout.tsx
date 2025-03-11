import type React from "react"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"], // Only using supported subsets
})

export const metadata = {
  title: "Siwa Palm - Premium Dates from Siwa Oasis",
  description: "Leading company in growing and producing the finest dates since 2001",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'