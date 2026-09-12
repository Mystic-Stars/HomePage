"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiMaximize2 } from "react-icons/fi"
import { useSoundContext } from "@/context/sound-context"

interface MatrixTerminalModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "terminal" | "rainOnly"
}

interface LogEntry {
  type: "input" | "output" | "system"
  text: React.ReactNode
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "rain",
  "clear",
  "exit",
]

export default function MatrixTerminalModal({
  isOpen,
  onClose,
  initialMode = "terminal",
}: MatrixTerminalModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { playClick, playWhoosh } = useSoundContext()

  const [inputVal, setInputVal] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [isPureRain, setIsPureRain] = useState(initialMode === "rainOnly")
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "system",
      text: "MysticStars Shell (x86_64-apple-darwin / zsh 5.9)",
    },
    {
      type: "system",
      text: 'Type "help" to see available commands, or "rain" for matrix canvas.',
    },
  ])

  // Subtle Matrix Rain Canvas
  useEffect(() => {
    if (!isOpen) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    const chars =
      "0123456789ABCDEFabcdefXYZ*+~<>{}[]=/*|:;!@#$%^&MysticStarsｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ"
    const charArray = chars.split("")

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50)
    )

    const draw = () => {
      // Very deep translucent black for elegant subtle trails
      ctx.fillStyle = "rgba(3, 7, 18, 0.09)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        if (Math.random() > 0.98) {
          ctx.fillStyle = "#6ee7b7" // Subtle bright accent
        } else {
          ctx.fillStyle = "rgba(16, 185, 129, 0.55)" // Low-saturation refined green
        }

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen])

  // Auto focus input
  useEffect(() => {
    if (isOpen && !isPureRain) {
      inputRef.current?.focus()
      playWhoosh(0.04)
    }
  }, [isOpen, isPureRain, playWhoosh])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  // Command Execution Handler
  const executeCommand = useCallback(
    (rawCmd: string) => {
      const cmd = rawCmd.trim().toLowerCase()
      if (!cmd) return

      playClick(0.04)
      setHistory((prev) => [...prev, rawCmd])
      setHistoryIndex(-1)

      const newLogs: LogEntry[] = [
        ...logs,
        {
          type: "input",
          text: (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-mono">~ ❯</span>
              <span className="text-gray-100 font-mono font-medium">{rawCmd}</span>
            </div>
          ),
        },
      ]

      switch (cmd) {
        case "help":
          newLogs.push({
            type: "output",
            text: (
              <div className="space-y-1.5 my-1 text-[11px] font-mono leading-relaxed text-gray-300">
                <div className="text-gray-500">COMMANDS:</div>
                <div className="space-y-1 pl-2">
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">about</span>
                    <span className="text-gray-400">Developer profile & ethos</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">skills</span>
                    <span className="text-gray-400">Technical stack & toolchains</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">projects</span>
                    <span className="text-gray-400">Selected open-source repositories</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">contact</span>
                    <span className="text-gray-400">Communication endpoints</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">rain</span>
                    <span className="text-gray-400">Toggle fullscreen matrix rain</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">clear</span>
                    <span className="text-gray-400">Clear terminal buffer (Ctrl+L)</span>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr]">
                    <span className="text-emerald-400 font-semibold">exit</span>
                    <span className="text-gray-400">Terminate current session (Esc)</span>
                  </div>
                </div>
              </div>
            ),
          })
          break

        case "about":
          newLogs.push({
            type: "output",
            text: (
              <div className="space-y-1 my-1 text-[11px] font-mono leading-relaxed pl-2 text-gray-300 border-l border-emerald-500/30">
                <div><span className="text-gray-500">NAME:      </span> <span className="text-white font-medium">Mystic Stars</span></div>
                <div><span className="text-gray-500">ROLE:      </span> Student Developer & Web Explorer</div>
                <div><span className="text-gray-500">LOCATION:  </span> Chengdu, CN (UTC+8)</div>
                <div><span className="text-gray-500">MBTI:      </span> ENFJ-A (The Protagonist)</div>
                <div><span className="text-gray-500">MOTTO:     </span> <span className="text-emerald-400 font-semibold">Discover Infinity</span></div>
              </div>
            ),
          })
          break

        case "skills":
          newLogs.push({
            type: "output",
            text: (
              <div className="space-y-1 my-1 text-[11px] font-mono leading-relaxed pl-2 text-gray-300 border-l border-emerald-500/30">
                <div><span className="text-gray-500">LANGUAGES:   </span> TypeScript, JavaScript, Rust, Python, HTML5, CSS3</div>
                <div><span className="text-gray-500">FRAMEWORKS:  </span> Next.js, React, Tauri, Tailwind CSS</div>
                <div><span className="text-gray-500">TOOLCHAINS:  </span> Git, GitHub, VS Code, Zed, Node.js</div>
                <div><span className="text-gray-500">CREATIVE:    </span> Minecraft, Scratch</div>
              </div>
            ),
          })
          break

        case "projects":
          newLogs.push({
            type: "output",
            text: (
              <div className="space-y-1.5 my-1 text-[11px] font-mono leading-relaxed pl-2 text-gray-300 border-l border-emerald-500/30">
                <div>
                  <span className="text-white font-semibold">Axolotl Launcher</span>{" "}
                  <span className="text-emerald-400/80">[Tauri, Rust]</span>{" "}
                  <span className="text-gray-500">https://axlmc.org</span>
                </div>
                <div>
                  <span className="text-white font-semibold">Coverly</span>{" "}
                  <span className="text-emerald-400/80">[Next.js, React]</span>{" "}
                  <span className="text-gray-500">https://cover.mysticstars.cn</span>
                </div>
                <div>
                  <span className="text-white font-semibold">Garbage Human Studio</span>{" "}
                  <span className="text-emerald-400/80">[Web]</span>{" "}
                  <span className="text-gray-500">https://www.ghs.red</span>
                </div>
              </div>
            ),
          })
          break

        case "contact":
          newLogs.push({
            type: "output",
            text: (
              <div className="space-y-1 my-1 text-[11px] font-mono leading-relaxed pl-2 text-gray-300 border-l border-emerald-500/30">
                <div><span className="text-gray-500">EMAIL:     </span> 1278347583@qq.com</div>
                <div><span className="text-gray-500">BLOG:      </span> https://www.mysticstars.cn</div>
                <div><span className="text-gray-500">GITHUB:    </span> https://github.com/Mystic-Stars</div>
                <div><span className="text-gray-500">BILIBILI:  </span> https://space.bilibili.com/2007491365</div>
              </div>
            ),
          })
          break

        case "rain":
          setIsPureRain(true)
          newLogs.push({
            type: "system",
            text: "Matrix Rain mode engaged. Click anywhere or press [ESC] to return to shell.",
          })
          break

        case "clear":
          setLogs([])
          setInputVal("")
          return

        case "exit":
        case "quit":
          onClose()
          return

        default:
          newLogs.push({
            type: "output",
            text: (
              <span className="text-rose-400/90 text-xs font-mono">
                zsh: command not found: {rawCmd}. Type &quot;help&quot; for available commands.
              </span>
            ),
          })
          break
      }

      setLogs(newLogs)
      setInputVal("")
    },
    [logs, onClose, playClick]
  )

  // Keyboard navigation & Shortcuts (Tab autocomplete, Ctrl+L, Arrows)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal)
    } else if (e.key === "Tab") {
      e.preventDefault()
      const query = inputVal.trim().toLowerCase()
      if (query) {
        const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(query))
        if (match) setInputVal(match)
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault()
      setLogs([])
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInputVal(history[nextIndex] || "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInputVal("")
      } else {
        setHistoryIndex(nextIndex)
        setInputVal(history[nextIndex] || "")
      }
    }
  }

  // Global Esc to close
  useEffect(() => {
    if (!isOpen) return
    const handleGlobalEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isPureRain) {
          setIsPureRain(false)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener("keydown", handleGlobalEsc)
    return () => window.removeEventListener("keydown", handleGlobalEsc)
  }, [isOpen, isPureRain, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] overflow-hidden flex items-center justify-center p-3 sm:p-6 select-none">
          {/* Canvas Digital Rain */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer z-0 opacity-40"
            onClick={() => {
              if (isPureRain) setIsPureRain(false)
            }}
          />

          {/* Floating Exit Hint for pure rain */}
          {isPureRain && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-lg bg-gray-900/90 border border-white/10 text-gray-300 font-mono text-xs backdrop-blur-md cursor-pointer hover:bg-gray-800/90 shadow-xl"
              onClick={() => setIsPureRain(false)}
            >
              [Click anywhere or press ESC to return to shell]
            </motion.div>
          )}

          {/* Terminal Window Box */}
          {!isPureRain && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative z-10 w-full max-w-2xl h-[28rem] sm:h-[32rem] rounded-xl sm:rounded-2xl bg-[#090d16]/95 border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col overflow-hidden font-mono"
            >
              {/* Terminal Titlebar */}
              <div className="px-4 py-2.5 bg-[#0f141f]/90 border-b border-white/5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-85 transition-opacity"
                    title="Close [ESC]"
                  />
                  <button
                    onClick={() => setIsPureRain(true)}
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-85 transition-opacity"
                    title="Rain Only"
                  />
                  <button
                    onClick={() => setLogs([])}
                    className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-85 transition-opacity"
                    title="Clear Buffer"
                  />
                  <span className="ml-2 text-xs text-gray-400 font-medium">
                    mystic@portfolio: ~ (zsh)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <button
                    onClick={() => setIsPureRain(true)}
                    className="p-1 hover:text-gray-300 transition-colors"
                    title="Fullscreen Rain"
                  >
                    <FiMaximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1 hover:text-gray-300 transition-colors"
                    title="Close"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Terminal Output Area */}
              <div
                className="flex-1 p-4 overflow-y-auto space-y-2 text-xs text-gray-300 select-text"
                onClick={() => inputRef.current?.focus()}
              >
                {logs.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    {log.type === "system" ? (
                      <div className="text-gray-500 font-mono text-[11px]">{log.text}</div>
                    ) : log.type === "input" ? (
                      <div>{log.text}</div>
                    ) : (
                      <div className="text-gray-300">{log.text}</div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Terminal Prompt Line */}
              <div className="px-4 py-3 bg-[#0d121c]/80 border-t border-white/5 flex items-center gap-2">
                <span className="text-emerald-400 text-xs font-mono font-semibold shrink-0">
                  ~ ❯
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-xs text-gray-100 outline-none font-mono caret-emerald-400"
                  placeholder="type help..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="text-[10px] font-mono text-gray-600 hidden sm:inline select-none">
                  Tab to complete
                </span>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
