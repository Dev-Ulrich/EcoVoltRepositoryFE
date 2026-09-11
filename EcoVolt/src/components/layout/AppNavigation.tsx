import { Award, ClipboardCheck, Gift, Leaf, Target, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Enviar ação', icon: Leaf, path: '/app/enviar-acao' },
  { label: 'Validações', icon: ClipboardCheck, path: '/app/validacoes' },
  { label: 'Missões', icon: Target, path: '/app/missoes' },
  { label: 'Ranking', icon: Award, path: '/app/ranking' },
  { label: 'Recompensas', icon: Gift, path: '/app/recompensas' },
  { label: 'Perfil', icon: UserRound, path: '/app/perfil' },
]

function AppNavigation() {
  return (
    <nav aria-label="Funcionalidades da área do participante" className="border-t border-emerald-100 dark:border-emerald-900">
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
        {navigationItems.map(({ label, icon: Icon, path }) => (
          <li key={path} className="shrink-0">
            <NavLink to={path} className={({ isActive }) => `flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'text-slate-600 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900/60'}`}>
              <Icon aria-hidden="true" size={17} />{label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default AppNavigation
