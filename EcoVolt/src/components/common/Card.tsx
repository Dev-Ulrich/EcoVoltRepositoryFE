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
        border border-emerald-800
        bg-emerald-950/50
        p-6 shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </article>
  )
}

export default Card