"use client"

import React from "react"
import { headerLanguageMap } from "@/lib/data"
import { useSectionInView } from "@/lib/hooks"
import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { useLocale, useTranslations } from "next-intl"
import useSound from "use-sound"

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
  SiMinecraft,
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
      { name: "Minecraft", icon: <SiMinecraft />, color: "#5B8C33" },
      { name: "Scratch", icon: <SiScratch />, color: "#F99B1D" },
    ],
  },
]

export default function Skills() {
  const { ref } = useSectionInView("Skills")
  const activeLocale = useLocale()
  const [playPop] = useSound("/bubble.wav", { volume: 0.5 })
  const t = useTranslations("SkillSection")

  let runningIndex = 0

  return (
    <section
      id="skills"
      ref={ref}
      className="max-w-[53rem] scroll-mt-28 text-center mb-28"
    >
      <SectionHeading>
        {activeLocale === "zh"
          ? headerLanguageMap["Skills"]
          : "My Skills"}
      </SectionHeading>

      <div className="space-y-7">
        {skillCategories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            {/* 极简分类小标签 */}
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-3">
              {category.icon}
              <span>{t(category.id)}</span>
            </div>

            {/* 纯净胶囊徽章流 */}
            <ul className="flex flex-wrap justify-center gap-3 text-lg text-gray-800">
              {category.skills.map((skill) => {
                const itemIndex = runningIndex++
                return (
                  <motion.li
                    key={skill.name}
                    className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80 cursor-pointer select-none"
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={itemIndex}
                    whileHover={{
                      scale: 1.1,
                      rotate: [-1, 1, -1, 0],
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => playPop()}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xl"
                        style={skill.color ? { color: skill.color } : undefined}
                      >
                        {skill.icon}
                      </span>
                      <span className="text-base sm:text-lg">{skill.name}</span>
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

