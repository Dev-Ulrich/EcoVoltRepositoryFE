import { ArrowRight, CircleHelp, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = ['Todas', 'Sobre o projeto', 'Acesso', 'Ações e evolução'] as const
const questions = [
  { id: 'projeto', category: 'Sobre o projeto', question: 'O que é o EcoVolt?', answer: 'O EcoVolt é um projeto acadêmico desenvolvido no Challenge FIAP x SoulUp. A proposta é conectar tecnologia e sustentabilidade para incentivar hábitos conscientes por meio de aprendizado, participação e evolução.' },
  { id: 'participantes', category: 'Sobre o projeto', question: 'Para quem o projeto está sendo desenvolvido?', answer: 'Para pessoas interessadas em incorporar atitudes sustentáveis ao cotidiano. Nesta etapa acadêmica, a experiência está sendo construída e apresentada pela equipe EcoVolt.' },
  { id: 'equipe', category: 'Sobre o projeto', question: 'Quem desenvolve o EcoVolt?', answer: 'O projeto é desenvolvido por Victor Ulrich Costa Alves da Silva, Matheus Pereira da Silva Franco, Matheus Luca Fouad Barragão e Arthur da Silva Santana. Na página Quem somos você encontra as contribuições e os perfis de cada integrante.' },
  { id: 'login', category: 'Acesso', question: 'Já posso entrar na minha conta?', answer: 'Sim, usando o e-mail e a senha fictícios exibidos no login. O acesso e os dados do dashboard são demonstrativos. A sessão fica nesta aba até sair ou fechá-la; se o navegador bloquear o armazenamento, ela dura até recarregar a página.' },
  { id: 'senha', category: 'Acesso', question: 'Como faço para recuperar minha senha?', answer: 'Use a senha fictícia exibida na página de login. Esta demonstração não possui recuperação nem alteração de senha.' },
  { id: 'celular', category: 'Acesso', question: 'Posso acessar pelo celular e mudar o tema?', answer: 'Sim. As páginas se adaptam a telas menores. No celular, abra o botão Menu para encontrar a navegação e a opção de tema claro ou escuro. Sua preferência de tema fica salva no navegador.' },
  { id: 'acoes', category: 'Ações e evolução', question: 'O que é uma ação sustentável?', answer: 'É uma atitude que ajuda a cuidar do ambiente e a reduzir o desperdício, como desligar aparelhos sem uso, reutilizar materiais ou separar resíduos para o descarte adequado. As regras para registrar ações na plataforma serão apresentadas quando o envio estiver disponível.' },
  { id: 'envios', category: 'Ações e evolução', question: 'Como vou enviar e validar minhas ações?', answer: 'O fluxo planejado permitirá registrar uma ação, enviar uma evidência e acompanhar sua análise. O envio e a validação ainda estão em desenvolvimento; os critérios e os formatos aceitos serão informados na própria plataforma.' },
  { id: 'pontos', category: 'Ações e evolução', question: 'Como funcionarão os pontos, o XP e as missões?', answer: 'A proposta é reconhecer contribuições com pontos, acompanhar a evolução com experiência (XP) e incentivar a participação por meio de missões. As regras de pontuação, os níveis e os desafios serão definidos nas próximas etapas do projeto.' },
  { id: 'recompensas', category: 'Ações e evolução', question: 'Já existem ranking e recompensas disponíveis?', answer: 'Ainda não. Ranking e recompensas fazem parte das funcionalidades planejadas. As condições de participação e as opções disponíveis serão apresentadas quando essas áreas forem implementadas.' },
]

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')

function FaqPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('Todas')
  const search = normalize(query.trim())
  const filtered = questions.filter(item => (category === 'Todas' || item.category === category) && normalize(`${item.question} ${item.answer}`).includes(search))

  function resetFilters() {
    setQuery('')
    setCategory('Todas')
  }

  return (
    <main className="bg-emerald-50 px-6 py-12 text-slate-900 transition-colors sm:py-16 dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Dúvidas? <span className="text-emerald-700 dark:text-emerald-400">Vamos ajudar.</span></h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-emerald-100">Encontre respostas sobre o EcoVolt, o acesso e os próximos passos da sua jornada sustentável.</p>
        </header>

        <section aria-labelledby="questions-title" className="mt-10">
          <h2 id="questions-title" className="sr-only">Perguntas frequentes</h2>
          <label htmlFor="faq-search" className="mb-2 block text-sm font-semibold">Buscar uma dúvida</label>
          <div className="relative">
            <Search aria-hidden="true" size={20} className="pointer-events-none absolute left-4 top-4 text-emerald-700 dark:text-emerald-300" />
            <input id="faq-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: acesso, ações, pontos…" aria-controls="faq-results" className="w-full rounded-2xl border border-emerald-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-white dark:placeholder:text-emerald-200/70" />
          </div>
          <div role="group" aria-label="Filtrar perguntas por assunto" className="mt-5 flex flex-wrap gap-2">
            {categories.map(item => <button key={item} type="button" aria-pressed={category === item} aria-controls="faq-results" onClick={() => setCategory(item)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-emerald-950 ${category === item ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950' : 'border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200 dark:hover:bg-emerald-900'}`}>{item}</button>)}
          </div>
          <p role="status" className="mt-6 text-sm text-slate-500 dark:text-emerald-200">{filtered.length} {filtered.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}</p>

          <div id="faq-results" className="mt-4 space-y-3">
            {filtered.map(item => (
              <details key={item.id} className="group rounded-2xl border border-emerald-200 bg-white shadow-sm open:border-emerald-400 dark:border-emerald-800 dark:bg-emerald-900/20 dark:open:border-emerald-600">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <Plus aria-hidden="true" size={20} className="shrink-0 text-emerald-700 group-open:rotate-45 dark:text-emerald-300" />
                </summary>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="border-t border-emerald-100 pt-4 text-sm leading-relaxed text-slate-600 dark:border-emerald-800 dark:text-emerald-100">{item.answer}</p>
                </div>
              </details>
            ))}
            {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-emerald-300 p-8 text-center dark:border-emerald-700"><Search aria-hidden="true" className="mx-auto text-emerald-600 dark:text-emerald-400" size={28} /><h3 className="mt-4 text-lg font-bold">Não encontramos essa dúvida</h3><p className="mt-2 text-sm text-slate-600 dark:text-emerald-100">Tente outra palavra ou consulte todos os assuntos.</p><button type="button" onClick={resetFilters} className="mt-5 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300">Limpar filtros</button></div>}
          </div>
        </section>

        <section aria-labelledby="help-title" className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-100/70 p-8 text-center sm:p-10 dark:border-emerald-800 dark:bg-emerald-900/40">
          <CircleHelp aria-hidden="true" size={28} className="mx-auto text-emerald-700 dark:text-emerald-400" />
          <h2 id="help-title" className="mt-4 text-2xl font-bold">Quer conhecer melhor o EcoVolt?</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-emerald-100">Explore as etapas da plataforma ou conheça a equipe e seus perfis para se conectar com quem desenvolve o projeto.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/como-funciona" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300">Como funciona <ArrowRight aria-hidden="true" size={18} /></Link>
            <Link to="/quem-somos" className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-5 py-3 font-bold text-emerald-800 hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-200 dark:hover:bg-emerald-900">Conhecer a equipe</Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default FaqPage
