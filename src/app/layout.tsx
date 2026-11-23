import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"

import type { ReactNode } from "react"

import {
  SITE_BASE_URL,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site"
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
  metadataBase: SITE_BASE_URL,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <html
      lang={SITE_LANGUAGE}
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
          {modal}
        </Providers>
      </body>
    </html>
  )
}
