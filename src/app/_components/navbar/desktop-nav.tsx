"use client"

import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import Logo from "./logo"
import { INavigation } from "./navbar"
import ThemeSwitch from "./theme-switch"

export default function DesktopNav({ navigation }: { navigation: INavigation[] }) {
  const pathname = usePathname()

  return (
    <>
      <div className="hidden items-center lg:flex lg:gap-x-6">
        <Logo />
        {navigation.map((item) => (
          <Link
            key={`menu_lg_${item.name}`}
            href={item.href as Route}
            className={cn(
              "text-md hover:text-foreground/80 transition-colors",
              pathname === item.href
                ? "text-foreground font-bold"
                : "text-foreground/60",
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <ThemeSwitch />
      </div>
    </>
  )
}
