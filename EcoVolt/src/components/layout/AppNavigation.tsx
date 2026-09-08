import { Award, ClipboardCheck, Gift, Leaf, Target, UserRound } from 'lucide-react'

const navigationItems = [
  { label: 'Enviar ação', icon: Leaf },
  { label: 'Validações', icon: ClipboardCheck },
  { label: 'Missões', icon: Target },
  { label: 'Ranking', icon: Award },
  { label: 'Recompensas', icon: Gift },
  { label: 'Perfil', icon: UserRound },
]

function AppNavigation() {
  return (
    <nav aria-label="Funcionalidades da área do participante" className="border-t border-emerald-100 dark:border-emerald-900">
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
        {navigationItems.map(({ label, icon: Icon }) => (
          <li key={label} className="shrink-0">
            <button type="button" disabled className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 dark:text-emerald-200/70">
              <Icon aria-hidden="true" size={17} />{label}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-emerald-900">Em breve</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default AppNavigation
