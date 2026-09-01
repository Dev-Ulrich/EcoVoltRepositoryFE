import { Link } from 'react-router-dom'

import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import ProgressBar from '../../components/common/ProgressBar'

function HomePage() {
  function handleViewDetails() {
    alert('Detalhes da ação sustentável!')
  }

  function handleNewAction() {
    alert('Em breve: formulário de nova ação!')
  }

  return (
    <main className="bg-emerald-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
            EcoVolt
          </span>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            React Router configurado!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
            React, Vite, TypeScript, TailwindCSS e os componentes
            compartilhados estão funcionando corretamente.
          </p>
        </header>

        <section
          className="mt-12"
          aria-labelledby="sustainable-action-title"
        >
          <Card className="mx-auto max-w-md text-left">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-sm text-emerald-200">
                  Ação sustentável
                </span>

                <h2
                  id="sustainable-action-title"
                  className="mt-1 text-xl font-bold"
                >
                  Economia de energia
                </h2>
              </div>

              <Badge variant="success">
                Aprovada
              </Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              Reduza o consumo de energia desligando aparelhos que não
              estiverem sendo utilizados.
            </p>

            <div className="mt-6">
              <ProgressBar
                label="Progresso da missão"
                value={75}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                fullWidth
                onClick={handleViewDetails}
              >
                Ver detalhes
              </Button>

              <Button
                fullWidth
                variant="secondary"
                onClick={handleNewAction}
              >
                Nova ação
              </Button>
            </div>
          </Card>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/rota-inexistente"
            className="
              inline-flex items-center justify-center
              rounded-lg border border-emerald-400
              px-5 py-3 font-bold text-emerald-300
              transition hover:bg-emerald-400/10
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-300
              focus-visible:ring-offset-2
              focus-visible:ring-offset-emerald-950
            "
          >
            Testar página 404
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage