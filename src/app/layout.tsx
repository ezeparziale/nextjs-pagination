import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"

import { cn } from "cn"

import Navbar from "./_components/navbar/navbar"
import Providers from "./_components/providers"
import "./globals.css"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nextjs app with pagination",
  description: "Demo pagination",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "bg-background",
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        geistHeading.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <div className="container mx-auto max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
