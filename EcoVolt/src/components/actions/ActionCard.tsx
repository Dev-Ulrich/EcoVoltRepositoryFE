import { Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../common/Card'
import Badge from '../common/Badge'
import { actionCategories, actionStatusLabels } from '../../data/mockActions'
import type { SustainableAction } from '../../types/action'

import {
  actionVariants,
  actionLinkClass,
  dateLabel,
} from './actionPresentation'

export default function ActionCard({ action }: { action: SustainableAction }) {
  return (
    <Card className="flex h-full flex-col shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><Leaf aria-hidden="true" size={23} /></span>
        <Badge variant={actionVariants[action.status]}>
          {actionStatusLabels[action.status]}
        </Badge>
      </div>
      <h2 className="mt-4 text-xl font-bold">
        {actionCategories[action.category].title}
      </h2>
      <p className="mt-3 break-words text-sm text-slate-600 dark:text-emerald-100">
        {action.description}
      </p>
      <p className="mt-3 text-sm">
        {action.status === 'approved'
          ? `${action.awardedPoints} pontos · ${action.awardedXp} XP recebidos`
          : `Até ${action.possiblePoints} pontos após aprovação`}
      </p>
      <p className="mb-5 mt-2 text-sm text-slate-500 dark:text-emerald-200">
        Enviada em{' '}
        <time dateTime={action.submittedAt}>
          {dateLabel(action.submittedAt)}
        </time>
      </p>
      <Link
        className={`${actionLinkClass} mt-auto self-start w-full justify-between`}
        to={`/app/validacoes/${action.id}`}
      >
        Ver detalhes
      </Link>
    </Card>
  )
}
