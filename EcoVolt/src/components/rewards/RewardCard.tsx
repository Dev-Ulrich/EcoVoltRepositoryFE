import { Gift, LockKeyhole } from 'lucide-react'

import Badge from '../common/Badge'
import Card from '../common/Card'
import ProgressBar from '../common/ProgressBar'
import type { Reward, RewardStatus } from '../../types/reward'

type RewardCardProps = {
  reward: Reward
}

const statusLabels: Record<RewardStatus, string> = {
  available: 'Disponível',
  in_progress: 'Em progresso',
  locked: 'Bloqueada',
}

const statusVariants: Record<RewardStatus, 'success' | 'info' | 'neutral'> = {
  available: 'success',
  in_progress: 'info',
  locked: 'neutral',
}

function RewardCard({ reward }: RewardCardProps) {
  const progress = reward.progress.target > 0 ? Math.round(reward.progress.current / reward.progress.target * 100) : 0

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          {reward.status === 'locked' ? <LockKeyhole aria-hidden="true" size={21} /> : <Gift aria-hidden="true" size={30} />}
        </div>
        <Badge variant={statusVariants[reward.status]}>{statusLabels[reward.status]}</Badge>
      </div>
      <h3 className="mt-5 break-words text-xl font-bold">{reward.title}</h3>
      <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{reward.description}</p>
      <div className="mt-5 border-t border-emerald-100 pt-4 dark:border-emerald-800">
        <p className="text-sm font-semibold">Requisito</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-emerald-100">{reward.requirement}</p>
        {reward.requiredTier && <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-emerald-200">Tier necessário: {reward.requiredTier}</p>}
        <div className="mt-4">
          <ProgressBar value={progress} label={`${reward.progress.current} de ${reward.progress.target} concluído`} />
        </div>
        {reward.pointsCost > 0 && <p className="mt-3 text-xs text-slate-500 dark:text-emerald-200">Referência do catálogo: {reward.pointsCost.toLocaleString('pt-BR')} pontos</p>}
      </div>
    </Card>
  )
}

export default RewardCard