import usePublicMotion from '../../hooks/usePublicMotion'
import '../../styles/public-motion.css'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'

import { useAuth } from '../../auth/useAuth'
import { demoCredentials } from '../../data/mockUsers'
import ecovoltLogoDark from '../../assets/brand/ecovolt-logo-dark.webp'
import loginBackground from '../../assets/public/contato/hero-contato-reference.webp'
import ThemeToggle from '../../components/common/ThemeToggle'

const inputClasses = 'w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-emerald-950 dark:text-white dark:placeholder:text-emerald-200/60'

type LoginFormData = { email: string; password: string }

function LoginPage() {
  const motionRef = usePublicMotion<HTMLElement>()
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const { user, login } = useAuth()
  const { register, handleSubmit, setError, clearErrors, setValue, setFocus, formState: { errors, isSubmitting } } = useForm<LoginFormData>()

  const pendingRequest = useRef<AbortController | null>(null)
  useEffect(() => () => pendingRequest.current?.abort(), [])

  async function submitLogin(data: LoginFormData) {
    if (pendingRequest.current) return
    const request = new AbortController()
    pendingRequest.current = request
    setMessage('')
    clearErrors('root')
    try {
      // Breve espera local para demonstrar o estado de processamento, sem rede.
      await new Promise(resolve => window.setTimeout(resolve, 450))
      if (request.signal.aborted) return
      await login(data.email, data.password)
    } catch (error) {
      if (!request.signal.aborted) {
        setError('root', { message: error instanceof Error ? error.message : 'Não foi possível iniciar a demonstração.' })
      }
    } finally {
      pendingRequest.current = null
    }
  }

  function fillDemoCredentials() {
    if (isSubmitting || pendingRequest.current) return
    clearErrors()
    setMessage('Dados de demonstração preenchidos. Clique em Entrar para continuar.')
    setValue('email', demoCredentials.email, { shouldDirty: true })
    setValue('password', demoCredentials.password, { shouldDirty: true })
    setFocus('email')
  }

  if (user) return <Navigate to="/app" replace />

  return (
    <main ref={motionRef} className="public-motion flex min-h-dvh flex-col bg-[#f5faf7] text-[#09243a] transition-colors dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-100 dark:hover:bg-emerald-900"><ArrowLeft aria-hidden="true" size={18} />Voltar ao início</Link>
        <ThemeToggle />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-8 sm:px-6">
        <div className="grid w-full overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white shadow-[0_20px_70px_rgba(6,78,59,.08)] lg:grid-cols-[1.05fr_1fr] dark:border-emerald-800 dark:bg-[#07372d]">
          <section data-motion-reveal aria-labelledby="welcome-title" className="relative isolate flex min-h-[240px] flex-col justify-between overflow-hidden bg-emerald-950 p-7 text-white sm:p-9 lg:min-h-[760px] lg:p-10">
            <img src={loginBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,30,23,.95)_0%,rgba(0,30,23,.8)_35%,rgba(0,30,23,.05)_70%,rgba(0,30,23,.85)_100%)] max-lg:bg-emerald-950/70" />
            <div>
              <Link to="/" aria-label="EcoVolt - Início" className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"><img src={ecovoltLogoDark} alt="EcoVolt" className="h-12 w-40 object-contain object-left" /></Link>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-lime-200 lg:mt-14">Pequenas ações. Grandes mudanças.</p>
              <h2 id="welcome-title" className="mt-3 max-w-sm text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">Seu próximo passo para um <span className="text-lime-300">futuro mais verde.</span></h2>
              <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-emerald-50 lg:block">Transforme atitudes em conquistas. Participe de missões, acompanhe sua evolução e faça parte dessa mudança.</p>
            </div>
            <p className="mt-8 hidden items-center gap-3 text-sm text-emerald-50 lg:flex"><span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-950/60 text-lime-300"><Leaf aria-hidden="true" size={24} /></span>Juntos por um amanhã mais verde.</p>
          </section>

          <section aria-labelledby="login-title" className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300"><Leaf aria-hidden="true" size={27} /></div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Sua jornada continua aqui</p>
            <h1 id="login-title" className="mt-2 text-3xl font-bold leading-tight tracking-tight">Boas-vindas de volta!</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Entre para acompanhar suas ações, missões e conquistas no EcoVolt.</p>

            <div className="mt-6 rounded-xl border border-emerald-100 bg-[#eff8f2] p-4 dark:border-emerald-700 dark:bg-emerald-950/60">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-200"><Sparkles aria-hidden="true" size={18} />Conheça o EcoVolt na prática</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">Explore com uma conta fictícia. Este acesso é uma demonstração, sem autenticação real.</p>
              <button type="button" disabled={isSubmitting} onClick={fillDemoCredentials} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-600 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-800 dark:focus-visible:ring-offset-emerald-950">Preencher dados de demonstração <ArrowRight aria-hidden="true" size={17} className="shrink-0" /></button>
              <details className="mt-2"><summary className="w-fit cursor-pointer rounded py-1 text-xs font-medium text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-200">Ver credenciais de demonstração</summary><p className="mt-2 break-all text-xs leading-relaxed text-slate-600 dark:text-slate-300">E-mail: {demoCredentials.email}<br />Senha: {demoCredentials.password}</p></details>
            </div>

          <form onSubmit={event => {
            if (pendingRequest.current) { event.preventDefault(); return }
            void handleSubmit(submitLogin, () => setMessage(''))(event)
          }} onChange={() => clearErrors('root')} noValidate aria-busy={isSubmitting} className="mt-6 space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-semibold">E-mail</label>
              <input id="login-email" readOnly={isSubmitting} type="email" autoComplete="username" required placeholder="Digite o e-mail demonstrativo" className={inputClasses}
                aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email', { required: 'Informe o e-mail.', setValueAs: (value: string) => value.trim(), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Informe um e-mail válido.' } })} />
              {errors.email && <p id="email-error" role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-semibold">Senha</label>
              <div className="relative">
                <input id="login-password" readOnly={isSubmitting} type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Digite sua senha" className={`${inputClasses} pr-14`}
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
                onClick={() => setMessage('Clique em “Preencher dados de demonstração” ou abra “Ver credenciais de demonstração”. Esta versão não possui recuperação ou alteração de senha.')}
                className="rounded px-1 py-2 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
              >
                Esqueci minha senha
              </button>
            </div>

            {errors.root && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{errors.root.message}</p>}
            {isSubmitting && <p role="status" className="text-sm text-emerald-800 dark:text-emerald-200">Verificando os dados da demonstração…</p>}
            <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 dark:focus-visible:ring-offset-emerald-950">{isSubmitting ? 'Entrando…' : 'Entrar'}<ArrowRight aria-hidden="true" size={18} /></button>
            {message && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">{message}</p>}
          </form>
            <div className="mt-6 border-t border-emerald-100 pt-5 dark:border-emerald-800"><p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-300"><ShieldCheck aria-hidden="true" size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" />Projeto acadêmico FIAP x SoulUp. Utilize apenas os dados fictícios fornecidos.</p><Link to="/contato" className="mt-3 inline-flex min-h-11 items-center rounded text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">Precisa de ajuda? Fale com a equipe</Link></div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
