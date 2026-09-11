import type { LucideIcon } from 'lucide-react'

export default function AppPageHeader({ id, title, description, eyebrow = 'Sua jornada', icon: Icon }: { id?: string; title: string; description?: string; eyebrow?: string; icon: LucideIcon }) {
  return <header className="app-page-header"><span className="app-page-icon"><Icon aria-hidden="true" size={27} strokeWidth={1.8} /></span><div className="min-w-0 flex-1"><p className="app-eyebrow">{eyebrow}</p><h1 id={id} className="font-bold">{title}</h1>{description && <p>{description}</p>}</div></header>
}
