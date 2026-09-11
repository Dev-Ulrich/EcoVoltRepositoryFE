import { ArrowLeft, ClipboardCheck, Gift, Leaf, LogOut, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import useTheme from '../../hooks/useTheme'
import { useDemoData } from '../../hooks/useDemoData'
import logo from '../../assets/brand/ecovolt-logo.png'
import logoDark from '../../assets/brand/ecovolt-logo-dark.png'
import AppNavigation from './AppNavigation'
import '../../styles/app.css'

const titles: Record<string, string> = { '/app': 'Sua jornada', '/app/missoes': 'Missões', '/app/enviar-acao': 'Nova ação', '/app/validacoes': 'Suas atividades', '/app/ranking': 'Ranking', '/app/recompensas': 'Recompensas', '/app/perfil': 'Seu perfil' }

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
    <div className="app-shell">
      <a href="#app-content" className="app-skip-link">Pular para o conteúdo</a>
      <aside className="app-sidebar">
        <Link to="/app" aria-label="EcoVolt - Início" className="mb-10 block rounded-xl"><img src={theme === 'dark' ? logoDark : logo} alt="EcoVolt" className="h-12 w-40 object-contain" /></Link>
        <p className="app-eyebrow mb-4 px-3">Seu espaço de impacto</p>
        <AppNavigation variant="sidebar" />
        <div className="mt-auto pt-10">
          <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-900/40"><Leaf aria-hidden="true" className="mb-3 text-emerald-600 dark:text-lime-300" size={25} /><p className="text-sm font-bold">Cada atitude conta.</p><p className="app-muted mt-1 text-xs leading-relaxed">Pequenas escolhas constroem um futuro mais verde.</p></div>
          <Link to="/" className="app-nav-link mt-4"><ArrowLeft aria-hidden="true" size={18} />Conhecer o projeto</Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1 lg:ml-64">
        <header className="app-topbar">
          <div className="flex min-w-0 items-center gap-3">
            {nested && <Link to="/app/validacoes" aria-label="Voltar às validações" className="app-icon-button"><ArrowLeft size={20} /></Link>}
            <Link to="/app" aria-label="EcoVolt - Início" className="shrink-0 lg:hidden"><img src={theme === 'dark' ? logoDark : logo} alt="EcoVolt" className="h-9 w-28 object-contain object-left" /></Link>
            <p className="hidden text-sm font-bold lg:block">{titles[pathname] ?? (pathname.endsWith('/revisao') ? 'Solicitar revisão' : 'Detalhes da ação')}</p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} className="app-icon-button">{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
            <Link to="/app/recompensas" aria-label="Recompensas" className="app-icon-button"><Gift size={20} /></Link>
            <Link to="/app/validacoes" aria-label={`Validações${pending ? `, ${pending} em análise` : ''}`} className="app-icon-button relative"><ClipboardCheck size={20} />{pending > 0 && <span className="absolute right-0 top-0 flex min-w-4 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">{pending}</span>}</Link>
            <Link to="/app/perfil" aria-label="Seu perfil" className="hidden size-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 sm:flex dark:bg-emerald-800 dark:text-emerald-100">{user.displayName.split(' ').map(part => part[0]).slice(0, 2).join('')}</Link>
          </div>
        </header>
        <main id="app-content" tabIndex={-1} className="app-content"><div key={pathname} className="app-screen"><Outlet /></div></main>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pb-28 text-xs lg:px-8 lg:pb-6">
          <p className="app-muted">Modo demonstração · As alterações reiniciam ao recarregar.</p>
          <button onClick={() => void signOut()} disabled={leaving} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-semibold text-emerald-700 disabled:opacity-50 dark:text-emerald-300"><LogOut aria-hidden="true" size={15} />{leaving ? 'Saindo…' : 'Sair da conta'}</button>
          {error && <p role="alert" className="w-full text-red-600 dark:text-red-300">{error}</p>}
        </div>
      </div>
      <AppNavigation variant="bottom" />
    </div>
  )
}
