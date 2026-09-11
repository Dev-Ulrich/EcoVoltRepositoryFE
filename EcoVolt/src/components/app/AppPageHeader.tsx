import type { LucideIcon } from 'lucide-react'

export default function AppPageHeader({ id, title, description, eyebrow = 'Sua jornada', icon: Icon }: { id?: string; title: string; description?: string; eyebrow?: string; icon: LucideIcon }) {
  return <header className="mb-6 flex flex-wrap items-center gap-4"><span className="flex size-[54px] shrink-0 items-center justify-center rounded-[18px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-lime-300"><Icon aria-hidden="true" size={27} strokeWidth={1.8} /></span><div className="min-w-0 flex-1"><p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-300">{eyebrow}</p><h1 id={id} className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-[600px] text-sm leading-relaxed text-[#52665f] dark:text-[#b1c8bd]">{description}</p>}</div></header>
}
