"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BsArrowRight, BsLinkedin } from "react-icons/bs"
import { HiDownload } from "react-icons/hi"
import { FaGithubSquare } from "react-icons/fa"
import Link from "next/link"
import { Source_Code_Pro } from "next/font/google"
import { useLocale } from "next-intl"
import { useSectionInView } from "@/lib/hooks"
import { TypeAnimation } from "react-type-animation"
import { useActiveSectionContext } from "@/context/action-section-context"
import { useTranslations } from "next-intl"
import useSound from "use-sound"
import { useSoundContext } from "@/context/sound-context"
import { FaPaperPlane } from "react-icons/fa";
import { FaBilibili } from "react-icons/fa6";



const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: "400" })

export default function Intro() {
  const { ref } = useSectionInView("Home")
  const activeLocale = useLocale()
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()
  const t = useTranslations("IntroSection")
  const { soundEnabled } = useSoundContext()
  const [playHover] = useSound("/bubble.wav", { volume: 0.5, soundEnabled })

  return (
    <section
      ref={ref}
      className="mb-14 max-w-[50rem] text-center sm:mb-0 scroll-mt-28 pt-24 sm:pt-[7rem]"
      id="home"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <Image
              src="/profile.png"
              alt="developer-image"
              width="250"
              height="250"
              quality="95"
              priority={true}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            onHoverStart={() => {
              if (soundEnabled) {
                playHover()
              }
            }}
            onTap={() => {
              if (soundEnabled) {
                playHover()
              }
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.25, rotate: 15 }}
            whileTap={{ scale: 1.25, rotate: 15 }}
            className="absolute text-3xl sm:text-4xl bottom-0 right-0 cursor-pointer select-none"
            transition={{
              type: "spring",
              duration: 0.7,
              delay: 0.1,
              stiffness: 125,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.div
        className="mb-8 sm:mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={`${sourceCodePro.className} text-xs sm:text-sm tracking-wider text-gray-500 dark:text-gray-400 block mb-1`}>
          {t("hello_im")}
        </span>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="place-self-center text-center"
        >
          <h1 className="text-center text-3xl sm:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-gray-900 dark:text-white">
            {t("name")}
          </h1>

          <div className="text-center flex flex-col items-center justify-center">
            <span className={`${sourceCodePro.className} text-xs sm:text-sm tracking-wider mb-1.5 text-gray-500 dark:text-gray-400`}>
              I&apos;m a{" "}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              <TypeAnimation
                sequence={[
                  "Minecraft Player",
                  1000,
                  "Student Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
          </div>
        </motion.div>

        <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 font-normal max-w-md mx-auto">
          {t("short_intro")}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4 text-sm sm:text-base font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <a
          href="https://www.mysticstars.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <span>{t("download_cv")}</span>
          <FaPaperPlane className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            className="bg-white p-2.5 sm:p-3 text-gray-700 hover:text-gray-950 flex items-center justify-center rounded-full focus:scale-110 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-gray-200/80 dark:border-gray-700/80 dark:bg-white/10 dark:text-white/80 shadow-xs text-base sm:text-lg"
            href="https://space.bilibili.com/2007491365"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bilibili space"
          >
            <FaBilibili />
          </a>

          <a
            className="bg-white p-2.5 sm:p-3 text-gray-700 flex items-center justify-center text-base sm:text-lg rounded-full focus:scale-110 hover:scale-110 hover:text-gray-950 active:scale-95 transition-all cursor-pointer border border-gray-200/80 dark:border-gray-700/80 dark:bg-white/10 dark:text-white/80 shadow-xs"
            href="https://github.com/Mystic-stars"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithubSquare />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
