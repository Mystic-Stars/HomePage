"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { useTheme } from "@/context/theme-context"
import { useSoundContext } from "@/context/sound-context"
import { usePathname, useRouter } from "next/navigation"
import {
  FiSearch,
  FiMoon,
  FiVolume2,
  FiGlobe,
  FiHelpCircle,
  FiCornerDownLeft,
  FiCommand,
} from "react-icons/fi"

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenCommandMenu: () => void
}

interface ShortcutItem {
  id: string
  keys: string[]
  title: string
  subtitle?: string
  icon: React.ReactNode
  category: "nav" | "prefs" | "general"
  action: () => void
}

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
  onOpenCommandMenu,
}: KeyboardShortcutsModalProps) {
  const t = useTranslations("ShortcutsModal")
  const activeLocale = useLocale()
  const isZh = activeLocale === "zh"
  const { toggleTheme } = useTheme()
  const { toggleSound, playClick, playWhoosh, playSwitch } = useSoundContext()
  const router = useRouter()
  const pathname = usePathname()

  const [pressedId, setPressedId] = useState<string | null>(null)

  const handleToggleTheme = useCallback(() => {
    playClick()
    toggleTheme()
  }, [playClick, toggleTheme])

  const handleToggleSound = useCallback(() => {
    toggleSound()
  }, [toggleSound])

  const handleToggleLanguage = useCallback(() => {
    playSwitch()
    const nextLocale = activeLocale === "en" ? "zh" : "en"
    const newPath = pathname.replace(/^\/(en|zh)/, `/${nextLocale}/`)
    router.replace(newPath, { scroll: false })
  }, [activeLocale, pathname, router, playSwitch])

  const handleOpenSearch = useCallback(() => {
    onClose()
    setTimeout(() => {
      onOpenCommandMenu()
    }, 100)
  }, [onClose, onOpenCommandMenu])

  const shortcutItems: ShortcutItem[] = useMemo(
    () => [
      {
        id: "cmd_k",
        keys: ["⌘", "K"],
        title: isZh ? "全局搜索与指令面板" : "Command & Search Palette",
        subtitle: isZh ? "唤出命令面板" : "Open Palette",
        icon: <FiSearch className="w-3.5 h-3.5" />,
        category: "nav",
        action: handleOpenSearch,
      },
      {
        id: "slash",
        keys: ["/"],
        title: isZh ? "快捷搜索" : "Quick Search",
        subtitle: isZh ? "打开命令菜单" : "Open Menu",
        icon: <FiCommand className="w-3.5 h-3.5" />,
        category: "nav",
        action: handleOpenSearch,
      },
      {
        id: "theme",
        keys: ["T"],
        title: isZh ? "切换色彩主题" : "Toggle Color Theme",
        subtitle: isZh ? "浅色 / 深色 / 系统" : "Light / Dark / System",
        icon: <FiMoon className="w-3.5 h-3.5" />,
        category: "prefs",
        action: handleToggleTheme,
      },
      {
        id: "sound",
        keys: ["M"],
        title: isZh ? "切换交互音效" : "Toggle Sound Effects",
        subtitle: isZh ? "开启 / 静音" : "On / Mute",
        icon: <FiVolume2 className="w-3.5 h-3.5" />,
        category: "prefs",
        action: handleToggleSound,
      },
      {
        id: "lang",
        keys: ["L"],
        title: isZh ? "切换页面语言" : "Switch Language",
        subtitle: isZh ? "中文 / English" : "ZH / EN",
        icon: <FiGlobe className="w-3.5 h-3.5" />,
        category: "prefs",
        action: handleToggleLanguage,
      },
      {
        id: "help",
        keys: ["?"],
        title: isZh ? "快捷键速查面板" : "Keyboard Shortcuts",
        subtitle: isZh ? "打开或关闭本面板" : "Toggle this panel",
        icon: <FiHelpCircle className="w-3.5 h-3.5" />,
        category: "general",
        action: onClose,
      },
      {
        id: "esc",
        keys: ["ESC"],
        title: isZh ? "关闭弹窗与浮层" : "Close Modal & Overlays",
        subtitle: isZh ? "退出当前界面" : "Dismiss",
        icon: <FiCornerDownLeft className="w-3.5 h-3.5" />,
        category: "general",
        action: onClose,
      },
    ],
    [
      isZh,
      handleOpenSearch,
      handleToggleTheme,
      handleToggleSound,
      handleToggleLanguage,
      onClose,
    ]
  )

  const categories = useMemo(
    () => [
      {
        id: "nav",
        label: isZh ? "导航与检索" : "Navigation",
        items: shortcutItems.filter((i) => i.category === "nav"),
      },
      {
        id: "prefs",
        label: isZh ? "个性偏好" : "Preferences",
        items: shortcutItems.filter((i) => i.category === "prefs"),
      },
      {
        id: "general",
        label: isZh ? "系统与视窗" : "Window & System",
        items: shortcutItems.filter((i) => i.category === "general"),
      },
    ],
    [isZh, shortcutItems]
  )

  // 物理按键监听与即时响应
  useEffect(() => {
    if (!isOpen) return

    playWhoosh(0.04)

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      if (isInput) return

      const key = e.key.toLowerCase()

      if (e.key === "Escape") {
        e.preventDefault()
        setPressedId("esc")
        setTimeout(() => {
          onClose()
        }, 120)
        return
      }

      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault()
        setPressedId("cmd_k")
        handleOpenSearch()
        return
      }

      if (e.key === "?") {
        e.preventDefault()
        setPressedId("help")
        setTimeout(() => {
          onClose()
        }, 120)
        return
      }

      if (e.key === "/") {
        e.preventDefault()
        setPressedId("slash")
        handleOpenSearch()
        return
      }

      if (key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setPressedId("theme")
        handleToggleTheme()
      } else if (key === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setPressedId("sound")
        handleToggleSound()
      } else if (key === "l" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setPressedId("lang")
        handleToggleLanguage()
      }
    }

    const handleKeyUp = () => {
      setPressedId(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [
    isOpen,
    onClose,
    handleOpenSearch,
    handleToggleTheme,
    handleToggleSound,
    handleToggleLanguage,
    playWhoosh,
  ])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4">
          {/* Subtle Ambient Backdrop (Same as CommandMenu) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm"
          />

          {/* Frosted Glass Palette Container (Identical to CommandMenu layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", damping: 26, stiffness: 360 }}
            className="relative w-full max-w-[34rem] rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 shadow-[0_16px_48px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:py-3.5 border-b border-gray-200/60 dark:border-gray-800/80">
              <div className="flex items-center gap-2.5">
                <FiHelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  {isZh ? "全局快捷键速查" : "Keyboard Shortcuts"}
                </span>
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 hidden sm:inline">
                  {isZh ? "单键极速操作" : "Fast Single-key Navigation"}
                </span>
              </div>

              <button
                onClick={onClose}
                className="px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors select-none"
              >
                ESC
              </button>
            </div>

            {/* Categorized List */}
            <div className="overflow-y-auto p-2 space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-0.5">
                  <div className="px-3 pt-1 pb-1 text-[10px] font-mono tracking-wider uppercase font-semibold text-gray-400 dark:text-gray-500 select-none">
                    {cat.label}
                  </div>

                  {cat.items.map((item) => {
                    const isPressed = pressedId === item.id

                    return (
                      <div
                        key={item.id}
                        onClick={() => item.action()}
                        className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl cursor-pointer select-none transition-all duration-150 ${
                          isPressed
                            ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs scale-[0.99]"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`shrink-0 transition-colors ${
                              isPressed
                                ? "text-white dark:text-gray-900"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-medium truncate">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span
                              className={`text-[11px] truncate hidden sm:inline transition-colors ${
                                isPressed
                                  ? "text-white/70 dark:text-gray-900/70"
                                  : "text-gray-400 dark:text-gray-500 font-mono"
                              }`}
                            >
                              · {item.subtitle}
                            </span>
                          )}
                        </div>

                        {/* Right Key Caps */}
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {item.keys.map((k, idx) => (
                            <kbd
                              key={idx}
                              className={`min-w-[1.5rem] h-5 sm:h-6 px-1.5 flex items-center justify-center font-mono text-[11px] font-medium rounded-md border transition-all duration-150 select-none ${
                                isPressed
                                  ? "bg-white/20 text-white border-white/30 dark:bg-black/20 dark:text-gray-950 dark:border-black/30 shadow-inner"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200/80 dark:border-gray-700/80 shadow-xs"
                              }`}
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-gray-50/80 dark:bg-gray-950/40 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-mono select-none">
              <div className="flex items-center gap-2">
                <span>{isZh ? "按对应按键即可即时激活" : "Press keys to trigger directly"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{isZh ? "点击亦可执行" : "Click row to run"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
