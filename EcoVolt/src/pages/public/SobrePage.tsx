import { ArrowRight, BookOpen, GraduationCap, Leaf, Sprout, Target, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import Card from '../../components/common/Card'

const pillars = [
  {
    title: 'Consciência que vira prática',
    description: 'Aproximar a sustentabilidade da rotina, com atitudes que ajudam a repensar o consumo e o cuidado com o ambiente.',
    icon: Leaf,
  },
  {
    title: 'Motivação para continuar',
    description: 'Usar elementos de jogos, como desafios e evolução, para incentivar a participação e a construção de novos hábitos.',
    icon: Target,
  },
  {
    title: 'Aprendizado compartilhado',
    description: 'Valorizar a troca de experiências e a colaboração para que cada pessoa possa aprender e contribuir com a comunidade.',
    icon: Users,
  },
]

const objectives = [
  'Incentivar atitudes sustentáveis no dia a dia.',
  'Dar visibilidade à participação de cada pessoa.',
  'Conectar aprendizado, tecnologia e colaboração.',
]

const linkClasses = 'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'

function SobrePage() {
  return (
    <main className="bg-emerald-50 px-6 py-12 text-slate-900 transition-colors sm:py-16 dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            <Sprout aria-hidden="true" size={14} /> Sobre o EcoVolt
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            A energia da mudança<br />
            <span className="text-emerald-700 dark:text-emerald-400">começa com a gente.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-emerald-100">
            Somos um projeto que une tecnologia, sustentabilidade e participação.
            Nosso propósito é inspirar escolhas conscientes e transformar pequenas
            atitudes em uma jornada de aprendizado.
          </p>
        </header>

        <section aria-labelledby="purpose-title" className="mt-14 grid overflow-hidden rounded-3xl border border-emerald-200 bg-white lg:grid-cols-2 dark:border-emerald-800 dark:bg-emerald-900/20">
          <div className="relative overflow-hidden bg-emerald-900 p-8 text-white sm:p-10 lg:p-12">
            <div aria-hidden="true" className="absolute -bottom-20 -right-20 size-72 rounded-full border-[40px] border-emerald-800/60" />
            <div className="relative">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950">
                <Zap aria-hidden="true" size={32} />
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-300">Nosso propósito</p>
              <h2 id="purpose-title" className="mt-3 text-3xl font-bold leading-tight">Tornar a sustentabilidade parte da rotina.</h2>
              <p className="mt-5 leading-relaxed text-emerald-100">
                Acreditamos que cuidar do futuro começa nas escolhas de hoje.
                O EcoVolt nasce para aproximar essa ideia das pessoas, incentivando
                a prática e a continuidade de hábitos mais conscientes.
              </p>
            </div>
          </div>
          <div className="p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-bold">Uma ideia com espaço para crescer</h3>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-emerald-100">
              A proposta da plataforma é conectar ações sustentáveis a uma experiência
              de evolução. Cada contribuição fará parte de uma jornada com desafios,
              reconhecimento e aprendizado.
            </p>
            <ul className="mt-8 space-y-5">
              {objectives.map((objective) => (
                <li key={objective} className="flex items-start gap-3">
                  <Sprout aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                  <span className="text-sm leading-relaxed text-slate-700 dark:text-emerald-100">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="pillars-title" className="mt-20">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">O que orienta o projeto</p>
          <h2 id="pillars-title" className="mt-3 text-3xl font-bold">Três pilares, um propósito em comum</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  <Icon aria-hidden="true" size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-emerald-100">{description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="origin-title" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <GraduationCap aria-hidden="true" size={32} className="text-emerald-700 dark:text-emerald-400" />
            <p className="mt-5 text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Nossa origem</p>
            <h2 id="origin-title" className="mt-3 text-3xl font-bold">Da sala de aula para uma ideia de futuro.</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-emerald-100">
              O EcoVolt é um projeto acadêmico desenvolvido no Challenge FIAP x SoulUp.
              Ele reúne o aprendizado da equipe em uma proposta voltada à sustentabilidade
              e ao envolvimento das pessoas.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-emerald-100">
              Estamos construindo a plataforma por etapas. O envio de ações, as validações,
              as missões e as recompensas fazem parte da evolução planejada do projeto.
              Queremos aprender com cada etapa e dar forma a uma experiência simples de participar.
            </p>
            <Link to="/quem-somos" className="mt-6 inline-flex items-center gap-2 rounded-lg py-2 font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">
              Conheça quem está por trás do EcoVolt <ArrowRight aria-hidden="true" size={18} className="shrink-0" />
            </Link>
          </div>
        </section>

        <section aria-labelledby="explore-title" className="mt-20 rounded-3xl border border-emerald-200 bg-emerald-100/70 p-8 text-center sm:p-12 dark:border-emerald-800 dark:bg-emerald-900/40">
          <BookOpen aria-hidden="true" size={28} className="mx-auto text-emerald-700 dark:text-emerald-400" />
          <h2 id="explore-title" className="mt-4 text-3xl font-bold">Conheça o próximo passo dessa jornada</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600 dark:text-emerald-100">
            Entenda a proposta da plataforma e descubra como as etapas do EcoVolt se conectam.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/como-funciona" className={`${linkClasses} bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300`}>
              Como funciona <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link to="/login" className={`${linkClasses} border border-emerald-600 text-emerald-800 hover:bg-emerald-200 dark:border-emerald-600 dark:text-emerald-200 dark:hover:bg-emerald-900`}>
              Acessar minha conta
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SobrePage
