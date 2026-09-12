"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSectionInView } from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"
import { useSoundContext } from "@/context/sound-context"
import { BlogPost, getFeaturedPosts } from "@/lib/posts"
import SectionHeading from "./SectionHeading"
import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight, FiCalendar } from "react-icons/fi"
import { FaBookBookmark } from "react-icons/fa6"

interface FeaturedPostsProps {
  initialPosts: BlogPost[]
}

const cardEntranceVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * i,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function FeaturedPosts({ initialPosts }: FeaturedPostsProps) {
  const { ref } = useSectionInView("Blog", 0.2)
  const activeLocale = useLocale()
  const isZh = activeLocale === "zh"
  const t = useTranslations("BlogSection")
  const { playPop, playClick } = useSoundContext()

  const [posts, setPosts] = useState<BlogPost[]>(
    initialPosts && initialPosts.length > 0 ? initialPosts : []
  )

  // 客户端静默实时更新：如果有更新的文章发布，自动同步
  useEffect(() => {
    let isMounted = true
    getFeaturedPosts(3).then((livePosts) => {
      if (isMounted && livePosts && livePosts.length > 0) {
        setPosts(livePosts)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <motion.section
      ref={ref}
      id="blog"
      className="scroll-mt-28 mb-16 sm:mb-28 max-w-[65rem] w-full px-2 sm:px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <SectionHeading>{t("title")}</SectionHeading>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center -mt-4 mb-9 max-w-md mx-auto">
        {t("subtitle")}
      </p>

      {/* 3 列图文 Bento 卡片流 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post, index) => {
          const displayTitle = isZh ? post.title : (post.title_en || post.title)
          const displayDesc = isZh ? post.description : (post.desc_en || post.description)
          const displayCategory = isZh ? post.category : (post.category_en || post.category)

          return (
            <motion.a
              key={post.href || index}
              href={post.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              custom={index}
              variants={cardEntranceVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              onMouseEnter={() => playPop(0.04)}
              onClick={() => playClick()}
              className="group relative rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between cursor-pointer select-none active:scale-[0.99] hover:-translate-y-1"
            >
              {/* 封面图容器 */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800/80">
                <Image
                  src={post.coverImage}
                  alt={displayTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  priority={index === 0}
                />

                {/* 封面浮动胶囊：中性纯净毛玻璃 */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 backdrop-blur-md border border-white/60 dark:border-gray-700/60 shadow-xs">
                    {displayCategory}
                  </span>

                  {post.date && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-medium bg-black/40 text-white/90 backdrop-blur-md shadow-xs">
                      <FiCalendar className="w-3 h-3 text-white/70" />
                      <span>{post.date}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 卡片下部文本与标签 */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 line-clamp-1 mb-1.5">
                    {displayTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">
                    {displayDesc}
                  </p>
                </div>

                {/* 卡片底部操作与标签（纯净中性规范） */}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1.5 flex-wrap overflow-hidden">
                    {post.tags.slice(0, 2).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="bg-white/70 dark:bg-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-full border border-gray-200/60 dark:border-gray-700/60 font-medium select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors shrink-0">
                    <span>{t("read_more")}</span>
                    <FiArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </span>
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* 底部居中统揽按钮（与 Projects 组件统一的中性黑白灰） */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <Link
          href="https://www.mysticstars.cn"
          target="_blank"
          onClick={() => playClick()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200/90 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200/70 dark:border-gray-700/70 active:scale-[0.98] transition-colors duration-150 shadow-xs cursor-pointer"
        >
          <FaBookBookmark className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span>{t("view_all")}</span>
          <FiArrowUpRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
        </Link>
      </div>
    </motion.section>
  )
}
