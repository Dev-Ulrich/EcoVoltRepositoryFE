import type { RankedEntry } from '../../types/ranking'
import TierBadge from './TierBadge'

type RankingTableProps = {
  entries: readonly RankedEntry[]
  currentUserId: number
}

function RankingTable({ entries, currentUserId }: RankingTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-200 dark:border-emerald-800">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <caption className="sr-only">Classificação mensal demonstrativa</caption>
        <thead className="bg-emerald-50 text-xs uppercase tracking-wider text-slate-600 dark:bg-emerald-900/60 dark:text-emerald-200">
          <tr>
            <th scope="col" className="px-5 py-4">Posição</th>
            <th scope="col" className="px-5 py-4">Participante</th>
            <th scope="col" className="px-5 py-4">Tier</th>
            <th scope="col" className="px-5 py-4 text-right">Pontos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100 dark:divide-emerald-800">
          {entries.map(entry => {
            const isCurrentUser = entry.userId === currentUserId
            return (
              <tr key={entry.userId} className={isCurrentUser ? 'bg-emerald-100/70 font-semibold dark:bg-emerald-900/70' : 'bg-white dark:bg-emerald-950/20'}>
                <th scope="row" className="whitespace-nowrap px-5 py-4 font-black">#{entry.position}</th>
                <td className="px-5 py-4">{entry.displayName}{isCurrentUser && <span className="ml-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">Você</span>}</td>
                <td className="px-5 py-4"><TierBadge tier={entry.tier} /></td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-bold">{entry.points.toLocaleString('pt-BR')} pts</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RankingTable