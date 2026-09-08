import { ArrowRight, ArrowUpRight, BookOpen, CircleHelp, Code, MessageCircle, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import Card from '../../components/common/Card'

const contacts = [
  { name: 'Victor Ulrich', initials: 'VU', url: 'https://www.linkedin.com/in/victorulrichcosta/' },
  { name: 'Matheus Pereira', initials: 'MP', url: 'https://www.linkedin.com/in/matheus-pereira-da-silva-franco-b7a7b03b7/' },
  { name: 'Matheus Luca', initials: 'ML', url: 'https://www.linkedin.com/in/matheusbarragao/' },
  { name: 'Arthur da Silva', initials: 'AS', url: 'https://www.linkedin.com/in/arthur-da-silva-santana-a6061a310/' },
]

const topics = [
  { title: 'Dúvidas sobre o projeto', description: 'Quer entender melhor a proposta ou saber em que etapa estamos? Converse com a equipe.' },
  { title: 'Sugestões e ideias', description: 'Compartilhe o que poderia tornar a experiência mais clara, acessível e útil no seu dia a dia.' },
  { title: 'Problemas ao navegar', description: 'Conte em qual página aconteceu, o que você tentou fazer e qual resultado apareceu.' },
]

function ContatoPage() {
  return (
    <main className="bg-emerald-50 px-6 py-12 text-slate-900 transition-colors sm:py-16 dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            <MessageCircle aria-hidden="true" size={14} /> Contato
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Vamos <span className="text-emerald-700 dark:text-emerald-400">conversar?</span></h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-emerald-100">Uma dúvida, uma ideia ou uma sugestão? Conheça os canais para falar com quem está construindo o EcoVolt.</p>
        </header>

        <section aria-labelledby="contact-title" className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative overflow-hidden rounded-3xl bg-emerald-900 p-8 text-white sm:p-10">
            <div aria-hidden="true" className="absolute -bottom-20 -left-20 size-72 rounded-full border-[40px] border-emerald-800/60" />
            <div className="relative">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950"><MessageCircle aria-hidden="true" size={28} /></div>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-300">Sua participação importa</p>
              <h2 id="contact-title" className="mt-3 text-3xl font-bold">Boas conversas ajudam o projeto a crescer.</h2>
              <p className="mt-4 leading-relaxed text-emerald-100">O EcoVolt é um projeto acadêmico do Challenge FIAP x SoulUp. Estamos construindo essa experiência e queremos ouvir suas contribuições.</p>
              <ul className="mt-8 space-y-6 border-t border-emerald-700 pt-6">
                {topics.map(topic => <li key={topic.title}><h3 className="font-semibold">{topic.title}</h3><p className="mt-2 text-sm leading-relaxed text-emerald-100">{topic.description}</p></li>)}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 dark:border-emerald-800 dark:bg-emerald-900/20">
            <div className="flex items-center gap-3"><Users aria-hidden="true" size={24} className="shrink-0 text-emerald-700 dark:text-emerald-400" /><h2 className="text-2xl font-bold">Fale com a equipe</h2></div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">Escolha um integrante para abrir seu perfil no LinkedIn e entrar em contato por lá.</p>
            <ul className="mt-6 space-y-3">
              {contacts.map(contact => (
                <li key={contact.url}>
                  <a href={contact.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir LinkedIn de ${contact.name} (nova aba)`} className="group flex items-center gap-3 rounded-2xl border border-emerald-100 p-4 transition hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-800 dark:hover:border-emerald-600 dark:hover:bg-emerald-900">
                    <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">{contact.initials}</span>
                    <span className="min-w-0 flex-1"><span className="block font-semibold text-slate-900 dark:text-white">{contact.name}</span><span className="mt-1 block text-sm text-emerald-700 dark:text-emerald-300">Ver perfil no LinkedIn</span></span>
                    <ArrowUpRight aria-hidden="true" size={19} className="shrink-0 text-emerald-700 dark:text-emerald-300" />
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/quem-somos" className="mt-6 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">Conhecer a equipe completa <ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
        </section>

        <section aria-labelledby="resources-title" className="mt-16">
          <h2 id="resources-title" className="text-3xl font-bold">Outros caminhos para encontrar o que precisa</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col shadow-sm">
              <CircleHelp aria-hidden="true" size={28} className="text-emerald-700 dark:text-emerald-400" />
              <h3 className="mt-5 text-xl font-bold">Perguntas frequentes</h3>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">Consulte respostas sobre acesso, ações sustentáveis e funcionalidades planejadas.</p>
              <Link to="/faq" className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-lg font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">Consultar o FAQ <ArrowRight aria-hidden="true" size={18} /></Link>
            </Card>
            <Card className="flex flex-col shadow-sm">
              <BookOpen aria-hidden="true" size={28} className="text-emerald-700 dark:text-emerald-400" />
              <h3 className="mt-5 text-xl font-bold">Entenda a jornada</h3>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">Conheça as etapas da proposta EcoVolt e as formas de participação previstas.</p>
              <Link to="/como-funciona" className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-lg font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">Ver como funciona <ArrowRight aria-hidden="true" size={18} /></Link>
            </Card>
            <Card className="flex flex-col shadow-sm">
              <Code aria-hidden="true" size={28} className="text-emerald-700 dark:text-emerald-400" />
              <h3 className="mt-5 text-xl font-bold">Projeto no GitHub</h3>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">Explore o repositório e acompanhe o desenvolvimento do frontend do EcoVolt.</p>
              <a href="https://github.com/Dev-Ulrich/EcoVoltRepositoryFE" target="_blank" rel="noopener noreferrer" aria-label="Abrir repositório EcoVolt no GitHub (nova aba)" className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-lg font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300">Abrir repositório <ArrowUpRight aria-hidden="true" size={18} /></a>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ContatoPage
