"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

import {
  playProceduralPop,
  playProceduralClick,
  playProceduralChime,
  playProceduralWhoosh,
  playProceduralSwitch,
} from "@/lib/sound-effects"

type SoundContextType = {
  soundEnabled: boolean
  toggleSound: () => void
  setSoundEnabled: (enabled: boolean) => void
  playPop: (volume?: number) => void
  playClick: (volume?: number) => void
  playChime: (volume?: number) => void
  playWhoosh: (volume?: number) => void
  playSwitch: (volume?: number) => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Default is sound muted
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem("sound_enabled")
    if (stored !== null) {
      setSoundEnabled(stored === "true")
    }
  }, [])

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev
      window.localStorage.setItem("sound_enabled", String(next))
      if (next) {
        playProceduralSwitch(0.08)
      }
      return next
    })
  }

  const handleSetSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled)
    window.localStorage.setItem("sound_enabled", String(enabled))
  }

  const playPop = React.useCallback(
    (volume?: number) => {
      if (soundEnabled) playProceduralPop(volume)
    },
    [soundEnabled]
  )

  const playClick = React.useCallback(
    (volume?: number) => {
      if (soundEnabled) playProceduralClick(volume)
    },
    [soundEnabled]
  )

  const playChime = React.useCallback(
    (volume?: number) => {
      if (soundEnabled) playProceduralChime(volume)
    },
    [soundEnabled]
  )

  const playWhoosh = React.useCallback(
    (volume?: number) => {
      if (soundEnabled) playProceduralWhoosh(volume)
    },
    [soundEnabled]
  )

  const playSwitch = React.useCallback(
    (volume?: number) => {
      if (soundEnabled) playProceduralSwitch(volume)
    },
    [soundEnabled]
  )

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        setSoundEnabled: handleSetSoundEnabled,
        playPop,
        playClick,
        playChime,
        playWhoosh,
        playSwitch,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundContext() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSoundContext must be used within SoundContextProvider")
  }
  return context
}
