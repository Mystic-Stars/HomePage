"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale } from "next-intl"
import { useTheme } from "@/context/theme-context"
import { useSoundContext } from "@/context/sound-context"
import { usePathname, useRouter } from "next/navigation"
import {
  FiSearch,
  FiMoon,
  FiSun,
  FiVolume2,
  FiVolumeX,
  FiGlobe,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiCornerDownLeft,
} from "react-icons/fi"
import {
  FaHouse,
  FaUser,
  FaFolderOpen,
  FaWrench,
  FaRss,
  FaGithub,
  FaBilibili,
} from "react-icons/fa6"
import useSound from "use-sound"

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: React.ReactNode
  category: "navigation" | "actions" | "links"
  action: () => void
  keywords?: string[]
}

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const activeLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { soundEnabled, toggleSound } = useSoundContext()
  const [playPop] = useSound("/bubble.wav", { volume: 0.4, soundEnabled })

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const isZh = activeLocale === "zh"

  // Handle Copy helper
  const handleCopy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(label)
        if (soundEnabled) playPop()
        setTimeout(() => {
          setCopiedText(null)
          onClose()
        }, 900)
      } catch (e) {
        console.error(e)
      }
    },
    [soundEnabled, playPop, onClose]
  )

  // Unified items list with cohesive styling
  const items: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-home",
        title: isZh ? "首页" : "Home",
        subtitle: "#home",
        icon: <FaHouse className="w-3.5 h-3.5" />,
        category: "navigation",
        action: () => {
          window.location.hash = "home"
          onClose()
        },
        keywords: ["home", "top", "首页", "顶部"],
      },
      {
        id: "nav-about",
        title: isZh ? "关于我" : "About Me",
        subtitle: "#about",
        icon: <FaUser className="w-3.5 h-3.5" />,
        category: "navigation",
        action: () => {
          window.location.hash = "about"
          onClose()
        },
        keywords: ["about", "bio", "关于", "介绍", "mbti", "enfj"],
      },
      {
        id: "nav-projects",
        title: isZh ? "我的项目" : "Featured Projects",
        subtitle: "#projects",
        icon: <FaFolderOpen className="w-3.5 h-3.5" />,
        category: "navigation",
        action: () => {
          window.location.hash = "projects"
          onClose()
        },
        keywords: ["projects", "work", "项目", "axolotl", "coverly"],
      },
      {
        id: "nav-skills",
        title: isZh ? "我的技能" : "Skills & Stack",
        subtitle: "#skills",
        icon: <FaWrench className="w-3.5 h-3.5" />,
        category: "navigation",
        action: () => {
          window.location.hash = "skills"
          onClose()
        },
        keywords: ["skills", "tech", "技能", "rust", "react", "nextjs", "python"],
      },
      {
        id: "nav-subscribe",
        title: isZh ? "订阅博客" : "Subscribe",
        subtitle: "#subscribe",
        icon: <FaRss className="w-3.5 h-3.5" />,
        category: "navigation",
        action: () => {
          window.location.hash = "subscribe"
          onClose()
        },
        keywords: ["subscribe", "rss", "follow", "订阅"],
      },

      // Actions
      {
        id: "act-theme",
        title: isZh ? "切换色彩主题" : "Toggle Color Theme",
        subtitle: theme === "system" ? (isZh ? "系统" : "System") : theme === "dark" ? (isZh ? "深色" : "Dark") : (isZh ? "浅色" : "Light"),
        icon: theme === "dark" ? <FiMoon className="w-3.5 h-3.5" /> : <FiSun className="w-3.5 h-3.5" />,
        category: "actions",
        action: () => {
          toggleTheme()
        },
        keywords: ["theme", "dark", "light", "mode", "主题", "深色", "浅色"],
      },
      {
        id: "act-sound",
        title: isZh ? "切换交互音效" : "Toggle Sound Effects",
        subtitle: soundEnabled ? (isZh ? "开启" : "On") : (isZh ? "静音" : "Muted"),
        icon: soundEnabled ? <FiVolume2 className="w-3.5 h-3.5" /> : <FiVolumeX className="w-3.5 h-3.5" />,
        category: "actions",
        action: () => {
          toggleSound()
        },
        keywords: ["sound", "audio", "mute", "volume", "声音", "音效", "静音"],
      },
      {
        id: "act-lang",
        title: isZh ? "切换页面语言 (Switch to EN)" : "Switch Language (切换至中文)",
        subtitle: activeLocale.toUpperCase(),
        icon: <FiGlobe className="w-3.5 h-3.5" />,
        category: "actions",
        action: () => {
          const nextLocale = activeLocale === "en" ? "zh" : "en"
          const newPath = pathname.replace(/^\/(en|zh)/, `/${nextLocale}/`)
          router.replace(newPath, { scroll: false })
          onClose()
        },
        keywords: ["language", "locale", "chinese", "english", "语言", "英文", "中文"],
      },
      {
        id: "act-copy-email",
        title: isZh ? "复制联系邮箱" : "Copy Email",
        subtitle: "1278347583@qq.com",
        icon: copiedText === "email" ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />,
        category: "actions",
        action: () => {
          handleCopy("1278347583@qq.com", "email")
        },
        keywords: ["email", "contact", "copy", "邮箱", "联系", "复制"],
      },
      {
        id: "act-copy-rss",
        title: isZh ? "复制 RSS 订阅地址" : "Copy RSS Feed URL",
        subtitle: "mysticstars.cn/rss.xml",
        icon: copiedText === "rss" ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />,
        category: "actions",
        action: () => {
          handleCopy("https://www.mysticstars.cn/rss.xml", "rss")
        },
        keywords: ["rss", "feed", "xml", "copy", "订阅"],
      },

      // External Links
      {
        id: "link-blog",
        title: isZh ? "访问个人博客" : "Visit Personal Blog",
        subtitle: "mysticstars.cn",
        icon: <FiExternalLink className="w-3.5 h-3.5" />,
        category: "links",
        action: () => {
          window.open("https://www.mysticstars.cn", "_blank")
          onClose()
        },
        keywords: ["blog", "article", "post", "博客", "文章"],
      },
      {
        id: "link-github",
        title: isZh ? "GitHub 个人主页" : "GitHub Profile",
        subtitle: "@Mystic-Stars",
        icon: <FaGithub className="w-3.5 h-3.5" />,
        category: "links",
        action: () => {
          window.open("https://github.com/Mystic-Stars", "_blank")
          onClose()
        },
        keywords: ["github", "code", "repo", "开源"],
      },
      {
        id: "link-bilibili",
        title: isZh ? "Bilibili 个人空间" : "Bilibili Space",
        subtitle: "space.bilibili.com/2007491365",
        icon: <FaBilibili className="w-3.5 h-3.5" />,
        category: "links",
        action: () => {
          window.open("https://space.bilibili.com/2007491365", "_blank")
          onClose()
        },
        keywords: ["bilibili", "video", "b站", "视频"],
      },
    ],
    [isZh, activeLocale, theme, soundEnabled, copiedText, pathname, router, onClose, toggleTheme, toggleSound, handleCopy]
  )

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase().trim()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    )
  }, [items, query])

  // Group filtered items by category
  const categories = useMemo(() => {
    const cats: { id: "navigation" | "actions" | "links"; label: string; items: CommandItem[] }[] = [
      { id: "navigation", label: isZh ? "页面跳转" : "Navigation", items: [] },
      { id: "actions", label: isZh ? "快速操作" : "Actions", items: [] },
      { id: "links", label: isZh ? "外链与社交" : "External Links", items: [] },
    ]

    filteredItems.forEach((item) => {
      const cat = cats.find((c) => c.id === item.category)
      if (cat) cat.items.push(item)
    })

    return cats.filter((c) => c.items.length > 0)
  }, [filteredItems, isZh])

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Auto focus input when opened
  useEffect(() => {
    if (!isOpen) {
      setQuery("")
      return
    }
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 40)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        )
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action()
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4">
          {/* Subtle Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm"
          />

          {/* Frosted Glass Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", damping: 26, stiffness: 360 }}
            className="relative w-full max-w-[34rem] rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 shadow-[0_16px_48px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Bar */}
            <div className="flex items-center gap-2.5 px-4 py-3 sm:py-3.5 border-b border-gray-200/60 dark:border-gray-800/80">
              <FiSearch className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isZh
                    ? "搜索指令或跳转页面..."
                    : "Search commands or jump to section..."
                }
                className="w-full bg-transparent text-sm sm:text-base outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-normal"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-mono px-1.5 py-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isZh ? "清空" : "Clear"}
                </button>
              )}
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700/60 select-none">
                ESC
              </kbd>
            </div>

            {/* Categorized List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 space-y-3"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400 dark:text-gray-500">
                  {isZh ? "未找到相关指令" : "No matching commands"}
                </div>
              ) : (
                categories.map((cat) => (
                  <div key={cat.id} className="space-y-0.5">
                    <div className="px-3 pt-1 pb-1 text-[10px] font-mono tracking-wider uppercase font-semibold text-gray-400 dark:text-gray-500 select-none">
                      {cat.label}
                    </div>
                    {cat.items.map((item) => {
                      const overallIndex = filteredItems.findIndex((i) => i.id === item.id)
                      const isSelected = overallIndex === selectedIndex

                      return (
                        <div
                          key={item.id}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(overallIndex)}
                          className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl cursor-pointer select-none transition-all duration-150 ${
                            isSelected
                              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xs"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/60"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`shrink-0 transition-colors ${
                                isSelected
                                  ? "text-white dark:text-gray-900"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className="text-xs sm:text-sm font-medium truncate">
                              {item.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 pl-2">
                            {item.subtitle && (
                              <span
                                className={`text-[11px] font-mono truncate hidden sm:inline ${
                                  isSelected
                                    ? "text-gray-300 dark:text-gray-600"
                                    : "text-gray-400 dark:text-gray-500"
                                }`}
                              >
                                {item.subtitle}
                              </span>
                            )}
                            {isSelected && (
                              <FiCornerDownLeft
                                className={`w-3 h-3 ${
                                  isSelected
                                    ? "text-gray-300 dark:text-gray-600"
                                    : "text-gray-400"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/60 text-[10px] font-mono text-gray-400 dark:text-gray-500 select-none">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded bg-gray-200/50 dark:bg-gray-800">↑</span>
                  <span className="px-1 py-0.5 rounded bg-gray-200/50 dark:bg-gray-800">↓</span>
                  <span>{isZh ? "移动" : "Navigate"}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded bg-gray-200/50 dark:bg-gray-800">↵</span>
                  <span>{isZh ? "选择" : "Select"}</span>
                </span>
              </div>
              <span>
                {isZh ? "ESC 退出" : "ESC to close"}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
