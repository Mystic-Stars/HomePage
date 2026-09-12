"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiArrowUp } from "react-icons/fi"
import { useLocale } from "next-intl"
import useSound from "use-sound"
import { useSoundContext } from "@/context/sound-context"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const activeLocale = useLocale()
  const { soundEnabled } = useSoundContext()
  const [playPop] = useSound("/bubble.wav", { volume: 0.4, soundEnabled })

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(1, currentScrollY / scrollHeight))
      }
      setIsVisible(currentScrollY > 350)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (soundEnabled) playPop()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const title = activeLocale === "zh" ? "回到顶部" : "Back to top"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          title={title}
          aria-label={title}
          className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-[1.15] active:scale-90 transition-transform focus:outline-none"
        >
          {/* Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 p-1 pointer-events-none" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              className="stroke-gray-200/50 dark:stroke-gray-700/50"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              className="stroke-gray-800 dark:stroke-gray-100 transition-all duration-100"
              strokeWidth="2"
              strokeDasharray={94.2}
              strokeDashoffset={94.2 * (1 - scrollProgress)}
              strokeLinecap="round"
            />
          </svg>
          <FiArrowUp className="w-4 h-4 z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
