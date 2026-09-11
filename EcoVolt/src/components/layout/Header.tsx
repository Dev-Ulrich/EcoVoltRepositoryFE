import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import ecovoltLogoDark from '../../assets/brand/ecovolt-logo-dark.webp'
import ecovoltLogo from '../../assets/brand/ecovolt-logo.webp'
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
  const navigate = useNavigate()
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!isMenuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { setIsMenuOpen(false); headerRef.current?.querySelector<HTMLButtonElement>('[aria-controls="public-navigation"]')?.focus() }
    }
    function onClick(event: PointerEvent) { if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onClick) }
  }, [isMenuOpen])
  const [logoutError, setLogoutError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    setLogoutError('')
    try { await logout(); closeMenu(); navigate('/login', { replace: true }) }
    catch { setLogoutError('Não foi possível sair. Tente novamente.') }
    finally { setIsLoggingOut(false) }
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header ref={headerRef}
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
          relative mx-auto flex min-h-20 gap-4
          max-w-6xl items-center justify-between px-6
        "
        aria-label="Navegação principal"
      >
        <Link
          to={user ? "/app" : "/"}
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          onClick={closeMenu}
          aria-label={user ? "EcoVolt - Dashboard" : "EcoVolt - Início"}
        >
          <img
            src={ecovoltLogo}
            alt="EcoVolt"
            className="h-12 w-auto max-w-40 object-contain dark:hidden"
          />
          <img
            src={ecovoltLogoDark}
            alt="EcoVolt"
            className="hidden h-12 w-auto max-w-40 object-contain dark:block"
          />
        </Link>

        <button
          type="button"
          className="
            min-h-11 rounded-lg border border-emerald-600
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
            flex-col gap-1
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
                  flex min-h-11 items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-sm
                  font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
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

          <li className="[&>button]:min-h-11 [&>button]:whitespace-nowrap">
            <ThemeToggle />
          </li>

          {user ? <li className="flex flex-wrap items-center gap-3 lg:max-w-72">
            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-100">{user.displayName}<span className="mt-0.5 block text-xs font-normal">Sessão demonstrativa</span></span>
            <button type="button" disabled={isLoggingOut} onClick={() => void handleLogout()} className="rounded-lg border border-emerald-600 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-200 dark:hover:bg-emerald-900">{isLoggingOut ? 'Saindo…' : 'Sair'}</button>
            {logoutError && <p role="alert" className="text-sm text-red-600 dark:text-red-300">{logoutError}</p>}
          </li> : <li>
            <Link
              to="/login"
              onClick={closeMenu}
              className="
                flex min-h-11 items-center justify-center rounded-lg bg-emerald-700
                px-4 py-2 text-center text-sm
                font-bold text-white
                transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
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
