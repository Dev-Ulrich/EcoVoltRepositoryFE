import { Globe } from 'lucide-react'
import type { SVGProps } from 'react'
import { Link } from 'react-router-dom'

import ecovoltLogoDark from '../../assets/ecovolt-logo-dark.png'
import ecovoltLogo from '../../assets/ecovolt-logo.png'

const footerLinks = [
  { label: 'Início', path: '/' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Como funciona', path: '/como-funciona' },
  { label: 'Contato', path: '/contato' },
]

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.86 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.31 9.31 0 0 1 12 6.99c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92v2.77c0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        width="15"
        height="15"
        x="4.5"
        y="4.5"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.5 8.75H3.25V20h3.25V8.75ZM4.88 4a1.88 1.88 0 1 0 0 3.75A1.88 1.88 0 0 0 4.88 4ZM20.75 13.85c0-3.33-1.78-5.1-4.16-5.1-1.92 0-2.77 1.06-3.25 1.8v-1.8h-3.25V20h3.25v-6.28c0-.34.02-.67.12-.91.26-.67.86-1.36 1.86-1.36 1.31 0 1.84 1.02 1.84 2.51V20h3.25l.34-6.15Z" />
    </svg>
  )
}

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Dev-Ulrich/EcoVoltRepositoryFE', icon: GithubIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/soulupoficial?stkn=MW9zM2o5OTV3bnZydg==', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/soulupoficial/', icon: LinkedinIcon },
  { label: 'Site da SoulUp', href: 'https://soulup.io/', icon: Globe },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="
        border-t border-emerald-200 bg-white text-slate-700
        pixel-bg transition-colors
        dark:border-emerald-800
        dark:bg-emerald-950
        dark:text-emerald-100
      "
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-14">
        <Link
          to="/"
          className="inline-flex items-center justify-center"
          aria-label="EcoVolt - Início"
        >
          <img
            src={ecovoltLogo}
            alt="EcoVolt"
            className="h-20 w-auto max-w-72 object-contain dark:hidden"
          />
          <img
            src={ecovoltLogoDark}
            alt="EcoVolt"
            className="hidden h-20 w-auto max-w-72 object-contain dark:block"
          />
        </Link>

        <nav className="mt-8" aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium">
            {footerLinks.map((item) => (
              <li key={item.path}>
                <Link
                  className="
                    text-slate-700 transition
                    hover:text-emerald-600
                    dark:text-emerald-100
                    dark:hover:text-emerald-300
                  "
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-7 flex items-center justify-center gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={item.href}
                className="
                  flex size-10 items-center justify-center rounded-lg
                  border border-emerald-700/20 text-slate-700
                  transition hover:border-emerald-500
                  hover:bg-emerald-100 hover:text-emerald-700
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  dark:border-emerald-300/20
                  dark:text-emerald-100
                  dark:hover:bg-emerald-400/10
                  dark:hover:text-emerald-300
                "
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon aria-hidden="true" className="size-5" />
              </a>
            )
          })}
        </div>
      </div>

      <div
        className="
          border-t border-emerald-200 px-6 py-4 text-center
          text-sm text-slate-500
          dark:border-emerald-900
          dark:text-emerald-300
        "
      >
        EcoVolt • FIAP x SoulUp © {currentYear}
      </div>
    </footer>
  )
}

export default Footer
