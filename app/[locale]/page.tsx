import Intro from "@/components/Intro"
import SectionDivider from "@/components/SectionDivider"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
// import Experience from "@/components/Experience"
// import Contact from "@/components/Contact"
import Subscribe from "@/components/Subscribe"
import { unstable_setRequestLocale } from "next-intl/server"

export const metadata = {
  title: "MysticStars | Homepage",
  description: "A student developer's homepage.",
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }]
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return (
    <main className="flex flex-col items-center justify-center px-3 sm:px-4 w-full overflow-x-hidden">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Subscribe />
      {/* <Experience isMobile={false} /> */}      
      {/* <Contact /> */}
    </main>
  )
}
