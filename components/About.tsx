"use client"

import React from "react"
import SectionHeading from "./SectionHeading"
import { motion, AnimatePresence } from "framer-motion"
import { useSectionInView } from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"
import { FaGamepad, FaCode, FaBook, FaEnvelope, FaGithub } from "react-icons/fa6"
import { PiTelevisionSimpleFill } from "react-icons/pi"
import { SiBilibili } from "react-icons/si"
import Link from "next/link"
import { useState } from "react"

const cardVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.25,
      ease: [0.3, 0, 0.2, 1],
    },
  }),
}

const contentVariants = {
  initial: { 
    opacity: 0,
    y: -3,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.3, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -3,
    transition: {
      duration: 0.15,
      ease: [0.3, 0, 0.2, 1]
    }
  }
}

interface AboutCardProps {
  icon: React.ElementType
  content: string
  title?: string
  index: number
  className?: string
  size?: "small" | "medium" | "large"
  expandOnHover?: boolean
  aspectRatio?: "square" | "wide" | "tall"
  priority?: "high" | "medium" | "low"
  accentColor?: string
}

type AboutCardType = {
  type?: "image"
  icon?: React.ElementType
  image?: string
  title?: string
  content?: string
  size?: "small" | "medium" | "large"
  aspectRatio?: "square" | "wide" | "tall"
  priority?: "high" | "medium" | "low"
  accentColor?: string
  expandOnHover?: boolean
}

const AboutCard = ({ 
  icon: Icon, 
  content,
  title,
  index, 
  className = "",
  size = "medium",
  expandOnHover = false,
  aspectRatio = "square",
  priority = "medium",
  accentColor = "pink"
}: AboutCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1",
    large: "col-span-2 row-span-1"
  }

  const aspectRatioClasses = {
    square: "aspect-square",
    wide: "col-span-2 aspect-[2/1]",
    tall: "row-span-2"
  }

  const priorityClasses = {
    high: "bg-white/80 dark:bg-gray-800/80 border-l-4 border-l-pink dark:border-l-pink",
    medium: "bg-white/80 dark:bg-gray-800/80",
    low: "bg-white/70 dark:bg-gray-800/70"
  }

  const iconSizeClasses = {
    small: "w-8 h-8",
    medium: "w-8 h-8",
    large: "w-10 h-10"
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover={{ 
        scale: expandOnHover ? 1.02 : 1.01,
        y: -3,
        transition: {
          duration: 0.2,
          ease: [0.3, 0, 0.2, 1]
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        ${priorityClasses[priority]}
        rounded-2xl p-5
        shadow-[0_4px_20px_rgb(0,0,0,0.03)]
        hover:shadow-[0_6px_30px_rgb(0,0,0,0.06)]
        border border-white/8 dark:border-gray-700/15
        hover:border-${accentColor}/20 dark:hover:border-${accentColor}/20
        transition-all duration-300
        backdrop-blur-md
        ${sizeClasses[size]}
        ${aspectRatioClasses[aspectRatio]}
        ${className}
        group
        overflow-hidden
        relative
        bg-gradient-to-br from-white/90 via-white/85 to-white/80
        dark:from-gray-800/90 dark:via-gray-800/85 dark:to-gray-800/80
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-gray-800/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
      <div className={`
        relative h-full flex flex-col
        ${expandOnHover ? 'items-center justify-center' : 'justify-between'}
      `}>
        <div className={`
          flex items-center gap-4
          ${expandOnHover ? 'justify-center w-full' : ''}
          ${expandOnHover ? (isHovered ? 'h-12 mb-3' : 'h-full') : ''}
          transition-all duration-200
        `}>
          <div className={`
            bg-gradient-to-br from-${accentColor}/10 via-${accentColor}/8 to-${accentColor}/5
            dark:from-${accentColor}/20 dark:via-${accentColor}/15 dark:to-${accentColor}/10
            transition-all duration-200
            rounded-xl
            backdrop-blur-md
            ${expandOnHover ? (
              isHovered ? 'p-2.5 scale-95' : 'p-6 scale-100'
            ) : 'p-3.5'}
            group-hover:shadow-[0_4px_15px_rgb(0,0,0,0.03)]
            group-hover:border-${accentColor}/10
            border border-white/10 dark:border-white/5
          `}>
            <Icon className={`
              text-${accentColor} dark:text-${accentColor}
              transition-all duration-200
              ${expandOnHover ? (
                isHovered ? 'w-7 h-7' : 'w-12 h-12'
              ) : iconSizeClasses[size]}
              ${expandOnHover && isHovered ? 'rotate-0' : ''}
              ${expandOnHover && !isHovered ? 'hover:rotate-3' : ''}
              group-hover:filter group-hover:brightness-110
              drop-shadow-sm
            `} />
          </div>
          {title && !expandOnHover && (
            <h3 className="text-lg font-medium bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </h3>
          )}
        </div>
        <AnimatePresence mode="wait">
          {(!expandOnHover || isHovered) && (
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`
                text-gray-600/90 dark:text-gray-300/90
                ${size === "large" ? "text-base" : "text-sm"}
                leading-relaxed
                ${expandOnHover ? 'text-center px-3' : 'text-left'}
                overflow-hidden
              `}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const GithubStatsCard = ({ index }: { index: number }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-50px" }}
    custom={index}
    className="
      col-span-2 row-span-1
      bg-white/90 dark:bg-gray-800/90
      rounded-2xl p-5
      shadow-[0_4px_20px_rgb(0,0,0,0.03)]
      border border-white/8 dark:border-gray-700/15
      transition-all duration-300
      backdrop-blur-md
      overflow-hidden
      group
      relative
    "
  >
    <div className="relative">
      <Link 
        href="https://github.com/Mystic-Stars" 
        target="_blank"
        className="flex items-center gap-3 justify-center mb-5 group/link"
      >
        <div className="
          bg-gradient-to-br from-pink/10 via-pink/8 to-pink/5
          dark:from-pink/20 dark:via-pink/15 dark:to-pink/10
          p-3 rounded-xl
          transition-all duration-200
          backdrop-blur-md
          border border-white/10 dark:border-white/5
        ">
          <FaGithub className="w-7 h-7 text-pink dark:text-pink transition-all duration-300" />
        </div>
        <span className="text-lg font-medium bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          GitHub Activity
        </span>
      </Link>
      <div className="
        bg-white/95 dark:bg-gray-800/95
        rounded-xl p-4
        shadow-[0_4px_15px_rgb(0,0,0,0.02)]
        transition-all duration-300
        backdrop-blur-md
        border border-white/10 dark:border-white/5
      ">
        <div className="relative overflow-hidden rounded-lg bg-[#161B22] aspect-[2/1]">
          <img
            src="https://raw.githubusercontent.com/Mystic-Stars/Mystic-Stars/output/github-contribution-grid-snake-dark.svg"
            alt="GitHub Contribution Snake Animation"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </motion.div>
)

const ImageCard = ({ index, image, accentColor = "pink" }: { index: number, image: string, accentColor?: string }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-50px" }}
    custom={index}
    whileHover={{ 
      scale: 1.02,
      y: -3,
      transition: {
        duration: 0.2,
        ease: [0.3, 0, 0.2, 1]
      }
    }}
    className={`
      col-span-1 row-span-1
      aspect-square
      bg-gradient-to-br from-white/90 via-white/85 to-white/80
      dark:from-gray-800/90 dark:via-gray-800/85 dark:to-gray-800/80
      rounded-2xl
      shadow-[0_4px_20px_rgb(0,0,0,0.03)]
      hover:shadow-[0_6px_30px_rgb(0,0,0,0.06)]
      border border-white/8 dark:border-gray-700/15
      hover:border-${accentColor}/20 dark:hover:border-${accentColor}/20
      transition-all duration-300
      backdrop-blur-md
      overflow-hidden
      group
    `}
  >
    <div className="relative w-full h-full">
      <img
        src={image}
        alt="Profile"
        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:filter group-hover:brightness-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </div>
  </motion.div>
)

export default function About() {
  const { ref } = useSectionInView("About")
  const t = useTranslations("AboutSection")
  const sectionLan = useTranslations("SectionName")
  const activeLocale = useLocale()

  const aboutCards: AboutCardType[] = [
    {
      icon: FaCode,
      title: activeLocale === "zh" ? "关于我" : "About Me",
      content: activeLocale === "zh" 
        ? "你好！我是一名来自成都的学生开发者 👋 热爱编程与网站开发，专注于创造优雅的数字体验。"
        : "Hello! I'm a student developer from Chengdu 👋 Passionate about coding and web development, focused on creating elegant digital experiences.",
      size: "large" as const,
      aspectRatio: "wide" as const,
      priority: "high" as const,
      accentColor: "pink"
    },
    {
      type: "image",
      image: "https://bu.dusays.com/2024/05/18/6648acfe0db3b.png",
      accentColor: "pink"
    },
    {
      icon: FaGamepad,
      title: "Minecraft",
      content: activeLocale === "zh"
        ? "游戏ID：Mystic_Stars ⚔️ 热爱生存建造与小游戏！"
        : "Game ID: Mystic_Stars ⚔️ Love survival building and mini-games.",
      size: "medium" as const,
      aspectRatio: "square" as const,
      priority: "medium" as const,
      accentColor: "emerald"
    },
    {
      icon: PiTelevisionSimpleFill,
      title: activeLocale === "zh" ? "二次元" : "Anime",
      content: activeLocale === "zh"
        ? "动漫爱好者 🌸 在博客分享我的追番历程与感想"
        : "Anime enthusiast 🌸 Sharing my anime journey and thoughts on my blog",
      size: "small" as const,
      expandOnHover: true,
      priority: "low" as const,
      accentColor: "violet"
    },
    {
      icon: FaBook,
      title: activeLocale === "zh" ? "博客" : "Blog",
      content: activeLocale === "zh"
        ? "记录技术成长与生活点滴 📝 分享我的编程之路与个人思考"
        : "Documenting tech growth and life moments 📝 Sharing my coding journey and personal insights",
      size: "medium" as const,
      priority: "medium" as const,
      accentColor: "sky"
    },
    {
      icon: SiBilibili,
      title: "Bilibili",
      content: activeLocale === "zh"
        ? "欢迎访问我的B站频道 📺 分享更多有趣的编程内容"
        : "Welcome to my Bilibili channel 📺 Sharing more interesting programming content",
      size: "medium" as const,
      priority: "medium" as const,
      accentColor: "blue"
    },
    {
      icon: FaEnvelope,
      title: activeLocale === "zh" ? "联系我" : "Contact",
      content: activeLocale === "zh"
        ? "📮 1278347583@qq.com · 期待与你交流"
        : "📮 1278347583@qq.com · Looking forward to connecting",
      size: "small" as const,
      expandOnHover: true,
      priority: "low" as const,
      accentColor: "amber"
    }
  ]

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[65rem] text-center leading-8 sm:mb-40 scroll-mt-28 px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="about"
    >
      <SectionHeading>{sectionLan("about")}</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(120px,auto)] gap-4">
        {aboutCards.map((card, index) => (
          card.type === "image" ? (
            <ImageCard
              key={index}
              index={index}
              image={card.image}
              accentColor={card.accentColor}
            />
          ) : (
            <AboutCard
              key={index}
              icon={card.icon}
              title={card.title}
              content={card.content}
              index={index}
              size={card.size}
              expandOnHover={card.expandOnHover}
              aspectRatio={card.aspectRatio}
              priority={card.priority}
              accentColor={card.accentColor}
            />
          )
        ))}
        <GithubStatsCard index={aboutCards.length} />
      </div>
    </motion.section>
  )
}
