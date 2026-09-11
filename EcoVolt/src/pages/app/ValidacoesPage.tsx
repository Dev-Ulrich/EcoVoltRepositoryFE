import { useState } from 'react'
import { Link } from 'react-router-dom'
import ActionCard from '../../components/actions/ActionCard'
import {
  actionLinkClass,
  fieldClass,
} from '../../components/actions/actionPresentation'
import Card from '../../components/common/Card'
import { actionStatusLabels } from '../../data/mockActions'
import { useDemoData } from '../../hooks/useDemoData'
import type { ActionStatus } from '../../types/action'

export default function ValidacoesPage() {
  const { actions } = useDemoData()
  const [status, setStatus] = useState<ActionStatus | ''>('')
  const [query, setQuery] = useState('')
  const filtered = actions
    .filter(
      (action) =>
        (!status || action.status === status) &&
        action.description
          .toLocaleLowerCase('pt-BR')
          .includes(query.trim().toLocaleLowerCase('pt-BR')),
    )
    .sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
  return (
    <section aria-labelledby="validations-title">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 id="validations-title" className="text-3xl font-bold">
          Envios e validações
        </h1>
        <Link className={actionLinkClass} to="/app/enviar-acao">
          Nova ação
        </Link>
      </div>
      <p className="mt-3 text-slate-600 dark:text-emerald-100">
        Acompanhe seus registros locais. Abra os detalhes para consultar a
        evidência e experimentar uma análise simulada.
      </p>
      <Card className="mt-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="action-search" className="mb-2 block font-semibold">
              Buscar na descrição
            </label>
            <input
              id="action-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="action-status" className="mb-2 block font-semibold">
              Status
            </label>
            <select
              id="action-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ActionStatus | '')}
              className={fieldClass}
            >
              <option value="">Todos</option>
              {Object.entries(actionStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      <p role="status" className="my-5 text-sm">
        {filtered.length}{' '}
        {filtered.length === 1 ? 'ação encontrada' : 'ações encontradas'}
      </p>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((action) => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
      ) : (
        <Card>
          <h2 className="text-xl font-bold">Nenhuma ação encontrada</h2>
          <button
            type="button"
            onClick={() => {
              setStatus('')
              setQuery('')
            }}
            className="mt-4 rounded-lg p-3 underline focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Limpar filtros
          </button>
        </Card>
      )}
    </section>
  )
}
