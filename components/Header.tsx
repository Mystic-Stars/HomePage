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
  const isZh = activeLocale === "zh"

  const headerWidthClass = isZh
    ? "w-[calc(100vw-1.5rem)] max-w-[24.5rem] sm:w-[31rem]"
    : "w-[calc(100vw-1.5rem)] max-w-[26.5rem] sm:w-[34.5rem]"

  return (
    <header className="z-[999] relative">
      <motion.div
        className={clsx(
          "fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 h-[2.85rem] rounded-full border border-white/60 bg-white/70 shadow-lg shadow-black/[0.04] backdrop-blur-md sm:top-6 sm:h-[3.25rem] dark:bg-gray-950/80 dark:border-white/10",
          headerWidthClass
        )}
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav
        className={clsx(
          "flex fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 h-[2.85rem] -translate-x-1/2 items-center justify-center sm:top-6 sm:h-[3.25rem]",
          headerWidthClass
        )}
      >
        <ul
          className={clsx(
            "flex w-full items-center justify-around sm:justify-center font-medium text-gray-500 select-none",
            isZh
              ? "px-1 sm:px-2 text-[0.8rem] sm:text-[0.9rem] sm:gap-3"
              : "px-1.5 sm:px-2 text-[0.74rem] min-[375px]:text-[0.78rem] min-[410px]:text-[0.82rem] sm:text-[0.9rem] sm:gap-3"
          )}
        >
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
                  "flex items-center justify-center whitespace-nowrap transition-colors duration-150 rounded-full",
                  isZh
                    ? "px-2 py-1.5 sm:px-3 sm:py-2"
                    : "px-1.5 py-1 min-[375px]:px-2 min-[375px]:py-1.5 sm:px-3 sm:py-2",
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
                {isZh
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
