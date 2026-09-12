export default function WidgetWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] right-3 sm:bottom-8 sm:right-8 flex flex-col items-center justify-between p-1 bg-white/75 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl rounded-2xl transition-all z-[990]">
      {children}
    </div>
  )
}
