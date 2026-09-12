"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import { cn } from "@/lib/utils"

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type Contribution = {
  date: string
  count: number
  level: ContributionLevel
}

export type RepoContribution = {
  name: string
  count: number
  logo?: React.ReactNode
  href?: string
}

const DEFAULT_ACCENT = "#39d353"
const DEFAULT_CELL_SIZE = 10
const DEFAULT_LABEL = "Top contributions in:"
const DEFAULT_MONTHS = 12
const WEEKS_PER_MONTH = 365.25 / 12 / 7
const STACK_LIMIT = 3
const MIN_CARD_WIDTH = 280
const MIN_LABEL_WEEKS = 3
const CARD_PADDING = 24

const gapFor = (cellSize: number) => Math.max(2, Math.round(cellSize / 4))
const weeksFor = (months: number) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH))

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const SPRING = { type: "spring", bounce: 0.08, duration: 0.35 } as const
const HEADER_SPRING = { ...SPRING, bounce: 0.15 } as const
const ROW_SPRING = { ...SPRING, bounce: 0.1, delay: 0.03 } as const
const ROW_OFFSET = 16
const CELL_FADE = { duration: 0.2, ease: EASE_OUT } as const
const TOOLTIP_FADE = { duration: 0.14, ease: EASE_OUT } as const
const TOOLTIP_EDGE = 8
const COLUMN_STAGGER = 0.012
const LABEL_BLUR = 6
const LABEL_REVEAL = { duration: 0.45, ease: EASE_OUT } as const

const LEVELS = [0, 1, 2, 3, 4] as const

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function toMonthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null)
  const monthAt = (index: number) => weeks[index]?.[0]?.date.slice(5, 7)

  let start = 0
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue
    if (i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null
    }
    start = i
  }

  return labels
}

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
}

type LevelStyle = { backgroundColor: string; opacity: number }

type HoveredDay = { day: Contribution; x: number; y: number }

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

function describeDay({ count, date }: Contribution) {
  const noun = count === 1 ? "contribution" : "contributions"
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`
}

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4"
const EVENTS_API = "https://api.github.com/users"

type ApiDay = { date: string; count: number; level: number }
type PushEvent = {
  type: string
  repo?: { name: string }
  payload?: { commits?: unknown[] }
}

async function fetchCalendar(login: string) {
  try {
    const res = await fetch(`${CALENDAR_API}/${login}?y=last`)
    if (!res.ok) return null

    const days: ApiDay[] = (await res.json())?.contributions ?? []
    if (!days.length) return null

    const start = days.findIndex(
      (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0
    )

    return days.slice(start < 0 ? 0 : start).map<Contribution>((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
    }))
  } catch {
    return null
  }
}

async function fetchRepos(login: string): Promise<RepoContribution[]> {
  try {
    const res = await fetch(`${EVENTS_API}/${login}/events/public?per_page=100`)
    if (!res.ok) return []

    const events: PushEvent[] = await res.json()
    if (!Array.isArray(events)) return []

    const counts = new Map<string, number>()

    for (const event of events) {
      if (event.type !== "PushEvent" || !event.repo) continue
      const commits = event.payload?.commits?.length ?? 1
      counts.set(event.repo.name, (counts.get(event.repo.name) ?? 0) + commits)
    }

    const repoEntries: [string, number][] = []
    counts.forEach((count, name) => {
      repoEntries.push([name, count])
    })

    return repoEntries
      .sort(([, a], [, b]) => b - a)
      .slice(0, STACK_LIMIT)
      .map(([fullName, count]) => {
        const [owner, name] = fullName.split("/")
        return {
          name,
          count,
          href: `https://github.com/${fullName}`,
          logo:
            owner.toLowerCase() === login.toLowerCase() ? undefined : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://github.com/${owner}.png?size=64`}
                alt={owner}
                className="w-full h-full object-cover"
              />
            ),
        }
      })
  } catch {
    return []
  }
}

function useGitHubUser(login?: string) {
  const [data, setData] = React.useState<{
    contributions: Contribution[]
    repos: RepoContribution[]
  }>()

  React.useEffect(() => {
    if (!login) return
    let active = true

    Promise.all([fetchCalendar(login), fetchRepos(login)])
      .then(([contributions, repos]) => {
        if (active && contributions) setData({ contributions, repos })
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [login])

  return data
}

function emptyDays(weeks: number): Contribution[] {
  const today = new Date()
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (weeks * 7 - 1 - i))
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as ContributionLevel,
    }
  })
}

function toScale(accent: string | string[]): LevelStyle[] {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }))
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent]
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors[colors.length - 1] ?? "transparent"
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 }
  })
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }
  return weeks
}

function useFittedColumns(cellSize: number, gap: number) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [columns, setColumns] = React.useState<number>()

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () =>
      setColumns(
        Math.max(1, Math.floor((el.clientWidth + gap) / (cellSize + gap)))
      )

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [cellSize, gap])

  return [ref, columns] as const
}

const Tooltip = ({
  hovered,
  reduceMotion,
}: {
  hovered: HoveredDay
  reduceMotion: boolean | null
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [left, setLeft] = React.useState(hovered.x)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  useIsoLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2
    const edge = TOOLTIP_EDGE + half
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge))
  }, [hovered])

  if (!mounted || typeof document === "undefined") return null

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <motion.div
        ref={ref}
        className="whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl dark:bg-white dark:text-gray-900 border border-gray-800 dark:border-gray-200"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduceMotion ? { duration: 0 } : TOOLTIP_FADE}
      >
        {describeDay(hovered.day)}
      </motion.div>
    </div>,
    document.body
  )
}

const ContributionGrid = ({
  contributions,
  scale,
  cellSize,
  months,
  showMonths,
  label,
  reduceMotion,
}: {
  contributions: Contribution[]
  scale: LevelStyle[]
  cellSize: number
  months: number
  showMonths: boolean
  label: string
  reduceMotion: boolean | null
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions])
  const gap = gapFor(cellSize)
  const [ref, columns] = useFittedColumns(cellSize, gap)
  const [hovered, setHovered] = React.useState<HoveredDay>()

  const cap = Math.min(weeks.length, weeksFor(months))
  const visible = weeks.slice(-Math.min(cap, columns ?? cap))
  const sweepEnd = (visible.length - 1) * COLUMN_STAGGER + CELL_FADE.duration

  const hover = (day: Contribution) => (event: React.PointerEvent) => {
    const cell = event.currentTarget.getBoundingClientRect()
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top })
  }

  return (
    <div
      ref={ref}
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative w-full"
    >
      {showMonths && (
        <motion.div
          className="flex justify-start sm:justify-center"
          style={{ gap, marginBottom: gap }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, filter: `blur(${LABEL_BLUR}px)` }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            ...LABEL_REVEAL,
            delay: reduceMotion ? 0 : sweepEnd,
          }}
        >
          {toMonthLabels(visible).map((month, index) => (
            <div
              key={index}
              className="relative h-3 shrink-0"
              style={{ width: cellSize }}
            >
              {month && (
                <span className="absolute left-0 top-0 text-[10px] leading-none text-gray-400 dark:text-gray-500 font-mono">
                  {month}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      )}

      <div
        className="flex justify-start sm:justify-center overflow-hidden"
        style={{ gap }}
        onPointerLeave={() => setHovered(undefined)}
      >
        {visible.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col" style={{ gap }}>
            {week.map((day) => (
              <motion.div
                key={day.date}
                onPointerEnter={hover(day)}
                className="shrink-0 rounded-[3px] bg-gray-200/80 dark:bg-gray-800/80 cursor-pointer transition-colors"
                style={{ width: cellSize, height: cellSize }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ...CELL_FADE,
                  delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
                }}
              >
                <div
                  className="h-full w-full rounded-[3px]"
                  style={scale[day.level] ?? scale[0]}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip
            key="tooltip"
            hovered={hovered}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const Avatar = ({
  repo,
  layoutId,
  transition,
  className,
}: {
  repo: RepoContribution
  layoutId: string
  transition: Transition
  className?: string
}) => (
  <motion.span
    layoutId={layoutId}
    transition={transition}
    className={cn(
      "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-gray-100 text-[11px] font-semibold uppercase text-gray-700 ring-2 ring-white dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-900 shadow-sm",
      "[&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
      className
    )}
  >
    {repo.logo ?? repo.name.charAt(0)}
  </motion.span>
)

const RepoRow = ({
  repo,
  layoutId,
  transition,
}: {
  repo: RepoContribution
  layoutId: string
  transition: Transition
}) => {
  const className =
    "flex items-center gap-3 rounded-xl mx-1 px-2.5 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/10"

  const content = (
    <>
      <Avatar repo={repo} layoutId={layoutId} transition={transition} />
      <span className="flex-1 truncate text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
        {repo.name}
      </span>
      <span className="text-xs font-mono tabular-nums text-gray-500 dark:text-gray-400">
        {repo.count} commits
      </span>
    </>
  )

  return repo.href ? (
    <a href={repo.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}

const Chevron = ({
  open,
  transition,
}: {
  open: boolean
  transition: Transition
}) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    initial={false}
    animate={{ rotate: open ? 180 : 0 }}
    transition={transition}
  >
    <path d="m6 9 6 6 6-6" />
  </motion.svg>
)

export type GitHubActivityProps = React.ComponentProps<"div"> & {
  username?: string
  contributions?: Contribution[]
  repos?: RepoContribution[]
  year?: number
  accent?: string | string[]
  cellSize?: number
  months?: number
  showMonths?: boolean
  label?: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp = [],
  repos: reposProp = [],
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = true,
  label = DEFAULT_LABEL,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  style,
  ...props
}: GitHubActivityProps) => {
  const reduceMotion = useReducedMotion()
  const uid = React.useId()
  const [openState, setOpenState] = React.useState(defaultOpen)

  const open = openProp ?? openState
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open)
    onOpenChange?.(!open)
  }

  const needsFetch = !contributionsProp.length || !reposProp.length
  const fetched = useGitHubUser(needsFetch ? username : undefined)
  const placeholder = React.useMemo(
    () => (username ? emptyDays(weeksFor(months)) : []),
    [username, months]
  )

  const contributions = contributionsProp.length
    ? contributionsProp
    : (fetched?.contributions ?? placeholder)
  const repos = reposProp.length ? reposProp : (fetched?.repos ?? [])

  const scale = React.useMemo(() => toScale(accent), [accent])
  const transition = reduceMotion ? { duration: 0 } : SPRING
  const headerTransition = reduceMotion ? { duration: 0 } : HEADER_SPRING
  const rowTransition = reduceMotion ? { duration: 0 } : ROW_SPRING

  const kick = reduceMotion ? {} : { x: ROW_OFFSET, y: ROW_OFFSET }
  const listMotion = {
    initial: { opacity: 0, ...kick },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...kick },
  }

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions]
  )

  const lastDay = contributions[contributions.length - 1]
  const parsedYear = Number(lastDay?.date.slice(0, 4))
  const displayYear = year ?? (Number.isFinite(parsedYear) ? parsedYear : null)
  const heading = `${total.toLocaleString()} contributions${displayYear ? ` in ${displayYear}` : ""}`

  const gap = gapFor(cellSize)
  const columns = Math.min(
    Math.ceil(contributions.length / 7),
    weeksFor(months)
  )
  const width = Math.max(
    MIN_CARD_WIDTH,
    columns * (cellSize + gap) - gap + CARD_PADDING
  )

  return (
    <div
      data-slot="github-activity"
      className={cn(
        "relative w-full flex flex-col justify-between",
        repos.length > 0 && "pb-[54px]",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {heading}
        </span>
      </div>

      <div className="w-full overflow-x-auto py-1">
        <ContributionGrid
          contributions={contributions}
          scale={scale}
          cellSize={cellSize}
          months={months}
          showMonths={showMonths}
          label={heading}
          reduceMotion={reduceMotion}
        />
      </div>

      {repos.length > 0 && (
        <motion.div
          layout
          id={`${uid}-panel`}
          data-slot="github-activity-panel"
          data-state={open ? "open" : "closed"}
          className={cn(
            "absolute inset-x-0 bottom-0 overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/80 dark:border-gray-700/80 rounded-2xl transition-all duration-200",
            open
              ? "top-0 shadow-lg border-gray-300 dark:border-gray-700"
              : "shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:border-gray-300 dark:hover:border-gray-600"
          )}
          style={{ borderRadius: 16 }}
          transition={transition}
        >
          <motion.div
            layout="position"
            transition={headerTransition}
            className="flex items-center justify-between gap-3 py-2 px-3 sm:px-4"
          >
            <span className="truncate text-xs font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>

            <div className="flex items-center gap-2">
              {!open && (
                <div className="flex items-center">
                  {repos.slice(0, STACK_LIMIT).map((repo, index) => (
                    <Avatar
                      key={index}
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                      className="-ml-2 first:ml-0"
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={`${uid}-panel`}
                aria-label={
                  open ? "Hide top repositories" : "Show top repositories"
                }
                className="grid size-7 shrink-0 place-items-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Chevron open={open} transition={transition} />
              </button>
            </div>
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {open && (
              <motion.ul
                key="list"
                layout="position"
                {...listMotion}
                transition={rowTransition}
                className="px-1 pb-2 space-y-1 overflow-y-auto max-h-[calc(100%-48px)]"
              >
                {repos.map((repo, index) => (
                  <li key={index}>
                    <RepoRow
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                    />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default GitHubActivity
