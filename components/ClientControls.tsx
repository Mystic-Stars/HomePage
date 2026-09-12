"use client"

import React, { useState, useEffect } from "react"
import WidgetWrapper from "@/components/WidgetWrapper"
import ThemeSwitch from "@/components/ThemeTwich"
import LanguageSwitch from "@/components/LanguageSwitch"
import SoundSwitch from "@/components/SoundSwitch"
import CommandSwitch from "@/components/CommandSwitch"
import BackToTop from "@/components/ui/back-to-top"
import CommandMenu from "@/components/ui/command-menu"
import KeyboardShortcutsModal from "@/components/ui/keyboard-shortcuts-modal"
import MatrixTerminalModal from "@/components/ui/matrix-terminal-modal"
import { initConsoleEasterEgg, listenKonamiCode } from "@/lib/console-easter-egg"
import { useTheme } from "@/context/theme-context"
import { useSoundContext } from "@/context/sound-context"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

export default function ClientControls() {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [terminalMode, setTerminalMode] = useState<"terminal" | "rainOnly">("terminal")

  const { toggleTheme } = useTheme()
  const { toggleSound, playClick, playSwitch } = useSoundContext()
  const activeLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize F12 Console Easter Egg & Konami Code Listener
  useEffect(() => {
    initConsoleEasterEgg((mode = "terminal") => {
      setTerminalMode(mode)
      setIsTerminalOpen(true)
    })

    const cleanupKonami = listenKonamiCode(() => {
      setTerminalMode("terminal")
      setIsTerminalOpen(true)
    })

    return () => {
      cleanupKonami()
    }
  }, [])

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
      if (e.key === "?") {
        e.preventDefault()
        setIsShortcutsOpen((prev) => !prev)
      } else if (e.key === "/") {
        e.preventDefault()
        setIsCommandOpen(true)
      } else if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        playClick()
        toggleTheme()
      } else if (e.key.toLowerCase() === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggleSound()
      } else if (e.key.toLowerCase() === "l" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        playSwitch()
        const nextLocale = activeLocale === "en" ? "zh" : "en"
        const newPath = pathname.replace(/^\/(en|zh)/, `/${nextLocale}/`)
        router.replace(newPath, { scroll: false })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleTheme, toggleSound, playClick, playSwitch, activeLocale, pathname, router])

  return (
    <>
      <WidgetWrapper>
        <CommandSwitch onOpen={() => setIsCommandOpen(true)} />
        <ThemeSwitch />
        <LanguageSwitch />
        <SoundSwitch />
        <BackToTop />
      </WidgetWrapper>
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenTerminal={(mode) => {
          setTerminalMode(mode || "terminal")
          setIsTerminalOpen(true)
        }}
      />
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onOpenCommandMenu={() => setIsCommandOpen(true)}
      />
      <MatrixTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        initialMode={terminalMode}
      />
    </>
  )
}
