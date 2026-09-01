import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main
      className="
        flex min-h-[70vh] items-center
        justify-center bg-emerald-50
        px-6 py-16 text-slate-900
        transition-colors
        dark:bg-emerald-950
        dark:text-white
      "
      aria-labelledby="not-found-title"
    >
      <div className="text-center">
        <span
          className="
            text-7xl font-black
            text-emerald-600
            dark:text-emerald-400
          "
          aria-hidden="true"
        >
          404
        </span>

        <h1
          id="not-found-title"
          className="mt-4 text-3xl font-bold"
        >
          Página não encontrada
        </h1>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          A página que você tentou acessar não existe ou ainda não foi
          desenvolvida.
        </p>

        <Link
          to="/"
          className="
            mt-8 inline-flex items-center
            justify-center rounded-lg
            bg-emerald-500 px-5 py-3
            font-bold text-white
            transition hover:bg-emerald-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2
            focus-visible:ring-offset-emerald-50
            dark:bg-emerald-400
            dark:text-emerald-950
            dark:hover:bg-emerald-300
            dark:focus-visible:ring-emerald-300
            dark:focus-visible:ring-offset-emerald-950
          "
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage