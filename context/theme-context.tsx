"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { flushSync } from "react-dom"
import useSound from "use-sound"
import { useSoundContext } from "./sound-context"

export type Theme = "system" | "light" | "dark"

export type ThemeTransitionCoords = { x: number; y: number }

type ThemeContextType = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  toggleTheme: (coords?: ThemeTransitionCoords | React.MouseEvent) => void
  setTheme: (theme: Theme, coords?: ThemeTransitionCoords | React.MouseEvent) => void
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

  const getCoords = (
    coords?: ThemeTransitionCoords | React.MouseEvent
  ): { x: number; y: number } => {
    if (!coords) {
      return {
        x: typeof window !== "undefined" ? window.innerWidth - 48 : 0,
        y: typeof window !== "undefined" ? window.innerHeight - 48 : 0,
      }
    }

    if ("clientX" in coords && "clientY" in coords) {
      const mouseEvent = coords as React.MouseEvent
      if (mouseEvent.clientX !== 0 || mouseEvent.clientY !== 0) {
        return { x: mouseEvent.clientX, y: mouseEvent.clientY }
      }
    }

    if ("x" in coords && "y" in coords) {
      return { x: coords.x, y: coords.y }
    }

    return {
      x: typeof window !== "undefined" ? window.innerWidth - 48 : 0,
      y: typeof window !== "undefined" ? window.innerHeight - 48 : 0,
    }
  }

  const setTheme = (
    newTheme: Theme,
    coords?: ThemeTransitionCoords | React.MouseEvent
  ) => {
    let nextResolved: "light" | "dark"
    if (newTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      nextResolved = isDark ? "dark" : "light"
    } else {
      nextResolved = newTheme
    }

    if (soundEnabled) {
      if (nextResolved === "dark") {
        playDark()
      } else {
        playLight()
      }
    }

    // If visual resolved theme is not changing (e.g. dark -> system when system is dark)
    if (nextResolved === resolvedTheme) {
      setThemeState(newTheme)
      window.localStorage.setItem("theme", newTheme)
      return
    }

    // Check View Transitions API support
    const doc = document as any
    const isAppearanceTransition =
      typeof document !== "undefined" &&
      typeof doc.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!isAppearanceTransition) {
      setThemeState(newTheme)
      window.localStorage.setItem("theme", newTheme)
      applyResolvedTheme(nextResolved)
      return
    }

    const { x, y } = getCoords(coords)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    try {
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          setThemeState(newTheme)
          window.localStorage.setItem("theme", newTheme)
          applyResolvedTheme(nextResolved)
        })
      })

      if (transition && transition.ready) {
        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]

          document.documentElement.animate(
            {
              clipPath,
            },
            {
              duration: 450,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        }).catch(() => {})
      }
    } catch {
      setThemeState(newTheme)
      window.localStorage.setItem("theme", newTheme)
      applyResolvedTheme(nextResolved)
    }
  }

  const toggleTheme = (coords?: ThemeTransitionCoords | React.MouseEvent) => {
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

    setTheme(nextTheme, coords)
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
