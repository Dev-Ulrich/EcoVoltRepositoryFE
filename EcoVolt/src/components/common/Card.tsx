import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

function Card({
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <article
      className={`
        rounded-2xl
        border border-emerald-200
        bg-white p-6
        text-slate-900 shadow-lg
        transition-colors
        dark:border-emerald-800
        dark:bg-emerald-950/50
        dark:text-white
        ${className}
      `}
      {...props}
    >
      {children}
    </article>
  )
}

export default Card