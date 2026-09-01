import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Início', path: '/' },
  { label: 'Como funciona', path: '/como-funciona' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contato', path: '/contato' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-800 bg-emerald-950/95 backdrop-blur">
      <nav
        className="relative mx-auto flex min-h-18 max-w-6xl items-center justify-between px-6"
        aria-label="Navegação principal"
      >
        <Link
          to="/"
          className="text-2xl font-black text-white"
          onClick={closeMenu}
        >
          Eco<span className="text-emerald-400">Volt</span>
        </Link>

        <button
          type="button"
          className="
            rounded-lg border border-emerald-700
            px-4 py-2 font-semibold text-emerald-100
            transition hover:bg-emerald-900
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-300
            md:hidden
          "
          aria-controls="public-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? 'Fechar menu de navegação'
              : 'Abrir menu de navegação'
          }
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
          {isMenuOpen ? 'Fechar' : 'Menu'}
        </button>

        <ul
          id="public-navigation"
          className={`
            absolute left-0 top-full w-full
            flex-col gap-2
            border-b border-emerald-800
            bg-emerald-950 p-6
            md:static md:flex md:w-auto md:flex-row
            md:items-center md:border-0 md:bg-transparent md:p-0
            ${isMenuOpen ? 'flex' : 'hidden'}
          `}
        >
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) => `
                  block rounded-lg px-3 py-2
                  font-semibold transition
                  ${
                    isActive
                      ? 'bg-emerald-400/15 text-emerald-300'
                      : 'text-emerald-100 hover:bg-emerald-900 hover:text-white'
                  }
                `}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <li>
            <Link
              to="/login"
              onClick={closeMenu}
              className="
                block rounded-lg bg-emerald-400
                px-4 py-2 text-center
                font-bold text-emerald-950
                transition hover:bg-emerald-300
              "
            >
              Entrar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header