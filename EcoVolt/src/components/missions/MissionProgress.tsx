import ProgressBar from '../common/ProgressBar'
import type { Mission } from '../../types/mission'

function MissionProgress({ mission }: { mission: Mission }) {
  const { current, target, unit } = mission.progress
  const percentage = target > 0 ? Math.round((current / target) * 100) : 0

  return (
    <div>
      <ProgressBar value={percentage} label={`Progresso: ${mission.title}`} />
      <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">
        {current} de {target} {unit}
      </p>
    </div>
  )
}

export default MissionProgress
