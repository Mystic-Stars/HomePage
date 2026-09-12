"use client"

import React, { useState } from "react"
import Image from "next/image"
import { headerLanguageMap } from "@/lib/data"
import { useSectionInView } from "@/lib/hooks"
import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { useLocale, useTranslations } from "next-intl"
import { useSoundContext } from "@/context/sound-context"

import {
  SiTypescript,
  SiJavascript,
  SiRust,
  SiPython,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiReact,
  SiTauri,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiZedindustries,
  SiNodedotjs,
  SiScratch,
} from "react-icons/si"
import { FaCode, FaGamepad } from "react-icons/fa6"
import { LuLayers, LuWrench } from "react-icons/lu"

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
    },
  }),
}

interface SkillItem {
  name: string
  icon: React.ReactNode
  color?: string
}

interface SkillCategory {
  id: "languages" | "frameworks" | "tools" | "creative"
  icon: React.ReactNode
  skills: SkillItem[]
}

// 严谨科学的技术栈生态共生网络
const skillRelationships: Record<string, string[]> = {
  // 现代 Web 全栈生态
  TypeScript: ["JavaScript", "React", "Next.js", "Tauri", "Node.js"],
  JavaScript: ["TypeScript", "HTML5", "CSS3", "React", "Next.js", "Node.js"],
  HTML5: ["CSS3", "JavaScript", "React", "Tailwind CSS"],
  CSS3: ["HTML5", "Tailwind CSS", "JavaScript", "React"],
  React: ["Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Tauri"],
  "Next.js": ["React", "TypeScript", "Tailwind CSS", "Node.js"],
  "Tailwind CSS": ["HTML5", "CSS3", "React", "Next.js"],
  "Node.js": ["TypeScript", "JavaScript", "Next.js", "React"],

  // 系统级与跨平台客户端生态
  Rust: ["Tauri", "Zed"],
  Tauri: ["Rust", "TypeScript", "React", "Next.js", "Tailwind CSS"],

  // 版本控制系统
  Git: ["GitHub"],
  GitHub: ["Git"],

  // 现代开发环境
  "VS Code": ["TypeScript", "Python"],
  Zed: ["Rust"],
  Python: ["VS Code"],

  // 兴趣创造类
  Minecraft: ["Scratch"],
  Scratch: ["Minecraft"],
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    icon: <FaCode className="text-xs" />,
    skills: [
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "Rust", icon: <SiRust />, color: "#CE412B" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572B6" },
    ],
  },
  {
    id: "frameworks",
    icon: <LuLayers className="text-xs" />,
    skills: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Tauri", icon: <SiTauri />, color: "#24C8DB" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    ],
  },
  {
    id: "tools",
    icon: <LuWrench className="text-xs" />,
    skills: [
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "VS Code", icon: <SiVisualstudiocode />, color: "#007ACC" },
      { name: "Zed", icon: <SiZedindustries />, color: "#0845F5" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#5FA04E" },
    ],
  },
  {
    id: "creative",
    icon: <FaGamepad className="text-xs" />,
    skills: [
      {
        name: "Minecraft",
        icon: (
          <Image
            src="/minecraft.png"
            alt="Minecraft"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-[4px]"
          />
        ),
        color: "#5B8C33",
      },
      { name: "Scratch", icon: <SiScratch />, color: "#F99B1D" },
    ],
  },
]

export default function Skills() {
  const { ref } = useSectionInView("Skills")
  const activeLocale = useLocale()
  const { playPop } = useSoundContext()
  const t = useTranslations("SkillSection")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  let runningIndex = 0

  return (
    <section
      id="skills"
      ref={ref}
      className="max-w-[53rem] scroll-mt-28 text-center mb-16 sm:mb-28 px-2 sm:px-4"
    >
      <SectionHeading>
        {activeLocale === "zh"
          ? headerLanguageMap["Skills"]
          : "My Skills"}
      </SectionHeading>

      <div
        className="space-y-6 sm:space-y-7"
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {skillCategories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            {/* 极简分类小标签 */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-2.5 sm:mb-3">
              {category.icon}
              <span>{t(category.id)}</span>
            </div>

            {/* 纯净胶囊徽章流与生态引力共振 */}
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm sm:text-lg text-gray-800">
              {category.skills.map((skill) => {
                const itemIndex = runningIndex++
                const isCurrent = hoveredSkill === skill.name
                const isConnected =
                  hoveredSkill !== null &&
                  !isCurrent &&
                  Boolean(skillRelationships[hoveredSkill]?.includes(skill.name))
                const isDimmed =
                  hoveredSkill !== null && !isCurrent && !isConnected

                return (
                  <motion.li
                    key={skill.name}
                    className={`relative rounded-xl px-3.5 py-2 sm:px-5 sm:py-3 cursor-pointer select-none active:scale-95 transition-all duration-200 border ${
                      isCurrent
                        ? "bg-white dark:bg-gray-800 text-gray-950 dark:text-white border-transparent z-20 shadow-md"
                        : isConnected
                        ? "bg-white/95 dark:bg-gray-800/90 text-gray-950 dark:text-white border-gray-400/80 dark:border-gray-500/80 shadow-xs z-10"
                        : isDimmed
                        ? "bg-white/60 dark:bg-white/5 text-gray-400 dark:text-white/30 border-black/5 dark:border-white/5 opacity-35"
                        : "bg-white border-black/10 dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                    }`}
                    style={
                      isCurrent && skill.color
                        ? {
                            boxShadow: `0 6px 22px -2px ${skill.color}35`,
                            borderColor: skill.color,
                          }
                        : undefined
                    }
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={itemIndex}
                    animate={{
                      scale: isCurrent ? 1.06 : isConnected ? 1.02 : isDimmed ? 0.98 : 1,
                      y: isCurrent ? -2.5 : isConnected ? -1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    onMouseEnter={() => {
                      setHoveredSkill(skill.name)
                      playPop(0.04)
                    }}
                    onTap={() => {
                      setHoveredSkill((prev) => (prev === skill.name ? null : skill.name))
                      playPop(0.05)
                    }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span
                        className={`text-base sm:text-xl transition-all duration-200 flex items-center justify-center shrink-0 ${
                          isDimmed ? "grayscale opacity-60" : "grayscale-0 opacity-100"
                        }`}
                        style={
                          skill.color && (!isDimmed || isCurrent)
                            ? { color: skill.color }
                            : undefined
                        }
                      >
                        {skill.icon}
                      </span>
                      <span className="text-xs sm:text-base font-medium">
                        {skill.name}
                      </span>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

