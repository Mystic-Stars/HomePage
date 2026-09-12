"use client"

import React, { useState, useEffect, useRef } from "react"
import SectionHeading from "./SectionHeading"
import { motion } from "framer-motion"
import { useSectionInView } from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import useSound from "use-sound"
import { useSoundContext } from "@/context/sound-context"

import {
  FaGithub,
  FaEnvelope,
  FaBookBookmark,
  FaCode,
  FaTerminal,
  FaShareNodes,
} from "react-icons/fa6"
import { SiBilibili } from "react-icons/si"
import {
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiClock,
  FiSend,
} from "react-icons/fi"
import { PiTelevisionSimpleFill } from "react-icons/pi"
import GitHubActivity from "@/components/ui/github-activity"

const cardEntranceVariants = {
  initial: { opacity: 0, y: 16 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.04 * i,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const cardBaseStyle =
  "group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out active:scale-[0.99] hover:-translate-y-0.5 overflow-hidden flex flex-col justify-between"

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  custom?: number
}

function BentoCard({ children, className = "", custom = 0 }: BentoCardProps) {
  return (
    <motion.div
      variants={cardEntranceVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={custom}
      className={`${cardBaseStyle} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const { ref } = useSectionInView("About")
  const t = useTranslations("AboutSection")
  const tMBTI = useTranslations("MBTISection")
  const sectionLan = useTranslations("SectionName")
  const activeLocale = useLocale()
  const { soundEnabled } = useSoundContext()
  const [playPop] = useSound("/bubble.wav", { volume: 0.5, soundEnabled })

  const [timeString, setTimeString] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [timeCopied, setTimeCopied] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("zh-CN", {
        timeZone: "Asia/Shanghai",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setTimeString(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t("contact_email"))
      if (soundEnabled) playPop()
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleCopyTime = async () => {
    try {
      const fullTime = `${timeString} CST (UTC+8, Chengdu/Shanghai)`
      await navigator.clipboard.writeText(fullTime)
      if (soundEnabled) playPop()
      setTimeCopied(true)
      setTimeout(() => setTimeCopied(false), 1800)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <motion.section
      ref={ref}
      className="mb-16 sm:mb-28 max-w-[65rem] scroll-mt-28 px-2 sm:px-4 w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      id="about"
    >
      <SectionHeading>{sectionLan("about")}</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 auto-rows-auto">
        {/* ================= CARD 1: Hero Bio (2x2 on desktop) ================= */}
        <BentoCard
          custom={0}
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-gray-50/80 dark:bg-gray-800/90 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <span>{t("status")}</span>
              </div>
              <span className="text-[11px] font-mono tracking-widest text-gray-400 dark:text-gray-400 uppercase font-semibold">
                {t("badge")}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0">
                <Image
                  src="/profile.png"
                  alt="Mystic Stars"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t("hero_greeting")}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  {t("hero_subtitle")}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
              {t("hero_desc")}
            </p>
          </div>

          {/* 3 Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 mt-auto border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 p-2.5 border border-gray-200/60 dark:border-gray-700/60">
              <div className="p-2 rounded-lg bg-white dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 shadow-xs border border-gray-200/50 dark:border-gray-600/40">
                <FaCode className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {t("pillar_web")}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate font-mono">
                  Next.js · React
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 p-2.5 border border-gray-200/60 dark:border-gray-700/60">
              <div className="p-2 rounded-lg bg-white dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 shadow-xs border border-gray-200/50 dark:border-gray-600/40">
                <FaTerminal className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {t("pillar_python")}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate font-mono">
                  Script · Tooling
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 p-2.5 border border-gray-200/60 dark:border-gray-700/60">
              <div className="p-2 rounded-lg bg-white dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 shadow-xs border border-gray-200/50 dark:border-gray-600/40">
                <FaShareNodes className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {t("pillar_opensource")}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate font-mono">
                  Blog · GitHub
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ================= CARD 2: MBTI (1x2 on desktop) ================= */}
        <BentoCard
          custom={1}
          className="col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 relative"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {tMBTI("type")}
              </span>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500 font-semibold">
                {tMBTI("badge")}
              </span>
            </div>

            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {tMBTI("title")}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3.5">
              {tMBTI("personality_traits")}
            </p>

            {/* Personality Spectrum Bars with dynamic spring filling animation */}
            <div className="space-y-2.5 relative z-10">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 dark:text-gray-300 mb-1">
                  <span>{tMBTI("trait_extraverted")}</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">76%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "76%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-emerald-500/80"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 dark:text-gray-300 mb-1">
                  <span>{tMBTI("trait_intuitive")}</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">68%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "68%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-emerald-500/80"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 dark:text-gray-300 mb-1">
                  <span>{tMBTI("trait_feeling")}</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">72%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-emerald-500/80"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 dark:text-gray-300 mb-1">
                  <span>{tMBTI("trait_judging")}</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">81%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "81%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-emerald-500/80"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-4 mt-auto z-10 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
            <Link
              href="https://www.16personalities.com/enfj-personality"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors font-medium"
            >
              <span>16personalities</span>
              <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </Link>
          </div>

          {/* Background Illustration watermark */}
          <div className="absolute right-[-4px] bottom-6 w-24 sm:w-28 pointer-events-none opacity-15 dark:opacity-10">
            <Image
              src="/enfj.svg"
              alt="ENFJ"
              width={120}
              height={120}
              className="w-full object-contain"
            />
          </div>
        </BentoCard>

        {/* ================= CARD 3: Location & Clock (1x1 on desktop) ================= */}
        <BentoCard
          custom={2}
          className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium block">
                {t("location_title")}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {t("location_city")}
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 shrink-0 pt-0.5">
              {t("location_coords")}
            </span>
          </div>

          <div
            onClick={handleCopyTime}
            title={timeCopied ? "Copied!" : "Click to copy current timestamp"}
            className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-end justify-between select-none"
          >
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                <FiClock className="w-4 h-4 text-gray-400" />
                <span>{timeString || "00:00:00"}</span>
                {timeCopied && (
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500 animate-in fade-in" />
                )}
              </div>
              <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                {t("location_timezone")}
              </p>
            </div>
          </div>
        </BentoCard>

        {/* ================= CARD 4: Quick Contact (1x1 on desktop) ================= */}
        <BentoCard
          custom={3}
          className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-amber-500 border border-gray-200/60 dark:border-gray-700/60 shrink-0">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium block truncate">
                  {t("contact_title")}
                </span>
                <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300 truncate block">
                  {t("contact_email")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 active:scale-[0.96] transition-all duration-150"
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium"
                >
                  <FiCheck className="w-3.5 h-3.5" />
                  <span>{t("contact_copied")}</span>
                </motion.div>
              ) : (
                <div className="flex items-center gap-1">
                  <FiCopy className="w-3.5 h-3.5 text-gray-500" />
                  <span>{t("contact_copy")}</span>
                </div>
              )}
            </button>
            <a
              href={`mailto:${t("contact_email")}`}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 active:scale-[0.96] transition-all duration-150"
              aria-label="Send email"
            >
              <FiSend className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </a>
          </div>
        </BentoCard>

        {/* ================= CARD 5: GitHub Contributions (2x1 on desktop) ================= */}
        <BentoCard
          custom={4}
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 relative"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200/60 dark:border-gray-700/60">
                <FaGithub className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                  {t("github_title")}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {t("github_desc")}
                </span>
              </div>
            </div>
            <Link
              href="https://github.com/Mystic-Stars"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
            >
              <span>@Mystic-Stars</span>
              <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </Link>
          </div>

          <GitHubActivity
            username="Mystic-Stars"
            showMonths={true}
            cellSize={9.5}
            label={t("github_repos")}
            className="w-full pt-1"
          />
        </BentoCard>

        {/* ================= CARD 6: Minecraft (1x1 on desktop) ================= */}
        <BentoCard
          custom={5}
          className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 relative overflow-hidden group/mc"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
              <div className="flex items-center gap-2.5 min-w-0">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="relative w-8 h-8 rounded-xl overflow-hidden border border-emerald-500/20 shrink-0 shadow-xs cursor-pointer"
                >
                  <Image
                    src="/minecraft.png"
                    alt="Minecraft"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white truncate block">
                    {t("minecraft_title")}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 truncate block">
                    Mystic_Stars
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700/60">
                Java Ed.
              </span>
            </div>

            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 relative z-10">
              {t("minecraft_desc")}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap relative z-10">
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
                {t("minecraft_tag1")}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
                {t("minecraft_tag2")}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
                {t("minecraft_tag3")}
              </span>
            </div>
          </div>

          <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 mt-auto flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="truncate font-mono text-[11px]">Hypixel · hjmc</span>
            </div>
            <span className="shrink-0 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
              Java Edition
            </span>
          </div>

          {/* Minecraft Logo Watermark with subtle group-hover float */}
          <div className="absolute right-[-6px] bottom-3.5 w-36 sm:w-40 pointer-events-none opacity-15 dark:opacity-10 z-0 select-none transition-transform duration-300 group-hover/mc:scale-105 group-hover/mc:opacity-25">
            <Image
              src="/minecraft-logo.png"
              alt="Minecraft Logo"
              width={300}
              height={51}
              className="w-full object-contain"
            />
          </div>
        </BentoCard>

        {/* ================= CARD 7: Anime (1x1 on desktop) ================= */}
        <BentoCard
          custom={6}
          className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-500 dark:text-pink-400 border border-pink-200/60 dark:border-pink-500/30 shrink-0">
                  <PiTelevisionSimpleFill className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white truncate block">
                    {t("anime_title")}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate block">
                    {t("anime_subtitle")}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border border-pink-200/60 dark:border-pink-500/30">
                ACG
              </span>
            </div>

            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 relative z-10">
              {t("anime_desc")}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap relative z-10">
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
                {t("anime_tag1")}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
                {t("anime_tag2")}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
                {t("anime_tag3")}
              </span>
            </div>
          </div>

          <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 mt-auto flex items-center justify-between gap-2 relative z-10">
            <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate">
              mysticstars.cn
            </span>
            <Link
              href="https://www.mysticstars.cn"
              target="_blank"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors group/link"
            >
              <span>{t("anime_action")}</span>
              <FiArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-150" />
            </Link>
          </div>
        </BentoCard>

        {/* ================= CARD 8: Personal Blog (2x1 on desktop) ================= */}
        <BentoCard
          custom={7}
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-sky-500 border border-gray-200/60 dark:border-gray-700/60">
                  <FaBookBookmark className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t("blog_title")}
                  </span>
                  <span className="hidden sm:inline text-xs font-mono text-gray-400 dark:text-gray-500 ml-2">
                    mysticstars.cn
                  </span>
                </div>
              </div>

              <Link
                href="https://www.mysticstars.cn"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 active:scale-[0.98] transition-all duration-150"
              >
                <span>{t("blog_action")}</span>
                <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {t("blog_desc")}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 mt-3">
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
              {t("blog_tag1")}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
              {t("blog_tag2")}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
              {t("blog_tag3")}
            </span>
          </div>
        </BentoCard>

        {/* ================= CARD 9: Bilibili (2x1 on desktop) ================= */}
        <BentoCard
          custom={8}
          className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-[#00AEEC] border border-gray-200/60 dark:border-gray-700/60">
                  <SiBilibili className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t("bilibili_title")}
                  </span>
                  <span className="hidden sm:inline text-xs font-mono text-gray-400 dark:text-gray-500 ml-2">
                    space.bilibili.com
                  </span>
                </div>
              </div>

              <Link
                href="https://space.bilibili.com/2007491365"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 active:scale-[0.98] transition-all duration-150"
              >
                <span>{t("bilibili_action")}</span>
                <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {t("bilibili_desc")}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 mt-3">
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
              {t("bilibili_tag1")}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
              {t("bilibili_tag2")}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/60 font-medium">
              {t("bilibili_tag3")}
            </span>
          </div>
        </BentoCard>
      </div>
    </motion.section>
  )
}
