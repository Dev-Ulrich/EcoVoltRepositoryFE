import { Award, Leaf, Target, Zap } from 'lucide-react'

const summaryItems = [
  {
    title: 'Pontos acumulados',
    value: '0',
    description: 'Seus pontos aparecerão aqui',
    icon: Zap,
  },
  {
    title: 'Ações concluídas',
    value: '0',
    description: 'Continue contribuindo',
    icon: Leaf,
  },
  {
    title: 'Missões ativas',
    value: '0',
    description: 'Confira os desafios disponíveis',
    icon: Target,
  },
  {
    title: 'Posição no ranking',
    value: '—',
    description: 'Conclua ações para participar',
    icon: Award,
  },
]

function DashboardPage() {
  return (
    <section aria-labelledby="dashboard-title">
      <div className="mb-8">
        <p className="mb-2 font-semibold text-emerald-600 dark:text-emerald-400">
          Área do participante
        </p>

        <h1
          id="dashboard-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Seu impacto sustentável
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Acompanhe suas ações, seus pontos e sua evolução dentro do EcoVolt.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                <Icon aria-hidden="true" size={22} />
              </div>

              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {item.title}
              </p>

              <p className="mt-1 text-3xl font-bold">{item.value}</p>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default DashboardPage