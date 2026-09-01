import { useId, type InputHTMLAttributes } from 'react'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  helperText?: string
}

function FormField({
  id,
  label,
  error,
  helperText,
  className = '',
  required,
  ...inputProps
}: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperTextId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  const describedBy =
    [
      helperText ? helperTextId : undefined,
      error ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-600 dark:text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        {...inputProps}
        id={inputId}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={[
          'w-full rounded-xl border bg-white px-4 py-3 text-slate-950 outline-none transition',
          'placeholder:text-slate-400',
          'focus:ring-2 focus:ring-emerald-500',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-slate-300 focus:border-emerald-500 dark:border-slate-700',
          className,
        ].join(' ')}
      />

      {helperText && (
        <p
          id={helperTextId}
          className="mt-2 text-sm text-slate-500 dark:text-slate-400"
        >
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
export type { FormFieldProps }