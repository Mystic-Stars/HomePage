"use client"

import { useEffect } from "react"

export default function RootPage() {
  useEffect(() => {
    const userLang =
      navigator.language ||
      (navigator as unknown as { userLanguage?: string }).userLanguage ||
      ""
    if (userLang.toLowerCase().includes("zh")) {
      window.location.replace("/zh/")
    } else {
      window.location.replace("/en/")
    }
  }, [])

  return (
    <html lang="zh">
      <head>
        <meta httpEquiv="refresh" content="0;url=/zh/" />
        <title>Redirecting...</title>
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen text-gray-500 text-sm font-sans">
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/zh/" />
          <p>
            正在跳转 / Redirecting to{" "}
            <a href="/zh/" className="underline text-blue-500">
              中文版本
            </a>{" "}
            /{" "}
            <a href="/en/" className="underline text-blue-500">
              English version
            </a>
          </p>
        </noscript>
      </body>
    </html>
  )
}
