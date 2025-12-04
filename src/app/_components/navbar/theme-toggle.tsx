"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-row items-center space-x-1 rounded-full border p-1">
      {[
        { name: "light", icon: SunIcon, label: "Light theme" },
        { name: "system", icon: LaptopMinimalIcon, label: "System theme" },
        { name: "dark", icon: MoonIcon, label: "Dark theme" },
      ].map(({ name, icon: Icon, label }) => (
        <button
          key={name}
          className={cn("rounded-full p-1", theme === name && "bg-muted-foreground/20")}
          onClick={() => setTheme(name)}
          role="radio"
          aria-checked={theme === name}
          aria-label={label}
        >
          <Icon className="size-4 transition-all" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
