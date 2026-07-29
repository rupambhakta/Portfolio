import { Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Background from './components/Background.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import Home from './pages/Home.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-ember" />
}

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-base-950 text-cream-dim">
      <ScrollProgress />
      <ScrollManager />
      <Background />
      <Nav />
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
