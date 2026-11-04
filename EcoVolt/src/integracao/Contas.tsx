import Estado from './Estado';
import { listarContas } from './contas';
import { useDados } from './useDados';
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export default function Contas() {
  const estado = useDados(listarContas);
  return <section className="space-y-4">
    <h1>Contas de energia</h1><Estado {...estado} />
    {estado.dados?.length === 0 && <p>Nenhuma conta cadastrada.</p>}
    <ul className="grid gap-3 sm:grid-cols-2">{estado.dados?.map(c => <li className="rounded border p-4" key={c.id}>
      <h2 className="font-bold">{c.nomeTitular}</h2><p>{c.mesReferencia}</p>
      <p>{moeda.format(c.valorConta)}</p><p>{c.statusPagamento}</p>
    </li>)}</ul>
  </section>;
}