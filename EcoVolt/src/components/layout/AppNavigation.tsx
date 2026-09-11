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
  const navClass = bottom
    ? 'fixed inset-x-0 bottom-0 z-40 border-t border-emerald-100 bg-white px-1.5 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(5,46,22,0.08)] dark:border-emerald-800 dark:bg-emerald-950 lg:hidden'
    : variant === 'sidebar'
      ? 'w-full'
      : 'overflow-x-auto'
  return (
    <nav aria-label={bottom ? 'Navegação inferior' : 'Navegação do aplicativo'} className={navClass}>
      <ul className={bottom ? 'grid grid-cols-5' : variant === 'sidebar' ? 'space-y-1.5' : 'flex gap-2 p-3'}>
        {items.map(({ label, icon: Icon, path }) => {
          const isCreate = path === '/app/enviar-acao' && bottom
          return (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/app'}
                className={({ isActive }) => bottom
                  ? `flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-colors ${isActive ? 'text-emerald-700 dark:text-lime-300' : 'text-[#52665f] dark:text-[#b1c8bd]'}`
                  : `flex min-h-12 items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/70 dark:text-lime-300' : 'text-[#52665f] hover:bg-emerald-500/8 dark:text-[#b1c8bd] dark:hover:bg-emerald-500/15'}`}
              >
                {({ isActive }) => (
                  <>
                    <span className={`flex items-center justify-center rounded-xl transition ${isCreate ? `-mt-2 h-9 w-11 ${isActive ? 'bg-lime-400' : 'bg-lime-300'} text-emerald-950 shadow-[0_3px_10px_rgba(101,163,13,0.2)]` : `h-7 w-11 ${isActive && bottom ? 'bg-emerald-100 dark:bg-emerald-900/70' : ''}`}`}><Icon aria-hidden="true" size={bottom ? 22 : 20} strokeWidth={1.8} /></span>
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
