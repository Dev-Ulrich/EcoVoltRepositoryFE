import { Gift, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

import Badge from '../../components/common/Badge'
import Card from '../../components/common/Card'
import RewardBalance from '../../components/rewards/RewardBalance'
import RewardCard from '../../components/rewards/RewardCard'
import { useDemoData } from '../../hooks/useDemoData'
import type { RewardStatus } from '../../types/reward'

type RewardFilter = 'all' | RewardStatus

const filters: { label: string; value: RewardFilter }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Disponíveis', value: 'available' },
  { label: 'Em progresso', value: 'in_progress' },
  { label: 'Bloqueadas', value: 'locked' },
]

function RecompensasPage() {
  const { rewards, user } = useDemoData()
  const [activeFilter, setActiveFilter] = useState<RewardFilter>('all')

  if (!user) return null

  const featuredReward = rewards.find(reward => reward.isFeatured)
  const catalogRewards = rewards.filter(reward => activeFilter === 'all' || reward.status === activeFilter)

  return (
    <section aria-labelledby="rewards-title">
      <header className="mb-8">
        <p className="mb-2 font-semibold text-emerald-700 dark:text-emerald-400">Sua jornada sustentável</p>
        <h1 id="rewards-title" className="text-3xl font-bold tracking-tight sm:text-4xl">Recompensas</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-emerald-100">Acompanhe suas conquistas e conheça os próximos marcos da demonstração.</p>
      </header>

      <RewardBalance points={user.points} />

      {featuredReward && (
        <section aria-labelledby="featured-reward-title" className="mt-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <h2 id="featured-reward-title" className="text-2xl font-bold">Destaque</h2>
            <Badge variant="warning">Conquista em evidência</Badge>
          </div>
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-1 dark:border-amber-700 dark:bg-amber-950/40">
            <RewardCard reward={featuredReward} />
          </div>
        </section>
      )}

      <section aria-labelledby="catalog-title" className="mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="catalog-title" className="text-2xl font-bold">Catálogo demonstrativo</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">Consulte requisitos e progresso. Nenhum item pode ser resgatado nesta versão.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-emerald-200">
            <SlidersHorizontal aria-hidden="true" size={18} />
            <span>Filtrar por estado</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filtro do catálogo">
          {filters.map(filter => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`min-h-11 shrink-0 rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${activeFilter === filter.value ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950' : 'border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-900'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true">
        {catalogRewards.length === 0 ? (
          <Card className="mt-5 shadow-sm">
            <div className="flex flex-col items-center px-4 py-8 text-center">
              <Gift aria-hidden="true" className="text-emerald-600 dark:text-emerald-400" size={32} />
              <h3 className="mt-4 text-lg font-bold">Nenhuma recompensa neste estado</h3>
              <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-emerald-100">Altere o filtro para consultar os outros itens do catálogo demonstrativo.</p>
            </div>
          </Card>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {catalogRewards.map(reward => <RewardCard key={reward.id} reward={reward} />)}
          </div>
        )}
        </div>
      </section>
    </section>
  )
}

export default RecompensasPage