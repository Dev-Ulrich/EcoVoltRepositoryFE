import { Globe, Leaf, Mail, MapPin } from 'lucide-react'
import type { SVGProps } from 'react'
import { Link } from 'react-router-dom'

import ecovoltLogoDark from '../../assets/brand/ecovolt-logo-dark.webp'

const footerLinks = [
  { label: 'Início', path: '/' },
  { label: 'Como funciona', path: '/como-funciona' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Quem somos', path: '/quem-somos' },
  { label: 'FAQ', path: '/faq' },
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

const focusClasses = 'rounded-sm transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080f0e]'
const columnClasses = 'relative border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0 lg:pl-8 lg:before:absolute lg:before:bottom-3 lg:before:left-0 lg:before:top-3 lg:before:w-px lg:before:bg-white/10'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#080f0e] text-slate-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-x-8 gap-y-8 py-8 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.85fr_1.1fr_1.2fr] lg:gap-x-6">
          <div>
            <Link to="/" className={`inline-flex ${focusClasses}`} aria-label="EcoVolt - Início">
              <img src={ecovoltLogoDark} alt="EcoVolt" className="h-12 w-auto max-w-44 object-contain" />
            </Link>
            <p className="mt-2 max-w-52 text-sm leading-relaxed">A energia das suas escolhas<br />por um planeta melhor.</p>
            <div className="-ml-2 mt-3 flex flex-wrap gap-0.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} className={`flex size-11 items-center justify-center ${focusClasses}`} aria-label={`${label} (nova aba)`} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <nav className={columnClasses} aria-label="Navegação do rodapé">
            <h2 className="mb-3 text-sm font-semibold text-white">Navegação</h2>
            <ul className="text-sm">
              {footerLinks.map(({ label, path }) => (
                <li key={path}><Link to={path} className={`inline-flex min-h-11 items-center lg:min-h-7 ${focusClasses}`}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className={columnClasses}>
            <h2 className="mb-3 text-sm font-semibold text-white">Projeto</h2>
            <p className="text-sm font-medium text-white">FIAP + SoulUp</p>
            <p className="mt-1 text-sm leading-relaxed">Tecnologia a serviço<br />de um futuro mais sustentável.</p>
            <div className="mt-3 flex flex-wrap items-center gap-6 text-white">
              <a href="https://www.fiap.com.br/" target="_blank" rel="noopener noreferrer" aria-label="FIAP (nova aba)" className={`inline-flex min-h-11 items-center text-3xl font-extralight tracking-[0.06em] ${focusClasses}`}>FIAP</a>
              <a href="https://soulup.io/" target="_blank" rel="noopener noreferrer" aria-label="SoulUp (nova aba)" className={`inline-flex min-h-11 items-center text-2xl font-bold tracking-tight ${focusClasses}`}>SoulUp</a>
            </div>
          </div>

          <div className={columnClasses}>
            <h2 className="mb-3 text-sm font-semibold text-white">Fale com a gente</h2>
            <address className="text-sm not-italic">
              <a href="mailto:contato@ecovolt.com.br" className={`inline-flex min-h-11 items-center gap-3 lg:min-h-8 ${focusClasses}`}>
                <Mail aria-hidden="true" className="size-5 shrink-0" /><span className="break-all">contato@ecovolt.com.br</span>
              </a>
              <p className="mt-2 flex items-center gap-3"><MapPin aria-hidden="true" className="size-5 shrink-0" />São Paulo - SP</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-4 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} EcoVolt. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">Por um planeta mais vivo, hoje e sempre. <Leaf aria-hidden="true" className="size-4 shrink-0 text-emerald-400" /></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
