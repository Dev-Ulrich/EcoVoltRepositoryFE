import { ArrowRight, ArrowUpRight, ClipboardCheck, GraduationCap, Leaf, Lightbulb, Recycle, Sprout, Trophy, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../auth/useAuth'
import Card from '../../components/common/Card'

const habits = [
  { icon: Lightbulb, title: 'Repense seu consumo', description: 'Aproveite a luz natural e desligue luzes e aparelhos quando não estiverem em uso.', label: 'Energia' },
  { icon: Recycle, title: 'Dê um novo destino', description: 'Separe os resíduos, reutilize embalagens e pense em outras possibilidades antes de descartar.', label: 'Menos desperdício' },
  { icon: Sprout, title: 'Cuide do que está perto', description: 'Preserve os espaços compartilhados e convide outras pessoas a participar de atitudes conscientes.', label: 'Comunidade' },
]

const journey = [
  { icon: Leaf, title: 'Registre sua atitude', description: 'Registre uma ação sustentável e selecione uma evidência na demonstração.' },
  { icon: ClipboardCheck, title: 'Acompanhe a análise', description: 'Consulte os status e experimente os resultados da análise simulada.' },
  { icon: Trophy, title: 'Veja sua evolução', description: 'Veja pontos, experiência e missões mudarem com as aprovações simuladas.' },
]

const linkClasses = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-emerald-950'
const primaryClasses = `${linkClasses} bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300`

function HomePage() {
  const { user } = useAuth()
  const accountPath = user ? '/app' : '/login'
  const accountLabel = user ? 'Ir para meu dashboard' : 'Acessar minha conta'

  return (
    <main className="bg-emerald-50 text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:pb-20 sm:pt-16">
        <section aria-labelledby="home-title" className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              <Leaf aria-hidden="true" size={14} /> Sua energia transforma
            </p>
            <h1 id="home-title" className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Pequenas atitudes.<br />
              <span className="text-emerald-700 dark:text-emerald-400">Novos caminhos<br />para o futuro.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-emerald-100">
              Transforme o cuidado com o planeta em parte da sua rotina. O EcoVolt une sustentabilidade, aprendizado e motivação para você dar o próximo passo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={accountPath} className={primaryClasses}>{accountLabel} <ArrowRight aria-hidden="true" size={18} /></Link>
              <Link to="/como-funciona" className={`${linkClasses} border border-emerald-300 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900`}>Conhecer a proposta</Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-slate-500 dark:text-emerald-200">
              <GraduationCap aria-hidden="true" size={18} className="shrink-0" /> Projeto acadêmico · FIAP x SoulUp
            </p>
          </div>

          <div className="relative isolate overflow-hidden rounded-3xl bg-emerald-900 p-6 text-white sm:p-8 dark:border dark:border-emerald-800">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full border-[45px] border-emerald-800" />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Um começo possível</span>
              <Zap aria-hidden="true" size={22} className="text-emerald-300" />
            </div>
            <div aria-hidden="true" className="relative mx-auto my-8 flex size-48 items-center justify-center rounded-full border border-emerald-600/70 sm:size-56">
              <div className="flex size-36 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-800 sm:size-40">
                <Sprout size={80} strokeWidth={1.3} className="text-emerald-300" />
              </div>
              <span className="absolute right-0 top-2 flex size-12 items-center justify-center rounded-2xl bg-emerald-300 text-emerald-950"><Lightbulb size={24} /></span>
              <span className="absolute bottom-2 left-0 flex size-12 items-center justify-center rounded-2xl bg-emerald-700 text-emerald-100"><Recycle size={24} /></span>
            </div>
            <div className="rounded-2xl border border-emerald-600 bg-emerald-950/40 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Uma ideia para hoje</p>
              <h2 className="mt-2 text-xl font-bold">Comece pela energia.</h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100">Ao sair de um ambiente, confira se as luzes precisam continuar acesas. Uma escolha simples pode virar um hábito.</p>
            </div>
            <p className="mt-5 text-center text-sm text-emerald-200">Aprender. Praticar. Continuar.</p>
          </div>
        </section>

        <section aria-labelledby="habits-title" className="mt-20 border-t border-emerald-200 pt-12 sm:mt-24 dark:border-emerald-800">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Sustentabilidade no cotidiano</p>
            <h2 id="habits-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">O próximo passo está ao seu alcance.</h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-emerald-100">Você não precisa mudar tudo de uma vez. Escolha uma atitude e encontre espaço para ela no seu dia.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {habits.map(({ icon: Icon, title, description, label }) => (
              <Card key={title} className="h-full shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><Icon aria-hidden="true" size={25} /></div>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{label}</p>
                <h3 className="mt-2 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="journey-title" className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Sua jornada no EcoVolt</p>
            <h2 id="journey-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Cada contribuição tem seu lugar.</h2>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-emerald-100">Já é possível conhecer o dashboard com uma conta e dados demonstrativos. Registre atitudes e acompanhe sua evolução durante a sessão.</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-emerald-200">Envios, validações, missões, ranking, recompensas e perfil estão disponíveis como demonstração local.</p>
            <Link to="/como-funciona" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">Entenda como funciona <ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 dark:border-emerald-800 dark:bg-emerald-900/20">
            <p className="mb-6 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">Etapas da demonstração</p>
            <ol className="space-y-6">
              {journey.map(({ icon: Icon, title, description }, index) => (
                <li key={title} className="flex gap-4">
                  <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><Icon size={22} /></div>
                  <div><h3 className="font-bold"><span className="mr-2 text-emerald-700 dark:text-emerald-400">0{index + 1}.</span>{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="team-title" className="mt-20 flex flex-col gap-6 border-y border-emerald-200 py-8 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-800">
          <div className="flex items-start gap-4">
            <Users aria-hidden="true" size={28} className="mt-1 shrink-0 text-emerald-700 dark:text-emerald-400" />
            <div><h2 id="team-title" className="text-xl font-bold">Uma ideia feita por pessoas.</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-emerald-100">Somos estudantes conectando tecnologia e sustentabilidade no Challenge FIAP x SoulUp.</p></div>
          </div>
          <Link to="/quem-somos" className={`${linkClasses} shrink-0 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900`}>Conheça a equipe <ArrowUpRight aria-hidden="true" size={18} /></Link>
        </section>

        <section aria-labelledby="start-title" className="relative isolate mt-20 overflow-hidden rounded-3xl bg-emerald-900 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full border-[40px] border-emerald-800" />
          <Leaf aria-hidden="true" size={30} className="mx-auto text-emerald-300" />
          <h2 id="start-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">O futuro começa com o que fazemos hoje.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-emerald-100">Conheça seu espaço no EcoVolt usando os dados fictícios exibidos na página de login. O acesso é uma demonstração local.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={accountPath} className={`${linkClasses} bg-emerald-300 text-emerald-950 hover:bg-emerald-200 focus-visible:ring-offset-emerald-900`}>{accountLabel} <ArrowRight aria-hidden="true" size={18} /></Link>
            <Link to="/contato" className={`${linkClasses} border border-emerald-600 text-white hover:bg-emerald-800 focus-visible:ring-offset-emerald-900`}>Falar com a equipe</Link>
          </div>
          <Link to="/faq" className="mt-6 inline-flex min-h-11 items-center rounded-lg px-2 text-sm text-emerald-100 underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">Ainda tem dúvidas? Consulte o FAQ</Link>
        </section>
      </div>
    </main>
  )
}

export default HomePage
