import type { Metadata } from "next"

import { cn } from "@/lib/utils"
import { GeistSans } from "geist/font/sans"

import Navbar from "./_components/navbar/navbar"
import Providers from "./_components/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nextjs app with pagination",
  description: "Demo pagination",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background antialiased", GeistSans.className)}
      >
        <div className="relative flex min-h-screen flex-col">
          <Providers>
            <Navbar />
            <div className="container mx-auto max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </Providers>
        </div>
      </body>
    </html>
  )
}
