import useTheme from '../../hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDarkTheme = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        rounded-lg border border-emerald-700
        bg-emerald-100 px-3 py-2
        text-sm font-bold text-emerald-900
        transition hover:bg-emerald-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-300
        dark:bg-emerald-900
        dark:text-emerald-100
        dark:hover:bg-emerald-800
      "
      aria-label={
        isDarkTheme
          ? 'Ativar tema claro'
          : 'Ativar tema escuro'
      }
      aria-pressed={isDarkTheme}
      title={
        isDarkTheme
          ? 'Mudar para tema claro'
          : 'Mudar para tema escuro'
      }
    >
      {isDarkTheme ? '☀️ Tema claro' : '🌙 Tema escuro'}
    </button>
  )
}

export default ThemeToggle