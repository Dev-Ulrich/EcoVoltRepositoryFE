import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-emerald-500 text-white
    hover:bg-emerald-600
    dark:bg-emerald-400 dark:text-emerald-950
    dark:hover:bg-emerald-300
  `,
  secondary: `
    border border-emerald-600
    text-emerald-700
    hover:bg-emerald-100
    dark:border-emerald-400
    dark:text-emerald-300
    dark:hover:bg-emerald-400/10
  `,
  danger: `
    bg-red-500 text-white
    hover:bg-red-600
    dark:bg-red-500
    dark:hover:bg-red-400
  `,
}

function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center
        rounded-lg px-5 py-3
        font-bold transition
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        dark:focus-visible:ring-emerald-300
        dark:focus-visible:ring-offset-emerald-950
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      {...props}
    />
  )
}

export default Button