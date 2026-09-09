import { ArrowDown, ArrowRight, Award, ClipboardList, Leaf, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import Badge from '../../components/common/Badge'
import Card from '../../components/common/Card'
import ProgressBar from '../../components/common/ProgressBar'
import MissionCard from '../../components/missions/MissionCard'
import { actionCategories, actionStatusLabels } from '../../data/mockActions'
import { useDemoData } from '../../hooks/useDemoData'

const statusVariants = { pending: 'warning', approved: 'success', rejected: 'danger', in_review: 'info' } as const
const formatNumber = (value: number) => value.toLocaleString('pt-BR')
const formatDate = (value: string) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(value))
const shortcutClasses = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-900'

function DashboardPage() {
  const { user, actions, missions, ranking } = useDemoData()
  if (!user) return null

  const completedMissions = missions.filter(mission => mission.status === 'completed').length
  const missionProgress = missions.length ? Math.round(completedMissions / missions.length * 100) : 0
  const rank = ranking.find(entry => entry.userId === user.id)
  const pendingActions = actions.filter(action => action.status === 'pending' || action.status === 'in_review').length
  const recentActions = [...actions].sort((a, b) => Date.parse(b.review?.requestedAt ?? b.submittedAt) - Date.parse(a.review?.requestedAt ?? a.submittedAt)).slice(0, 5)
  const summaryItems = [
    { title: 'Pontos acumulados', value: formatNumber(user.points), description: 'Ações aprovadas e missões concluídas', icon: Zap },
    { title: 'Ações concluídas', value: formatNumber(user.completedActions), description: `${actions.length} envios na demonstração`, icon: Leaf },
    { title: 'Missões ativas', value: formatNumber(user.activeMissions), description: `${completedMissions} de ${missions.length} missões concluídas`, icon: Target },
    { title: 'Tier atual', value: user.tier, description: rank ? `Posição #${rank.position} no ranking mensal do tier` : 'Sem posição no ranking demonstrativo', icon: Award },
  ]

  return (
    <section aria-labelledby="dashboard-title">
      <header className="mb-8">
        <p className="mb-2 font-semibold text-emerald-700 dark:text-emerald-400">Área do participante</p>
        <h1 id="dashboard-title" className="text-3xl font-bold tracking-tight sm:text-4xl">Olá, {user.displayName}!</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-emerald-100">Acompanhe sua jornada sustentável com ações, missões e conquistas demonstrativas.</p>
        <p className="mt-3 text-sm text-slate-500 dark:text-emerald-200">Dados fictícios. Alterações reiniciam ao recarregar a página ou sair.</p>
        <nav aria-label="Atalhos do dashboard" className="mt-6 flex flex-wrap gap-3">
          <a href="#dashboard-missions" className={shortcutClasses}><Target aria-hidden="true" size={18} /> Minhas missões <ArrowDown aria-hidden="true" size={16} /></a>
          <a href="#dashboard-activities" className={shortcutClasses}><ClipboardList aria-hidden="true" size={18} /> Minhas atividades <ArrowDown aria-hidden="true" size={16} /></a>
          <Link to="/como-funciona" className={shortcutClasses}>Como funciona <ArrowRight aria-hidden="true" size={16} /></Link>
        </nav>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map(({ title, value, description, icon: Icon }) => (
          <Card key={title} className="shadow-sm">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><Icon aria-hidden="true" size={22} /></div>
            <h2 className="text-sm font-medium text-slate-600 dark:text-emerald-100">{title}</h2>
            <p className="mt-1 text-3xl font-bold">{value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">{description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <div className="flex items-center gap-3"><Zap aria-hidden="true" className="text-emerald-700 dark:text-emerald-400" /><h2 className="text-xl font-bold">Sua experiência</h2></div>
          <p className="mt-5 text-4xl font-bold">{formatNumber(user.xp)} <span className="text-lg font-medium">XP</span></p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">Experiência recebida pelas ações aprovadas e missões concluídas. Pontos, XP e tier representam indicadores diferentes da sua jornada.</p>
          <div className="mt-5 border-t border-emerald-100 pt-5 dark:border-emerald-800">
            <ProgressBar value={missionProgress} label="Missões concluídas no ciclo demonstrativo" />
            <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">{completedMissions} de {missions.length} concluídas. As regras de evolução de nível ainda serão definidas.</p>
          </div>
        </Card>
        <Card className="shadow-sm">
          <h2 className="text-xl font-bold">Próximos passos da sua jornada</h2>
          <p className="mt-4 leading-relaxed text-slate-600 dark:text-emerald-100">{pendingActions > 0 ? `${pendingActions} ações estão em análise ou revisão nos exemplos desta demonstração.` : 'Não há ações aguardando análise nesta demonstração.'}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-emerald-200">Envios e pedidos de revisão não concedem pontos ou XP automaticamente. Explore as missões e o histórico abaixo para conhecer o fluxo.</p>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/40">
            <Badge variant="info">Próximas etapas</Badge>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">As telas de envio, validações, missões, ranking, recompensas e perfil serão adicionadas à navegação conforme forem implementadas.</p>
          </div>
        </Card>
      </div>

      <section id="dashboard-missions" aria-labelledby="missions-title" className="mt-10 scroll-mt-48">
        <h2 id="missions-title" className="text-2xl font-bold">Suas missões</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">Progresso simulado de um ciclo fixo; não há contagem regressiva ou conclusão automática.</p>
        {missions.length === 0 ? <Card className="mt-5 shadow-sm"><p>Nenhuma missão disponível nesta demonstração.</p></Card> : (
          <div className="mt-5 grid gap-5 md:grid-cols-3">{missions.map(mission => <MissionCard key={mission.id} mission={mission} />)}</div>
        )}
      </section>

      <section id="dashboard-activities" aria-labelledby="activities-title" className="mt-10 scroll-mt-48">
        <h2 id="activities-title" className="text-2xl font-bold">Atividades recentes</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-emerald-200">Até cinco ações, ordenadas pelo envio ou pedido de revisão mais recente.</p>
        <Card className="mt-5 shadow-sm">
          {recentActions.length === 0 ? <p>Nenhuma ação nesta demonstração.</p> : (
            <ul className="divide-y divide-emerald-100 dark:divide-emerald-800">
              {recentActions.map(action => (
                <li key={action.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold">{actionCategories[action.category].title}</h3><Badge variant={statusVariants[action.status]}>{actionStatusLabels[action.status]}</Badge></div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{action.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-emerald-200">
                    <span>Envio: <time dateTime={action.submittedAt}>{formatDate(action.submittedAt)}</time></span>
                    <span>{action.status === 'approved' ? `${action.awardedPoints} pontos e ${action.awardedXp} XP recebidos` : `Até ${action.possiblePoints} pontos após aprovação`}</span>
                  </div>
                  {action.rejectionReason && <p className="mt-3 text-sm text-slate-600 dark:text-emerald-100">Motivo da recusa: {action.rejectionReason}</p>}
                  {action.review && <p className="mt-2 text-sm text-slate-600 dark:text-emerald-100">Revisão solicitada em <time dateTime={action.review.requestedAt}>{formatDate(action.review.requestedAt)}</time>: {action.review.justification}</p>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </section>
  )
}

export default DashboardPage
