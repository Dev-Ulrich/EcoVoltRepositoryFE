import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  success: `
    bg-emerald-100 text-emerald-800
    dark:bg-emerald-400/15 dark:text-emerald-300
  `,
  warning: `
    bg-amber-100 text-amber-800
    dark:bg-amber-400/15 dark:text-amber-300
  `,
  danger: `
    bg-red-100 text-red-800
    dark:bg-red-400/15 dark:text-red-300
  `,
  info: `
    bg-sky-100 text-sky-800
    dark:bg-sky-400/15 dark:text-sky-300
  `,
  neutral: `
    bg-slate-200 text-slate-700
    dark:bg-slate-400/15 dark:text-slate-300
  `,
}

function Badge({
  children,
  variant = 'neutral',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full px-3 py-1
        text-sm font-semibold
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge