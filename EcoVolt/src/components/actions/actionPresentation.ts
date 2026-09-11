export const actionVariants = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  in_review: 'info',
} as const
export const actionLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300'
export const fieldClass =
  'w-full rounded-xl border border-emerald-300 bg-white p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-white'
export const dateLabel = (value: string) =>
  new Date(value).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
