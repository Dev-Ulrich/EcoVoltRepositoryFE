import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import FormField from './FormField'
import { fieldClass } from '../actions/actionPresentation'

type ContactData = {
  name: string
  email: string
  subject: string
  message: string
}
export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>()
  async function submit() {
    setSent(true)
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(submit)}
      onChange={() => setSent(false)}
      noValidate
      className="space-y-5"
    >
      <FormField
        label="Nome"
        required
        error={errors.name?.message}
        {...register('name', {
          validate: (value) => !!value.trim() || 'Informe seu nome.',
          maxLength: { value: 100, message: 'Use até 100 caracteres.' },
        })}
      />
      <FormField
        label="E-mail para contato"
        type="email"
        required
        error={errors.email?.message}
        {...register('email', {
          required: 'Informe o e-mail.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Informe um e-mail válido.',
          },
        })}
      />
      <FormField
        label="Assunto"
        required
        error={errors.subject?.message}
        {...register('subject', {
          validate: (value) => !!value.trim() || 'Informe o assunto.',
          maxLength: { value: 150, message: 'Use até 150 caracteres.' },
        })}
      />
      <div>
        <label htmlFor="contact-message" className="mb-2 block font-semibold">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          className={fieldClass}
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby="contact-message-error"
          {...register('message', {
            validate: (value) =>
              value.trim().length >= 10 || 'Escreva pelo menos 10 caracteres.',
            maxLength: { value: 2000, message: 'Use até 2.000 caracteres.' },
          })}
        />
        <p id="contact-message-error" role="alert">
          {errors.message?.message}
        </p>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Simular envio da mensagem
      </Button>
      {sent && (
        <p
          role="status"
          className="rounded-xl bg-emerald-100 p-4 text-emerald-900"
        >
          Mensagem validada na demonstração. Nenhum e-mail foi enviado e os
          dados não foram armazenados.
        </p>
      )}
    </form>
  )
}
