import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-400 text-emerald-950 hover:bg-emerald-300',
  secondary:
    'border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10',
  danger:
    'bg-red-500 text-white hover:bg-red-400',
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
        focus-visible:ring-emerald-300
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      {...props}
    />
  )
}

export default Button