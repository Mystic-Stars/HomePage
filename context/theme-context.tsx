"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import useSound from "use-sound"
import { useSoundContext } from "./sound-context"

export type Theme = "system" | "light" | "dark"

type ThemeContextType = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

type ThemeContextProviderProp = {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const ThemeContextProvider = ({ children }: ThemeContextProviderProp) => {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const { soundEnabled } = useSoundContext()

  const [playLight] = useSound("/light-on.mp3", {
    volume: 0.5,
    soundEnabled,
  })
  const [playDark] = useSound("/light-off.mp3", {
    volume: 0.5,
    soundEnabled,
  })

  // Apply theme to document
  const applyResolvedTheme = (resolved: "light" | "dark") => {
    setResolvedTheme(resolved)
    if (resolved === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as Theme | null
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme)
      applyResolvedTheme(savedTheme)
    } else {
      // Default to "system"
      setThemeState("system")
      applyResolvedTheme(systemDark ? "dark" : "light")
    }
  }, [])

  // Listen to system preference changes when theme is "system"
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyResolvedTheme(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleSystemChange)
    return () => mediaQuery.removeEventListener("change", handleSystemChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    window.localStorage.setItem("theme", newTheme)

    let nextResolved: "light" | "dark"
    if (newTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      nextResolved = isDark ? "dark" : "light"
    } else {
      nextResolved = newTheme
    }

    applyResolvedTheme(nextResolved)

    if (soundEnabled) {
      if (nextResolved === "dark") {
        playDark()
      } else {
        playLight()
      }
    }
  }

  const toggleTheme = () => {
    let nextTheme: Theme
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (theme === "system") {
      // Flip from current resolved theme to the opposite
      nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    } else if (theme === "dark") {
      // If system is dark: system -> light -> dark -> system
      // If system is light: system -> dark -> light -> system
      nextTheme = systemIsDark ? "system" : "light"
    } else {
      // theme === "light"
      nextTheme = systemIsDark ? "dark" : "system"
    }

    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider")
  }
  return context
}

export default ThemeContextProvider
