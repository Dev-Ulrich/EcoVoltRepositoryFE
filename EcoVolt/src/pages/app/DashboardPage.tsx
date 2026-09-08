import { Award, Leaf, Target, Zap } from 'lucide-react'

import { useAuth } from '../../auth/useAuth'

function DashboardPage() {
  const { user } = useAuth()
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
          Acompanhe suas ações, seus pontos e sua evolução dentro do EcoVolt.
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
          <div className="mt-6 rounded-xl border border-dashed border-emerald-200 p-6 text-center dark:border-emerald-800">
            <Leaf aria-hidden="true" className="mx-auto text-emerald-600 dark:text-emerald-300" size={30} />
            <p className="mt-3 font-semibold">{user.completedActions === 0 ? 'Sua jornada está começando' : `${user.completedActions} ações concluídas`}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-emerald-200">O histórico detalhado estará disponível junto com o envio de ações.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
