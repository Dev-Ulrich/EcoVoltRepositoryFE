import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import ecovoltLogoDark from '../../assets/ecovolt-logo-dark.png'
import ecovoltLogo from '../../assets/ecovolt-logo.png'
import { useAuth } from '../../auth/useAuth'
import AppNavigation from './AppNavigation'
import ThemeToggle from '../common/ThemeToggle'

const navigationItems = [
  { label: 'Início', path: '/' },
  { label: 'Como funciona', path: '/como-funciona' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Quem somos', path: '/quem-somos' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contato', path: '/contato' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const [logoutError, setLogoutError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    setLogoutError('')
    try { await logout(); closeMenu() }
    catch { setLogoutError('Não foi possível sair. Tente novamente.') }
    finally { setIsLoggingOut(false) }
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-emerald-200
        bg-white/95 backdrop-blur
        transition-colors
        dark:border-emerald-800
        dark:bg-emerald-950/95
      "
    >
      <nav
        className="
          relative mx-auto flex min-h-22
          max-w-6xl items-center justify-between px-6
        "
        aria-label="Navegação principal"
      >
        <Link
          to={user ? "/app" : "/"}
          className="flex shrink-0 items-center"
          onClick={closeMenu}
          aria-label={user ? "EcoVolt - Dashboard" : "EcoVolt - Início"}
        >
          <img
            src={ecovoltLogo}
            alt="EcoVolt"
            className="h-16 w-auto max-w-56 object-contain dark:hidden sm:max-w-72"
          />
          <img
            src={ecovoltLogoDark}
            alt="EcoVolt"
            className="hidden h-16 w-auto max-w-56 object-contain dark:block sm:max-w-72"
          />
        </Link>

        <button
          type="button"
          className="
            rounded-lg border border-emerald-600
            px-4 py-2 font-semibold text-emerald-700
            transition hover:bg-emerald-100
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            lg:hidden
            dark:border-emerald-700
            dark:text-emerald-100
            dark:hover:bg-emerald-900
            dark:focus-visible:ring-emerald-300
          "
          aria-controls="public-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? 'Fechar menu de navegação'
              : 'Abrir menu de navegação'
          }
          onClick={() =>
            setIsMenuOpen((currentState) => !currentState)
          }
        >
          {isMenuOpen ? 'Fechar' : 'Menu'}
        </button>

        <ul
          id="public-navigation"
          className={`
            absolute left-0 top-full w-full
            flex-col gap-2
            border-b border-emerald-200
            bg-white p-6
            transition-colors
            lg:static lg:flex lg:w-auto
            lg:flex-row lg:items-center
            lg:border-0 lg:bg-transparent lg:p-0
            dark:border-emerald-800
            dark:bg-emerald-950
            lg:dark:bg-transparent
            ${isMenuOpen ? 'flex' : 'hidden'}
          `}
        >
          {(user ? [{ label: 'Dashboard', path: '/app' }] : navigationItems).map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) => `
                  block whitespace-nowrap rounded-lg px-3 py-2
                  font-semibold transition
                  ${
                    isActive
                      ? `
                        bg-emerald-100 text-emerald-800
                        dark:bg-emerald-400/15
                        dark:text-emerald-300
                      `
                      : `
                        text-slate-700
                        hover:bg-emerald-50
                        hover:text-emerald-700
                        dark:text-emerald-100
                        dark:hover:bg-emerald-900
                        dark:hover:text-white
                      `
                  }
                `}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <li>
            <ThemeToggle />
          </li>

          {user ? <li className="flex flex-wrap items-center gap-3 lg:max-w-72">
            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-100">{user.displayName}</span>
            <button type="button" disabled={isLoggingOut} onClick={() => void handleLogout()} className="rounded-lg border border-emerald-600 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 dark:text-emerald-200 dark:hover:bg-emerald-900">{isLoggingOut ? 'Saindo…' : 'Sair'}</button>
            {logoutError && <p role="alert" className="text-sm text-red-600 dark:text-red-300">{logoutError}</p>}
          </li> : <li>
            <Link
              to="/login"
              onClick={closeMenu}
              className="
                block rounded-lg bg-emerald-500
                px-4 py-2 text-center
                font-bold text-white
                transition hover:bg-emerald-600
                dark:bg-emerald-400
                dark:text-emerald-950
                dark:hover:bg-emerald-300
              "
            >
              Entrar
            </Link>
          </li>}
        </ul>
      </nav>
      {user && <AppNavigation />}
    </header>
  )
}

export default Header 
