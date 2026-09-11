import { ClipboardCheck } from 'lucide-react'
import AppPageHeader from '../../components/app/AppPageHeader'
import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import {
  actionLinkClass,
  actionVariants,
  dateLabel,
  fieldClass,
} from '../../components/actions/actionPresentation'
import { actionCategories, actionStatusLabels } from '../../data/mockActions'
import { useDemoData } from '../../hooks/useDemoData'

export default function DetalhesAcaoPage() {
  const { acaoId } = useParams()
  const { getAction, resolveAction } = useDemoData()
  const location = useLocation()
  const action = getAction(acaoId ?? '')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  if (!action)
    return (
      <Card>
        <h1 className="text-2xl font-bold">Ação não encontrada</h1>
        <p className="my-4">
          O registro pode ter sido removido ao recarregar a demonstração.
        </p>
        <Link className={actionLinkClass} to="/app/validacoes">
          Voltar às validações
        </Link>
      </Card>
    )
  function resolve(approved: boolean) {
    try {
      resolveAction(action!.id, approved, reason)
      setMessage(
        approved
          ? 'Aprovação simulada. Pontos, XP e missões foram atualizados.'
          : 'Recusa simulada. Você pode solicitar uma revisão.',
      )
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível simular a análise.',
      )
    }
  }
  return (
    <section className="mx-auto max-w-3xl" aria-labelledby="detail-title">
      <Link
        to="/app/validacoes"
        className="inline-block rounded-lg py-3 underline focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        Voltar às validações
      </Link>
      <AppPageHeader id="detail-title" title={actionCategories[action.category].title} description="Todos os detalhes do seu impacto, em um só lugar." eyebrow="Sua atividade" icon={ClipboardCheck} />
      {typeof location.state?.notice === 'string' && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-emerald-100 p-4 text-emerald-900"
        >
          {location.state.notice}
        </p>
      )}
      <Card className="mt-6 shadow-sm">
        <Badge variant={actionVariants[action.status]}>
          {actionStatusLabels[action.status]}
        </Badge>
        <p className="mt-5 whitespace-pre-wrap break-words">
          {action.description}
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-bold">Data do envio</dt>
            <dd>{dateLabel(action.submittedAt)}</dd>
          </div>
          <div>
            <dt className="font-bold">ODS</dt>
            <dd>{actionCategories[action.category].ods}</dd>
          </div>
          <div>
            <dt className="font-bold">Pontuação</dt>
            <dd>
              {action.status === 'approved'
                ? `${action.awardedPoints} pontos · ${action.awardedXp} XP recebidos`
                : `Até ${action.possiblePoints} pontos`}
            </dd>
          </div>
          <div>
            <dt className="font-bold">Evidência demonstrativa</dt>
            <dd className="break-all">
              {action.evidence.name} ·{' '}
              {(action.evidence.size / 1024 / 1024).toFixed(2)} MB
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-slate-500 dark:text-emerald-200">
          Somente os metadados do arquivo são mantidos. Nenhum vídeo está
          hospedado ou disponível para reprodução.
        </p>
        {action.rejectionReason && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-800 dark:bg-red-950/40 dark:text-red-200">
            Motivo da recusa: {action.rejectionReason}
          </p>
        )}
        {action.review && (
          <p className="mt-5 break-words">
            Revisão de {dateLabel(action.review.requestedAt)}:{' '}
            {action.review.justification}
          </p>
        )}
        {action.status === 'rejected' && (
          <Link
            to={`/app/validacoes/${action.id}/revisao`}
            className={`${actionLinkClass} mt-5`}
          >
            Solicitar revisão
          </Link>
        )}
      </Card>
      {['pending', 'in_review'].includes(action.status) && (
        <Card className="mt-6 shadow-sm">
          <h2 className="text-xl font-bold">Experimentar análise simulada</h2>
          <p className="my-4 text-sm">
            Escolha um resultado para demonstrar o fluxo. Não há avaliador real.
            Aprovar concede os pontos da categoria e 40 XP, além das missões
            atingidas.
          </p>
          <label htmlFor="refusal-reason" className="mb-2 block font-semibold">
            Motivo para recusar
          </label>
          <textarea
            id="refusal-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={2000}
            className={fieldClass}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => resolve(true)}>Simular aprovação</Button>
            <Button variant="secondary" onClick={() => resolve(false)}>
              Simular recusa
            </Button>
          </div>
        </Card>
      )}
      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-emerald-300 p-4"
        >
          {message}
        </p>
      )}
    </section>
  )
}
