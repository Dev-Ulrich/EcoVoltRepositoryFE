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
      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
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
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300'
                      : 'text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 dark:text-emerald-100 dark:hover:bg-emerald-900 dark:hover:text-white',
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
