"use client"

import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Logo from "./logo"
import { INavigation } from "./navbar"
import { ThemeToggle } from "./theme-toggle"

export default function MobileNav({ navigation }: { navigation: INavigation[] }) {
  const pathname = usePathname()
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <div className="flex grow items-center justify-between lg:hidden">
      <Logo />
      <div className="flex items-center">
        <ThemeToggle />
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="fixed inset-y-0 right-0 w-full overflow-y-auto border-0 sm:border-l-2">
            <SheetHeader>
              <SheetTitle className="flex justify-start">
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto py-6">
              <ul className="flex flex-col gap-1 px-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <SheetClose asChild>
                      <Link
                        href={item.href as Route}
                        className={cn(
                          "hover:bg-accent flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
