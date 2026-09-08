import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { useAuth } from '../../auth/useAuth'
import ecovoltLogoDark from '../../assets/ecovolt-logo-dark.png'
import ecovoltLogo from '../../assets/ecovolt-logo.png'
import Button from '../../components/common/Button'
import ThemeToggle from '../../components/common/ThemeToggle'

const inputClasses = 'w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-emerald-950 dark:text-white dark:placeholder:text-emerald-200/60'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const { user, loading, login } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    setSubmitting(true)
    setMessage('')
    try {
      await login(String(fields.get('username')), String(fields.get('password')))
    } catch (error) {
      setMessage(error instanceof Error && error.message !== 'Failed to fetch' ? error.message : 'Não foi possível conectar. Tente novamente.')
    } finally { setSubmitting(false) }
  }

  if (loading) return <main className="p-10 text-center" role="status">Verificando seu acesso…</main>
  if (user) return <Navigate to="/app" replace />

  return (
    <main className="flex min-h-dvh flex-col bg-emerald-50 text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-100 dark:hover:bg-emerald-900"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          Voltar ao início
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <section aria-labelledby="login-title" className="w-full max-w-md rounded-2xl border border-emerald-200 bg-white p-6 shadow-lg sm:p-10 dark:border-emerald-800 dark:bg-emerald-900/20">
          <img src={ecovoltLogo} alt="EcoVolt" className="mx-auto h-20 w-auto max-w-full object-contain dark:hidden" />
          <img src={ecovoltLogoDark} alt="EcoVolt" className="mx-auto hidden h-20 w-auto max-w-full object-contain dark:block" />

          <h1 id="login-title" className="mt-8 text-center text-3xl font-bold">Boas-vindas de volta!</h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-slate-600 dark:text-emerald-100">
            Entre na sua conta para acompanhar seu impacto sustentável.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="login-username" className="mb-2 block text-sm font-semibold">Usuário</label>
              <input id="login-username" name="username" type="text" autoComplete="username" required placeholder="Digite seu usuário" className={inputClasses} />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-semibold">Senha</label>
              <div className="relative">
                <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Digite sua senha" className={`${inputClasses} pr-14`} />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-controls="login-password"
                  aria-pressed={showPassword}
                  className="absolute inset-y-1 right-1 flex w-11 items-center justify-center rounded-lg text-emerald-700 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-900"
                >
                  {showPassword ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMessage('Entre em contato com um administrador para alterar sua senha.')}
                className="rounded px-1 py-2 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
              >
                Esqueci minha senha
              </button>
            </div>

            <Button type="submit" fullWidth disabled={submitting}>{submitting ? 'Entrando…' : 'Entrar'}</Button>
            {message && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">{message}</p>}
          </form>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
