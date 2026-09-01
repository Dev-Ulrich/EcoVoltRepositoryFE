import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="min-h-screen bg-emerald-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
            EcoVolt
          </span>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            React Router configurado!
          </h1>

          <p className="mt-4 text-emerald-100">
            Esta é a rota inicial da aplicação EcoVolt.
          </p>

          <Link
            to="/rota-inexistente"
            className="mt-8 inline-block rounded-lg bg-emerald-400 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-300"
          >
            Testar rota inexistente
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage