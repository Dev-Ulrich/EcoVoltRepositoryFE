import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDemoData } from '../../hooks/useDemoData'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import {
  fieldClass,
  actionLinkClass,
} from '../../components/actions/actionPresentation'
import { actionCategories } from '../../data/mockActions'

type ReviewForm = { justification: string }
export default function RevisaoPage() {
  const { acaoId } = useParams()
  const { getAction, requestReview } = useDemoData()
  const action = getAction(acaoId ?? '')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ReviewForm>()
  if (!action || action.status !== 'rejected')
    return (
      <Card>
        <h1 className="text-2xl font-bold">Revisão indisponível</h1>
        <p className="my-4">
          Selecione uma ação recusada para solicitar uma revisão.
        </p>
        <Link className={actionLinkClass} to="/app/validacoes">
          Voltar às validações
        </Link>
      </Card>
    )
  async function submit(data: ReviewForm) {
    try {
      requestReview(action!.id, data.justification)
      navigate(`/app/validacoes/${action!.id}`, {
        replace: true,
        state: { notice: 'Revisão registrada na demonstração.' },
      })
    } catch (error) {
      setError('root', {
        message:
          error instanceof Error
            ? error.message
            : 'Não foi possível registrar a revisão.',
      })
    }
  }
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">Solicitar revisão</h1>
      <p className="my-4">
        {actionCategories[action.category].title} · Motivo:{' '}
        {action.rejectionReason}
      </p>
      <Card className="shadow-sm">
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <label htmlFor="justification" className="block font-bold">
            Justificativa
          </label>
          <textarea
            id="justification"
            rows={6}
            className={fieldClass}
            aria-invalid={!!errors.justification}
            aria-describedby="review-help review-error"
            {...register('justification', {
              required: 'Informe sua justificativa.',
              validate: (value) =>
                value.trim().length >= 10 ||
                'Escreva pelo menos 10 caracteres.',
              maxLength: { value: 2000, message: 'Use até 2.000 caracteres.' },
            })}
          />
          <p id="review-help" className="text-sm">
            Explique o contexto em 10 a 2.000 caracteres. O pedido é local e não
            será enviado a um avaliador.
          </p>
          <p id="review-error" role="alert">
            {errors.justification?.message}
          </p>
          {errors.root && <p role="alert">{errors.root.message}</p>}
          <div className="flex flex-wrap gap-4">
            <Button type="submit" disabled={isSubmitting}>
              Enviar revisão
            </Button>
            <Link
              to={`/app/validacoes/${action.id}`}
              className="rounded-lg p-3 underline focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </Card>
    </section>
  )
}
