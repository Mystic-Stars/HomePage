"use client"
import React from "react"
import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { useSectionInView } from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"

export default function About() {
  const { ref } = useSectionInView("About")
  const t = useTranslations("AboutSection")
  const sectionLan = useTranslations("SectionName")
  const activeLocale = useLocale()

  return (
    <motion.section
      ref={ref}
      className="mb-50 max-w-[45rem] text-start leading-8 sm:mb-40 scroll-mt-28 mb-28 "
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{sectionLan("about")}</SectionHeading>
      {activeLocale == "zh" ? (
        <p>{t("desc")}</p>
      ) : (
        <>
          <p className="mb-3">
            🙋‍♂️ Hello there! I&apos;m a student from China, currently studying in the vibrant city of Chengdu📚. I have a deep passion for programming💻 and I&apos;m proficient in languages like Python. Web development is another area that fascinates me. Feel free to click the button above to visit my blog🌐, where I share more about my personal stories and dive into various technical topics.

            When I&apos;m not coding, you can often find me immersed in the world of Minecraft🎮. My in-game name is Mystic_Stars, and I enjoy survival mode, mini-games, and PVP. As an anime enthusiast🌸, I also love to document the shows I&apos;ve watched and enjoyed on my blog📺.

            If you&apos;re curious to learn more about me, just hit the buttons above to check out my Bilibili channel📽️ and GitHub profile💾. And if you&apos;d like to get in touch, feel free to drop me an email📮 at 1278347583@qq.com. Looking forward to connecting with you!
          </p>

        </>
      )}
    </motion.section>
  )
}
