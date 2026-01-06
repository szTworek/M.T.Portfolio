import { useState, useEffect } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import logo from '../assets/logo.png'

const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'price-calculator', label: 'Offer' },
  { id: 'contact', label: 'Contact' },
]

function Menu() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const container = document.getElementById('content-container')
    if (!container) return

    const sections = menuItems.map(item => document.getElementById(item.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: container,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-between px-4">
        <img src={logo} alt="Logo" className="h-10" />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden fixed top-16 left-0 w-full bg-black/80 backdrop-blur-sm z-50 py-4">
          <div className="flex flex-col items-center gap-4 text-white text-xl" style={{ fontFamily: 'Genos' }}>
            {menuItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleLinkClick}
                className="hover:text-gray-300 transition-all"
                style={{ fontWeight: activeSection === id ? '700' : '400' }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[20%] fixed left-0 top-0 h-screen bg-black/30 backdrop-blur-sm flex-col items-center py-20">
        <div>
          <img src={logo} alt="Logo" className="w-32 mb-8" />

          <nav className="flex flex-col gap-4 text-white text-2xl" style={{ fontFamily: 'Genos' }}>
            {menuItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover:text-gray-300 transition-all"
                style={{ fontWeight: activeSection === id ? '700' : '400' }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Menu
