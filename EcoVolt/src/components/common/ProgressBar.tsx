type ProgressBarProps = {
  value: number
  label?: string
  showValue?: boolean
}

function ProgressBar({
  value,
  label,
  showValue = true,
}: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {label && (
            <span className="text-sm font-medium text-slate-200">
              {label}
            </span>
          )}

          {showValue && (
            <span className="text-sm font-bold text-emerald-300">
              {normalizedValue}%
            </span>
          )}
        </div>
      )}

      <div
        className="h-3 overflow-hidden rounded-full bg-emerald-950"
        role="progressbar"
        aria-label={label ?? 'Progresso'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
      >
        <div
          className="h-full rounded-full bg-emerald-400 transition-all"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar