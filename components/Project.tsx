"use client"

import { useRef } from "react"
import { projectsData } from "@/lib/data"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { FaGithub } from "react-icons/fa6"
import Link from "next/link"
import { FiArrowUpRight, FiEye } from "react-icons/fi"
import { useLocale, useTranslations } from "next-intl"

interface ProjectProps {
  title: string
  description: string
  desc_zh: string
  title_zh: string
  tags: string[] | readonly string[]
  imageUrl: any
  iconUrl?: any
  projectUrl?: string
  demoUrl?: string
  index: number
  onPeek?: () => void
}

export default function Project({
  title,
  description,
  desc_zh,
  title_zh,
  tags,
  imageUrl,
  iconUrl,
  projectUrl,
  demoUrl,
  index,
  onPeek,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  })
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.75, 1])
  const activeLocale = useLocale()
  const t = useTranslations("ProjectSection")

  const isEven = index % 2 === 1

  const handleCardClick = () => {
    if (onPeek) {
      onPeek()
    } else {
      window.open(demoUrl || projectUrl, "_blank")
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-4 sm:mb-7 last:mb-0"
      viewport={{ once: true }}
    >
      <section
        onClick={handleCardClick}
        className="relative rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out overflow-hidden cursor-pointer sm:h-[21rem] active:scale-[0.99]"
      >
        {/* Mobile Preview Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-gray-100 dark:border-gray-800 sm:hidden">
          <Image
            src={imageUrl}
            alt={activeLocale === "zh" ? title_zh : title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>

        {/* Text & Content Container */}
        <div
          className={`p-5 sm:p-8 flex flex-col justify-between h-full relative z-10 ${
            isEven ? "sm:ml-auto sm:max-w-[50%]" : "sm:max-w-[50%]"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              {iconUrl && (
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-gray-200/80 dark:border-gray-700/80 shrink-0 shadow-xs bg-white dark:bg-gray-800">
                  <Image
                    src={iconUrl}
                    alt={activeLocale === "zh" ? title_zh : title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {activeLocale === "zh" ? title_zh : title}
              </h3>
            </div>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {activeLocale === "zh" ? desc_zh : description}
            </p>

            {/* Action Buttons */}
            <div
              className="flex flex-wrap items-center gap-2.5 mt-4 sm:mt-5"
              onClick={(e) => e.stopPropagation()}
            >
              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all shadow-xs"
                >
                  <span>{t("visit")}</span>
                  <FiArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}

              {projectUrl && (
                <Link
                  href={projectUrl}
                  target="_blank"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-medium transition-all ${
                    !demoUrl
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-xs active:scale-95"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700/60 active:scale-95"
                  }`}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>{t("code")}</span>
                </Link>
              )}

              {onPeek && (
                <button
                  type="button"
                  onClick={onPeek}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-medium bg-gray-100/80 hover:bg-gray-200/90 dark:bg-gray-800/80 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700/60 active:scale-95 transition-all"
                >
                  <FiEye className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  <span>{t("peek")}</span>
                </button>
              )}
            </div>
          </div>

          {/* Tags (Classic Capsule Pill Style) */}
          <ul
            className="flex flex-wrap gap-2 pt-4 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {tags.map((tag, tagIndex) => (
              <li
                key={tagIndex}
                className="bg-white/70 dark:bg-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-full border border-gray-200/60 dark:border-gray-700/60 font-medium select-none"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Pure Screenshot Showcase */}
        <Image
          src={imageUrl}
          alt={activeLocale === "zh" ? title_zh : title}
          quality={95}
          className={`absolute hidden sm:block top-8 w-[28.25rem] rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-out group-hover:scale-[1.03] ${
            isEven
              ? "-left-36 group-hover:translate-x-3 group-hover:translate-y-2 group-hover:rotate-1"
              : "-right-36 group-hover:-translate-x-3 group-hover:translate-y-2 group-hover:-rotate-1"
          }`}
        />
      </section>
    </motion.div>
  )
}
