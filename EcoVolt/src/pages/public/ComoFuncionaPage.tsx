import { ArrowDown, ArrowRight, Check, ClipboardCheck, Leaf, Lightbulb, LogIn, Recycle, Sprout, Trophy, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import Card from '../../components/common/Card'

const steps = [
  { number: '01', title: 'Entre na sua conta', description: 'Use o e-mail e a senha fictícios exibidos no login para conhecer o dashboard demonstrativo.', icon: LogIn, available: true },
  { number: '02', title: 'Transforme hábitos em ações', description: 'O próximo passo será registrar suas atitudes sustentáveis e enviar uma evidência do que você fez.', icon: Leaf, available: false },
  { number: '03', title: 'Acompanhe a validação', description: 'Você poderá acompanhar a análise de cada envio e conferir o resultado da sua ação na plataforma.', icon: ClipboardCheck, available: false },
  { number: '04', title: 'Veja sua evolução', description: 'Ações aprovadas farão parte da sua jornada, com pontos, experiência e novos desafios para continuar participando.', icon: Trophy, available: false },
]

const examples = [
  { title: 'Consumo consciente', description: 'Apague as luzes ao sair e desligue aparelhos que não estão em uso.', icon: Lightbulb },
  { title: 'Menos desperdício', description: 'Reutilize materiais e separe os resíduos para o descarte adequado.', icon: Recycle },
  { title: 'Cuidado com o entorno', description: 'Cuide dos espaços compartilhados e incentive atitudes sustentáveis na sua comunidade.', icon: Sprout },
]

const questions = [
  { title: 'Como consigo meu acesso?', answer: 'O e-mail e a senha de demonstração estão na página de login. O acesso e os indicadores são simulados no navegador, sem cadastro ou autenticação real.' },
  { title: 'Já posso enviar uma ação?', answer: 'Ainda não. O login e o dashboard estão disponíveis. O envio de ações, as validações, as missões, o ranking e as recompensas fazem parte das próximas etapas do projeto.' },
  { title: 'Qual é a diferença entre pontos e experiência?', answer: 'Os pontos representarão a pontuação das suas contribuições, enquanto a experiência (XP) acompanhará sua evolução de nível. As regras de concessão serão apresentadas junto com as funcionalidades de ações e missões.' },
]

function ComoFuncionaPage() {
  return (
    <main className="bg-emerald-50 px-6 py-12 text-slate-900 transition-colors sm:py-16 dark:bg-emerald-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <section aria-labelledby="how-title" className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h1 id="how-title" className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Pequenas ações.<br /><span className="text-emerald-700 dark:text-emerald-400">Um futuro melhor.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-emerald-100">O EcoVolt conecta atitudes sustentáveis a uma jornada de aprendizado e evolução. Conheça o caminho, do primeiro acesso ao reconhecimento de cada contribuição.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300">Acessar minha conta <ArrowRight aria-hidden="true" size={18} /></Link>
              <a href="#passo-a-passo" className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900">Conhecer as etapas <ArrowDown aria-hidden="true" size={18} /></a>
            </div>
          </div>
          <aside aria-label="O propósito da sua jornada" className="relative overflow-hidden rounded-3xl bg-emerald-900 p-8 text-white sm:p-10 dark:border dark:border-emerald-700">
            <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full border-[40px] border-emerald-800/70" />
            <div className="relative">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950"><Zap aria-hidden="true" size={32} /></div>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-300">Sua energia faz a diferença</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">Um hábito de cada vez.</h2>
              <p className="mt-4 leading-relaxed text-emerald-100">Uma jornada para tornar a sustentabilidade parte do seu dia a dia.</p>
              <ul className="mt-8 space-y-4 border-t border-emerald-700 pt-6">
                {['Aprender com a prática', 'Reconhecer cada contribuição', 'Construir uma comunidade consciente'].map(item => <li key={item} className="flex items-start gap-3 text-sm"><Check aria-hidden="true" size={18} className="shrink-0 text-emerald-300" />{item}</li>)}
              </ul>
            </div>
          </aside>
        </section>

        <section id="passo-a-passo" aria-labelledby="steps-title" className="mt-20 scroll-mt-32">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Sua jornada no EcoVolt</p>
          <h2 id="steps-title" className="mt-3 text-3xl font-bold">Do primeiro acesso à evolução</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-emerald-100">Comece conhecendo seu dashboard. As próximas etapas ampliarão as formas de participar e acompanhar seu impacto.</p>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ number, title, description, icon: Icon, available }) => (
              <li key={number}>
                <Card className="h-full shadow-sm">
                  <div className="flex items-center justify-between"><Icon aria-hidden="true" size={26} className="text-emerald-700 dark:text-emerald-400" /><span aria-hidden="true" className="text-3xl font-black text-emerald-200 dark:text-emerald-800">{number}</span></div>
                  <p className={`mt-6 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-slate-100 text-slate-600 dark:bg-emerald-900/50 dark:text-emerald-200'}`}>{available ? 'Disponível' : 'Em breve'}</p>
                  <h3 className="mt-3 text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{description}</p>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="examples-title" className="mt-20">
          <h2 id="examples-title" className="text-3xl font-bold">A mudança começa no cotidiano</h2>
          <p className="mt-4 text-slate-600 dark:text-emerald-100">Ideias para colocar a sustentabilidade em prática desde já.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {examples.map(({ title, description, icon: Icon }) => <article key={title} className="border-l-2 border-emerald-300 pl-5 dark:border-emerald-700"><Icon aria-hidden="true" size={24} className="text-emerald-700 dark:text-emerald-400" /><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{description}</p></article>)}
          </div>
        </section>

        <section aria-labelledby="questions-title" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Antes de começar</p><h2 id="questions-title" className="mt-3 text-3xl font-bold">Tire suas dúvidas</h2><p className="mt-4 leading-relaxed text-slate-600 dark:text-emerald-100">Entenda o acesso e o que vem por aí na plataforma.</p></div>
          <div className="space-y-3">
            {questions.map(({ title, answer }) => <details key={title} className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-800 dark:bg-emerald-900/20"><summary className="cursor-pointer rounded font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">{title}</summary><p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-emerald-100">{answer}</p></details>)}
          </div>
        </section>

        <section aria-labelledby="start-title" className="mt-20 rounded-3xl border border-emerald-200 bg-emerald-100/70 p-8 text-center sm:p-12 dark:border-emerald-800 dark:bg-emerald-900/40">
          <h2 id="start-title" className="text-3xl font-bold">Pronto para dar o primeiro passo?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600 dark:text-emerald-100">Entre com sua conta EcoVolt e conheça seu espaço para acompanhar essa jornada.</p>
          <Link to="/login" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300">Entrar no EcoVolt <ArrowRight aria-hidden="true" size={18} /></Link>
        </section>
      </div>
    </main>
  )
}

export default ComoFuncionaPage
