"use client"

import React from "react"
import { headerLanguageMap, projectsData } from "@/lib/data"
import { useSectionInView } from "@/lib/hooks"
import SectionHeading from "./SectionHeading"
import Project from "./Project"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { FaAngleRight } from "react-icons/fa6"
import { motion } from "framer-motion"

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.1)
  const activeLocale = useLocale()
  const t = useTranslations("ProjectSection")

  return (
    <motion.section 
      ref={ref} 
      id="projects" 
      className="scroll-mt-28 mb-28"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeading>
        {activeLocale === "zh"
          ? headerLanguageMap["Projects"]
          : "Featured Projects"}
      </SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          className="group tracking-wide font-semibold text-pink dark:text-yellow w-full flex gap-1 items-center justify-center mt-12 hover:text-pink-600 dark:hover:text-yellow-400 transition-colors duration-200"
          target="_blank"
          href="https://github.com/Mystic-stars?tab=repositories"
        >
          {t("view_all")}
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <FaAngleRight className="text-lg" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.section>
  )
}
