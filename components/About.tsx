"use client"

import React from "react"
import SectionHeading from "./SectionHeading"
import { motion } from "framer-motion"
import { useSectionInView } from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"
import { FaGamepad, FaCode, FaBook, FaEnvelope, FaGithub } from "react-icons/fa6"
import { PiTelevisionSimpleFill } from "react-icons/pi"
import { SiBilibili } from "react-icons/si"
import Link from "next/link"

const cardVariants = {
  initial: {
    opacity: 0.8,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function About() {
  const { ref } = useSectionInView("About")
  const t = useTranslations("AboutSection")
  const sectionLan = useTranslations("SectionName")
  const activeLocale = useLocale()

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      id="about"
    >
      <SectionHeading>{sectionLan("about")}</SectionHeading>
      <div className="flex flex-col gap-6">
        <motion.div 
          className="group bg-gradient-to-br from-white/40 to-white/80 dark:from-gray-900/40 dark:to-gray-800/80 rounded-3xl p-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-pink/20 dark:hover:border-yellow/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-start gap-4 mb-6 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <FaCode className="w-6 h-6 text-pink dark:text-yellow" />
            </motion.div>
            <p className="text-left">
              {activeLocale === "zh" ? (
                "你好，🙋‍♂️我是一名来自中国的学生，现在正在成都学习📚。我热爱编程💻，熟悉Python等编程语言，也热衷于网站开发。"
              ) : (
                "Hello! 🙋‍♂️ I'm a student from China, currently studying in Chengdu 📚. I love programming 💻, am proficient in Python and passionate about web development."
              )}
            </p>
          </div>
          
          <div className="flex items-start gap-4 mb-6 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
              initial={{ scale: 0.5, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <FaGamepad className="w-6 h-6 text-pink dark:text-yellow" />
            </motion.div>
            <p className="text-left">
              {activeLocale === "zh" ? (
                "我喜欢游玩Minecraft🎮，我的游戏名称是：Mystic_Stars，我游玩生存，小游戏以及PVP。"
              ) : (
                "I enjoy playing Minecraft 🎮, where I go by Mystic_Stars. I play survival, mini-games, and PVP."
              )}
            </p>
          </div>

          <div className="flex items-start gap-4 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <PiTelevisionSimpleFill className="w-6 h-6 text-pink dark:text-yellow" />
            </motion.div>
            <p className="text-left">
              {activeLocale === "zh" ? (
                "我也是一名二次元爱好者🌸，在我的博客里面记录了我看过的和喜欢的番剧📺。"
              ) : (
                "I'm also an anime enthusiast 🌸, and I document my favorite shows on my blog 📺."
              )}
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="group bg-gradient-to-br from-white/40 to-white/80 dark:from-gray-900/40 dark:to-gray-800/80 rounded-3xl p-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-pink/20 dark:hover:border-yellow/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4 mb-6 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
              initial={{ scale: 0.5, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <FaBook className="w-6 h-6 text-pink dark:text-yellow" />
            </motion.div>
            <p className="text-left">
              {activeLocale === "zh" ? (
                "你可以通过上方按钮访问我的博客🌐，在那里，我会分享更多有关我自己的故事及更多技术内容。"
              ) : (
                "You can visit my blog 🌐 through the button above, where I share more about my journey and technical insights."
              )}
            </p>
          </div>

          <div className="flex items-start gap-4 mb-6 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <SiBilibili className="w-6 h-6 text-pink dark:text-yellow" />
            </motion.div>
            <p className="text-left">
              {activeLocale === "zh" ? (
                "如果你想了解更多有关我的内容，可以通过上方按钮访问我的Bilibili频道📽️和Github主页💾。"
              ) : (
                "To learn more about me, you can check out my Bilibili channel 📽️ and GitHub profile 💾 through the buttons above."
              )}
            </p>
          </div>

          <div className="flex items-start gap-4 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
              initial={{ scale: 0.5, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <FaEnvelope className="w-6 h-6 text-pink dark:text-yellow" />
            </motion.div>
            <p className="text-left">
              {activeLocale === "zh" ? (
                "或者致邮📮1278347583@qq.com。"
              ) : (
                "Or feel free to email me at 📮 1278347583@qq.com."
              )}
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="group bg-gradient-to-br from-white/40 to-white/80 dark:from-gray-900/40 dark:to-gray-800/80 rounded-3xl p-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-pink/20 dark:hover:border-yellow/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Link 
              href="https://github.com/Mystic-Stars" 
              target="_blank"
              className="flex items-center gap-3 justify-center mb-4 text-gray-700 dark:text-gray-300 group/link"
            >
              <FaGithub className="w-6 h-6 text-pink dark:text-yellow group-hover/link:rotate-[360deg] transition-transform duration-500" />
              <span className="text-lg font-medium">GitHub Contributions</span>
            </Link>
            <img
              src="https://ghchart.rshah.org/FF69B4/Mystic-Stars"
              alt="GitHub Contributions Chart"
              className="w-full rounded-xl dark:brightness-90 dark:contrast-[1.1] transition-all duration-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
