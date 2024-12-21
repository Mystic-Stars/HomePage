"use client"

import { useRef } from "react"
import { projectsData } from "@/lib/data"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"
import { FiExternalLink } from "react-icons/fi"
import { useLocale } from "next-intl"

type ProjectProps = (typeof projectsData)[number]

export default function Project({
  title,
  description,
  desc_zh,
  title_zh,
  tags,
  imageUrl,
  projectUrl,
  demoUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  })
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.98, 1])
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const activeLocale = useLocale()

  const handleCardClick = () => {
    window.open(demoUrl || projectUrl, '_blank')
  }

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
      viewport={{ once: true }}
    >
      <section 
        onClick={handleCardClick}
        className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm max-w-[45rem] border border-gray-100 dark:border-gray-700/50 rounded-2xl overflow-hidden sm:pr-8 relative sm:h-[28rem] transition-all duration-300 sm:group-even:pl-8 dark:text-white cursor-pointer"
      >
        <div className="pt-8 pb-8 px-6 sm:pl-12 sm:pr-2 sm:pt-12 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <div className="flex flex-col gap-5">
            <motion.h3 
              className="text-2xl font-semibold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              {activeLocale === "zh" ? title_zh : title}
            </motion.h3>

            <motion.p 
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-[0.95rem]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {activeLocale === "zh" ? desc_zh : description}
            </motion.p>

            <div className="flex gap-5 text-[0.9rem]" onClick={(e) => e.stopPropagation()}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={projectUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink dark:hover:text-yellow transition-all duration-200"
                >
                  <FaGithub className="w-[1.1rem] h-[1.1rem]" />
                  <span className="font-medium">Source</span>
                </Link>
              </motion.div>
              
              {demoUrl && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={demoUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink dark:hover:text-yellow transition-all duration-200"
                  >
                    <FiExternalLink className="w-[1.1rem] h-[1.1rem]" />
                    <span className="font-medium">Demo</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          <motion.ul 
            className="flex flex-wrap mt-auto gap-2 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {tags.map((tag, index) => (
              <motion.li
                className="bg-white/60 dark:bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-full border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200"
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-xl shadow-sm
          transition-all duration-300
          group-hover:scale-[1.01]
          group-hover:-translate-x-2
          group-hover:translate-y-2
          group-hover:shadow-md
          group-even:right-[initial] group-even:-left-40"
        />
      </section>
    </motion.div>
  )
}
