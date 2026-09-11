import { ArrowRight, BatteryFull, Bell, Bike, ChartNoAxesColumnIncreasing, Check, ClipboardCheck, Droplets, Gift, Globe, House, Leaf, Medal, Play, Plus, Recycle, ShieldCheck, Signal, UserRound, Users, Wifi, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import ecovoltLogoDark from '../../assets/ecovolt-logo-dark.png'
import heroBackground from '../../assets/hero-background.png'
import homepageSectionBackground from '../../assets/backgroun-section-homepage.png'

const features = [
  { icon: Leaf, title: 'Ações sustentáveis', description: 'Realize atividades do dia a dia que fazem a diferença para o meio ambiente.', accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300', shape: 'rounded-[1.25rem_1.25rem_1.25rem_0.25rem]' },
  { icon: ShieldCheck, title: 'Validação', description: 'Suas ações são verificadas para garantir um impacto real e confiável.', accent: 'bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300', shape: 'rounded-2xl' },
  { icon: Zap, title: 'XP e progresso', description: 'Ganhe XP, evolua de nível e acompanhe sua jornada de impacto.', accent: 'bg-lime-100 text-lime-800 dark:bg-lime-400/15 dark:text-lime-300', shape: 'rounded-full' },
  { icon: Gift, title: 'Recompensas', description: 'Desbloqueie conquistas e benefícios ao avançar na sua jornada sustentável.', accent: 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300', shape: 'rounded-[1.25rem_0.25rem_1.25rem_1.25rem]' },
]
const missions = [
  { icon: Bike, title: 'Transporte sustentável', progress: '3/5', width: 'w-3/5', accent: 'text-emerald-300' },
  { icon: Recycle, title: 'Separar lixo reciclável', progress: '1/3', width: 'w-1/3', accent: 'text-lime-300' },
  { icon: Droplets, title: 'Economizar água', progress: '2/5', width: 'w-2/5', accent: 'text-cyan-300' },
]
const linkClasses = 'inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl px-6 py-3 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-950'
const primaryClasses = `${linkClasses} bg-lime-300 text-emerald-950 hover:bg-lime-200`

/** Decorative preview: deliberately contains no interactive controls or live account data. */
function DashboardPhone() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[330px] rounded-[3rem] border-2 border-slate-400 bg-slate-950 p-2 shadow-[14px_24px_65px_rgba(0,0,0,0.5),inset_0_0_0_3px_#334155] lg:rotate-[5deg] xl:max-w-[350px]">
      <div className="absolute -right-[5px] top-36 h-16 w-1 rounded-r bg-slate-400" />
      <div className="overflow-hidden rounded-[2.4rem] border border-emerald-700/50 bg-[#032822] text-white">
        <div className="relative flex items-center justify-between px-6 pb-4 pt-4 text-xs font-semibold">
          <span>9:41</span><div className="absolute left-1/2 top-0 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-950" />
          <div className="flex items-center gap-1"><Signal size={13} /><Wifi size={13} /><BatteryFull size={17} /></div>
        </div>
        <div className="px-4 sm:px-5">
          <div className="flex items-center justify-between"><img src={ecovoltLogoDark} alt="" className="h-10 w-32 object-contain" /><Bell size={19} className="text-emerald-100" /></div>
          <div className="mb-5 mt-5 flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-800 text-sm font-bold text-emerald-100">AC</div>
            <div><p className="text-lg font-bold">Olá, Ana!</p><p className="text-xs text-emerald-100">Juntos por um futuro mais verde.</p></div>
          </div>
          <div className="grid grid-cols-[1fr_1fr] items-center gap-3">
            <div className="relative mx-auto flex size-28 items-center justify-center rounded-full border-[7px] border-emerald-900 xl:size-32">
              <svg className="absolute -inset-[7px] size-28 -rotate-90 xl:size-32" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="56" stroke="#bef264" strokeWidth="7" strokeLinecap="round" strokeDasharray="218 352" /></svg>
              <div className="text-center"><p className="text-xs text-emerald-100">Nível</p><p className="text-4xl font-bold tracking-tight">28</p></div>
            </div>
            <div className="space-y-2">
              <div className="rounded-xl border border-emerald-700/60 bg-emerald-900/70 p-3"><p className="flex items-center gap-1.5 font-bold text-lime-300"><Zap size={20} fill="currentColor" />+150 XP</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-100"><Check size={12} /> Ação validada!</p></div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-700/60 bg-emerald-900/70 p-3"><Medal size={28} className="shrink-0 text-amber-300" /><div><p className="font-bold">#12 <span className="text-xs font-normal text-emerald-100">no ranking</span></p><p className="text-xs font-semibold text-amber-200">Bronze</p></div></div>
            </div>
          </div>
          <div className="mt-4"><div className="mb-2 flex justify-between text-xs text-emerald-100"><span><span className="font-bold text-white">3.720</span> / 6.000 XP</span><span>62%</span></div><div className="h-1.5 rounded-full bg-emerald-900"><div className="h-full w-[62%] rounded-full bg-lime-300" /></div></div>
          <div className="mb-3 mt-5 flex items-center justify-between border-t border-emerald-800 pt-4"><p className="text-sm font-bold">Minhas missões</p><span className="flex items-center gap-1 text-xs text-emerald-300">Ver todas <ArrowRight size={12} /></span></div>
          <div className="space-y-2">
            {missions.map(({ icon: Icon, title, progress, width, accent }) => (
              <div key={title} className="flex items-center gap-2.5 rounded-xl border border-emerald-800 bg-emerald-900/50 p-2.5">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-800/60 ${accent}`}><Icon size={22} /></div>
                <div className="min-w-0 flex-1"><p className="text-xs font-medium">{title}</p><div className="mt-2 h-1 rounded-full bg-emerald-800"><div className={`h-full rounded-full bg-emerald-300 ${width}`} /></div></div><span className="text-xs text-emerald-100">{progress}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-around border-t border-emerald-800 px-2 pb-3 pt-3 text-[10px] text-emerald-100">
          <span className="flex flex-col items-center gap-1 text-lime-300"><House size={19} />Início</span><span className="flex flex-col items-center gap-1"><ClipboardCheck size={19} />Missões</span><span className="flex size-10 items-center justify-center rounded-full bg-emerald-300 text-emerald-950"><Plus size={24} /></span><span className="flex flex-col items-center gap-1"><ChartNoAxesColumnIncreasing size={19} />Ranking</span><span className="flex flex-col items-center gap-1"><UserRound size={19} />Perfil</span>
        </div>
        <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-white" />
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <main className="bg-white text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <img src={heroBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-emerald-950/90 via-emerald-950/75 to-emerald-950/75 lg:to-emerald-950/25" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.16em] text-lime-300 sm:text-sm">Pequenas ações. Grandes mudanças.</p>
            <h1 id="home-title" className="mt-5 max-w-xl text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.3rem] xl:text-6xl">Transforme ações sustentáveis em <span className="text-lime-300">evolução real.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-emerald-50 sm:text-lg">No EcoVolt, você realiza ações sustentáveis, ganha XP, evolui no ranking e desbloqueia recompensas que fazem a diferença para você e para o planeta.</p>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
              <Link to="/login" className={primaryClasses}>Começar agora <ArrowRight aria-hidden="true" size={19} /></Link>
              <Link to="/como-funciona" className={`${linkClasses} border border-white/70 bg-emerald-950/40 text-white hover:bg-emerald-900`}><Play aria-hidden="true" size={18} />Como funciona</Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-sm text-emerald-50 lg:mt-14">
              {[{ icon: Leaf, text: 'Mais consciência' }, { icon: Users, text: 'Mais pessoas' }, { icon: Globe, text: 'Um planeta melhor' }].map(({ icon: Icon, text }) => <li key={text} className="flex items-center gap-2"><Icon aria-hidden="true" size={21} className="shrink-0 text-emerald-300" />{text}</li>)}
            </ul>
          </div>
          <div className="min-w-0 px-2 py-3 lg:px-4"><DashboardPhone /></div>
        </div>
      </section>

      <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-6 pb-10 pt-14 sm:pt-16">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Por que escolher o EcoVolt?</p><h2 id="features-title" className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Sustentabilidade que engaja, conecta e <span className="text-emerald-700 dark:text-emerald-400">gera impacto.</span></h2></div>
          <p className="max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">Unimos tecnologia, gamificação e propósito para tornar o mundo mais sustentável de um jeito simples, divertido e recompensador.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, accent, shape }) => (
            <article key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-emerald-800/80 dark:bg-emerald-900/60">
              <div className={`flex size-14 items-center justify-center ${accent} ${shape}`}><Icon aria-hidden="true" size={29} strokeWidth={1.8} /></div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="start-title" className="mx-auto max-w-6xl px-6 pb-12 sm:pb-16">
        <div className="relative isolate overflow-hidden rounded-2xl bg-emerald-950 px-6 py-10 text-white sm:px-10 sm:py-12">
          <img src={homepageSectionBackground} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-emerald-950/95 via-emerald-950/85 to-emerald-950/75 lg:to-emerald-950/35" />
          <div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.14em] text-lime-300">Pronto para fazer a diferença?</p><h2 id="start-title" className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Junte-se a uma comunidade que acredita em um futuro mais verde.</h2><p className="mt-4 max-w-lg leading-relaxed text-emerald-50">Comece agora, faça parte da mudança e transforme suas escolhas em um impacto real.</p><Link to="/login" className={`${primaryClasses} mt-6`}>Começar agora <ArrowRight aria-hidden="true" size={19} /></Link></div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
