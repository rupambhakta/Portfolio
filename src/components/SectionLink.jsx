import { useNavigate, useLocation } from 'react-router-dom'
import { goToSection } from '../lib/scroll.js'

export default function SectionLink({ id, className = '', children, onClick }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <a
      href={`/#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        goToSection(navigate, pathname, id)
      }}
    >
      {children}
    </a>
  )
}
