"use client"

import React from "react"
import { headerLanguageMap, projectsData } from "@/lib/data"
import { useSectionInView } from "@/lib/hooks"
import SectionHeading from "./SectionHeading"
import Project from "./Project"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { FaGithub } from "react-icons/fa6"
import { FiArrowUpRight } from "react-icons/fi"
import { motion } from "framer-motion"

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.1)
  const activeLocale = useLocale()
  const t = useTranslations("ProjectSection")

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="scroll-mt-28 mb-28 max-w-[50rem] w-full px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <SectionHeading>
        {activeLocale === "zh"
          ? headerLanguageMap["Projects"]
          : "Featured Projects"}
      </SectionHeading>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center -mt-4 mb-9 max-w-md mx-auto">
        {t("subtitle")}
      </p>

      <div className="flex flex-col gap-5 sm:gap-7">
        {projectsData.map((project, index) => (
          <Project key={index} {...project} index={index} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="https://github.com/Mystic-stars?tab=repositories"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200/90 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200/70 dark:border-gray-700/70 active:scale-[0.98] transition-colors duration-150"
        >
          <FaGithub className="w-4 h-4" />
          <span>{t("view_all")}</span>
          <FiArrowUpRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
        </Link>
      </div>
    </motion.section>
  )
}
