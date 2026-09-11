import { Award, ClipboardCheck, Gift, House, Plus, Target, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const appNavigationItems = [
  { label: 'Início', icon: House, path: '/app' },
  { label: 'Missões', icon: Target, path: '/app/missoes' },
  { label: 'Nova ação', icon: Plus, path: '/app/enviar-acao' },
  { label: 'Validações', icon: ClipboardCheck, path: '/app/validacoes' },
  { label: 'Ranking', icon: Award, path: '/app/ranking' },
  { label: 'Recompensas', icon: Gift, path: '/app/recompensas' },
  { label: 'Perfil', icon: UserRound, path: '/app/perfil' },
]

export default function AppNavigation({ variant = 'inline' }: { variant?: 'sidebar' | 'bottom' | 'inline' }) {
  const bottom = variant === 'bottom'
  const items = bottom ? appNavigationItems.filter(item => !['Validações', 'Recompensas'].includes(item.label)) : appNavigationItems
  return (
    <nav aria-label={bottom ? 'Navegação inferior' : 'Navegação do aplicativo'} className={bottom ? 'app-bottom-nav' : variant === 'sidebar' ? 'app-sidebar-nav' : 'overflow-x-auto'}>
      <ul className={bottom ? 'grid grid-cols-5' : variant === 'sidebar' ? 'space-y-1.5' : 'flex gap-2 p-3'}>
        {items.map(({ label, icon: Icon, path }) => <li key={path}><NavLink to={path} end={path === '/app'} className={({ isActive }) => `${bottom ? 'app-tab' : 'app-nav-link'} ${isActive ? 'is-active' : ''} ${path === '/app/enviar-acao' && bottom ? 'app-tab-create' : ''}`}><span className="app-nav-icon"><Icon aria-hidden="true" size={bottom ? 22 : 20} strokeWidth={1.8} /></span><span>{label}</span></NavLink></li>)}
      </ul>
    </nav>
  )
}
