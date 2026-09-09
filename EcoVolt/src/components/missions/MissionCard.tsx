import Badge from '../common/Badge'
import Card from '../common/Card'
import ProgressBar from '../common/ProgressBar'
import { missionDifficultyLabels, missionStatusLabels, missionStatusVariants } from '../../data/mockMissions'
import type { Mission } from '../../types/mission'

function MissionCard({ mission }: { mission: Mission }) {
  const { current, target, unit } = mission.progress
  const percentage = target > 0 ? Math.round(current / target * 100) : 0

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant={missionStatusVariants[mission.status]}>{missionStatusLabels[mission.status]}</Badge>
        <span className="text-xs font-semibold text-slate-500 dark:text-emerald-200">{missionDifficultyLabels[mission.difficulty]}</span>
      </div>
      <h3 className="mt-5 text-lg font-bold">{mission.title}</h3>
      <p className="mb-6 mt-2 text-sm text-slate-600 dark:text-emerald-100">
        {mission.status === 'completed' ? 'Recebidos' : 'Ao concluir'}: {mission.points} pontos · {mission.xp} XP
      </p>
      <div className="mt-auto">
        <ProgressBar value={percentage} label={`Progresso: ${mission.title}`} />
        <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">{current} de {target} {unit}</p>
      </div>
    </Card>
  )
}

export default MissionCard
