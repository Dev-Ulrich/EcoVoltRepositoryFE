import { Leaf, Users, Zap } from 'lucide-react'

import Card from '../../components/common/Card'

const principles = [
  {
    title: 'Sustentabilidade no dia a dia',
    description: 'Queremos incentivar atitudes conscientes e tornar o cuidado com o meio ambiente parte da rotina.',
    icon: Leaf,
  },
  {
    title: 'Tecnologia com propósito',
    description: 'Desenvolvemos o EcoVolt para conectar ações sustentáveis a uma experiência de aprendizado e participação.',
    icon: Zap,
  },
  {
    title: 'Construção em equipe',
    description: 'Acreditamos na colaboração e na troca de conhecimento para transformar ideias em soluções.',
    icon: Users,
  },
]

function QuemSomosPage() {
  return (
    <main className="bg-emerald-50 px-6 py-16 text-slate-900 transition-colors dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Nossa equipe
          </span>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">Quem somos</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-emerald-100">
            Somos a equipe por trás do EcoVolt, um projeto acadêmico desenvolvido
            no Challenge FIAP x SoulUp. Unimos tecnologia e sustentabilidade para
            incentivar pequenas ações que contribuem para um futuro mais consciente.
          </p>
        </header>

        <section className="mt-14" aria-labelledby="principles-title">
          <h2 id="principles-title" className="text-center text-2xl font-bold">
            O que nos move
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }) => (
              <Card key={title}>
                <Icon aria-hidden="true" className="size-8 text-emerald-700 dark:text-emerald-400" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-emerald-100">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default QuemSomosPage
