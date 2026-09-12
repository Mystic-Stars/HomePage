"use client"

import React from "react"
import { FiCommand } from "react-icons/fi"
import { useLocale } from "next-intl"

interface CommandSwitchProps {
  onOpen: () => void
}

export default function CommandSwitch({ onOpen }: CommandSwitchProps) {
  const activeLocale = useLocale()
  const title = activeLocale === "zh" ? "快捷指令 (⌘K / Ctrl+K)" : "Command Palette (⌘K / Ctrl+K)"

  return (
    <button
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center hover:scale-[1.15] active:scale-90 transition-transform text-gray-700 dark:text-gray-200"
      onClick={onOpen}
      title={title}
      aria-label={title}
    >
      <FiCommand className="text-base" />
    </button>
  )
}
