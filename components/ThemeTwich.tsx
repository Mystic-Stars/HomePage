"use client"

import { useTheme } from "@/context/theme-context"
import React from "react"
import { BsDisplay, BsMoon, BsSun } from "react-icons/bs"
import { useLocale } from "next-intl"

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
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

  return (
    <button
      className="w-[2.5rem] h-[2.5rem] bg-opacity-80 flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all text-gray-700 dark:text-gray-200"
      onClick={toggleTheme}
      title={getTitle()}
      aria-label={getTitle()}
    >
      <span className="sr-only">{getTitle()}</span>
      {renderIcon()}
    </button>
  )
}
