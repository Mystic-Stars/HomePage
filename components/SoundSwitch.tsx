"use client"

import React from "react"
import { useSoundContext } from "@/context/sound-context"
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs"
import { useLocale } from "next-intl"

export default function SoundSwitch() {
  const { soundEnabled, toggleSound } = useSoundContext()
  const activeLocale = useLocale()

  const getTitle = () => {
    if (activeLocale === "zh") {
      return soundEnabled
        ? "音效：已开启（点击静音）"
        : "音效：已静音（点击开启）"
    }
    return soundEnabled
      ? "Sound: Enabled (Click to mute)"
      : "Sound: Muted (Click to enable)"
  }

  return (
    <button
      className="w-[2.5rem] h-[2.5rem] bg-opacity-80 flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all text-gray-700 dark:text-gray-200"
      onClick={toggleSound}
      title={getTitle()}
      aria-label={getTitle()}
    >
      <span className="sr-only">{getTitle()}</span>
      {soundEnabled ? (
        <BsVolumeUp className="text-lg" />
      ) : (
        <BsVolumeMute className="text-lg text-gray-400 dark:text-gray-500" />
      )}
    </button>
  )
}
