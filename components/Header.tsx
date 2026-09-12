"use client"

import { motion } from "framer-motion"
import { links } from "@/lib/data"
import Link from "next/link"
import clsx from "clsx"
import { headerLanguageMap } from "@/lib/data"
import { useActiveSectionContext } from "@/context/action-section-context"
import { useLocale } from "next-intl"

function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext()
  const activeLocale = useLocale()
  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 h-[2.85rem] w-[calc(100vw-1.5rem)] max-w-[24.5rem] rounded-full border border-white/60 bg-white/70 shadow-lg shadow-black/[0.04] backdrop-blur-md sm:top-6 sm:h-[3.25rem] sm:w-[30rem] dark:bg-gray-950/80 dark:border-white/10"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav className="flex fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 h-[2.85rem] -translate-x-1/2 w-[calc(100vw-1.5rem)] max-w-[24.5rem] items-center justify-center sm:top-6 sm:h-[3.25rem] sm:w-[30rem]">
        <ul className="flex w-full items-center justify-around sm:justify-center px-1 sm:px-2 text-[0.8rem] sm:text-[0.9rem] font-medium text-gray-500 sm:gap-3 select-none">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              className="flex items-center justify-center relative"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href={link.hash}
                className={clsx(
                  "flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap transition-colors duration-150 rounded-full",
                  {
                    "text-gray-950 dark:text-gray-100 font-semibold":
                      activeSection === link.name,
                    "hover:text-gray-950 dark:hover:text-gray-200":
                      activeSection !== link.name,
                  }
                )}
                onClick={() => {
                  setActiveSection(link.name)
                  setTimeOfLastClick(Date.now())
                }}
              >
                {activeLocale === "zh"
                  ? headerLanguageMap[link.name]
                  : link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-100/90 dark:bg-gray-800/90 rounded-full absolute inset-0 -z-10 shadow-xs"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
