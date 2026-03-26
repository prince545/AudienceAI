"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const current = resolvedTheme ?? theme
  const isDark = current === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-9 w-9 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
      type="button"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}

