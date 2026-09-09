import { Award, ClipboardCheck, Gift, Leaf, Target, UserRound } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const navigationItems = [
  { label: 'Enviar ação', icon: Leaf, path: null },
  { label: 'Validações', icon: ClipboardCheck, path: null },
  { label: 'Missões', icon: Target, path: null },
  { label: 'Ranking', icon: Award, path: '/app/ranking' },
  { label: 'Recompensas', icon: Gift, path: null },
  { label: 'Perfil', icon: UserRound, path: null },
]

function AppNavigation() {
  const location = useLocation()

  return (
    <nav aria-label="Funcionalidades da área do participante" className="border-t border-emerald-100 dark:border-emerald-900">
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
        {navigationItems.map(({ label, icon: Icon, path }) => (
          <li key={label} className="shrink-0">
            {path ? <NavLink to={path} aria-current={location.pathname === path ? 'page' : undefined} className={({ isActive }) => `flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'text-slate-600 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900/60'}`}><Icon aria-hidden="true" size={17} />{label}</NavLink> : <button type="button" disabled className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 dark:text-emerald-200/70"><Icon aria-hidden="true" size={17} />{label}<span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-emerald-900">Em breve</span></button>}
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default AppNavigation
