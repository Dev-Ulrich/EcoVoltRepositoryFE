import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'

import { useAuth } from '../../auth/useAuth'
import { demoCredentials } from '../../data/mockUsers'
import ecovoltLogoDark from '../../assets/ecovolt-logo-dark.png'
import ecovoltLogo from '../../assets/ecovolt-logo.png'
import Button from '../../components/common/Button'
import ThemeToggle from '../../components/common/ThemeToggle'

const inputClasses = 'w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-emerald-950 dark:text-white dark:placeholder:text-emerald-200/60'

type LoginFormData = { email: string; password: string }

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const { user, login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>()

  async function submitLogin(data: LoginFormData) {
    setMessage('')
    try {
      await login(data.email, data.password)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível iniciar a demonstração.')
    }
  }

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
            Explore o dashboard com uma conta fictícia. Este acesso é uma demonstração, sem autenticação real.
          </p>

          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <p className="font-bold">Dados públicos para demonstração</p>
            <p className="mt-2 break-all">E-mail: {demoCredentials.email}</p>
            <p className="mt-1 break-all">Senha: {demoCredentials.password}</p>
          </div>

          <form onSubmit={handleSubmit(submitLogin)} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-semibold">E-mail</label>
              <input id="login-email" type="email" autoComplete="username" required placeholder="Digite o e-mail demonstrativo" className={inputClasses}
                aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email', { required: 'Informe o e-mail.', setValueAs: (value: string) => value.trim(), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Informe um e-mail válido.' } })} />
              {errors.email && <p id="email-error" role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-semibold">Senha</label>
              <div className="relative">
                <input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Digite sua senha" className={`${inputClasses} pr-14`}
                  aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password', { required: 'Informe a senha demonstrativa.' })} />
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
              {errors.password && <p id="password-error" role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMessage('Use a senha fictícia exibida acima. A demonstração não tem recuperação ou alteração de senha.')}
                className="rounded px-1 py-2 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
              >
                Esqueci minha senha
              </button>
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting}>{isSubmitting ? 'Entrando…' : 'Entrar'}</Button>
            {message && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">{message}</p>}
          </form>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
