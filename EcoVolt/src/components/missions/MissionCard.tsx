import { ArrowRight, CheckCheck, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import Card from '../common/Card'
import MissionProgress from './MissionProgress'
import { missionDifficultyLabels, missionStatusLabels, missionStatusVariants } from '../../data/mockMissions'
import type { Mission } from '../../types/mission'

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <Card className="flex h-full flex-col shadow-sm">
      <div className="mb-4 flex items-center justify-between"><span className={`flex size-12 items-center justify-center rounded-2xl ${mission.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200' : 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300'}`}>{mission.status === 'completed' ? <CheckCheck aria-hidden="true" size={26} /> : <Target aria-hidden="true" size={26} />}</span><span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">+{mission.points} pts</span></div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant={missionStatusVariants[mission.status]}>{missionStatusLabels[mission.status]}</Badge>
        <span className="text-xs font-semibold text-slate-500 dark:text-emerald-200">
          <span className="sr-only">Dificuldade: </span>
          {missionDifficultyLabels[mission.difficulty]}
        </span>
      </div>
      <h3 className="mt-5 break-words text-lg font-bold">{mission.title}</h3>
      <p className="mb-6 mt-2 text-sm text-slate-600 dark:text-emerald-100">
        {mission.status === 'completed' ? 'Recebidos' : 'Ao concluir'}: {mission.points} pontos · {mission.xp} XP
      </p>
      <div className="mt-auto">
        <MissionProgress mission={mission} />
        {mission.status !== 'completed' && <Link to="/app/enviar-acao" className="mt-4 flex min-h-11 items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-200">Registrar uma ação <ArrowRight aria-hidden="true" size={17} /></Link>}
      </div>
    </Card>
  )
}

export default MissionCard
