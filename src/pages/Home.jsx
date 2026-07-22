import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import WorkGrid from '../components/WorkGrid.jsx'
import Services from '../components/Services.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-20 sm:mt-28">
        <Marquee />
      </div>
      <WorkGrid />
      <Services />
      <About />
      <Contact />
    </>
  )
}
