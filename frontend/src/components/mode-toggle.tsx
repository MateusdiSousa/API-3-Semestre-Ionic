import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "./theme.provider"
import { Switch } from "./ui/switch"

export function ModeToggle() {
  const { theme ,setTheme } = useTheme()
  
  const toggleTheme = () => {
    if (theme == "dark") {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div onClick={toggleTheme} className="flex items-center justify-between w-full absolute bottom-5 bg-white">
      <Switch />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black" />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}