import { ChevronDown, CircleDollarSign, Gift, GraduationCap, Leaf, MessageCircle, Search, Settings, Trophy, UserRound, Users } from 'lucide-react'
import { useRef, useState } from 'react'

import heroBackground from '../../assets/public/faq/faq-hero.webp'

const categories = [
  { id: 'geral', label: 'Geral', subtitle: 'Sobre o EcoVolt', title: 'Sobre o EcoVolt', description: 'Conheça mais sobre o projeto, seus objetivos e como ele funciona.', icon: Leaf },
  { id: 'acoes', label: 'Ações e pontos', subtitle: 'Envio, validação e ranking', title: 'Cada atitude conta', description: 'Entenda como enviar ações, ganhar pontos e evoluir na jornada.', icon: Trophy },
  { id: 'recompensas', label: 'Recompensas', subtitle: 'Cupons e resgate', title: 'Conquistas e recompensas', description: 'Saiba como funciona o catálogo nesta demonstração.', icon: Gift },
  { id: 'conta', label: 'Conta', subtitle: 'Cadastro e segurança', title: 'Sua conta', description: 'Encontre respostas sobre acesso, senha e dados da demonstração.', icon: UserRound },
  { id: 'tecnico', label: 'Técnico', subtitle: 'Uso da plataforma', title: 'Usando o EcoVolt', description: 'Veja como acessar a plataforma e personalizar sua experiência.', icon: Settings },
  { id: 'outros', label: 'Outros', subtitle: 'Dúvidas diversas', title: 'Podemos ajudar', description: 'Conheça a equipe e saiba como entrar em contato.', icon: MessageCircle },
] as const

const questions = [
  { id: 'objetivo', category: 'geral', question: 'Qual é o objetivo do EcoVolt?', answer: 'Incentivar hábitos sustentáveis por meio da tecnologia, gamificação e comunidade, conectando pequenas atitudes a um impacto positivo no planeta.' },
  { id: 'fiap', category: 'geral', question: 'O EcoVolt é um projeto da FIAP?', answer: 'Sim. O EcoVolt é desenvolvido no contexto do Challenge FIAP x SoulUp, unindo educação, tecnologia e sustentabilidade.' },
  { id: 'gratuito', category: 'geral', question: 'O uso da plataforma é gratuito?', answer: 'A demonstração acadêmica do EcoVolt pode ser explorada gratuitamente com as credenciais fictícias disponíveis na página de login.' },
  { id: 'privacidade', category: 'conta', question: 'Como meus dados são usados nesta demonstração?', answer: 'O acesso utiliza credenciais fictícias. A sessão fica nesta aba e a preferência de tema é salva no navegador. Os vídeos selecionados não são enviados e as ações simuladas não persistem após recarregar ou sair. Esta versão não apresenta uma política formal de privacidade.' },
  { id: 'cupons', category: 'recompensas', question: 'Como funciona o resgate de cupons?', answer: 'O catálogo permite conhecer as recompensas e acompanhar o progresso demonstrativo. Nesta versão acadêmica, não há emissão de cupons nem resgate real de benefícios.' },
  { id: 'suporte', category: 'outros', question: 'Como posso falar com a equipe?', answer: 'Acesse a página Contato para conhecer os canais disponíveis ou a página Quem somos para encontrar os perfis dos integrantes do projeto.' },
  { id: 'projeto', category: 'geral', question: 'O que é o EcoVolt?', answer: 'O EcoVolt é um projeto acadêmico desenvolvido no Challenge FIAP x SoulUp. A proposta é conectar tecnologia e sustentabilidade para incentivar hábitos conscientes por meio de aprendizado, participação e evolução.' },
  { id: 'participantes', category: 'geral', question: 'Quem pode usar a plataforma?', answer: 'Para pessoas interessadas em incorporar atitudes sustentáveis ao cotidiano. Nesta etapa acadêmica, a experiência está sendo construída e apresentada pela equipe EcoVolt.' },
  { id: 'equipe', category: 'outros', question: 'Quem desenvolve o EcoVolt?', answer: 'O projeto é desenvolvido por Victor Ulrich Costa Alves da Silva, Matheus Pereira da Silva Franco, Matheus Luca Fouad Barragão e Arthur da Silva Santana. Na página Quem somos você encontra as contribuições e os perfis de cada integrante.' },
  { id: 'login', category: 'conta', question: 'Já posso entrar na minha conta?', answer: 'Sim, usando o e-mail e a senha fictícios exibidos no login. O acesso e os dados do dashboard são demonstrativos. A sessão fica nesta aba até sair ou fechá-la; se o navegador bloquear o armazenamento, ela dura até recarregar a página.' },
  { id: 'senha', category: 'conta', question: 'Como faço para recuperar minha senha?', answer: 'Use a senha fictícia exibida na página de login. Esta demonstração não possui recuperação nem alteração de senha.' },
  { id: 'celular', category: 'tecnico', question: 'Posso acessar pelo celular e mudar o tema?', answer: 'Sim. As páginas se adaptam a telas menores. No celular, abra o botão Menu para encontrar a navegação e a opção de tema claro ou escuro. Sua preferência de tema fica salva no navegador.' },
  { id: 'acoes', category: 'acoes', question: 'O que é uma ação sustentável?', answer: 'É uma atitude como reciclar, economizar água ou usar transporte sustentável. Na tela Enviar ação você encontra as categorias, ODS e pontos demonstrativos.' },
  { id: 'envios', category: 'acoes', question: 'Como vou enviar e validar minhas ações?', answer: 'Use Enviar ação para selecionar um vídeo MP4, MOV ou AVI de até 100 MB e descrever a atividade. O arquivo não é enviado. Nos detalhes você pode simular aprovação, recusa e revisão; as alterações duram até recarregar ou sair.' },
  { id: 'pontos', category: 'acoes', question: 'Como funcionarão os pontos, o XP e as missões?', answer: 'Uma aprovação simulada concede os pontos da categoria e 40 XP. Ao atingir os objetivos de uma missão, seus bônus são somados uma única vez. O tier do participante é fixo nesta demonstração.' },
  { id: 'recompensas', category: 'recompensas', question: 'Já existem ranking e recompensas disponíveis?', answer: 'Sim. O ranking mensal pode ser filtrado por tier e acompanha os pontos locais. O catálogo mostra conquistas disponíveis, em progresso e bloqueadas. Não há benefício financeiro ou resgate real.' },
]

const generalOrder = ['projeto', 'objetivo', 'fiap', 'participantes', 'gratuito']
questions.sort((a, b) => (generalOrder.includes(a.id) ? generalOrder.indexOf(a.id) : 99) - (generalOrder.includes(b.id) ? generalOrder.indexOf(b.id) : 99))

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-emerald-950'

function FaqPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('geral')
  const [openQuestion, setOpenQuestion] = useState<string | null>('projeto')
  const resultsRef = useRef<HTMLHeadingElement>(null)
  const search = normalize(query.trim())
  const activeCategory = categories.find(item => item.id === category) ?? categories[0]
  const filtered = questions.filter(item => search ? normalize(`${item.question} ${item.answer}`).includes(search) : item.category === category)

  function selectCategory(id: string) {
    setQuery('')
    setCategory(id)
    setOpenQuestion(questions.find(item => item.category === id)?.id ?? null)
  }

  return (
    <main className="bg-[#fcfefd] text-[#09243a] transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <img src={heroBackground} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,25,19,.75)_0%,rgba(0,25,19,.5)_40%,transparent_70%)] max-lg:bg-emerald-950/65" />
        <div className="mx-auto flex min-h-[350px] max-w-6xl items-center px-6 py-10 lg:min-h-[380px]">
          <div className="max-w-[540px]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">FAQ</p>
            <h1 id="faq-title" className="mt-3 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.4rem]">Tire suas dúvidas<br />e faça parte dessa <span className="block text-green-300">mudança.</span></h1>
            <p className="mt-5 max-w-[440px] text-base leading-relaxed text-emerald-50 sm:text-lg">Aqui você encontra as respostas para as perguntas mais frequentes sobre o EcoVolt.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <section aria-labelledby="search-title" className="mt-6 grid items-center gap-5 rounded-2xl bg-[#eff7f3] p-5 lg:grid-cols-2 dark:bg-emerald-900/40">
          <div className="flex items-center gap-4"><span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-300"><Search aria-hidden="true" size={34} /></span><div><h2 id="search-title" className="text-lg font-bold tracking-tight">Não encontrou o que procura?</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Busque por palavras-chave e encontre a resposta rapidamente.</p></div></div>
          <form role="search" onSubmit={event => { event.preventDefault(); resultsRef.current?.focus() }} className="flex min-w-0 flex-wrap gap-2 sm:flex-nowrap sm:gap-0">
            <label htmlFor="faq-search" className="sr-only">Buscar perguntas em todos os assuntos</label>
            <div className="relative min-w-0 flex-1 basis-full sm:basis-auto"><Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-4 text-slate-500 dark:text-slate-300" /><input id="faq-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setOpenQuestion(null) }} aria-controls="faq-results" placeholder="Ex: como enviar uma ação, pontos, cupom..." className={`min-h-12 w-full rounded-xl border border-emerald-200 bg-white py-3 pl-11 pr-3 text-sm placeholder:text-slate-500 sm:rounded-r-none dark:border-emerald-700 dark:bg-emerald-950 dark:placeholder:text-slate-400 ${focus}`} /></div>
            <button type="submit" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 sm:rounded-l-none dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 ${focus}`}><Search aria-hidden="true" size={18} />Buscar</button>
          </form>
        </section>

        <section aria-label="Perguntas frequentes" className="mt-7 grid items-start gap-7 lg:grid-cols-[260px_1fr]">
          <div role="group" aria-label="Filtrar perguntas por assunto" className="grid gap-1 rounded-2xl bg-slate-50/90 p-2 sm:grid-cols-2 lg:grid-cols-1 dark:bg-emerald-900/20">
            {categories.map(({ id, label, subtitle, icon: Icon }) => <button key={id} type="button" aria-pressed={!search && category === id} aria-controls="faq-results" onClick={() => selectCategory(id)} className={`flex min-h-20 items-center gap-4 rounded-xl border p-2 text-left transition-colors ${focus} ${!search && category === id ? 'border-emerald-200 bg-emerald-100/70 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-200' : 'border-transparent hover:bg-emerald-50 dark:hover:bg-emerald-900'}`}><span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-white/90 text-emerald-700 shadow-sm dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"><Icon aria-hidden="true" size={26} /></span><span><span className="block text-sm font-bold">{label}</span><span className="mt-1 block text-xs leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</span></span></button>)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">{search ? 'Busca em todos os assuntos' : activeCategory.label}</p>
            <h2 ref={resultsRef} tabIndex={-1} className={`mt-1 scroll-mt-24 rounded text-3xl font-bold tracking-tight sm:text-4xl ${focus}`}>{search ? 'Resultados da busca' : activeCategory.title}</h2>
            <p className="mt-1 text-base text-slate-600 dark:text-slate-300">{search ? `Respostas para “${query.trim()}”.` : activeCategory.description}</p>
            <p role="status" className={search ? 'mt-2 text-sm text-slate-600 dark:text-slate-300' : 'sr-only'}>{filtered.length} {filtered.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}</p>
            <div id="faq-results" className="mt-3 space-y-2">
              {filtered.map(item => {
                const Icon = item.id === 'fiap' ? GraduationCap : item.id === 'participantes' ? Users : item.id === 'gratuito' ? CircleDollarSign : categories.find(cat => cat.id === item.category)?.icon ?? Leaf
                const expanded = openQuestion === item.id
                return <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-emerald-800 dark:bg-emerald-900/20">
                  <h3><button id={`question-${item.id}`} type="button" aria-expanded={expanded} aria-controls={`answer-${item.id}`} onClick={() => setOpenQuestion(expanded ? null : item.id)} className={`flex min-h-14 w-full items-center gap-4 rounded-xl bg-slate-50/80 px-4 py-2 text-left text-sm font-bold dark:bg-emerald-900/30 ${focus}`}><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300"><Icon aria-hidden="true" size={22} /></span><span className="flex-1">{item.question}</span><ChevronDown aria-hidden="true" size={21} className={`shrink-0 ${expanded ? 'rotate-180' : ''}`} /></button></h3>
                  <div id={`answer-${item.id}`} role="region" aria-labelledby={`question-${item.id}`} hidden={!expanded} className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600 dark:border-emerald-800 dark:text-slate-300">{item.answer}</div>
                </article>
              })}
              {filtered.length === 0 && <div className="rounded-xl border border-dashed border-emerald-300 p-7 text-center dark:border-emerald-700"><Search aria-hidden="true" size={28} className="mx-auto text-emerald-600 dark:text-emerald-400" /><h3 className="mt-3 font-bold">Não encontramos essa dúvida</h3><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tente outra palavra ou escolha um assunto na lista.</p><button type="button" onClick={() => selectCategory('geral')} className={`mt-4 min-h-11 rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 ${focus}`}>Limpar busca</button></div>}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default FaqPage
