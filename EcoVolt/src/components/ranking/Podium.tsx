import { Crown, Medal } from 'lucide-react'
import type { RankedEntry } from '../../types/ranking'

const podiumStyles = {
  1: 'order-2 min-h-48 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
  2: 'order-1 min-h-40 bg-slate-50 border-slate-200 dark:bg-slate-800/30 dark:border-slate-700',
  3: 'order-3 min-h-36 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
} as const

export default function Podium({ entries, currentUserId }: { entries: readonly RankedEntry[]; currentUserId: number }) {
  const topEntries = entries.filter(entry => entry.position <= 3).sort((a, b) => a.position - b.position)
  return <section aria-labelledby="podium-title"><div className="flex items-center gap-3"><Medal aria-hidden="true" className="text-amber-600 dark:text-amber-300" /><h2 id="podium-title" className="text-xl font-bold">Destaques do mês</h2></div><div className="mt-7 flex items-end gap-2 sm:gap-4">{topEntries.map(entry => <div key={entry.userId} className={`flex min-w-0 flex-1 flex-col items-center justify-end rounded-2xl border px-2 pb-4 pt-5 text-center ${podiumStyles[entry.position as 1 | 2 | 3]} ${entry.userId === currentUserId ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-emerald-950' : ''}`}>
    {entry.position === 1 && <Crown aria-label="Primeiro lugar" className="mb-2 text-amber-500" size={23} />}
    <span className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-bold text-emerald-800 shadow-sm dark:bg-emerald-900 dark:text-emerald-100">{entry.displayName.split(' ').map(part => part[0]).slice(0, 2).join('')}</span><h3 className="mt-3 w-full break-words text-xs font-bold sm:text-sm">{entry.displayName}</h3><p className="mt-2 text-lg font-bold sm:text-2xl">{entry.points.toLocaleString('pt-BR')}</p><p className="text-[10px] text-[#52665f] dark:text-[#b1c8bd]">pontos · #{entry.position}</p>
  </div>)}</div></section>
}
