import { ArrowDown, CircleAlert, Earth, Eye, Heart, Leaf, ShieldCheck, Target, type LucideIcon } from 'lucide-react'

import heroBackground from '../../assets/public/quem-somos/background-quem-somos.png'
import fiapImage from '../../assets/public/quem-somos/fiap.png'
import logoFiap from '../../assets/public/quem-somos/logo-fiap.png'
import logoSoulUp from '../../assets/public/quem-somos/logo-soulup.png'
import ods06 from '../../assets/public/sobre/ods-6.png'
import ods07 from '../../assets/public/sobre/ods-7.png'
import ods11 from '../../assets/public/sobre/ods-11.png'
import ods12 from '../../assets/public/sobre/ods-12.png'
import ods13 from '../../assets/public/sobre/ods-13.png'
import ods15 from '../../assets/public/sobre/ods-15.png'

const pillars = [
  { icon: Target, title: 'Propósito', description: 'Incentivar e facilitar a adoção de hábitos sustentáveis por meio da tecnologia, gamificação e comunidade, gerando impacto positivo no planeta.' },
  { icon: Eye, title: 'Visão', description: 'Ser referência em soluções digitais que unem sustentabilidade e engajamento, conectando pessoas para um futuro mais consciente.' },
]
const values = ['Sustentabilidade', 'Inovação', 'Colaboração', 'Transparência', 'Impacto real', 'Pessoas em primeiro lugar']
const sdgCards = [
  { number: '6', title: 'Água potável e saneamento', image: ods06 },
  { number: '7', title: 'Energia limpa e acessível', image: ods07 },
  { number: '11', title: 'Cidades e comunidades sustentáveis', image: ods11 },
  { number: '12', title: 'Consumo e produção responsáveis', image: ods12 },
  { number: '13', title: 'Ação contra a mudança global do clima', image: ods13 },
  { number: '15', title: 'Vida terrestre', image: ods15 },
]
const container = 'mx-auto max-w-6xl px-6'
const eyebrow = 'text-xs font-bold uppercase leading-relaxed tracking-[0.16em]'
const heading = 'mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl'
const body = 'text-slate-600 dark:text-slate-300'

function IconMedallion({ icon: Icon, alert = false }: { icon: LucideIcon; alert?: boolean }) {
  return (
    <span className={`flex size-14 shrink-0 items-center justify-center rounded-full border-2 shadow-[inset_0_2px_8px_rgba(16,185,129,0.12)] ${alert ? 'border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300' : 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-200 text-emerald-700 dark:border-emerald-700 dark:from-emerald-900 dark:to-emerald-800 dark:text-emerald-300'}`}>
      <Icon aria-hidden="true" size={32} strokeWidth={2} />
    </span>
  )
}

function AccentStroke() {
  return <span aria-hidden="true" className="mt-3 block h-1.5 w-14 -rotate-[18deg] rounded-full bg-lime-500" />
}

function SobrePage() {
  return (
    <main className="bg-[#fcfefd] text-[#09232b] transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-[#edf7f1] dark:bg-emerald-950">
        <img src={heroBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(240,250,244,.98)_0%,rgba(240,250,244,.94)_35%,rgba(240,250,244,.45)_53%,transparent_72%)] max-lg:bg-[#edf7f1]/90 dark:bg-[linear-gradient(90deg,rgba(2,44,34,.98)_0%,rgba(2,44,34,.94)_35%,rgba(2,44,34,.5)_60%,transparent_85%)] max-lg:dark:bg-emerald-950/90" />
        <div className={`${container} relative flex min-h-[420px] items-center py-12 lg:min-h-[450px]`}>
          <div className="relative z-10 max-w-lg lg:w-[46%]">
            <p className={eyebrow}>Sobre o EcoVolt</p>
            <h1 id="about-title" className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">Mais que um projeto,<span className="block text-emerald-700 dark:text-emerald-400">um impacto real.</span></h1>
            <p className={`mt-4 max-w-[440px] text-base leading-relaxed ${body}`}>
              O EcoVolt nasceu da união entre tecnologia, sustentabilidade e pessoas, com o propósito de incentivar atitudes que fazem a diferença. Acreditamos que pequenas ações, quando somadas, têm o poder de transformar o presente e construir um futuro mais verde.
            </p>
            <a href="#historia" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 dark:focus-visible:ring-offset-emerald-950">
              Nossa história <ArrowDown aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="absolute left-[47%] top-[51%] hidden w-64 items-center gap-3 rounded-2xl border border-white/40 bg-white/65 p-4 text-sm leading-relaxed shadow-sm backdrop-blur-md lg:flex dark:border-emerald-700/50 dark:bg-emerald-950/75">
            <IconMedallion icon={Leaf} />
            <p><span className="font-semibold">Sustentabilidade</span><br />é uma escolha hoje para um amanhã melhor.</p>
          </div>
          <p className="absolute right-7 top-[24%] hidden -rotate-12 text-center font-serif text-3xl italic leading-[1.35] text-white drop-shadow-lg xl:block">Pessoas<br />Atitudes<br />Mudança<br />Futuro.<span aria-hidden="true" className="mt-3 block h-1 w-28 -rotate-6 rounded-full bg-lime-400" /></p>
        </div>
      </section>

      <section id="historia" aria-labelledby="essence-title" className={`${container} scroll-mt-24 py-9 sm:py-10`}>
        <p className={eyebrow}>Nossa essência</p>
        <h2 id="essence-title" className={heading}>Propósito, visão e valores</h2>
        <p className={`mt-2 leading-relaxed ${body}`}>O que nos move, onde queremos chegar e o que nos guia todos os dias.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon, title, description }) => (
            <article key={title} className="grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-3 rounded-2xl bg-[#edf7f3] p-6 dark:bg-emerald-900/50">
              <IconMedallion icon={icon} /><h3 className="self-center text-xl font-bold tracking-tight">{title}</h3>
              <p className={`col-span-2 text-sm leading-relaxed lg:col-start-2 lg:col-span-1 ${body}`}>{description}</p>
            </article>
          ))}
          <article className="grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-3 rounded-2xl bg-[#edf7f3] p-6 dark:bg-emerald-900/50">
            <IconMedallion icon={Heart} /><h3 className="self-center text-xl font-bold tracking-tight">Valores</h3>
            <ul className={`col-span-2 space-y-1 text-sm lg:col-start-2 lg:col-span-1 ${body}`}>
              {values.map(value => <li key={value} className="flex items-center gap-2"><ShieldCheck aria-hidden="true" size={14} className="shrink-0 text-emerald-700 dark:text-emerald-400" />{value}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="partnership-title" className="border-y border-emerald-100/70 bg-gradient-to-r from-[#f2f8f5] via-[#f9fcfa] to-[#eef5ec] dark:border-emerald-900 dark:from-emerald-900/30 dark:via-emerald-950 dark:to-emerald-900/40">
        <div className={`${container} grid items-center gap-8 py-6 sm:py-8 md:grid-cols-2 md:gap-12`}>
          <div>
            <p className={eyebrow}>Uma parceria com propósito</p>
            <h2 id="partnership-title" className={`${heading} sm:text-[2.6rem]`}>FIAP x SoulUp</h2>
            <p className={`mt-3 max-w-lg leading-relaxed ${body}`}>O EcoVolt é um projeto desenvolvido no contexto do Challenge FIAP x SoulUp, que propõe soluções inovadoras para problemas reais da sociedade, conectando tecnologia, educação e impacto social.</p>
            <div className="mt-6 grid max-w-sm grid-cols-2 divide-x divide-slate-300 dark:divide-emerald-700">
              <div className="pr-6"><img src={logoFiap} alt="FIAP" loading="lazy" className="h-14 w-full object-contain object-left" /><p className={`mt-2 text-sm leading-snug ${body}`}>Educação que<br />transforma</p></div>
              <div className="pl-6"><img src={logoSoulUp} alt="SoulUp" loading="lazy" className="h-14 w-full object-contain object-left dark:rounded-lg dark:bg-white dark:p-2" /><p className={`mt-2 text-sm leading-snug ${body}`}>Inovação que<br />gera impacto</p></div>
            </div>
          </div>
          <figure className="relative isolate overflow-hidden rounded-2xl bg-emerald-900">
            <img src={fiapImage} alt="Fachada do prédio da FIAP cercada por árvores" loading="lazy" className="aspect-[1.65] w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-7 pb-6 pt-14 text-base leading-relaxed text-white">Tecnologia e pessoas<br />para um futuro mais sustentável.<AccentStroke /></figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="solution-title" className={`${container} py-9 sm:py-10`}>
        <p className={eyebrow}>O desafio e a nossa solução</p>
        <h2 id="solution-title" className={heading}>Do problema à transformação</h2>
        <p className={`mt-2 leading-relaxed ${body}`}>Entenda o contexto que motivou o EcoVolt e como nossa solução atua na prática.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_180px] lg:items-center">
          <article className="flex h-full items-start gap-4 rounded-2xl bg-[#fcf0f0] p-5 dark:bg-red-950/30">
            <IconMedallion icon={CircleAlert} alert />
            <div><h3 className="pt-1 text-lg font-bold text-red-700 dark:text-red-300">O problema</h3><p className={`mt-2 text-sm leading-relaxed ${body}`}>A falta de engajamento em ações sustentáveis, o desconhecimento sobre o impacto individual e a dificuldade de transformar boas intenções em hábitos reais ainda são grandes desafios.</p></div>
          </article>
          <article className="flex h-full items-start gap-4 rounded-2xl bg-[#eaf8ef] p-5 dark:bg-emerald-900/50">
            <IconMedallion icon={Leaf} />
            <div><h3 className="pt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">Nossa solução</h3><p className={`mt-2 text-sm leading-relaxed ${body}`}>O EcoVolt transforma ações sustentáveis em uma experiência gamificada, onde cada atitude gera pontos, conquistas e reconhecimento, estimulando a construção de um futuro mais verde.</p></div>
          </article>
          <p className="mx-auto my-3 -rotate-12 text-center font-serif text-3xl italic leading-tight md:col-span-2 lg:col-span-1">Pequenas ações.<br />Grandes<br />conquistas.<span aria-hidden="true" className="mx-auto mt-4 block h-1.5 w-32 -rotate-6 rounded-full bg-lime-500" /></p>
        </div>
      </section>

      <section aria-labelledby="sdg-title" className="bg-gradient-to-br from-[#eff7f0] to-[#f7fbf8] dark:from-emerald-900/40 dark:to-emerald-950">
        <div className={`${container} pb-14 pt-8 sm:pb-16`}>
          <p className={eyebrow}>Contribuição para um mundo melhor</p>
          <h2 id="sdg-title" className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">Alinhado aos Objetivos de Desenvolvimento Sustentável</h2>
          <p className={`mt-2 text-sm leading-relaxed sm:text-base ${body}`}>Nossas ações estão conectadas a diversos ODS da ONU, contribuindo para um futuro mais justo, equilibrado e sustentável.</p>
          <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1fr_250px]">
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {sdgCards.map(({ number, title, image }) => <li key={number} className="overflow-hidden rounded-xl"><img src={image} alt={`ODS ${number}: ${title}`} loading="lazy" className="aspect-square w-full object-contain" /></li>)}
            </ul>
            <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-5 dark:bg-emerald-900/60">
              <IconMedallion icon={Earth} /><div><p className="text-sm font-semibold leading-relaxed">Juntos por um amanhã mais verde.</p><p className={`mt-1 text-sm ${body}`}>Cada escolha conta.</p><AccentStroke /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SobrePage
