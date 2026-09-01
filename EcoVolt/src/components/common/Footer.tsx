import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-emerald-800 bg-emerald-950 text-emerald-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <Link
            to="/"
            className="text-2xl font-black text-white"
          >
            Eco<span className="text-emerald-400">Volt</span>
          </Link>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-emerald-200">
            Transformando atitudes sustentáveis em impacto real.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-white">
            Navegação
          </h2>

          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-emerald-400" to="/">
                Início
              </Link>
            </li>

            <li>
              <Link
                className="hover:text-emerald-400"
                to="/como-funciona"
              >
                Como funciona
              </Link>
            </li>

            <li>
              <Link className="hover:text-emerald-400" to="/faq">
                FAQ
              </Link>
            </li>

            <li>
              <Link className="hover:text-emerald-400" to="/contato">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white">
            Projeto
          </h2>

          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-emerald-400" to="/sobre">
                Sobre
              </Link>
            </li>

            <li>
              <Link
                className="hover:text-emerald-400"
                to="/integrantes"
              >
                Integrantes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-900 px-6 py-4 text-center text-sm text-emerald-300">
        EcoVolt • FIAP x SoulUp © {currentYear}
      </div>
    </footer>
  )
}

export default Footer