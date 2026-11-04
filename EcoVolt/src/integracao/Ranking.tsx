import Estado from './Estado';
import { listarRanking } from './ranking';
import { useDados } from './useDados';

export default function Ranking() {
  const estado = useDados(listarRanking);

  return (
    <section className="space-y-4">
      <h1>Ranking</h1>

      <Estado {...estado} />

      {estado.dados?.length === 0 && <p>Nenhum registro no ranking.</p>}

      <ol className="space-y-3">
        {estado.dados
          ?.slice()
          .sort((a, b) => a.posicao - b.posicao)
          .map((r) => (
            <li
              className="flex items-center justify-between rounded border p-4"
              key={r.id}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">
                  {r.posicao}º
                </span>
                <span className="font-semibold">Usuário #{r.idUsuario}</span>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  {r.pontuacaoTotalPeriodo.toLocaleString('pt-BR')} pts
                </p>
                <p className="text-sm text-slate-500">{r.periodoReferencia}</p>
              </div>
            </li>
          ))}
      </ol>
    </section>
  );
}
