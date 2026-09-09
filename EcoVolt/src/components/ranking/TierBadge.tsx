import type { Tier } from '../../types/user'

type TierBadgeProps = {
  tier: Tier
}

const tierClasses: Record<Tier, string> = {
  Ferro: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  Bronze: 'bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-300',
  Prata: 'bg-slate-100 text-slate-700 dark:bg-slate-400/15 dark:text-slate-200',
  Ouro: 'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300',
  Diamante: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300',
  Sustentabilístico: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300',
}

function TierBadge({ tier }: TierBadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${tierClasses[tier]}`}>{tier}</span>
}

export default TierBadge