import { ArrowLeft, ClipboardCheck, Gift, Leaf, LogOut, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import useTheme from '../../hooks/useTheme'
import { useDemoData } from '../../hooks/useDemoData'
import logo from '../../assets/brand/ecovolt-logo.png'
import logoDark from '../../assets/brand/ecovolt-logo-dark.png'
import AppNavigation from './AppNavigation'

const titles: Record<string, string> = { '/app': 'Sua jornada', '/app/missoes': 'Missões', '/app/enviar-acao': 'Nova ação', '/app/validacoes': 'Suas atividades', '/app/ranking': 'Ranking', '/app/recompensas': 'Recompensas', '/app/perfil': 'Seu perfil' }
const mutedTextClass = 'text-[#52665f] dark:text-[#b1c8bd]'
const eyebrowClass = 'text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-300'
const iconButtonClass = `flex size-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 transition-colors hover:bg-emerald-500/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f7f5] dark:border-emerald-700 dark:hover:bg-emerald-500/15 dark:focus-visible:ring-emerald-300 dark:focus-visible:ring-offset-[#061f1a]`
const sidebarLinkClass = `mt-4 flex min-h-12 items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-colors hover:bg-emerald-500/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-emerald-500/15 dark:focus-visible:ring-emerald-300 dark:focus-visible:ring-offset-emerald-950 ${mutedTextClass}`

export default function AppLayout() {
  const { user, logout } = useAuth()
  const { actions } = useDemoData()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const [leaving, setLeaving] = useState(false)
  const [error, setError] = useState('')
  const pending = actions.filter(action => action.status === 'pending' || action.status === 'in_review').length
  if (!user) return <Navigate to="/login" replace />

  async function signOut() {
    setLeaving(true)
    setError('')
    try { await logout() } catch { setError('Não foi possível sair. Tente novamente.') } finally { setLeaving(false) }
  }
  const nested = pathname.startsWith('/app/validacoes/')
  return (
    <div className="flex min-h-dvh bg-[#f3f7f5] text-[#102f29] [color-scheme:light] dark:bg-[#061f1a] dark:text-[#edf7f1] dark:[color-scheme:dark]">
      <a href="#app-content" className="fixed left-5 top-[-100px] z-60 rounded-xl bg-white p-3 font-semibold focus:top-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-950 dark:focus-visible:ring-emerald-300">Pular para o conteúdo</a>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto border-r border-emerald-100 bg-white px-5 pb-5 pt-8 dark:border-emerald-800 dark:bg-emerald-950 lg:flex">
        <Link to="/app" aria-label="EcoVolt - Início" className="mb-10 block rounded-xl"><img src={theme === 'dark' ? logoDark : logo} alt="EcoVolt" className="h-12 w-40 object-contain" /></Link>
        <p className={`${eyebrowClass} mb-4 px-3`}>Seu espaço de impacto</p>
        <AppNavigation variant="sidebar" />
        <div className="mt-auto pt-10">
          <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-900/40"><Leaf aria-hidden="true" className="mb-3 text-emerald-600 dark:text-lime-300" size={25} /><p className="text-sm font-bold">Cada atitude conta.</p><p className={`${mutedTextClass} mt-1 text-xs leading-relaxed`}>Pequenas escolhas constroem um futuro mais verde.</p></div>
          <Link to="/" className={sidebarLinkClass}><ArrowLeft aria-hidden="true" size={18} />Conhecer o projeto</Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-2 border-b border-emerald-100 bg-white px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950 lg:px-8 lg:py-4">
          <div className="flex min-w-0 items-center gap-3">
            {nested && <Link to="/app/validacoes" aria-label="Voltar às validações" className={iconButtonClass}><ArrowLeft size={20} /></Link>}
            <Link to="/app" aria-label="EcoVolt - Início" className="shrink-0 lg:hidden"><img src={theme === 'dark' ? logoDark : logo} alt="EcoVolt" className="h-9 w-28 object-contain object-left" /></Link>
            <p className="hidden text-sm font-bold lg:block">{titles[pathname] ?? (pathname.endsWith('/revisao') ? 'Solicitar revisão' : 'Detalhes da ação')}</p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} className={iconButtonClass}>{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
            <Link to="/app/recompensas" aria-label="Recompensas" className={iconButtonClass}><Gift size={20} /></Link>
            <Link to="/app/validacoes" aria-label={`Validações${pending ? `, ${pending} em análise` : ''}`} className={`${iconButtonClass} relative`}><ClipboardCheck size={20} />{pending > 0 && <span className="absolute right-0 top-0 flex min-w-4 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">{pending}</span>}</Link>
            <Link to="/app/perfil" aria-label="Seu perfil" className="hidden size-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 sm:flex dark:bg-emerald-800 dark:text-emerald-100">{user.displayName.split(' ').map(part => part[0]).slice(0, 2).join('')}</Link>
          </div>
        </header>
        <main id="app-content" tabIndex={-1} className="mx-auto w-full max-w-6xl px-4 pb-5 pt-6 outline-none sm:px-6 sm:pt-7 lg:px-8 lg:pt-8 [&_h1]:text-[clamp(1.65rem,3vw,2.2rem)] [&_h1]:leading-[1.15] [&_h1]:tracking-[-0.035em] [&_h2]:tracking-[-0.035em] [&_h3]:tracking-[-0.035em] [&_h1[id]]:scroll-mt-24 [&_section[id]]:scroll-mt-24"><div key={pathname} className="min-w-0"><Outlet /></div></main>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pb-28 text-xs lg:px-8 lg:pb-6">
          <p className={mutedTextClass}>Modo demonstração · As alterações reiniciam ao recarregar.</p>
          <button onClick={() => void signOut()} disabled={leaving} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-semibold text-emerald-700 disabled:opacity-50 dark:text-emerald-300"><LogOut aria-hidden="true" size={15} />{leaving ? 'Saindo…' : 'Sair da conta'}</button>
          {error && <p role="alert" className="w-full text-red-600 dark:text-red-300">{error}</p>}
        </div>
      </div>
      <AppNavigation variant="bottom" />
    </div>
  )
}
