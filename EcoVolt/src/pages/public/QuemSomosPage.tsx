import { ArrowUpRight, GraduationCap, Users } from 'lucide-react'

import arthurPhoto from '../../assets/team/Arthur-da-Silva.jpg'
import lucaPhoto from '../../assets/team/Matheus-Luca.png'
import pereiraPhoto from '../../assets/team/Matheus-Pereira.jpeg'
import victorPhoto from '../../assets/team/Victor-Ulrich.png'
import Card from '../../components/common/Card'

const members = [
  {
    name: 'Victor Ulrich Costa Alves da Silva',
    rm: '568634',
    photo: victorPhoto,
    photoPosition: 'object-[center_25%]',
    contribution: 'Desenvolvimento, banco de dados e documentação',
    github: 'https://github.com/Dev-Ulrich',
    linkedin: 'https://www.linkedin.com/in/victorulrichcosta/',
  },
  {
    name: 'Matheus Pereira da Silva Franco',
    rm: '569315',
    photo: pereiraPhoto,
    photoPosition: 'object-center',
    contribution: 'Desenvolvimento, banco de dados e documentação',
    github: 'https://github.com/MatheusPSFranco',
    linkedin: 'https://www.linkedin.com/in/matheus-pereira-da-silva-franco-b7a7b03b7/',
  },
  {
    name: 'Matheus Luca Fouad Barragão',
    rm: '572228',
    photo: lucaPhoto,
    photoPosition: 'object-center',
    contribution: 'Desenvolvimento e prototipação',
    github: 'https://github.com/MatheusLuca',
    linkedin: 'https://www.linkedin.com/in/matheusbarragao/',
  },
  {
    name: 'Arthur da Silva Santana',
    rm: '571075',
    photo: arthurPhoto,
    photoPosition: 'object-[center_25%]',
    contribution: 'Desenvolvimento e documentação',
    github: 'https://github.com/arthursantana1521',
    linkedin: 'https://www.linkedin.com/in/arthur-da-silva-santana-a6061a310/',
  },
]

function QuemSomosPage() {
  return (
    <main className="bg-emerald-50 px-6 py-12 text-slate-900 transition-colors sm:py-16 dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="team-title" className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            <Users aria-hidden="true" size={14} /> Quem somos
          </span>
          <h1 id="team-title" className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Nossa equipe</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-emerald-100">
            Conheça os integrantes responsáveis pelo desenvolvimento do projeto EcoVolt.
            Juntos, unimos tecnologia e sustentabilidade para transformar ideias em prática.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <GraduationCap aria-hidden="true" size={20} /> FIAP x SoulUp · Turma 1TDSPW
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {members.map((member) => (
            <Card key={member.rm} aria-labelledby={`member-${member.rm}`} className="flex h-full flex-col items-center text-center shadow-sm">
              <img
                src={member.photo}
                alt={`Foto de ${member.name}`}
                width={144}
                height={144}
                className={`size-36 rounded-full border-4 border-emerald-100 bg-emerald-100 object-cover dark:border-emerald-800 ${member.photoPosition}`}
              />
              <h2 id={`member-${member.rm}`} className="mt-6 text-xl font-bold leading-snug">{member.name}</h2>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">RM {member.rm}</span>
                <span className="rounded-full border border-emerald-200 px-3 py-1.5 text-slate-600 dark:border-emerald-800 dark:text-emerald-200">1TDSPW</span>
              </div>
              <p className="mb-6 mt-4 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{member.contribution}</p>
              <div className="mt-auto flex flex-wrap justify-center gap-2 border-t border-emerald-100 pt-5 dark:border-emerald-800">
                {[
                  { label: 'GitHub', href: member.github },
                  { label: 'LinkedIn', href: member.linkedin },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de ${member.name} (abre em nova aba)`}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900 dark:focus-visible:ring-offset-emerald-950"
                  >
                    {label} <ArrowUpRight aria-hidden="true" size={15} />
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

export default QuemSomosPage
