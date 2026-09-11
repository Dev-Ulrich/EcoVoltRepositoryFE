import { LockKeyhole, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import FormField from './FormField'

type ContactData = { name: string; email: string; subject: string; message: string }
const contactSubjects = ['Dúvidas sobre o projeto', 'Problemas com recompensas', 'Reportar um problema', 'Parcerias', 'Sugestões e elogios', 'Outros']

export default function ContactForm({ selectedSubject }: { selectedSubject?: { value: string } }) {
  const [sent, setSent] = useState<{ selection: typeof selectedSubject } | null>(null)
  const { register, handleSubmit, reset, control, setValue, setFocus, formState: { errors, isSubmitting } } = useForm<ContactData>({ defaultValues: { name: '', email: '', subject: '', message: '' } })
  const message = useWatch({ control, name: 'message' })

  useEffect(() => {
    if (!selectedSubject) return
    setValue('subject', selectedSubject.value, { shouldValidate: true })
    setFocus('subject')
  }, [selectedSubject, setValue, setFocus])

  function submit() {
    setSent({ selection: selectedSubject })
    reset()
  }
  const input = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-white'

  return (
    <form onSubmit={handleSubmit(submit)} onChange={() => setSent(null)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField tone="emerald" label="Nome completo" placeholder="Seu nome" autoComplete="name" required error={errors.name?.message} {...register('name', { validate: value => !!value.trim() || 'Informe seu nome.', maxLength: { value: 100, message: 'Use até 100 caracteres.' } })} />
        <FormField tone="emerald" label="E-mail" placeholder="seu@email.com" autoComplete="email" type="email" required error={errors.email?.message} {...register('email', { required: 'Informe o e-mail.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Informe um e-mail válido.' } })} />
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold">Assunto <span aria-hidden="true">*</span></label>
        <select id="contact-subject" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} className={input} {...register('subject', { required: 'Selecione um assunto.', validate: value => contactSubjects.includes(value) || 'Selecione um assunto válido.' })}>
          <option value="" disabled>Selecione um assunto</option>
          {contactSubjects.map(subject => <option key={subject}>{subject}</option>)}
        </select>
        {errors.subject && <p id="contact-subject-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">Mensagem <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" required maxLength={500} placeholder="Escreva sua mensagem aqui..." rows={7} className={`${input} min-h-44 resize-y placeholder:text-slate-500 dark:placeholder:text-slate-400`} aria-invalid={!!errors.message} aria-describedby={`contact-message-count${errors.message ? ' contact-message-error' : ''}`} {...register('message', { validate: value => value.trim().length >= 10 || 'Escreva pelo menos 10 caracteres.', maxLength: { value: 500, message: 'Use até 500 caracteres.' } })} />
        <p id="contact-message-count" className="mt-1 text-right text-xs text-slate-500 dark:text-slate-300">{message.length}/500</p>
        {errors.message && <p id="contact-message-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300 dark:focus-visible:ring-offset-emerald-950"><Send aria-hidden="true" size={20} />Simular envio da mensagem</button>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300"><LockKeyhole aria-hidden="true" size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" />Demonstração: os campos são validados localmente. Nenhuma mensagem é enviada ou armazenada.</p>
      </div>
      {sent && sent.selection === selectedSubject && <p role="status" className="rounded-xl bg-emerald-100 p-4 text-sm text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">Mensagem validada na demonstração. Nenhum e-mail foi enviado e os dados não foram armazenados.</p>}
    </form>
  )
}
