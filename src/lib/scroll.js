// Small helper so nav/hero links can jump to a homepage section from any route.
export const navTarget = { id: null }

export function goToSection(navigate, pathname, id) {
  if (pathname === '/') {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    navTarget.id = id
    navigate('/')
  }
}
