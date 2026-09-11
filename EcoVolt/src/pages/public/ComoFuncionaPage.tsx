import { ArrowRight, ChartNoAxesColumnIncreasing, Earth, Gift, Leaf, Search, TreePine, Trophy, Users, Video, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import planetIllustration from '../../assets/public/como-funciona/asset-comofuncionapage.webp'
import forestBackground from '../../assets/public/como-funciona/backgound-comofuncionapage.webp'
import heroBackground from '../../assets/public/como-funciona/background-section-comofuncionaapge.webp'

const steps = [
  { title: 'Escolha uma ação', description: 'Selecione uma das ações sustentáveis disponíveis, alinhadas aos ODS.', icon: Leaf, accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  { title: 'Envie sua evidência', description: 'Grave um vídeo mostrando sua ação e envie pela plataforma.', icon: Video, accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  { title: 'Aguarde a validação', description: 'Nossa equipe analisa a evidência e verifica se está de acordo.', icon: Search, accent: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300' },
  { title: 'Ganhe XP e pontos', description: 'Com a aprovação, você recebe XP, pontos e contribui para os ODS.', icon: Zap, accent: 'bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300' },
  { title: 'Evolua nas missões', description: 'Complete missões, suba no ranking e desbloqueie novos níveis.', icon: ChartNoAxesColumnIncreasing, accent: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300' },
  { title: 'Conquiste recompensas', description: 'Troque seus pontos por recompensas e seja reconhecido pelo seu impacto.', icon: Trophy, accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
]
const highlights = [
  { icon: Leaf, title: 'Impacto real', description: 'Suas ações contribuem para os Objetivos de Desenvolvimento Sustentável (ODS).' },
  { icon: Users, title: 'Comunidade engajada', description: 'Faça parte de uma rede de pessoas que acreditam na mudança.' },
  { icon: Gift, title: 'Conquistas que inspiram', description: 'Ganhe recompensas e seja reconhecido pelo seu impacto positivo.' },
]
const statistics = [
  { icon: Leaf, value: '+1.200', label: 'Ações realizadas' },
  { icon: Users, value: '340', label: 'Usuários ativos' },
  { icon: Earth, value: '8', label: 'ODS impactados' },
  { icon: TreePine, value: '+2,5 tons', label: 'de CO₂ evitadas', detail: '(est. da comunidade)' },
]
const eyebrow = 'text-xs font-bold uppercase leading-relaxed tracking-[0.18em]'
const body = 'text-slate-600 dark:text-slate-300'
const button = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-emerald-950'
const primaryButton = `${button} bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300`

function ComoFuncionaPage() {
  return (
    <main className="bg-[#fcfefd] text-[#09232b] transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="how-title" className="relative isolate overflow-hidden bg-[#f0f6f1] dark:bg-emerald-950">
        <img src={heroBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(246,250,246,.95)_0%,rgba(246,250,246,.85)_34%,rgba(246,250,246,.2)_60%,transparent_80%)] max-lg:bg-[#f0f6f1]/90 dark:bg-[linear-gradient(90deg,rgba(2,44,34,.98)_0%,rgba(2,44,34,.9)_35%,rgba(2,44,34,.2)_75%,transparent_100%)] max-lg:dark:bg-emerald-950/90" />
        <div className="relative mx-auto flex min-h-[410px] max-w-6xl items-center px-6 py-12 lg:min-h-[440px]">
          <div className="max-w-lg">
            <p className={`${eyebrow} text-emerald-950 dark:text-emerald-200`}>Como funciona</p>
            <h1 id="how-title" className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">Pequenas ações,<span className="block text-emerald-700 dark:text-emerald-400">grandes mudanças.</span></h1>
            <p className={`mt-5 max-w-[440px] text-base leading-relaxed sm:text-lg ${body}`}>No EcoVolt, cada atitude sustentável se transforma em pontos, conquistas e impacto real. Veja como é simples fazer parte dessa jornada.</p>
            <Link to="/login" className={`${primaryButton} mt-6 px-8`}>Comece agora <ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
          <div className="absolute bottom-10 right-6 hidden w-64 lg:block">
            <p className="mb-8 ml-auto w-fit -rotate-[8deg] text-center font-serif text-3xl italic leading-[1.3] text-white drop-shadow-lg">Mais pessoas.<br />Mais ações.<br />Mais vida.<span aria-hidden="true" className="mx-auto mt-3 block h-1.5 w-32 -rotate-6 rounded-full bg-lime-400" /></p>
            <div className="flex items-start gap-4 rounded-2xl border border-white/40 bg-emerald-950/60 p-5 text-sm leading-relaxed text-white shadow-lg backdrop-blur-md">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-lime-200/50 bg-gradient-to-br from-lime-400/80 to-emerald-800 text-lime-100"><Leaf aria-hidden="true" size={32} /></span>
              <p><span className="font-bold">Sustentabilidade</span><br />é um jogo sério.<br />E você faz parte dele.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-6 sm:pb-8">
        <section id="passo-a-passo" aria-labelledby="steps-title" className="scroll-mt-24 py-9 sm:py-10">
          <div className="text-center">
            <p className={`${eyebrow} text-emerald-900 dark:text-emerald-300`}>Passo a passo</p>
            <h2 id="steps-title" className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Da atitude ao impacto</h2>
            <p className={`mt-2 leading-relaxed ${body}`}>Veja como suas ações se transformam em evolução dentro do EcoVolt.</p>
          </div>
          <ol className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-4">
            {steps.map(({ title, description, icon: Icon, accent }, index) => (
              <li data-motion-reveal key={title} className="relative text-center">
                {index < steps.length - 1 && <span aria-hidden="true" className="absolute left-[calc(50%+52px)] top-11 hidden h-px w-[calc(100%-88px)] bg-slate-300 lg:block dark:bg-emerald-700"><span className="absolute right-0 -top-px size-[3px] rounded-full bg-slate-400 dark:bg-emerald-500" /></span>}
                <div className={`relative mx-auto flex size-[88px] items-center justify-center rounded-full ${accent}`}>
                  <Icon aria-hidden="true" size={38} strokeWidth={1.8} />
                  <span aria-hidden="true" className="absolute -bottom-5 flex size-8 items-center justify-center rounded-full border-[3px] border-[#fcfefd] bg-emerald-700 text-sm font-bold text-white dark:border-emerald-950">{index + 1}</span>
                </div>
                <h3 className="mt-8 text-base font-bold leading-snug tracking-tight">{title}</h3>
                <p className={`mx-auto mt-2 max-w-[240px] text-sm leading-relaxed ${body}`}>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="purpose-title" className="relative isolate overflow-hidden rounded-2xl bg-[#edf7ec] px-6 py-8 sm:px-8 lg:px-10 dark:bg-emerald-900/40">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_60%,rgba(163,230,53,.15),transparent_60%)]" />
          <div className="grid items-center gap-7 md:grid-cols-2 lg:grid-cols-[1fr_.9fr_1.15fr] lg:gap-6">
            <div>
              <p className={`${eyebrow} text-emerald-900 dark:text-emerald-300`}>Mais do que pontos</p>
              <h2 id="purpose-title" className="mt-2 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">Um <span className="underline decoration-emerald-600/50 decoration-2 underline-offset-4">propósito</span><br />que nos move</h2>
              <p className={`mt-4 text-base leading-relaxed ${body}`}>O EcoVolt une tecnologia, gamificação e sustentabilidade para incentivar atitudes que realmente fazem a diferença. Cada ação contribui para um futuro mais verde, justo e consciente.</p>
              <Link to="/sobre" className={`${primaryButton} mt-4 px-4`}>Conheça mais sobre o projeto <ArrowRight aria-hidden="true" size={17} className="shrink-0" /></Link>
            </div>
            <img data-motion-visual src={planetIllustration} alt="Ilustração de um planeta verde envolvido por folhas" loading="lazy" width={1254} height={1254} className="mx-auto w-full max-w-[290px] object-contain md:max-w-[320px] lg:max-w-none" />
            <ul className="grid gap-6 md:col-span-2 md:grid-cols-3 lg:col-span-1 lg:grid-cols-1">
              {highlights.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-4 md:flex-col lg:flex-row">
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/90 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"><Icon aria-hidden="true" size={31} strokeWidth={1.8} /></span>
                  <div className="pt-1"><h3 className="text-base font-bold">{title}</h3><p className={`mt-1 text-sm leading-relaxed ${body}`}>{description}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Indicadores ilustrativos da comunidade" className="mt-5 rounded-2xl bg-slate-50 px-5 pb-4 pt-6 dark:bg-emerald-900/25 sm:px-7">
          <dl className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map(({ icon: Icon, value, label, detail }, index) => (
              <div key={label} className={`flex items-center gap-5 px-3 ${index > 0 ? 'lg:border-l lg:border-slate-200 lg:pl-6 lg:dark:border-emerald-800' : ''}`}>
                <Icon aria-hidden="true" size={44} strokeWidth={1.7} className="shrink-0 text-emerald-700 dark:text-emerald-400" />
                <div className="flex flex-col"><dt className={`mt-1 text-sm leading-relaxed ${body}`}>{label}{detail && <span className="block text-xs">{detail}</span>}</dt><dd className="-order-1 text-2xl font-bold tracking-tight">{value}</dd></div>
              </div>
            ))}
          </dl>
          <p className={`mt-4 text-center text-xs ${body}`}>Indicadores ilustrativos para demonstração do projeto.</p>
        </section>

        <section aria-labelledby="join-title" className="relative isolate mt-5 overflow-hidden rounded-2xl bg-emerald-950 px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <img src={forestBackground} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_75%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,44,34,.45),rgba(2,44,34,.92)_25%,rgba(2,44,34,.92)_75%,rgba(2,44,34,.5))]" />
          <div className="relative mx-auto max-w-3xl lg:px-12">
            <p className={`${eyebrow} text-lime-300`}>Faça parte dessa mudança</p>
            <h2 id="join-title" className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">O <span className="text-lime-200">futuro mais verde</span> começa com você.</h2>
            <p className="mt-3 text-sm leading-relaxed text-emerald-50 sm:text-base">Entre agora, escolha suas ações e transforme boas atitudes em grandes conquistas.</p>
            <div className="mt-5 flex flex-col justify-center gap-3 min-[400px]:flex-row">
              <Link to="/login" className={`${button} bg-lime-300 text-emerald-950 hover:bg-lime-200 focus-visible:ring-lime-300 focus-visible:ring-offset-emerald-950`}>Começar agora <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link to="/app/missoes" className={`${button} border border-lime-200 bg-emerald-950/40 text-lime-100 hover:bg-emerald-900 focus-visible:ring-lime-300 focus-visible:ring-offset-emerald-950`}>Ver missões</Link>
            </div>
          </div>
          <p className="absolute right-7 top-1/2 hidden w-32 -translate-y-1/2 -rotate-[8deg] font-serif text-2xl italic leading-tight xl:block">Juntos<br />por um amanhã<br />mais verde!<span aria-hidden="true" className="mx-auto mt-3 block h-1 w-24 -rotate-6 rounded-full bg-lime-400" /></p>
        </section>
      </div>
    </main>
  )
}

export default ComoFuncionaPage
