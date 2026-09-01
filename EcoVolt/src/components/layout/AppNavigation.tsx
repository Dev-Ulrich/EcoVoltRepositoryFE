import { LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/app',
    icon: LayoutDashboard,
    end: true,
  },
]

function AppNavigation() {
  return (
    <nav aria-label="Navegação da área do participante">
      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Área do participante
      </p>

      <ul className="flex gap-2 overflow-x-auto lg:flex-col">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <li key={item.path} className="shrink-0">
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                  ].join(' ')
                }
              >
                <Icon aria-hidden="true" size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AppNavigation