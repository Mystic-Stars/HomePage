"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { IoIosArrowDown } from "react-icons/io"

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-400 dark:text-gray-600 w-8 h-8 my-6 sm:my-12 rounded-full flex items-center justify-center"
    >
      <Link href="#about" aria-label="Scroll to About section">
        <IoIosArrowDown className="text-xl animate-bounce" />
      </Link>
    </motion.div>
  )
}
