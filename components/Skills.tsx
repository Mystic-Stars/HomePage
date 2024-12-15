"use client"

import React from "react"
import { headerLanguageMap, skillsData } from "@/lib/data"
import { useSectionInView } from "@/lib/hooks"
import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { useLocale, useTranslations } from "next-intl"
import { FaPython } from "react-icons/fa";
import { BiLogoGit } from "react-icons/bi";
import { FaGithub, FaCode } from "react-icons/fa6";
import { SiMinecraft, SiScratch } from "react-icons/si";
import useSound from "use-sound";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
}

const skillsWithIcons = [
  { name: "Python", icon: <FaPython className="text-xl" /> },
  { name: "Web", icon: <FaCode className="text-xl" /> },
  { name: "Git", icon: <BiLogoGit className="text-xl" /> },
  { name: "Github", icon: <FaGithub className="text-xl" /> },
  { name: "Minecraft", icon: <SiMinecraft className="text-xl" /> },
  { name: "Scratch", icon: <SiScratch className="text-xl" /> },
];

export default function Skills() {
  const { ref } = useSectionInView("Skills")
  const activeLocale = useLocale()
  const [playPop] = useSound("/bubble.wav", { volume: 0.5 });
  const t = useTranslations("SkillSection");
  const sectionLan = useTranslations("SectionName");

  return (
    <section
      id="skills"
      ref={ref}
      className=" max-w-[53rem] scroll-mt-28 text-center mb-28"
    >
      <SectionHeading>
        {" "}
        {activeLocale === "zh"
          ? headerLanguageMap["Skills"]
          : "My Skills"}
      </SectionHeading>
      <ul className="flex flex-wrap justify-center gap-3 text-lg text-gray-800">
        {skillsWithIcons.map((skill, index) => (
          <motion.li
            className="group relative bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80 cursor-pointer"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
            whileHover={{
              scale: 1.1,
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => {
              playPop();
            }}
          >
            <div className="flex items-center gap-2">
              {skill.icon}
              <span>{skill.name}</span>
            </div>
            
            <motion.div
              className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 min-w-max"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t(skill.name)}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
