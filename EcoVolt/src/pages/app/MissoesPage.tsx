import { Search, Target } from 'lucide-react'
import { useState } from 'react'
import AppPageHeader from '../../components/app/AppPageHeader'
import Card from '../../components/common/Card'
import ProgressBar from '../../components/common/ProgressBar'
import MissionCard from '../../components/missions/MissionCard'
import { missionDifficultyLabels, missionStatusLabels } from '../../data/mockMissions'
import { useDemoData } from '../../hooks/useDemoData'
import type { MissionDifficulty, MissionStatus } from '../../types/mission'

const filterClass = (active: boolean) => `min-h-11 rounded-full border px-4 py-2 text-xs font-semibold ${active ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950' : 'border-emerald-200 bg-white text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200'}`

export default function MissoesPage() {
  const { user, missions } = useDemoData()
  const [difficultyFilter, setDifficultyFilter] = useState<MissionDifficulty | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<MissionStatus | 'all'>('all')
  if (!user) return null
  const completed = missions.filter(mission => mission.status === 'completed')
  const filtered = missions.filter(mission => (difficultyFilter === 'all' || mission.difficulty === difficultyFilter) && (statusFilter === 'all' || mission.status === statusFilter))
  const hasFilters = difficultyFilter !== 'all' || statusFilter !== 'all'
  function clearFilters() { setDifficultyFilter('all'); setStatusFilter('all') }
  return <section aria-labelledby="missoes-title">
    <AppPageHeader id="missoes-title" title="Missões" description="Complete desafios e transforme bons hábitos em conquistas." icon={Target} />
    <Card><div className="flex items-center justify-between gap-3"><h2 className="text-base font-bold">Seu progresso no ciclo</h2><span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-bold text-lime-800 dark:bg-lime-900/30 dark:text-lime-200">+{completed.reduce((sum, mission) => sum + mission.points, 0)} pts</span></div><div className="mt-4"><ProgressBar value={missions.length ? Math.round(completed.length / missions.length * 100) : 0} label={`${completed.length} de ${missions.length} missões concluídas`} /></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#52665f] dark:text-[#b1c8bd]"><span>{missions.filter(mission => mission.status === 'in_progress').length} em progresso</span><span>{missions.filter(mission => mission.status === 'pending').length} pendentes</span><span>{completed.reduce((sum, mission) => sum + mission.xp, 0)} XP conquistados</span></div></Card>
    <section aria-labelledby="missoes-lista-title" className="mt-7"><h2 id="missoes-lista-title" className="text-xl font-bold">Encontre seu próximo desafio</h2>
      <div className="mt-4 space-y-3"><div role="group" aria-label="Filtrar por dificuldade" className="flex flex-wrap gap-2"><button type="button" aria-pressed={difficultyFilter === 'all'} onClick={() => setDifficultyFilter('all')} className={filterClass(difficultyFilter === 'all')}>Todas</button>{(['easy', 'medium', 'hard'] as const).map(value => <button key={value} type="button" aria-pressed={difficultyFilter === value} onClick={() => setDifficultyFilter(value)} className={filterClass(difficultyFilter === value)}>{missionDifficultyLabels[value]}</button>)}</div>
      <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-1"><button type="button" aria-pressed={statusFilter === 'all'} onClick={() => setStatusFilter('all')} className={`min-h-11 rounded-lg px-3 text-xs font-semibold ${statusFilter === 'all' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'text-[#52665f] dark:text-[#b1c8bd]'}`}>Todos</button>{(['pending', 'in_progress', 'completed'] as const).map(value => <button key={value} type="button" aria-pressed={statusFilter === value} onClick={() => setStatusFilter(value)} className={`min-h-11 rounded-lg px-3 text-xs font-semibold ${statusFilter === value ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'text-[#52665f] dark:text-[#b1c8bd]'}`}>{missionStatusLabels[value]}</button>)}</div></div>
      <div className="my-3 flex items-center justify-between gap-3"><p role="status" className="text-xs text-[#52665f] dark:text-[#b1c8bd]">{filtered.length} {filtered.length === 1 ? 'missão encontrada' : 'missões encontradas'}</p>{hasFilters && <button type="button" onClick={clearFilters} className="min-h-11 rounded-lg px-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">Limpar filtros</button>}</div>
      <div id="missoes-results">{filtered.length ? <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(mission => <li key={mission.id} className="min-w-0"><MissionCard mission={mission} /></li>)}</ul> : <Card className="text-center"><Search aria-hidden="true" className="mx-auto mb-4 text-emerald-600" /><h3 className="text-lg font-bold">Nenhuma missão encontrada</h3><p className="mt-2 text-sm text-[#52665f] dark:text-[#b1c8bd]">Experimente outra dificuldade ou status para encontrar seu próximo desafio.</p><button type="button" onClick={clearFilters} className="mt-4 min-h-11 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white">Ver todas as missões</button></Card>}</div>
    </section>
  </section>
}
