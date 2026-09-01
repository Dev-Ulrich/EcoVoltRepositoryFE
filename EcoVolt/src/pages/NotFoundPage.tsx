import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="text-center">
        <span className="text-7xl font-black text-emerald-400">
          404
        </span>

        <h1 className="mt-4 text-3xl font-bold">
          Página não encontrada
        </h1>

        <p className="mt-3 text-slate-300">
          A página que você tentou acessar não existe.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-emerald-400 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-300"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage