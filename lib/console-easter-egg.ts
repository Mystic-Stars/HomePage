/**
 * F12 开发者控制台极客彩蛋与 Konami Code 核心逻辑
 * 纯粹硬核极简风格，无多余装饰
 */

let hasPrinted = false

export function initConsoleEasterEgg(openTerminalCallback?: (mode?: "terminal" | "rainOnly") => void) {
  if (typeof window === "undefined") return

  // 挂载全局神秘指令 window.mystic()
  ;(window as unknown as { mystic?: () => string }).mystic = () => {
    if (openTerminalCallback) {
      openTerminalCallback("terminal")
      return "Terminal session initialized."
    }
    return "MysticStars System online."
  }

  // 挂载全局字符雨指令 window.rain()
  ;(window as unknown as { rain?: () => string }).rain = () => {
    if (openTerminalCallback) {
      openTerminalCallback("rainOnly")
      return "Matrix Rain activated. Press [ESC] or click anywhere to exit."
    }
    return "Matrix Rain ready."
  }

  if (hasPrinted) return
  hasPrinted = true

  const banner = [
    " __  __           _   _        ____  _                 ",
    "|  \\/  |_   _ ___| |_(_) ___  / ___|| |_ __ _ _ __ ___",
    "| |\\/| | | | / __| __| |/ __| \\___ \\| __/ _` | '__/ __|",
    "| |  | | |_| \\__ \\ |_| | (__   ___) | || (_| | |  \\__ \\",
    "|_|  |_|\\__, |___/\\__|_|\\___| |____/ \\__\\__,_|_|  |___/",
    "        |___/                                         ",
  ].join("\n")

  console.log(
    `%c${banner}`,
    "color: #10b981; font-family: monospace; font-weight: bold; line-height: 1.15; white-space: pre;"
  )
  console.log(
    `%cDiscover Infinity\n`,
    "color: #94a3b8; font-family: monospace; font-size: 13px; font-weight: 500; letter-spacing: 0.08em;"
  )
  console.log(
    `%c[Terminal] %cmystic()%c  ·  [Matrix Rain] %crain()%c  ·  [Shortcuts] %c?`,
    "color: #10b981; font-family: monospace; font-weight: 600;",
    "color: #38bdf8; font-family: monospace;",
    "color: #64748b;",
    "color: #38bdf8; font-family: monospace;",
    "color: #64748b;",
    "color: #f59e0b; font-family: monospace;"
  )
}

/**
 * 经典 Konami Code 监听器
 * 序列: Up, Up, Down, Down, Left, Right, Left, Right, b, a
 */
export function listenKonamiCode(onTrigger: () => void): () => void {
  if (typeof window === "undefined") return () => {}

  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  let currentIndex = 0

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return
    }

    const expectedKey = konamiSequence[currentIndex]
    if (e.key.toLowerCase() === expectedKey.toLowerCase()) {
      currentIndex++
      if (currentIndex === konamiSequence.length) {
        currentIndex = 0
        onTrigger()
      }
    } else {
      currentIndex = 0
    }
  }

  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}
