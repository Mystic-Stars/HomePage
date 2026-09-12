"use client"

import React, { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import { useSoundContext } from "@/context/sound-context"
import { ProjectDetail, ProjectFeature } from "@/lib/projects-detail"
import {
  FiX,
  FiCopy,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiRefreshCw,
  FiZap,
  FiBox,
  FiShield,
  FiCpu,
  FiLayout,
  FiLock,
  FiGlobe,
  FiLayers,
  FiImage,
  FiPlay,
  FiArrowUpRight,
} from "react-icons/fi"
import { FaGithub } from "react-icons/fa6"

interface ProjectPeekDrawerProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectDetail | null
}

export default function ProjectPeekDrawer({
  isOpen,
  onClose,
  project,
}: ProjectPeekDrawerProps) {
  const activeLocale = useLocale()
  const isZh = activeLocale === "zh"
  const t = useTranslations("ProjectSection")
  const { playWhoosh, playPop, playClick } = useSoundContext()

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"gallery" | "architecture" | "sandbox">("gallery")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [isIframeLoading, setIsIframeLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect responsive screen size for mobile bottom-sheet vs desktop right-drawer
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset tab & slide when project changes
  useEffect(() => {
    if (project) {
      setActiveTab("gallery")
      setCurrentSlide(0)
      setIsCopied(false)
      setIsIframeLoading(true)
    }
  }, [project])

  // Play whoosh sound on open
  useEffect(() => {
    if (isOpen) {
      playWhoosh(0.05)
    }
  }, [isOpen, playWhoosh])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  const handlePrevSlide = useCallback(() => {
    if (!project || project.screenshots.length <= 1) return
    playPop(0.06)
    setCurrentSlide((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    )
  }, [project, playPop])

  const handleNextSlide = useCallback(() => {
    if (!project || project.screenshots.length <= 1) return
    playPop(0.06)
    setCurrentSlide((prev) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    )
  }, [project, playPop])

  // Keybindings: ESC to close, Arrow keys to navigate gallery
  useEffect(() => {
    if (!isOpen || !project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        playWhoosh(0.04)
        onClose()
      } else if (activeTab === "gallery") {
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          handlePrevSlide()
        } else if (e.key === "ArrowRight") {
          e.preventDefault()
          handleNextSlide()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, project, activeTab, onClose, playWhoosh, handlePrevSlide, handleNextSlide])

  const handleCopyLink = useCallback(() => {
    if (!project) return
    playClick(0.08)
    const urlToCopy = project.demoUrl || project.projectUrl || window.location.href
    navigator.clipboard.writeText(urlToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [project, playClick])

  const renderFeatureIcon = (iconName: ProjectFeature["icon"]) => {
    const iconClass = "w-4 h-4 text-gray-700 dark:text-gray-300"
    switch (iconName) {
      case "zap":
        return <FiZap className={iconClass} />
      case "box":
        return <FiBox className={iconClass} />
      case "shield":
        return <FiShield className={iconClass} />
      case "cpu":
        return <FiCpu className={iconClass} />
      case "layout":
        return <FiLayout className={iconClass} />
      case "lock":
        return <FiLock className={iconClass} />
      case "globe":
        return <FiGlobe className={iconClass} />
      default:
        return <FiZap className={iconClass} />
    }
  }

  if (!mounted || !project) return null

  const screenshots = project.screenshots
  const currentScreenshot = screenshots[currentSlide] || screenshots[0]

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] overflow-hidden flex justify-end">
          {/* Subtle Ambient Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              playWhoosh(0.04)
              onClose()
            }}
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Drawer Container (Desktop: Right slide; Mobile: Bottom sheet) */}
          <motion.div
            key="drawer-panel"
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 320,
              mass: 0.85,
            }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_e: any, info: PanInfo) => {
              if (info.offset.y > 100 || info.velocity.y > 450) {
                playWhoosh(0.04)
                onClose()
              }
            }}
            className={`relative z-10 flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-gray-200/80 dark:border-gray-800 shadow-[0_24px_64px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden ${
              isMobile
                ? "w-full h-[90vh] max-h-[90vh] mt-auto rounded-t-[2rem] border-t"
                : "w-full sm:w-[580px] md:w-[620px] lg:w-[660px] h-full sm:rounded-l-[2rem] border-l"
            }`}
          >
            {/* Mobile Drag Pill */}
            {isMobile && (
              <div className="w-full pt-3 pb-1 flex justify-center items-center cursor-grab active:cursor-grabbing select-none">
                <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors" />
              </div>
            )}

            {/* Header Area */}
            <div className="px-6 sm:px-8 pt-5 sm:pt-7 pb-4 border-b border-gray-100 dark:border-gray-800/80 shrink-0">
              <div className="flex items-start justify-between gap-4">
                {/* Project Identity */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-sm shrink-0 bg-white/90 dark:bg-gray-800/90">
                    <Image
                      src={project.icon || project.mainImage}
                      alt={isZh ? project.title_zh : project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                        {isZh ? project.title_zh : project.title}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 shrink-0">
                        {project.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                      {isZh ? project.category_zh : project.category} · {project.version}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    playWhoosh(0.04)
                    onClose()
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0"
                  aria-label="Close drawer"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Slogan */}
              <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                {isZh ? project.tagline_zh : project.tagline}
              </p>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all shadow-xs"
                  >
                    <span>{t("open_external")}</span>
                    <FiArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {project.projectUrl && (
                  <Link
                    href={project.projectUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700/60 active:scale-95 transition-all"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>{t("view_code")}</span>
                  </Link>
                )}
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 transition-colors active:scale-95"
                  title={t("copy_link")}
                >
                  {isCopied ? (
                    <>
                      <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {t("copied")}
                      </span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-3.5 h-3.5 text-gray-400" />
                      <span>{t("copy_link")}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Minimalist Segmented Pill Tabs */}
              <div className="mt-4 pt-2">
                <div className="inline-flex p-1 rounded-2xl bg-gray-100/90 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 gap-1 text-xs">
                  <button
                    onClick={() => {
                      playClick(0.04)
                      setActiveTab("gallery")
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                      activeTab === "gallery"
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <FiImage className="w-3.5 h-3.5" />
                    <span>{t("gallery_tab")}</span>
                  </button>
                  <button
                    onClick={() => {
                      playClick(0.04)
                      setActiveTab("architecture")
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                      activeTab === "architecture"
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <FiLayers className="w-3.5 h-3.5" />
                    <span>{t("arch_tab")}</span>
                  </button>
                  {project.sandboxUrl && (
                    <button
                      onClick={() => {
                        playClick(0.04)
                        setActiveTab("sandbox")
                      }}
                      className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                        activeTab === "sandbox"
                          ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs"
                          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      <FiPlay className="w-3.5 h-3.5" />
                      <span>{t("sandbox_tab")}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-6">
              {/* Tab 1: Panoramic Screenshot Gallery */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  {/* Gallery Slide Frame */}
                  <div className="space-y-2">
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-950 border border-gray-200/80 dark:border-gray-800 shadow-sm group select-none">
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={currentScreenshot.image}
                              alt={isZh ? currentScreenshot.title_zh : currentScreenshot.title}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 640px) 100vw, 650px"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Floating Slide Counter Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/40 backdrop-blur-md text-white border border-white/10 pointer-events-none">
                          {currentSlide + 1} / {screenshots.length}
                        </div>

                        {/* Navigation Arrows */}
                        {screenshots.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevSlide}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-sm flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                              aria-label="Previous screenshot"
                            >
                              <FiChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleNextSlide}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-sm flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                              aria-label="Next screenshot"
                            >
                              <FiChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Screenshot Caption Bar */}
                      <div className="p-4 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {isZh ? currentScreenshot.title_zh : currentScreenshot.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                              {isZh ? currentScreenshot.caption_zh : currentScreenshot.caption}
                            </p>
                          </div>

                          {/* Minimalist Dot Pills */}
                          {screenshots.length > 1 && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              {screenshots.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    playPop(0.06)
                                    setCurrentSlide(idx)
                                  }}
                                  className={`h-1.5 rounded-full transition-all duration-200 ${
                                    idx === currentSlide
                                      ? "w-5 bg-gray-900 dark:bg-white"
                                      : "w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                                  }`}
                                  aria-label={`Go to slide ${idx + 1}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subtle Hint */}
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center select-none">
                      {t("slide_hint")}
                    </p>
                  </div>

                  {/* Section: Core Features Bento Grid */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {t("features_title")}
                      </h3>
                      <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                        {project.features.length} HIGHLIGHTS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="rounded-2xl p-4 bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/70 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="w-7 h-7 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 flex items-center justify-center">
                              {renderFeatureIcon(feat.icon)}
                            </div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/80 px-2 py-0.5 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                              {feat.tag}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                            {isZh ? feat.title_zh : feat.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            {isZh ? feat.desc_zh : feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Specifications - Clean Full-visibility Bento Key-Value List */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {t("specs_title")}
                      </h3>
                      <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                        SPECIFICATIONS
                      </span>
                    </div>

                    <div className="rounded-2xl sm:rounded-3xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/70 dark:border-gray-800 divide-y divide-gray-100/80 dark:divide-gray-800/60 overflow-hidden shadow-xs">
                      {project.specs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                        >
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400/80 dark:bg-gray-500 shrink-0" />
                            {isZh ? spec.label_zh : spec.label}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 font-mono sm:text-right break-words select-text">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: System Architecture Blueprint */}
              {activeTab === "architecture" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {t("architecture_title")}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                      SYSTEM TOPOLOGY
                    </span>
                  </div>

                  <div className="space-y-3">
                    {project.architecture.map((arch, idx) => (
                      <React.Fragment key={idx}>
                        <div className="rounded-2xl p-4 sm:p-5 bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/70 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60">
                              0{idx + 1}
                            </span>
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {isZh ? arch.layer_zh : arch.layer}
                            </h4>
                          </div>

                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {isZh ? arch.desc_zh : arch.description}
                          </p>

                          {/* Tech Stack Capsule Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            {arch.tech.map((tItem, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60"
                              >
                                {tItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Connector line between architecture steps */}
                        {idx < project.architecture.length - 1 && (
                          <div className="w-px h-2.5 bg-gray-200 dark:bg-gray-800 mx-auto" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Live Sandbox */}
              {activeTab === "sandbox" && project.sandboxUrl && (
                <div className="space-y-3">
                  {/* Browser Mockup Header Bar */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800/70 border border-gray-200/70 dark:border-gray-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span className="ml-2 text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate max-w-[200px] sm:max-w-xs">
                        {project.sandboxUrl}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          playClick(0.04)
                          setIsIframeLoading(true)
                          setIframeKey((prev) => prev + 1)
                        }}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-gray-700 transition-colors"
                        title="Reload preview"
                      >
                        <FiRefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={project.sandboxUrl}
                        target="_blank"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-gray-700 transition-colors"
                        title="Open in new window"
                      >
                        <FiMaximize2 className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Sandboxed iframe container */}
                  <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-inner">
                    {isIframeLoading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 border-t-transparent animate-spin mb-2" />
                        <span className="text-xs text-gray-400 font-mono">Loading Sandbox...</span>
                      </div>
                    )}
                    <iframe
                      key={iframeKey}
                      src={project.sandboxUrl}
                      onLoad={() => setIsIframeLoading(false)}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
