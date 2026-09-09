import { Medal } from 'lucide-react'

import type { RankedEntry } from '../../types/ranking'
import TierBadge from './TierBadge'

type PodiumProps = {
  entries: readonly RankedEntry[]
  currentUserId: number
}

const podiumStyles = {
  1: 'order-2 min-h-52 border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-400/10',
  2: 'order-1 min-h-44 border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-400/10',
  3: 'order-3 min-h-40 border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-400/10',
} as const

function Podium({ entries, currentUserId }: PodiumProps) {
  const topEntries = entries.filter(entry => entry.position <= 3).sort((a, b) => a.position - b.position)

  return (
    <section aria-labelledby="podium-title">
      <div className="flex items-center gap-3">
        <Medal aria-hidden="true" className="text-amber-600 dark:text-amber-300" />
        <h2 id="podium-title" className="text-xl font-bold">Destaques do mês</h2>
      </div>
      <div className="mt-5 flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-end">
        {topEntries.map(entry => {
          const isCurrentUser = entry.userId === currentUserId
          return (
            <article key={entry.userId} className={`flex flex-1 flex-col justify-between rounded-2xl border p-5 text-center ${podiumStyles[entry.position as 1 | 2 | 3]} ${isCurrentUser ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-emerald-950' : ''}`}>
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-emerald-200">#{entry.position}</p>
                <h3 className="mt-3 break-words text-lg font-bold">{entry.displayName}</h3>
                <div className="mt-3"><TierBadge tier={entry.tier} /></div>
              </div>
              <p className="mt-6 text-2xl font-black">{entry.points.toLocaleString('pt-BR')} <span className="text-sm font-semibold">pontos</span></p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Podium