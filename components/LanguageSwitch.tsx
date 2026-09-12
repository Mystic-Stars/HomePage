"use client"

import { IoLanguageOutline } from "react-icons/io5"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

export default function LanguageSwitch() {
  const localActive = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const onChangeLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextLocale = localActive === "en" ? "zh" : "en"
    const newPath = pathname.replace(/^\/(en|zh)/, `/${nextLocale}/`)
    router.replace(newPath, {
      scroll: false,
    })
  }

  return (
    <>
      <button
        onClick={onChangeLanguage}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 hover:scale-[1.15] active:scale-90 transition-transform select-none"
        title={localActive === "zh" ? "切换为英文 (Switch to EN)" : "Switch to Chinese (切换为中文)"}
        aria-label="Change Language"
      >
        <span>{localActive === "en" ? "EN" : "ZH"}</span>
      </button>
    </>
  )
}
