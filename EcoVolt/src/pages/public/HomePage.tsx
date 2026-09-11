import { ArrowRight, BatteryFull, Bell, Bike, ChartNoAxesColumnIncreasing, Check, ClipboardCheck, Droplets, Gift, Globe, House, Leaf, Medal, Play, Plus, Recycle, ShieldCheck, Signal, UserRound, Users, Wifi, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import ecovoltLogoDark from '../../assets/brand/ecovolt-logo-dark.webp'
import heroBackground from '../../assets/public/home/hero-background.webp'
import homepageSectionBackground from '../../assets/public/home/backgroun-section-homepage.webp'

const features = [
  { icon: Leaf, title: 'Ações sustentáveis', description: 'Realize atividades do dia a dia que fazem a diferença para o meio ambiente.', accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300' },
  { icon: ShieldCheck, title: 'Validação', description: 'Suas ações são verificadas para garantir um impacto real e confiável.', accent: 'bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300' },
  { icon: Zap, title: 'XP e progresso', description: 'Ganhe XP, evolua de nível e acompanhe sua jornada de impacto.', accent: 'bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300' },
  { icon: Gift, title: 'Recompensas', description: 'Desbloqueie conquistas e benefícios ao avançar na sua jornada sustentável.', accent: 'bg-orange-100 text-orange-600 dark:bg-orange-400/15 dark:text-orange-300' },
]
const missions = [
  { icon: Bike, title: 'Transporte sustentável', progress: '3/5', width: 'w-3/5', accent: 'text-emerald-300' },
  { icon: Recycle, title: 'Separar lixo reciclável', progress: '1/3', width: 'w-1/3', accent: 'text-lime-300' },
  { icon: Droplets, title: 'Economizar água', progress: '2/5', width: 'w-2/5', accent: 'text-cyan-300' },
]
const linkClasses = 'inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-950'
const primaryClasses = `${linkClasses} bg-gradient-to-r from-lime-200 to-lime-300 text-emerald-950 shadow-[0_0_22px_rgba(163,230,53,0.18)] hover:from-lime-100 hover:to-lime-200`

/** Decorative preview: deliberately contains no interactive controls or live account data. */
function DashboardPhone() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[340px] rounded-[3.2rem] border-2 border-slate-400 bg-gradient-to-r from-slate-600 via-slate-950 to-slate-700 p-2 shadow-[14px_24px_65px_rgba(0,0,0,0.6),inset_0_0_0_3px_#020617] lg:rotate-[5deg] xl:max-w-[370px]">
      <div className="absolute -right-[5px] top-36 h-16 w-1 rounded-r bg-slate-400" />
      <div className="overflow-hidden rounded-[2.4rem] border border-emerald-700/50 bg-gradient-to-br from-[#043e32] via-[#012a25] to-[#001b1b] text-white">
        <div className="relative flex items-center justify-between px-6 pb-4 pt-4 text-xs font-semibold">
          <span>9:41</span><div className="absolute left-1/2 top-0 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-950" />
          <div className="flex items-center gap-1"><Signal size={13} /><Wifi size={13} /><BatteryFull size={17} /></div>
        </div>
        <div className="px-4 sm:px-5 pb-2">
          <div className="flex items-center justify-between"><img src={ecovoltLogoDark} alt="" className="mx-auto h-12 w-36 object-contain" /><Bell size={19} className="text-emerald-100" /></div>
          <div className="mb-6 mt-6 flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-800 text-sm font-bold text-emerald-100"><UserRound size={23} /></div>
            <div><p className="text-lg font-bold">Olá, Ana!</p><p className="text-xs text-emerald-100">Juntos por um futuro mais verde.</p></div>
          </div>
          <div className="grid grid-cols-[1fr_1fr] items-center gap-3">
            <div className="relative mx-auto flex size-28 items-center justify-center rounded-full border-[7px] border-emerald-900 xl:size-32">
              <svg className="absolute -inset-[7px] size-28 -rotate-90 xl:size-32" viewBox="0 0 120 120" fill="none"><defs><linearGradient id="home-phone-progress" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#a3e635" /><stop offset="1" stopColor="#34d399" /></linearGradient></defs><circle cx="60" cy="60" r="56" stroke="url(#home-phone-progress)" strokeWidth="7" strokeLinecap="round" strokeDasharray="218 352" /></svg>
              <div className="text-center"><p className="text-xs text-emerald-100">Nível</p><p className="text-4xl font-bold tracking-tight">28</p></div>
            </div>
            <div className="space-y-2">
              <div className="rounded-xl border border-emerald-700/60 bg-emerald-900/70 p-3"><p className="flex items-center gap-1.5 font-bold text-lime-300"><Zap size={20} fill="currentColor" />+150 XP</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-100"><Check size={12} /> Ação validada!</p></div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-700/60 bg-emerald-900/70 p-3"><Medal size={28} className="shrink-0 text-amber-300" /><div><p className="font-bold">#12 <span className="text-xs font-normal text-emerald-100">no ranking</span></p><p className="text-xs font-semibold text-amber-200">Bronze</p></div></div>
            </div>
          </div>
          <div className="mt-4"><div className="mb-2 flex justify-between text-xs text-emerald-100"><span><span className="font-bold text-white">3.720</span> / 6.000 XP</span><span>62%</span></div><div className="h-1.5 rounded-full bg-emerald-900"><div className="h-full w-[62%] rounded-full bg-gradient-to-r from-emerald-400 to-lime-300" /></div></div>
          <div className="mb-4 mt-6 flex items-center justify-between border-t border-emerald-800 pt-4"><p className="text-sm font-bold">Minhas missões</p><span className="flex items-center gap-1 text-xs text-emerald-300">Ver todas <ArrowRight size={12} /></span></div>
          <div className="space-y-3">
            {missions.map(({ icon: Icon, title, progress, width, accent }) => (
              <div key={title} className="flex items-center gap-2.5 rounded-xl border border-emerald-800 bg-emerald-900/70 p-3">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-800/60 ${accent}`}><Icon size={22} /></div>
                <div className="min-w-0 flex-1"><p className="text-xs font-medium">{title}</p><div className="mt-2 h-1 rounded-full bg-emerald-800"><div className={`h-full rounded-full bg-emerald-300 ${width}`} /></div></div><span className="text-xs text-emerald-100">{progress}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-around border-t border-emerald-800 px-2 pb-4 pt-4 text-[10px] text-emerald-100">
          <span className="flex flex-col items-center gap-1 text-lime-300"><House size={19} />Início</span><span className="flex flex-col items-center gap-1"><ClipboardCheck size={19} />Missões</span><span className="flex size-10 items-center justify-center rounded-full bg-emerald-300 text-emerald-950"><Plus size={24} /></span><span className="flex flex-col items-center gap-1"><ChartNoAxesColumnIncreasing size={19} />Ranking</span><span className="flex flex-col items-center gap-1"><UserRound size={19} />Perfil</span>
        </div>
        <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-white" />
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <main className="bg-[#fcfefd] text-[#09232b] transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <img src={heroBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,30,24,.55)_0%,rgba(0,30,24,.4)_45%,rgba(0,30,24,.08)_80%)] max-lg:bg-emerald-950/55" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 sm:py-14 lg:min-h-[800px] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-14 xl:grid-cols-[1.05fr_1fr_100px] xl:gap-6">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.14em] text-lime-300 sm:text-sm">Pequenas ações. Grandes mudanças.</p>
            <h1 id="home-title" className="mt-6 max-w-xl text-[2.5rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">Transforme ações sustentáveis em <span className="block text-lime-300">evolução real.</span></h1>
            <p className="mt-5 max-w-[440px] text-base leading-relaxed text-emerald-50 sm:text-lg lg:text-xl">No EcoVolt, você realiza ações sustentáveis, ganha XP, evolui no ranking e desbloqueia recompensas que fazem a diferença para você e para o planeta.</p>
            <div className="mt-7 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
              <Link to="/login" className={primaryClasses}>Começar agora <ArrowRight aria-hidden="true" size={19} /></Link>
              <Link to="/como-funciona" className={`${linkClasses} border border-white/80 bg-emerald-950/40 text-white hover:bg-emerald-900`}><span className="flex size-6 items-center justify-center rounded-full bg-white text-emerald-950"><Play aria-hidden="true" size={13} fill="currentColor" /></span>Como funciona</Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs text-emerald-50 lg:mt-16">
              {[{ icon: Leaf, text: 'Mais consciência' }, { icon: Users, text: 'Mais pessoas' }, { icon: Globe, text: 'Um planeta melhor' }].map(({ icon: Icon, text }) => <li key={text} className="flex items-center gap-2"><Icon aria-hidden="true" size={27} className="shrink-0 text-emerald-300" />{text}</li>)}
            </ul>
          </div>
          <div data-motion-visual className="relative min-w-0 px-2 py-4 lg:px-4">
            <div aria-hidden="true" className="absolute inset-x-4 inset-y-12 rounded-full bg-emerald-400/10 blur-3xl" />
            <DashboardPhone />
          </div>
          <div className="hidden self-stretch xl:flex xl:flex-col xl:justify-end">
            <p className="absolute -right-4 top-[43%] w-32 -rotate-[9deg] font-serif text-2xl italic leading-tight [text-shadow:0_2px_6px_rgba(0,0,0,.9)]">Um amanhã<br />mais verde<br />começa hoje.<span aria-hidden="true" className="mt-4 block h-1 w-24 -rotate-6 rounded-full bg-lime-300" /></p>
            <p className="absolute -right-4 bottom-12 flex w-36 items-start gap-2 text-sm leading-relaxed text-emerald-50 [text-shadow:0_1px_5px_rgba(0,0,0,.9)]"><Leaf aria-hidden="true" size={30} className="shrink-0 text-lime-300" /><span>Tecnologia a favor de um planeta melhor.</span></p>
          </div>
        </div>
      </section>

      <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-6 pb-9 pt-12 sm:pt-14">
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-20">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Por que escolher o EcoVolt?</p><h2 id="features-title" className="mt-3 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">Sustentabilidade que engaja, conecta e <span className="text-emerald-700 dark:text-emerald-400">gera impacto.</span></h2></div>
          <p className="max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">Unimos tecnologia, gamificação e propósito para tornar o mundo mais sustentável de um jeito simples, divertido e recompensador.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, accent }) => (
            <article key={title} className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_4px_20px_rgba(15,60,45,0.035)] dark:border-emerald-800/80 dark:bg-emerald-900/50">
              <div className={`flex size-[72px] items-center justify-center rounded-full ${accent}`}><Icon aria-hidden="true" size={38} strokeWidth={1.8} /></div>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{title}</h3><p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="start-title" className="mx-auto max-w-6xl px-6 pb-7">
        <div className="relative isolate overflow-hidden rounded-2xl bg-emerald-950 px-6 py-9 text-white sm:px-10 sm:py-10 lg:px-12">
          <img src={homepageSectionBackground} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,35,27,.94)_0%,rgba(0,35,27,.8)_38%,rgba(0,35,27,.12)_75%,rgba(0,35,27,.35)_100%)] max-md:bg-emerald-950/60" />
          <div className="relative max-w-[490px]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-lime-200">Pronto para fazer a diferença?</p><h2 id="start-title" className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">Junte-se a uma comunidade que acredita em um futuro mais verde.</h2><p className="mt-4 max-w-sm text-base leading-relaxed text-emerald-50">Comece agora, faça parte da mudança e transforme suas escolhas em um impacto real.</p><Link to="/login" className={`${primaryClasses} mt-5`}>Começar agora <ArrowRight aria-hidden="true" size={19} /></Link></div>
          <p className="absolute right-12 top-1/2 hidden -translate-y-1/2 -rotate-[10deg] text-center font-serif text-3xl italic leading-[1.4] drop-shadow-lg lg:block">Mais pessoas.<br />Mais ações.<br />Mais vida.<span aria-hidden="true" className="mx-auto mt-3 block h-1.5 w-32 -rotate-6 rounded-full bg-lime-300" /></p>
        </div>
      </section>
    </main>
  )
}

export default HomePage
