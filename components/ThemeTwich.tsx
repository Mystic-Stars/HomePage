"use client"

import { useTheme } from "@/context/theme-context"
import { useSoundContext } from "@/context/sound-context"
import React from "react"
import { BsDisplay, BsMoon, BsSun } from "react-icons/bs"
import { useLocale } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const { playClick } = useSoundContext()
  const activeLocale = useLocale()

  const getTitle = () => {
    if (theme === "system") {
      return activeLocale === "zh" ? "主题：跟随系统" : "Theme: System"
    }
    if (theme === "dark") {
      return activeLocale === "zh" ? "主题：深色模式" : "Theme: Dark"
    }
    return activeLocale === "zh" ? "主题：浅色模式" : "Theme: Light"
  }

  const renderIcon = () => {
    if (theme === "system") {
      return <BsDisplay className="text-base" />
    }
    if (theme === "dark") {
      return <BsMoon className="text-base" />
    }
    return <BsSun className="text-base" />
  }

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || rect.left + rect.width / 2
    const y = e.clientY || rect.top + rect.height / 2
    toggleTheme({ x, y })
  }

  return (
    <button
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center hover:scale-[1.15] active:scale-90 transition-transform text-gray-700 dark:text-gray-200 overflow-hidden relative focus:outline-none"
      onClick={handleToggle}
      title={getTitle()}
      aria-label={getTitle()}
    >
      <span className="sr-only">{getTitle()}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -8, opacity: 0, rotate: -40, scale: 0.75 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 8, opacity: 0, rotate: 40, scale: 0.75 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {renderIcon()}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
