import { ArrowRight, ArrowUpRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

import heroBackground from '../../assets/public/quem-somos/hero-equipe.png'
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
    <main className="bg-[#fcfefd] text-[#09232b] transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="team-title" className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <img src={heroBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,25,19,.85)_0%,rgba(0,25,19,.7)_30%,rgba(0,25,19,.15)_55%,transparent_75%)] max-lg:bg-emerald-950/70" />
        <div className="relative mx-auto flex min-h-[400px] max-w-6xl items-center px-6 py-10 lg:min-h-[440px]">
          <div className="max-w-lg lg:w-[46%]">
            <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.16em] text-emerald-100">Quem somos</p>
            <h1 id="team-title" className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.1rem]">Pessoas que<br />acreditam em<span className="block text-emerald-300">um futuro mais verde.</span></h1>
            <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-emerald-50 sm:text-base">O EcoVolt é feito por pessoas que acreditam que pequenas ações, quando somadas, têm o poder de transformar o presente e construir um amanhã melhor.</p>
            <Link to="/sobre" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 py-3 text-sm font-bold text-emerald-950 transition-colors hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-950">Conheça nossa história <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <p className="absolute right-6 top-8 hidden -rotate-[9deg] text-center font-serif text-2xl italic leading-tight text-emerald-950 [text-shadow:0_1px_8px_rgba(255,255,255,.65)] lg:block">Juntos<br />por um amanhã<br />mais verde!<span aria-hidden="true" className="mx-auto mt-3 block h-1 w-24 -rotate-6 rounded-full bg-lime-400" /></p>
        </div>
      </section>

      <section id="integrantes" aria-labelledby="members-title" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 sm:py-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Nossa equipe</p>
            <h2 id="members-title" className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Quem faz o EcoVolt acontecer</h2>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">Conheça os integrantes responsáveis pelo desenvolvimento do projeto.</p>
          </div>
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200"><GraduationCap aria-hidden="true" size={21} className="shrink-0" />FIAP x SoulUp · Turma 1TDSPW</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {members.map((member) => (
            <Card key={member.rm} aria-labelledby={`member-${member.rm}`} className="flex h-full flex-col items-center border border-slate-200/80 bg-white text-center shadow-sm dark:border-emerald-800/80 dark:bg-emerald-900/60">
              <img
                src={member.photo}
                alt={`Foto de ${member.name}`}
                loading="lazy"
                width={144}
                height={144}
                className={`size-36 rounded-full border-4 border-emerald-100 bg-emerald-100 object-cover dark:border-emerald-800 ${member.photoPosition}`}
              />
              <h3 id={`member-${member.rm}`} className="mt-6 text-xl font-bold leading-snug">{member.name}</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">RM {member.rm}</span>
                <span className="rounded-full border border-emerald-200 px-3 py-1.5 text-slate-600 dark:border-emerald-800 dark:text-emerald-200">1TDSPW</span>
              </div>
              <p className="mb-6 mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{member.contribution}</p>
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
      <section aria-labelledby="team-purpose-title" className="mx-auto max-w-6xl px-6 pb-8">
        <div className="flex flex-col gap-6 rounded-2xl bg-[#edf7f0] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between dark:bg-emerald-900/40">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Uma equipe. Um propósito.</p>
            <h2 id="team-purpose-title" className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">Tecnologia e pessoas por um mundo melhor.</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">Conheça a história do EcoVolt e o que nos move a conectar educação, inovação e impacto positivo.</p>
          </div>
          <Link to="/sobre" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 lg:self-center dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 dark:focus-visible:ring-offset-emerald-950">Conheça o projeto <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </section>
    </main>
  )
}

export default QuemSomosPage
