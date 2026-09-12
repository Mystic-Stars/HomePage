import Header from "@/components/Header"
import "./globals.css"
import { Inter } from "next/font/google"
import ThemeContextProvider from "@/context/theme-context"
import { SoundContextProvider } from "@/context/sound-context"
import { ActionSectionContextProvider } from "@/context/action-section-context"
import Footer from "@/components/Footer"
import ClientControls from "@/components/ClientControls"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

import type { Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }]
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const messages = useMessages()

  return (
    <html lang={locale} className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var isDark=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(isDark){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative overflow-x-hidden min-h-screen dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 antialiased`}
      >
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#5b3b3c] pointer-events-none transform-gpu transition-colors duration-500"></div>
          <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#433f68] pointer-events-none transform-gpu transition-colors duration-500"></div>
        </div>

        <NextIntlClientProvider messages={messages}>
          <SoundContextProvider>
            <ThemeContextProvider>
              <ActionSectionContextProvider>
                <Header />
                {children}
                <Footer />
                <ClientControls />
              </ActionSectionContextProvider>
            </ThemeContextProvider>
          </SoundContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
