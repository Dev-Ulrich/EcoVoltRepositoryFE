import { Award, Leaf, Target, Zap } from 'lucide-react'

import { useDemoData } from '../../hooks/useDemoData'
import { actionCategories, actionStatusLabels } from '../../data/mockActions'

function DashboardPage() {
  const { user, actions } = useDemoData()
  if (!user) return null
  const summaryItems = [
  {
    title: 'Pontos acumulados',
    value: user.points.toLocaleString('pt-BR'),
    description: 'Seus pontos aparecerão aqui',
    icon: Zap,
  },
  {
    title: 'Ações concluídas',
    value: user.completedActions.toLocaleString('pt-BR'),
    description: 'Continue contribuindo',
    icon: Leaf,
  },
  {
    title: 'Missões ativas',
    value: user.activeMissions.toLocaleString('pt-BR'),
    description: 'Confira os desafios disponíveis',
    icon: Target,
  },
  {
    title: 'Nível atual',
    value: user.tier,
    description: 'Cada atitude faz você crescer',
    icon: Award,
  },
]

  return (
    <section aria-labelledby="dashboard-title">
      <div className="mb-8">
        <p className="mb-2 font-semibold text-emerald-700 dark:text-emerald-400">
          Área do participante
        </p>

        <h1
          id="dashboard-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Olá, {user.displayName}!
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600 dark:text-emerald-100">
          Demonstração do EcoVolt: ações, pontos e evolução abaixo são dados fictícios.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm transition-colors dark:border-emerald-800 dark:bg-emerald-950/50"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                <Icon aria-hidden="true" size={22} />
              </div>

              <p className="text-sm font-medium text-slate-600 dark:text-emerald-100">
                {item.title}
              </p>

              <p className="mt-1 text-3xl font-bold">{item.value}</p>

              <p className="mt-2 text-sm text-slate-500 dark:text-emerald-300">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl bg-emerald-800 p-6 text-white sm:p-8 dark:bg-emerald-900">
          <div className="flex items-center gap-3"><Leaf aria-hidden="true" /><h2 className="text-xl font-bold">Sua jornada sustentável</h2></div>
          <p className="mt-5 text-sm text-emerald-100">Experiência acumulada</p>
          <p className="mt-1 text-4xl font-bold">{user.xp.toLocaleString('pt-BR')} <span className="text-lg font-medium">XP</span></p>
          <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">Nível {user.tier}</span>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-emerald-100">Pequenas atitudes transformam o futuro. Em breve, você poderá registrar ações sustentáveis e acompanhar sua evolução por aqui.</p>
        </article>
        <article className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8 dark:border-emerald-800 dark:bg-emerald-950/50">
          <h2 className="text-xl font-bold">Suas atividades</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">Dados simulados. Alterações reiniciam ao recarregar a página ou sair.</p>
          {actions.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600 dark:text-emerald-100">Nenhuma ação nesta demonstração.</p>
          ) : (
            <ul className="mt-5 divide-y divide-emerald-100 dark:divide-emerald-800">
              {actions.slice(0, 4).map(action => (
                <li key={action.id} className="py-3">
                  <p className="font-semibold">{actionCategories[action.category].title}</p>
                  <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">{actionStatusLabels[action.status]}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-emerald-200">{action.description}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
