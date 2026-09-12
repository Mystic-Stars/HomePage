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

  return (
    <header className="z-[999] relative">
      <motion.nav
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 h-[2.85rem] sm:top-6 sm:h-[3.25rem] rounded-full border border-white/60 bg-white/70 shadow-lg shadow-black/[0.04] backdrop-blur-md dark:bg-gray-950/80 dark:border-white/10 p-1 sm:p-1.5 flex items-center justify-center w-max max-w-[calc(100vw-1rem)]"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <ul className="flex items-center justify-center font-medium text-gray-500 select-none text-[0.74rem] min-[360px]:text-[0.78rem] sm:text-[0.88rem] gap-0.5 sm:gap-1">
          {links.map((link) => (
            <li
              key={link.hash}
              className="flex items-center justify-center relative"
            >
              <Link
                href={link.hash}
                className={clsx(
                  "flex items-center justify-center whitespace-nowrap transition-colors duration-150 rounded-full px-2 py-1 min-[360px]:px-2.5 min-[360px]:py-1.5 sm:px-3.5 sm:py-2",
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
            </li>
          ))}
        </ul>
      </motion.nav>
    </header>
  )
}

export default Header
