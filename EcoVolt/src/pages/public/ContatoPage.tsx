import { ArrowRight, ArrowUpRight, Bug, CircleHelp, Code, Gift, Handshake, Leaf, Mail, MapPin, MessageCircle, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import heroBackground from '../../assets/public/contato/hero-contato-reference.png'
import communityBackground from '../../assets/public/home/backgroun-section-homepage.png'
import ContactForm from '../../components/common/ContactForm'

const topics = [
  { icon: CircleHelp, title: 'Dúvidas sobre o projeto', description: 'Entenda mais sobre o EcoVolt' },
  { icon: Gift, title: 'Problemas com recompensas', description: 'Pontos, cupons e resgates' },
  { icon: Bug, title: 'Reportar um problema', description: 'Encontrou um erro? Nos avise!' },
  { icon: Handshake, title: 'Parcerias', description: 'Quer colaborar com o EcoVolt?' },
]
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-emerald-950'
const body = 'text-slate-600 dark:text-slate-300'
const mapQuery = encodeURIComponent('FIAP Av. Paulista, 1106, São Paulo - SP')

function ContatoPage() {
  const [selectedSubject, setSelectedSubject] = useState<{ value: string }>()
  function chooseSubject(value: string) {
    setSelectedSubject({ value })
    document.getElementById('contact-form-title')?.scrollIntoView({ block: 'start' })
  }

  return (
    <main className="bg-[#fcfefd] text-[#09243a] transition-colors dark:bg-emerald-950 dark:text-white">
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <img src={heroBackground} alt="" fetchPriority="high" width={2172} height={724} className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] lg:object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,25,19,.85)_0%,rgba(0,25,19,.6)_38%,transparent_72%)] max-lg:bg-emerald-950/75" />
        <div className="relative mx-auto flex min-h-[360px] max-w-6xl items-center px-6 py-10 lg:min-h-[390px]">
          <div className="max-w-lg"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Contato</p><h1 id="contact-title" className="mt-3 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">Estamos aqui<span className="block text-emerald-300">para te ouvir.</span></h1><p className="mt-5 text-base leading-relaxed text-emerald-50 sm:text-lg">Tem dúvidas, sugestões, encontrou um problema ou quer fazer uma parceria? Fale com a nossa equipe! Sua mensagem é muito importante para continuarmos construindo um amanhã mais sustentável.</p></div>
          <p className="absolute right-8 top-9 hidden -rotate-[8deg] text-center font-serif text-3xl italic leading-tight text-emerald-950 [text-shadow:0_1px_8px_rgba(255,255,255,.65)] lg:block">Vamos<br />conversar?<span aria-hidden="true" className="mx-auto mt-3 block h-1 w-28 -rotate-6 rounded-full bg-emerald-600" /></p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_2.1fr]">
          <section aria-labelledby="channels-title" className="rounded-2xl bg-[#f1f8f4] p-6 dark:bg-emerald-900/35">
            <h2 id="channels-title" className="text-2xl font-bold tracking-tight">Nossos canais</h2><p className={`mt-2 text-sm leading-relaxed ${body}`}>Escolha a melhor forma de falar com a gente.</p>
            <ul className="mt-7 space-y-7">
              <li className="flex items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><Mail aria-hidden="true" size={29} /></span><div className="min-w-0 pt-1"><h3 className="text-sm font-bold">E-mail</h3><a href="mailto:contato@ecovolt.com.br" className={`mt-1 block break-all text-sm hover:underline ${focus}`}>contato@ecovolt.com.br</a><p className={`mt-1 text-xs ${body}`}>Canal informado pelo projeto</p></div></li>
              <li className="flex items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><MapPin aria-hidden="true" size={29} /></span><div className="pt-1"><h3 className="text-sm font-bold">Localização</h3><p className={`mt-1 text-sm ${body}`}>São Paulo - SP</p><p className={`mt-1 text-xs ${body}`}>FIAP (Campus Paulista)</p></div></li>
              <li className="flex items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><Users aria-hidden="true" size={29} /></span><div className="pt-1"><h3 className="text-sm font-bold">Projeto acadêmico</h3><p className="mt-1 text-sm">FIAP x SoulUp</p><p className={`mt-1 text-xs ${body}`}>Turma 1TDSPW</p></div></li>
              <li className="flex items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"><MessageCircle aria-hidden="true" size={29} /></span><div className="pt-1"><h3 className="text-sm font-bold">Conecte-se com a equipe</h3><div className="mt-2 flex flex-wrap gap-3"><a href="https://github.com/Dev-Ulrich/EcoVoltRepositoryFE" target="_blank" rel="noopener noreferrer" aria-label="GitHub do projeto (abre em nova aba)" className={`inline-flex min-h-11 items-center gap-1 text-sm hover:text-emerald-600 ${focus}`}><Code aria-hidden="true" size={19} />GitHub</a><Link to="/quem-somos" className={`inline-flex min-h-11 items-center gap-1 text-sm hover:text-emerald-600 ${focus}`}><Users aria-hidden="true" size={19} />Perfis</Link></div></div></li>
            </ul>
            <div className="mt-6 border-t border-emerald-100 pt-5 dark:border-emerald-800"><div className="flex items-start gap-3 rounded-xl bg-emerald-100/65 p-4 dark:bg-emerald-800/40"><Leaf aria-hidden="true" size={30} className="shrink-0 text-emerald-600 dark:text-emerald-300" /><div><p className="text-sm font-bold leading-snug text-emerald-700 dark:text-emerald-300">Juntos por um amanhã mais verde.</p><p className={`mt-1 text-xs leading-relaxed ${body}`}>Cada mensagem nos ajuda a evoluir!</p></div></div></div>
          </section>

          <section aria-labelledby="contact-form-title" className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 dark:border-emerald-800 dark:bg-emerald-900/20">
            <h2 id="contact-form-title" className="scroll-mt-24 text-2xl font-bold tracking-tight">Envie sua mensagem</h2><p className={`mb-6 mt-2 text-sm leading-relaxed ${body}`}>Experimente o formulário abaixo. Para falar com a equipe, use nossos canais de contato.</p>
            <ContactForm selectedSubject={selectedSubject} />
          </section>
        </div>

        <section aria-labelledby="topics-title" className="mt-6 rounded-2xl bg-slate-50 p-6 dark:bg-emerald-900/20">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="topics-title" className="text-2xl font-bold tracking-tight">Assuntos mais comuns</h2><p className={`mt-1 text-sm ${body}`}>Talvez você encontre sua resposta mais rapidamente por aqui.</p></div></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{topics.map(({ icon: Icon, title, description }) => <button data-motion-reveal key={title} type="button" onClick={() => chooseSubject(title)} className={`relative rounded-2xl border border-emerald-100 bg-[#eff8f2] p-5 text-left transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/40 dark:hover:bg-emerald-900 ${focus}`}><ArrowRight aria-hidden="true" size={16} className="absolute right-5 top-5 text-emerald-600 dark:text-emerald-300" /><span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-300"><Icon aria-hidden="true" size={29} /></span><span className="mt-3 block text-sm font-bold">{title}</span><span className={`mt-1 block text-sm leading-relaxed ${body}`}>{description}</span></button>)}</div>
        </section>

        <div className="mt-5 grid gap-4 lg:grid-cols-[2.1fr_1fr]">
          <section aria-labelledby="idea-title" className="relative isolate overflow-hidden rounded-2xl bg-emerald-950 px-6 py-10 text-white sm:px-10">
            <img src={communityBackground} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" /><div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-emerald-950/40" />
            <div className="max-w-md"><p className="text-xs font-bold uppercase tracking-[0.14em] text-lime-200">Fazer a diferença é melhor juntos</p><h2 id="idea-title" className="mt-3 text-3xl font-bold leading-tight tracking-tight">Tem uma <span className="text-emerald-300">ideia incrível?</span></h2><p className="mt-3 text-sm leading-relaxed text-emerald-50">Seja para parcerias, projetos, sugestões ou apenas um elogio, queremos ouvir você. Toda conversa pode gerar um impacto positivo.</p><button type="button" onClick={() => chooseSubject('Sugestões e elogios')} className={`mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl bg-lime-300 px-6 py-3 text-sm font-bold text-emerald-950 hover:bg-lime-200 ${focus}`}><MessageCircle aria-hidden="true" size={21} />Falar com a equipe <ArrowRight aria-hidden="true" size={18} /></button></div>
          </section>
          <section aria-labelledby="location-title" className="rounded-2xl bg-[#f3f8f5] p-5 dark:bg-emerald-900/30"><h2 id="location-title" className="text-lg font-bold tracking-tight">Onde estamos</h2><p className={`mt-1 text-xs leading-relaxed ${body}`}>Nosso projeto é desenvolvido na FIAP, em São Paulo, em parceria com a SoulUp.</p><iframe title="Localização da FIAP Campus Paulista no Google Maps" src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-3 h-40 w-full rounded-xl border-0" /><p className="mt-3 flex items-start gap-2 text-xs leading-relaxed"><MapPin aria-hidden="true" size={20} className="shrink-0 text-emerald-700 dark:text-emerald-300" />Av. Paulista, 1106 - Bela Vista, São Paulo - SP</p><a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 ${focus}`}>Ver no Google Maps <ArrowUpRight aria-hidden="true" size={15} /><span className="sr-only">(abre em nova aba)</span></a></section>
        </div>
      </div>
    </main>
  )
}

export default ContatoPage
