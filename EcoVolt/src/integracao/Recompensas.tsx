import Estado from './Estado';
import { listarRecompensas } from './recompensas';
import { useDados } from './useDados';

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function Recompensas() {
  const estado = useDados(listarRecompensas);

  return (
    <section className="space-y-4">
      <h1>Recompensas</h1>

      <Estado {...estado} />

      {estado.dados?.length === 0 && <p>Nenhuma recompensa disponível.</p>}

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {estado.dados?.map((r) => (
          <li className="rounded border p-4" key={r.id}>
            <h2 className="font-bold">{r.descricao}</h2>
            <p>{moeda.format(r.valor)}</p>
            <p
              className={
                r.status === 'ATIVO'
                  ? 'text-green-600'
                  : 'text-slate-500'
              }
            >
              {r.status}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
