"use client"

import React, { useState, useEffect } from "react"
import WidgetWrapper from "@/components/WidgetWrapper"
import ThemeSwitch from "@/components/ThemeTwich"
import LanguageSwitch from "@/components/LanguageSwitch"
import SoundSwitch from "@/components/SoundSwitch"
import CommandSwitch from "@/components/CommandSwitch"
import BackToTop from "@/components/ui/back-to-top"
import CommandMenu from "@/components/ui/command-menu"
import { useTheme } from "@/context/theme-context"
import { useSoundContext } from "@/context/sound-context"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

export default function ClientControls() {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const { toggleTheme } = useTheme()
  const { toggleSound } = useSoundContext()
  const activeLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Global hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const target = e.target as HTMLElement | null
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)

      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
        return
      }

      if (isInput) return

      // Standalone single-key shortcuts
      if (e.key === "/" || e.key === "?") {
        e.preventDefault()
        setIsCommandOpen(true)
      } else if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggleTheme()
      } else if (e.key.toLowerCase() === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggleSound()
      } else if (e.key.toLowerCase() === "l" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const nextLocale = activeLocale === "en" ? "zh" : "en"
        const newPath = pathname.replace(/^\/(en|zh)/, `/${nextLocale}/`)
        router.replace(newPath, { scroll: false })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleTheme, toggleSound, activeLocale, pathname, router])

  return (
    <>
      <WidgetWrapper>
        <CommandSwitch onOpen={() => setIsCommandOpen(true)} />
        <ThemeSwitch />
        <LanguageSwitch />
        <SoundSwitch />
        <BackToTop />
      </WidgetWrapper>
      <CommandMenu isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  )
}
