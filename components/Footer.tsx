import React from "react"

export default function Footer() {
  return (
    <footer className="mb-12 sm:mb-10 px-4 text-center text-gray-500 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto text-xs leading-relaxed">
      <small className="mb-2 block text-xs" suppressHydrationWarning>
        &copy; {new Date().getFullYear()} Mystic_Stars.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, EdgeOne Makers hosting.
      </p>
    </footer>
  )
}
