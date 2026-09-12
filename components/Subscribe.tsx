"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaRss } from "react-icons/fa6"
import { FiCopy, FiCheck, FiArrowUpRight, FiExternalLink } from "react-icons/fi"
import { useLocale, useTranslations } from "next-intl"
import { headerLanguageMap } from "@/lib/data"
import { useSectionInView } from "@/lib/hooks"
import SectionHeading from "./SectionHeading"

const RSS_LINK = "https://www.mysticstars.cn/rss.xml"
const FOLLOW_LINK = "https://app.follow.is/share/feeds/65706263472449536"

// Follow 官方矢量图标 (精准保真)
function FollowOfficialIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Follow"
    >
      <path
        fill="#FF5C00"
        d="M5.382 0h13.236A5.37 5.37 0 0 1 24 5.383v13.235A5.37 5.37 0 0 1 18.618 24H5.382A5.37 5.37 0 0 1 0 18.618V5.383A5.37 5.37 0 0 1 5.382.001Z"
      />
      <path
        fill="#ffffff"
        d="M13.269 17.31a1.813 1.813 0 1 0-3.626.002 1.813 1.813 0 0 0 3.626-.002m-.535-6.527H7.213a1.813 1.813 0 1 0 0 3.624h5.521a1.813 1.813 0 1 0 0-3.624m4.417-4.712H8.87a1.813 1.813 0 1 0 0 3.625h8.283a1.813 1.813 0 1 0 0-3.624z"
      />
    </svg>
  )
}

export default function Subscribe() {
  const { ref } = useSectionInView("Subscribe", 0.5)
  const activeLocale = useLocale()
  const t = useTranslations("SubscribeSection")
  const [copied, setCopied] = useState(false)

  const handleCopyRSS = async () => {
    try {
      await navigator.clipboard.writeText(RSS_LINK)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy RSS link:", err)
    }
  }

  return (
    <section
      id="subscribe"
      ref={ref}
      className="max-w-[45rem] w-full scroll-mt-28 mb-28 px-4"
    >
      <SectionHeading>
        {activeLocale === "zh"
          ? headerLanguageMap["Subscribe"]
          : "Subscribe"}
      </SectionHeading>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center -mt-4 mb-7 max-w-md mx-auto">
        {t("desc")}
      </p>

      {/* 与全局 About 卡片风格一致的现代 Bento 卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl p-5 sm:p-6 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-200"
      >
        <div className="flex flex-col gap-4">
          {/* Follow 订阅项 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shrink-0">
                <FollowOfficialIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t("follow_title")}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {t("follow_desc")}
                </p>
              </div>
            </div>

            <a
              href={FOLLOW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shrink-0 cursor-pointer"
            >
              <span>{t("follow_btn")}</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* RSS 订阅项 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-800 text-orange-500 border border-gray-200/60 dark:border-gray-700/60 shrink-0">
                <FaRss className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t("rss_title")}
                </h3>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 block truncate select-all">
                  {RSS_LINK}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyRSS}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                {copied ? (
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <FiCopy className="w-3.5 h-3.5 text-gray-500" />
                )}
                <span>{copied ? t("copied") : t("copy_rss")}</span>
              </button>

              <a
                href={RSS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 active:scale-[0.98] transition-all duration-150"
                aria-label="Open RSS XML"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
 