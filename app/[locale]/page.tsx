import Intro from "@/components/Intro"
import SectionDivider from "@/components/SectionDivider"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
// import Experience from "@/components/Experience"
import { isMobileDevice } from "@/lib/utils"
// import Contact from "@/components/Contact"

export const metadata = {
  title: "MysticStars | Homepage",
  description: "A student developer's homepage.",
}

export default function Home() {
  const isMobile = isMobileDevice()

  return (
    <main className="flex flex-col items-center justify-center px-4 overflow-x-hidden">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      {/* <Experience isMobile={isMobile} /> */}      
      {/* <Contact /> */}
    </main>
  )
}
