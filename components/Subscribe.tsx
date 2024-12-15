"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaRss } from "react-icons/fa6"
import { useLocale } from "next-intl"
import { FiCopy, FiCheck, FiExternalLink } from "react-icons/fi"

const RSS_LINK = 'https://www.mysticstars.cn/rss.xml'
const FOLLOW_LINK = 'https://app.follow.is/share/feeds/65706263472449536'

export default function Subscribe() {
  const [copied, setCopied] = useState(false)
  const activeLocale = useLocale()

  const handleCopyRSS = async () => {
    try {
      await navigator.clipboard.writeText(RSS_LINK)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy RSS link:', err)
    }
  }

  return (
    <section id="subscribe" className="scroll-mt-28 mb-28">
      <motion.div
        className="max-w-[45rem] mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div>
              <h2 className="text-2xl font-medium mb-3 text-gray-800 dark:text-white">
                {activeLocale === "zh" ? "订阅我的博客" : "Subscribe to My Blog"}
              </h2>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                {activeLocale === "zh" 
                  ? "通过 RSS 订阅获取最新的博客文章和技术分享" 
                  : "Get the latest blog posts and tech insights via RSS feed"}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xl">
              <div className="relative">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl py-3 px-4 border border-gray-200 dark:border-gray-700 flex items-center gap-3 w-full">
                  <FaRss className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-mono truncate">
                    {RSS_LINK}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={handleCopyRSS}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? (
                    <FiCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <FiCopy className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-200" />
                  )}
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {copied 
                      ? (activeLocale === "zh" ? "已复制" : "Copied") 
                      : (activeLocale === "zh" ? "复制" : "Copy")}
                  </span>
                </motion.button>

                <motion.a
                  href={FOLLOW_LINK}
                  target="_blank"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-50 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {activeLocale === "zh" ? "Follow" : "Follow"}
                  </span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* 装饰性背景元素 - 更微妙的效果 */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900/50" />
        </div>
      </motion.div>
    </section>
  )
} 