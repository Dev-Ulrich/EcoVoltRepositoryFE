import { Award, Info, Trophy } from 'lucide-react'
import { useState } from 'react'

import Card from '../../components/common/Card'
import Podium from '../../components/ranking/Podium'
import RankingTable from '../../components/ranking/RankingTable'
import TierBadge from '../../components/ranking/TierBadge'
import { useDemoData } from '../../hooks/useDemoData'
import type { Tier } from '../../types/user'

const tiers: Tier[] = ['Ferro', 'Bronze', 'Prata', 'Ouro', 'Diamante', 'Sustentabilístico']

function RankingPage() {
  const { user, getRankingByTier } = useDemoData()
  const [selectedTier, setSelectedTier] = useState<Tier>(user?.tier ?? 'Bronze')

  if (!user) return null

  const entries = getRankingByTier(selectedTier)
  const currentRanking = getRankingByTier(user.tier).find(entry => entry.userId === user.id)

  return (
    <section aria-labelledby="ranking-title">
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Award aria-hidden="true" className="text-emerald-700 dark:text-emerald-400" size={28} />
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">Área do participante</p>
        </div>
        <h1 id="ranking-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Ranking mensal</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-emerald-100">Compare sua evolução com outros participantes do mesmo tier e acompanhe as posições desta demonstração.</p>
        <p className="mt-3 flex items-start gap-2 text-sm text-slate-500 dark:text-emerald-200"><Info aria-hidden="true" className="mt-0.5 shrink-0" size={16} />Classificação demonstrativa: os dados são fictícios e reiniciam ao recarregar a página ou sair.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-emerald-200">Período</p>
              <h2 className="mt-1 text-xl font-bold">Ciclo mensal</h2>
            </div>
            <label className="flex min-w-48 flex-col gap-2 text-sm font-bold">
              <span>Filtrar por tier</span>
              <select
                value={selectedTier}
                onChange={event => setSelectedTier(event.target.value as Tier)}
                className="min-h-11 rounded-lg border border-emerald-300 bg-white px-3 py-2 font-semibold text-slate-900 outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-white"
              >
                {tiers.map(tier => <option key={tier} value={tier}>{tier}</option>)}
              </select>
            </label>
          </div>
        </Card>

        <Card className="border-emerald-700 bg-emerald-800 text-white shadow-sm dark:border-emerald-500 dark:bg-emerald-900">
          <div className="flex items-center gap-3"><Trophy aria-hidden="true" className="text-emerald-300" /><h2 className="text-lg font-bold">Seu destaque</h2></div>
          <div className="mt-5 flex items-center justify-between gap-3"><span className="break-words font-semibold">{user.displayName}</span><TierBadge tier={user.tier} /></div>
          <p className="mt-5 text-3xl font-black">{user.points.toLocaleString('pt-BR')} <span className="text-base font-semibold text-emerald-200">pontos</span></p>
          <p className="mt-3 text-sm text-emerald-100">{currentRanking ? `Posição #${currentRanking.position} no tier ${user.tier}.` : 'Sem posição registrada no ranking demonstrativo.'}</p>
          {selectedTier !== user.tier && <p className="mt-3 text-xs text-emerald-200">O filtro mostra o tier {selectedTier}; seus pontos continuam os do seu perfil.</p>}
        </Card>
      </div>

      <Card className="mt-6 shadow-sm" aria-live="polite">
        {entries.length === 0 ? (
          <div className="py-8 text-center">
            <Award aria-hidden="true" className="mx-auto text-emerald-600 dark:text-emerald-400" size={30} />
            <h2 className="mt-4 text-xl font-bold">Nenhum participante neste tier</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-emerald-100">Ainda não há posições demonstrativas para o tier {selectedTier}.</p>
          </div>
        ) : (
          <>
            <Podium entries={entries} currentUserId={user.id} />
            <div className="mt-8 border-t border-emerald-100 pt-8 dark:border-emerald-800">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div><h2 className="text-xl font-bold">Classificação do tier {selectedTier}</h2><p className="mt-1 text-sm text-slate-500 dark:text-emerald-200">{entries.length} participante{entries.length === 1 ? '' : 's'} no ciclo mensal.</p></div>
                <span className="text-sm font-semibold text-slate-500 dark:text-emerald-200">Pontos acumulados</span>
              </div>
              <RankingTable entries={entries} currentUserId={user.id} />
            </div>
          </>
        )}
      </Card>
    </section>
  )
}

export default RankingPage