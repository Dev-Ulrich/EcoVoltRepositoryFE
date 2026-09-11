import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { fieldClass } from '../../components/actions/actionPresentation'
import { actionCategories } from '../../data/mockActions'
import { useDemoData } from '../../hooks/useDemoData'
import type { ActionCategory } from '../../types/action'

type ActionForm = {
  category: ActionCategory | ''
  description: string
  evidence: FileList
}
export default function EnviarAcaoPage() {
  const { submitAction } = useDemoData()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const submitting = useRef(false)
  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ActionForm>()
  const category = useWatch({ control, name: 'category' })
  const file = useWatch({ control, name: 'evidence' })?.[0]
  const details = category ? actionCategories[category] : undefined
  async function onSubmit(values: ActionForm) {
    if (submitting.current) return
    submitting.current = true
    setMessage('')
    try {
      const evidence = values.evidence[0]
      const id = submitAction({
        category: values.category as ActionCategory,
        description: values.description,
        evidence: {
          name: evidence.name,
          type: evidence.type,
          size: evidence.size,
        },
      })
      navigate(`/app/validacoes/${id}`, {
        state: {
          notice:
            'Ação registrada na demonstração. O arquivo não foi enviado a um servidor.',
        },
      })
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível registrar a ação.',
      )
    } finally {
      submitting.current = false
    }
  }
  return (
    <section aria-labelledby="send-title" className="mx-auto max-w-3xl">
      <h1 id="send-title" className="text-3xl font-bold">
        Enviar ação sustentável
      </h1>
      <p className="mb-6 mt-3 text-slate-600 dark:text-emerald-100">
        Selecione uma categoria e uma evidência. Somente os dados do arquivo
        ficam na memória; nada é enviado ou salvo em banco.
      </p>
      <Card className="shadow-sm">
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event)
          }}
          noValidate
          aria-busy={isSubmitting}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="action-category"
              className="mb-2 block font-semibold"
            >
              Categoria
            </label>
            <select
              id="action-category"
              className={fieldClass}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? 'category-error' : undefined}
              {...register('category', {
                required: 'Selecione uma categoria.',
              })}
            >
              <option value="">Escolha uma ação</option>
              {Object.entries(actionCategories).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="category-error" role="alert">
                {errors.category.message}
              </p>
            )}
          </div>
          {details && (
            <p
              role="status"
              className="rounded-xl bg-emerald-100 p-4 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
            >
              ODS {details.ods} · Até {details.points} pontos na aprovação
              simulada.
            </p>
          )}
          <div>
            <label
              htmlFor="action-description"
              className="mb-2 block font-semibold"
            >
              Descrição da ação
            </label>
            <textarea
              id="action-description"
              rows={4}
              className={fieldClass}
              aria-invalid={!!errors.description}
              aria-describedby="description-help description-error"
              {...register('description', {
                required: 'Descreva sua ação.',
                validate: (value) =>
                  value.trim().length >= 10 ||
                  'Escreva pelo menos 10 caracteres.',
                maxLength: {
                  value: 2000,
                  message: 'Use até 2.000 caracteres.',
                },
              })}
            />
            <p id="description-help" className="mt-2 text-sm">
              De 10 a 2.000 caracteres. Conte o que você fez.
            </p>
            <p id="description-error" role="alert">
              {errors.description?.message}
            </p>
          </div>
          <div
            className="rounded-xl border-2 border-dashed border-emerald-300 p-5 dark:border-emerald-700"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              setValue('evidence', event.dataTransfer.files, {
                shouldValidate: true,
              })
            }}
          >
            <label
              htmlFor="action-evidence"
              className="mb-2 block font-semibold"
            >
              Evidência em vídeo
            </label>
            <input
              id="action-evidence"
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi"
              className="block w-full min-w-0 text-sm"
              aria-invalid={!!errors.evidence}
              aria-describedby="evidence-help evidence-error"
              {...register('evidence', {
                validate: (files) => {
                  const selected = files?.[0]
                  if (!selected) return 'Selecione um vídeo.'
                  if (
                    ![
                      'video/mp4',
                      'video/quicktime',
                      'video/x-msvideo',
                    ].includes(selected.type)
                  )
                    return 'Use um vídeo MP4, MOV ou AVI.'
                  return (
                    (selected.size > 0 && selected.size <= 100 * 1024 * 1024) ||
                    'O vídeo deve ter entre 1 byte e 100 MB.'
                  )
                },
              })}
            />
            <p id="evidence-help" className="mt-3 text-sm">
              Selecione ou arraste um vídeo MP4, MOV ou AVI de até 100 MB.
            </p>
            {file && (
              <div className="mt-3">
                <p className="break-all text-sm">
                  {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  className="mt-2 min-h-11 rounded-lg px-3 underline focus-visible:ring-2 focus-visible:ring-emerald-500"
                  onClick={() => resetField('evidence')}
                >
                  Remover arquivo
                </button>
              </div>
            )}
            <p id="evidence-error" role="alert">
              {errors.evidence?.message}
            </p>
          </div>
          {message && <p role="alert">{message}</p>}
          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando…' : 'Enviar para validação'}
            </Button>
            <Link
              to="/app/validacoes"
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
