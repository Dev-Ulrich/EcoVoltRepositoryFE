import { Info, Search, Target } from 'lucide-react'
import { useState } from 'react'

import Card from '../../components/common/Card'
import ProgressBar from '../../components/common/ProgressBar'
import MissionCard from '../../components/missions/MissionCard'
import {
  missionDifficultyLabels,
  missionStatusLabels,
} from '../../data/mockMissions'
import { useDemoData } from '../../hooks/useDemoData'
import type { MissionDifficulty, MissionStatus } from '../../types/mission'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(value))

const difficulties: MissionDifficulty[] = ['easy', 'medium', 'hard']
const statuses: MissionStatus[] = ['pending', 'in_progress', 'completed']

const filterButtonClass = (active: boolean) =>
  `min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-emerald-950 ${
    active
      ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950'
      : 'border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200 dark:hover:bg-emerald-900'
  }`

function MissoesPage() {
  const { user, missions } = useDemoData()
  const [difficultyFilter, setDifficultyFilter] = useState<MissionDifficulty | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<MissionStatus | 'all'>('all')

  if (!user) return null

  const completedMissions = missions.filter(mission => mission.status === 'completed')
  const inProgressMissions = missions.filter(mission => mission.status === 'in_progress')
  const pendingMissions = missions.filter(mission => mission.status === 'pending')
  const missionProgress = missions.length ? Math.round((completedMissions.length / missions.length) * 100) : 0
  const earnedPoints = completedMissions.reduce((total, mission) => total + mission.points, 0)
  const earnedXp = completedMissions.reduce((total, mission) => total + mission.xp, 0)
  const cycleEndsAt = missions[0]?.endsAt

  const filteredMissions = missions.filter(mission => {
    const matchesDifficulty = difficultyFilter === 'all' || mission.difficulty === difficultyFilter
    const matchesStatus = statusFilter === 'all' || mission.status === statusFilter
    return matchesDifficulty && matchesStatus
  })

  const hasActiveFilters = difficultyFilter !== 'all' || statusFilter !== 'all'

  const clearFilters = () => {
    setDifficultyFilter('all')
    setStatusFilter('all')
  }

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

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-emerald-100">Concluídas</dt>
            <dd className="mt-1 text-3xl font-bold">{completedMissions.length}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-emerald-100">Em progresso</dt>
            <dd className="mt-1 text-3xl font-bold">{inProgressMissions.length}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-emerald-100">Pendentes</dt>
            <dd className="mt-1 text-3xl font-bold">{pendingMissions.length}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-600 dark:text-emerald-100">Recebidos no ciclo</dt>
            <dd className="mt-1 text-3xl font-bold">{earnedPoints}</dd>
            <dd className="mt-1 text-sm text-slate-500 dark:text-emerald-200">{earnedXp} XP das missões concluídas</dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-emerald-100 pt-5 dark:border-emerald-800">
          <ProgressBar value={missionProgress} label="Missões concluídas no ciclo demonstrativo" />
          <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">
            {completedMissions.length} de {missions.length} concluídas. Pontos e XP seguem a mesma regra do dashboard.
          </p>
        </div>
      </Card>

      <section aria-labelledby="missoes-lista-title" className="mt-10">
        <h2 id="missoes-lista-title" className="text-2xl font-bold">Suas missões</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-emerald-200">
          Combine dificuldade e status para explorar a lista. O resumo acima continua considerando todas as missões.
        </p>

        <Card className="mt-5 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-5">
              <fieldset>
                <legend className="text-sm font-bold text-slate-700 dark:text-emerald-100">Dificuldade</legend>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por dificuldade">
                  <button
                    type="button"
                    aria-pressed={difficultyFilter === 'all'}
                    aria-controls="missoes-results"
                    onClick={() => setDifficultyFilter('all')}
                    className={filterButtonClass(difficultyFilter === 'all')}
                  >
                    Todas
                  </button>
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      type="button"
                      aria-pressed={difficultyFilter === difficulty}
                      aria-controls="missoes-results"
                      onClick={() => setDifficultyFilter(difficulty)}
                      className={filterButtonClass(difficultyFilter === difficulty)}
                    >
                      {missionDifficultyLabels[difficulty]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-bold text-slate-700 dark:text-emerald-100">Status</legend>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
                  <button
                    type="button"
                    aria-pressed={statusFilter === 'all'}
                    aria-controls="missoes-results"
                    onClick={() => setStatusFilter('all')}
                    className={filterButtonClass(statusFilter === 'all')}
                  >
                    Todos
                  </button>
                  {statuses.map(status => (
                    <button
                      key={status}
                      type="button"
                      aria-pressed={statusFilter === status}
                      aria-controls="missoes-results"
                      onClick={() => setStatusFilter(status)}
                      className={filterButtonClass(statusFilter === status)}
                    >
                      {missionStatusLabels[status]}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-11 shrink-0 self-start rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-900"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </Card>

        <p role="status" className="mt-5 text-sm font-semibold text-slate-600 dark:text-emerald-100">
          {filteredMissions.length}{' '}
          {filteredMissions.length === 1 ? 'resultado' : 'resultados'}
          {hasActiveFilters ? ' com os filtros atuais' : ' nesta demonstração'}.
        </p>

        <div id="missoes-results" className="mt-4" aria-live="polite">
          {filteredMissions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-emerald-300 p-6 text-center sm:p-8 dark:border-emerald-700">
              <Search aria-hidden="true" className="mx-auto text-emerald-600 dark:text-emerald-400" size={28} />
              <h3 className="mt-4 text-lg font-bold">Nenhuma missão encontrada</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-emerald-100">
                Nenhum resultado para a combinação de dificuldade e status selecionada.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 min-h-11 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
              {filteredMissions.map(mission => (
                <li key={mission.id} className="min-w-0">
                  <MissionCard mission={mission} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </section>
  )
}

export default MissoesPage
