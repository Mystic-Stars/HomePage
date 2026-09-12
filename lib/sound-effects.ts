/**
 * Web Audio API 程序化轻量高保真微音效合成引擎
 * 零外部音频网络依赖，零加载延迟，完美契合极简科技质感
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

/**
 * 清脆微气泡音（用于徽章悬停、👋 挥手）
 */
export function playProceduralPop(volume = 0.08) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  // 从 450Hz 快速跃升并平滑降落
  osc.frequency.setValueAtTime(450, now)
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.02)
  osc.frequency.exponentialRampToValueAtTime(320, now + 0.08)

  gain.gain.setValueAtTime(volume * 0.8, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.085)
}

/**
 * 机械微开关咔哒声（用于主题切换、按键按下）
 */
export function playProceduralClick(volume = 0.07) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "triangle"
  osc.frequency.setValueAtTime(1400, now)
  osc.frequency.exponentialRampToValueAtTime(350, now + 0.035)

  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.04)
}

/**
 * 清澈双音阶风铃声（用于复制成功、快捷键唤醒）
 */
export function playProceduralChime(volume = 0.07) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // 双音阶和弦 (E6: 1318.51Hz, B6: 1975.53Hz)
  const notes = [1318.51, 1975.53]

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, now + index * 0.045)

    const noteStart = now + index * 0.045
    gain.gain.setValueAtTime(0.0001, noteStart)
    gain.gain.linearRampToValueAtTime(volume * 0.9, noteStart + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(noteStart)
    osc.stop(noteStart + 0.23)
  })
}

/**
 * 柔和空气滑动声（用于面板/抽屉滑入滑出）
 */
export function playProceduralWhoosh(volume = 0.05) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.setValueAtTime(180, now)
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.06)
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.14)

  gain.gain.setValueAtTime(0.001, now)
  gain.gain.linearRampToValueAtTime(volume, now + 0.05)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.16)
}

/**
 * 轻柔滑块拨动声（用于语言切换、静音开关）
 */
export function playProceduralSwitch(volume = 0.06) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.setValueAtTime(320, now)
  osc.frequency.exponentialRampToValueAtTime(640, now + 0.045)

  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.055)
}
