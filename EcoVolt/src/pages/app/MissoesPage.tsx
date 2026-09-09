import { Info, Target } from 'lucide-react'

import Card from '../../components/common/Card'
import ProgressBar from '../../components/common/ProgressBar'
import MissionCard from '../../components/missions/MissionCard'
import { useDemoData } from '../../hooks/useDemoData'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(value))

function MissoesPage() {
  const { user, missions } = useDemoData()
  if (!user) return null

  const completedMissions = missions.filter(mission => mission.status === 'completed')
  const inProgressMissions = missions.filter(mission => mission.status === 'in_progress')
  const pendingMissions = missions.filter(mission => mission.status === 'pending')
  const missionProgress = missions.length ? Math.round((completedMissions.length / missions.length) * 100) : 0
  const earnedPoints = completedMissions.reduce((total, mission) => total + mission.points, 0)
  const earnedXp = completedMissions.reduce((total, mission) => total + mission.xp, 0)
  const cycleEndsAt = missions[0]?.endsAt

  return (
    <section aria-labelledby="missoes-title">
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Target aria-hidden="true" className="text-emerald-700 dark:text-emerald-400" size={28} />
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">Área do participante</p>
        </div>
        <h1 id="missoes-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Missões</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-emerald-100">
          Acompanhe o ciclo demonstrativo de missões, o progresso e as recompensas de pontos e XP previstas.
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm text-slate-500 dark:text-emerald-200">
          <Info aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
          Dados fictícios. O progresso não avança ao clicar nos cards e os prazos não são contadores reais.
        </p>
      </header>

      <Card className="shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Target aria-hidden="true" className="text-emerald-700 dark:text-emerald-400" size={22} />
          <h2 className="text-xl font-bold">Resumo do ciclo</h2>
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-emerald-100">
          Visão de todas as {missions.length} missões do participante nesta demonstração.
          {cycleEndsAt ? <> Prazo ilustrativo até <time dateTime={cycleEndsAt}>{formatDate(cycleEndsAt)}</time>.</> : null}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-emerald-100">Concluídas</p>
            <p className="mt-1 text-3xl font-bold">{completedMissions.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-emerald-100">Em progresso</p>
            <p className="mt-1 text-3xl font-bold">{inProgressMissions.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-emerald-100">Pendentes</p>
            <p className="mt-1 text-3xl font-bold">{pendingMissions.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-emerald-100">Recebidos no ciclo</p>
            <p className="mt-1 text-3xl font-bold">{earnedPoints}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-emerald-200">{earnedXp} XP das missões concluídas</p>
          </div>
        </div>

        <div className="mt-6 border-t border-emerald-100 pt-5 dark:border-emerald-800">
          <ProgressBar value={missionProgress} label="Missões concluídas no ciclo demonstrativo" />
          <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">
            {completedMissions.length} de {missions.length} concluídas. Pontos e XP seguem a mesma regra do dashboard.
          </p>
        </div>
      </Card>

      <section aria-labelledby="missoes-lista-title" className="mt-10">
        <h2 id="missoes-lista-title" className="text-2xl font-bold">Suas missões</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">
          {missions.length} {missions.length === 1 ? 'missão disponível' : 'missões disponíveis'} nesta demonstração.
        </p>

        {missions.length === 0 ? (
          <Card className="mt-5 shadow-sm">
            <p>Nenhuma missão disponível nesta demonstração.</p>
          </Card>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {missions.map(mission => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </section>
    </section>
  )
}

export default MissoesPage
