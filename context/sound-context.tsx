"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type SoundContextType = {
  soundEnabled: boolean
  toggleSound: () => void
  setSoundEnabled: (enabled: boolean) => void
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
      return next
    })
  }

  const handleSetSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled)
    window.localStorage.setItem("sound_enabled", String(enabled))
  }

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        setSoundEnabled: handleSetSoundEnabled,
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
